import React, { useEffect, useState } from 'react'
import { Stack, Box, Container, Card, NoSsr } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import { useSelector } from "react-redux";
import { withTranslation } from 'react-i18next'
import { CustomStackForLoaction } from "@/styled-components/CustomStyles.style"
import Toolbar from '@mui/material/Toolbar'
import DrawerMenu from '../DrawerMenu'
import ThemeSwitches from './ThemeSwitches'
import { useQuery } from 'react-query'
import AddressReselect from './address-reselect/AddressReselect'
import { useSettings } from "@/contexts/use-settings"
import LogoSide from "../second-navbar/LogoSide";
import useMediaQuery from "@mui/material/useMediaQuery";
import useGetGuest from '../../../hooks/react-query/profile/useGetGuest';
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";

const TopNav = ({ cartListRefetch }) => {
    const theme = useTheme()

    const [theme_mode, setThemeMode] = useState('')
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const [userLocation, setUserLocation] = useState(null)
    const { global, userLocationUpdate } = useSelector((state) => state.globalSettings)
    const businessLogo = global?.fav_icon
    let guestId;
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = JSON.parse(localStorage.getItem('zoneid'))
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    useEffect(() => {
        let location = undefined
        if (typeof window !== 'undefined') {
            location = localStorage.getItem('location')
        }

        setUserLocation(location)
    }, [userLocationUpdate]);

    if (typeof window !== "undefined") {
        guestId = localStorage.getItem("guest_id");
    }

    const {
        data: guestData,
        refetch: guestRefetch,
        isLoading: guestIsLoading,
    } = useGetGuest();

    useEffect(() => {
        // Check if there is no guest ID in local storage and there is no ongoing API request
        if ((!guestId || guestId==="undefined" ) && !guestIsLoading) {
            guestRefetch();
        }
    }, []);

    useEffect(() => {
        // Update guestId when guestData is available
        if (guestData?.guest_id) {
            localStorage.setItem("guest_id", guestData.guest_id);
            guestId = guestData.guest_id;
        }
    }, [guestData]);
    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    // const businessLogo = global?.fav_icon
    const getValues = (settings) => ({
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme,
    })
    const { settings, saveSettings } = useSettings()
    const [values, setValues] = useState(getValues(settings))
    useEffect(() => {
        setValues(getValues(settings))
    }, [settings])
    const changeThemeMode = (e) => {
        if (e.target.checked) {
            localStorage.setItem('mode', 'light')
            setThemeMode('light')
            // saveSettings({ ...values, theme: 'light' })
        } else {
            localStorage.setItem('mode', 'dark')
            setThemeMode('dark')
            // saveSettings({ ...values, theme: 'dark' })
        }
        window.location.reload()
    }


    return (
        <NoSsr>
            <Card sx={{ borderRadius: "0px", zIndex: '99', position: 'relative' }}>
                <Toolbar sx={{ minHeight: "45px !important" }} disableGutters={true}>
                    <Container maxWidth="lg">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                borderRadius: '0',
                                paddingBlock: { xs: ".0rem", md: ".8rem" },
                                justifyContent: "space-between",

                            }}
                        >
                            <Stack
                                width="100%"
                                direction="row"
                                justifyContent="space-between"
                            >
                                <CustomStackForLoaction direction="row" spacing={2}>
                                    {global ?  <LogoSide
                                        global={global}
                                        width="auto"
                                        businessLogo={businessLogo}
                                    />:<Skeleton width="40px"/>}


                                    {/* {userLocation && ( */}
                                    <AddressReselect location={userLocation} userLocationUpdate={userLocationUpdate} />

                                </CustomStackForLoaction>
                                {!isSmall &&
                                    <Stack direction="row" spacing={2} justifyContent="end">
                                        <ThemeSwitches
                                            checked={theme_mode === 'light'}
                                            handleThemeChangeMode={changeThemeMode}
                                            themeMode={theme_mode}
                                        />

                                    </Stack>}
                            </Stack>
                            {isSmall && <DrawerMenu zoneid={zoneid} cartListRefetch={cartListRefetch} />}
                        </Box>
                    </Container>
                </Toolbar>
            </Card>
        </NoSsr>
    )
}
export default withTranslation()(TopNav)
