import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { CircularProgress, IconButton, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import markerIcon from '../../../../public/static/markerIcon.png'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import Skeleton from '@mui/material/Skeleton'
import MapMarker from './MapMarker'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconWrapper, grayscaleMapStyles } from './Map.style'

const GoogleMapComponent = ({
    setDisablePickButton,
    setLocationEnabled,
    setLocation,
    setCurrentLocation,
    locationLoading,
    location,
    setPlaceDetailsEnabled,
    placeDetailsEnabled,
    locationEnabled,
    setPlaceDescription,
    height,
    isGps
}) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const containerStyle = {
        width: '100%',
        height: height ? height : isSmall ? '350px' : '400px',
        borderRadius: "10px",
        border: `1px solid ${theme.palette.neutral[300]}`
    }

    const mapRef = useRef(GoogleMap)
    const center = useMemo(
        () => ({
            lat: parseFloat(location?.lat),
            lng: parseFloat(location?.lng),
        }),
        []
    )
    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    )
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    })
    const [isMounted, setIsMounted] = useState(false)
    const [openInfoWindow, setOpenInfoWindow] = useState(false)
    const [mapSetup, setMapSetup] = useState(false)

    useEffect(() => setIsMounted(true), [])

    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(19)
    const [centerPosition, setCenterPosition] = useState(center)

    const onLoad = useCallback(function callback(map) {
        setZoom(19)
        setMap(map)
    }, [])
    useEffect(() => {
        if (location && placeDetailsEnabled) {
            setCenterPosition(location)
        }
        if (map?.center && mapSetup) {
            setCenterPosition({
                lat: map.center.lat(),
                lng: map.center.lng(),
            })
        }

        setIsMounted(true)
    }, [map, mapSetup, placeDetailsEnabled, location])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
        // setMapSetup(false)
    }, [])

    const handleZoomIn = () => {
        if (map && zoom <= 21) {
            setZoom((prevZoom) => Math.min(prevZoom + 1));
        }
    };

    const handleZoomOut = () => {
        if (map && zoom >= 1) {
            setZoom((prevZoom) => Math.max(prevZoom - 1));
        }
    };

    return isLoaded ? (
        <CustomStackFullWidth position="relative" className="map">
            <Stack position="absolute" zIndex={1} right="15px" bottom={isGps ? "18%" : "6%"} direction="column" spacing={1}>
                <IconWrapper padding={{ xs: "3px", sm: "5px" }} onClick={handleZoomIn} disabled={zoom > 21}>
                    <AddIcon color="primary" />
                </IconWrapper>
                <IconWrapper padding={{ xs: "3px", sm: "5px" }} onClick={handleZoomOut} disabled={zoom < 1}>
                    <RemoveIcon color="primary" />
                </IconWrapper>
            </Stack>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={centerPosition}
                onLoad={onLoad}
                zoom={zoom}
                onUnmount={onUnmount}
                onMouseDown={(e) => {
                    setMapSetup(true)
                    setDisablePickButton(true)
                }}
                onMouseUp={(e) => {
                    setMapSetup(false)
                    setDisablePickButton(false)
                    setLocationEnabled(true)
                    setLocation({
                        lat: map.center.lat(),
                        lng: map.center.lng(),
                    })
                    setCenterPosition({
                        lat: map.center.lat(),
                        lng: map.center.lng(),
                    })
                    setPlaceDetailsEnabled(false)
                    setPlaceDescription(undefined)
                }}
                onZoomChanged={() => {
                    if (map) {
                        setLocationEnabled(true)
                        setLocation({
                            lat: map.center.lat(),
                            lng: map.center.lng(),
                        })
                        setCenterPosition({
                            lat: map.center.lat(),
                            lng: map.center.lng(),
                        })
                    }
                }}
                options={{ ...options, styles: grayscaleMapStyles }}
            >
                {!locationLoading ? (
                    <Stack
                        style={{
                            zIndex: 3,
                            position: 'absolute',
                            marginTop: -63,
                            marginLeft: -32,
                            left: '50%',
                            top: '50%',
                        }}
                    >
                        <MapMarker width="60px" height="70px" />
                    </Stack>
                ) : (
                    <Stack
                        alignItems="center"
                        style={{
                            zIndex: 3,
                            position: 'absolute',
                            marginTop: -37,
                            marginLeft: -11,
                            left: '50%',
                            top: '50%',
                        }}
                    >
                        <CircularProgress />
                    </Stack>
                )}
            </GoogleMap>
        </CustomStackFullWidth>
    ) : (
        <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: '400px',
                [theme.breakpoints.down('sm')]: {
                    minHeight: '250px',
                },
            }}
        >
            <Skeleton
                width="100%"
                height="100%"
                variant="rectangular"
                animation="wave"
            />
        </CustomStackFullWidth>
    )
}

export default GoogleMapComponent
