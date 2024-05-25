import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import RoomIcon from '@mui/icons-material/Room'
import { Paper, Stack, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import AddressReselectPopover from './AddressReselectPopover'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { setClearCart } from "@/redux/slices/cart"
import { styled, useTheme } from "@mui/material/styles";
import { useGeolocated } from "react-geolocated";
import { setOpenMapDrawer, setUserLocationUpdate } from "@/redux/slices/global"
import MapModal from "@/components/landingpage/google-map/MapModal";
export const AddressTypographyGray = styled(Typography)(({ theme }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
    maxWidth: '189px',
    marginInlineStart: '5px',
    wordBreak: 'break-all',
    color: theme.palette.neutral[1000],
    fontSize: "13px"
}))
const AddressReselect = ({ location }) => {
    const [mapOpen, setMapOpen] = useState(false)
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const { openMapDrawer, userLocationUpdate } = useSelector((state) => state.globalSettings)
    const [address, setAddress] = useState(null)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const anchorRef = useRef(null)

    useEffect(() => {
        if (address) {
            localStorage.setItem('location', address?.address)
            const values = { lat: address?.lat, lng: address?.lng }
            localStorage.setItem('currentLatLng', JSON.stringify(values))
            if (address.zone_ids && address.zone_ids.length > 0) {
                const value = [address.zone_ids]
                localStorage.setItem('zoneid', JSON.stringify(address.zone_ids))
                toast.success(t('New delivery address selected.'))
                handleClosePopover()
                dispatch(setClearCart())
                dispatch(setUserLocationUpdate(!userLocationUpdate))
                router.push('/home')
            }
        }
    }, [address])

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
            isGeolocationEnabled: true,
        })
    const handleClosePopover = () => {
        dispatch(setOpenMapDrawer(false))
        setMapOpen(false)
    }
    const handleClickToLandingPage = () => {
        if(router.pathname === '/'){
            setOpen(true)
        }else{
            dispatch(setOpenMapDrawer(true))
        }

    }
    // const handleOpen = () => setOpen(true)
    const handleModalClose=() => setOpen(false)
    const handleClose = () => {
        setOpen(false)
        if (router.pathname !== '/') {
            handleModalClose()
        }
    }

    return (
        <>{location ?
            <Stack
                sx={{
                    color: (theme) => theme.palette.neutral[1000],
                    cursor: 'pointer',
                }}
                direction="row"
                onClick={handleClickToLandingPage}
                ref={anchorRef}
                alignItems="center"
                spacing={0.5}
            >
                <RoomIcon
                    fontSize="small"
                    color="primary"
                    style={{ width: '16px', height: '16px' }}
                />
                <AddressTypographyGray
                    align="left"
                >
                    {location}
                </AddressTypographyGray>
                <KeyboardArrowDownIcon />
            </Stack> :
            <Stack
                direction="row"
                onClick={handleClickToLandingPage}
                alignItems="center"
                gap="5px"
                sx={{
                    cursor: 'pointer',
                    color: (theme) => theme.palette.neutral[1000],
                }}
            >
                <RoomIcon
                    fontSize="small"
                    color="primary"
                    style={{ width: '16px', height: '16px' }}
                />
                <AddressTypographyGray
                    align="left"
                >
                    {t("Select your location")}
                </AddressTypographyGray>
                <KeyboardArrowDownIcon />
            </Stack>
        }
            <AddressReselectPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openMapDrawer}
                t={t}
                address={address}
                setAddress={setAddress}
                mapOpen={mapOpen}
                // setUserLocationUpdate={setUserLocationUpdate}
                setMapOpen={setMapOpen}
                coords={coords}

            />
            {open && <MapModal open={open} handleClose={handleClose} />}
        </>
    )
}

AddressReselect.propTypes = {}

export default AddressReselect
