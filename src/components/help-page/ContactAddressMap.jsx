import React, { useMemo } from 'react'
import CustomModal from '../custom-modal/CustomModal'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import { CircularProgress, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import GoogleMapComponent from '../landingpage/google-map/GoogleMapComponent';
import { useGetLocation } from '../../utils/custom-hook/useGetLocation';
import { grayscaleMapStyles } from '../landingpage/google-map/Map.style';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import MapComponent from '../restaurant-details/google-address/MapComponent';
import { useSelector } from 'react-redux';

const ContactAddressMap = ({ open, setOpen }) => {
    const theme = useTheme()
    const { global } = useSelector((state) => state.globalSettings)
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const customMapStyle = {
        width: '100%',
        height: isSmall ? '80vh' : '60vh',
        borderRadius: "10px",
        border: `1px solid ${theme.palette.neutral[300]}`
    }
    const center = {
        lat: parseFloat(global?.default_location?.lat),
        lng: parseFloat(global?.default_location?.lng),
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    })
    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    )

    return (
        <CustomModal openModal={open} setModalOpen={setOpen} maxWidth={{ xs: "90%", md: "60vw" }}>
            <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ position: "relative" }}
            >
                <IconButton
                    onClick={() => setOpen(false)}
                    sx={{
                        zIndex: "99",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: (theme) => theme.palette.neutral[100],
                        borderRadius: "50%",
                        [theme.breakpoints.down("md")]: {
                            top: 0,
                            right: 0,
                        },
                    }}
                >
                    <CloseIcon sx={{ fontSize: "14px", fontWeight: "500" }} />
                </IconButton>
            </CustomStackFullWidth>
            <CustomStackFullWidth
                padding="10px"
                position="relative"
            >{isLoaded ? (
                <MapComponent
                    latitude={global?.default_location?.lat}
                    longitude={global?.default_location?.lng}
                    customMapStyle={customMapStyle}
                />
            ) : (
                <CircularProgress />
            )
                }
                <Stack
                    sx={{
                        backgroundColor: "background.paper",
                        position: "absolute",
                        right: "25px",
                        px: "20px",
                        py: "10px",
                        top: 20,
                        left: "25px",
                        my: "10px",
                    }}
                >
                    <Typography fontSize="14px" color={theme.palette.neutral[1000]}>
                        {global?.address}
                    </Typography>
                </Stack>
            </CustomStackFullWidth>

        </CustomModal>
    )
}

export default ContactAddressMap