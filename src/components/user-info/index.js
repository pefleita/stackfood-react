import React from 'react'
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style"
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import ProfileSideMenu from './ProfileSideMenu'
import ProfileBody from './ProfileBody'
import SideDRawerForProfile from './SideDrawer'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import ScrollerProvider from '../scroller-provider'
import { getToken } from '../checkout-page/functions/getGuestUserId'

const UserInfo = ({ page, orderId,setAttributeId }) => {
    const theme = useTheme();
    const token = getToken()
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <CustomStackFullWidth
            sx={{ paddingTop: { xs: "1.1rem", md: "66px" } }}
        >
            <Grid container spacing={2}>
                <Grid
                    container
                    item
                    sx={{
                        display: { sm: 'block', md: 'none' },
                        zIndex: 1155,

                    }}
                    alignItems="center"
                >
                    <SideDRawerForProfile page={page} setAttributeId={setAttributeId}/>
                </Grid>
                <Grid
                    item
                    xs={0}
                    sm={0}
                    md={token ? 3 : 0}
                    sx={{ display: { xs: 'none', md: 'block' }, paddingTop: "2px", }}
                    mb={isXs ? "20px" : "20px"}
                >
                    <ProfileSideMenu page={page} setAttributeId={setAttributeId} />
                </Grid>
                <Grid item xs={12} sm={12} md={token ? 9 : 12} mb={isXs ? "20px" : "20px"}>
                    {isXs ? (
                        <ProfileBody page={page} orderId={orderId} />
                    ) : (
                        <ProfileBody page={page} orderId={orderId} />
                    )

                    }
                </Grid>
            </Grid>
        </CustomStackFullWidth >
    )
}

export default UserInfo
