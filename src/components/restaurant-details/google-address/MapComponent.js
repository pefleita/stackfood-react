import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Box, CircularProgress, Divider, IconButton, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import { t } from "i18next";
import { IconWrapper, grayscaleMapStyles } from '@/components/landingpage/google-map/Map.style';
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NearMeIcon from '@mui/icons-material/NearMe';
import MapMarker from "@/components/landingpage/google-map/MapMarker";
import RestaurantMarker from "@/components/restaurant-details/RestaurantMarker";
import DeliveryManMarker from "@/components/restaurant-details/google-address/DeliveryManMarker";

const containerStyle = {
    width: '100%',
    height: '250px',
}

const MapComponent = ({ latitude, longitude, data, handleRouteToRestaurant, customMapStyle ,resLat,resLong,isRestaurant}) => {
    const theme = useTheme()
    const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    }
    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    )
    const [isMounted, setIsMounted] = useState(false)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    })

    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(15)
    const [hoveredMarkerId, setHoveredMarkerId] = useState(null)

    const onLoad = useCallback(function callback(map) {
        setZoom(15)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        if (map) {
            setIsMounted(true)
        }
    }, [map])

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
            <Stack position="absolute" zIndex={1} bottom="20px" left="20px" direction="column" spacing={1}>
                <Stack sx={{ backgroundColor: theme.palette.neutral[1800], borderRadius: "8px" }}>
                    <IconButton onClick={handleZoomIn}>
                        <AddIcon sx={{ color: theme.palette.neutral[1000] }} />
                    </IconButton>
                    <Divider variant="middle" sx={{ backgroundColor: "red", marginInline: "8px" }} />
                    <IconButton onClick={handleZoomOut}>
                        <RemoveIcon sx={{ color: theme.palette.neutral[1000] }} />
                    </IconButton>
                </Stack>
            </Stack>
            <GoogleMap
                mapContainerStyle={customMapStyle ? customMapStyle : containerStyle}
                center={center}
                onLoad={onLoad}
                zoom={zoom}
                onUnmount={onUnmount}
                options={{ ...options, styles: grayscaleMapStyles }}
            >
                {data?.length > 0 ? <>
                    {data?.map((restaurant) => (
                        <MarkerF
                            key={`${name}-${parseFloat(latitude)}-${parseFloat(
                                longitude
                            )}
                    `}
                            position={{
                                lat: parseFloat(restaurant?.latitude),
                                lng: parseFloat(restaurant?.longitude),
                            }}
                            icon={{
                                url: 'static/location-pins/restaurant_location_icon.svg',
                                scale: 7,
                            }}
                            onClick={() => setHoveredMarkerId(restaurant?.id)}
                        >
                            {hoveredMarkerId === restaurant?.id && (
                                <InfoWindowF
                                    position={{
                                        lat: parseFloat(restaurant?.latitude),
                                        lng: parseFloat(restaurant?.longitude),
                                    }}
                                    pixelOffset={new window.google.maps.Size(0, -30)} >
                                    <Box
                                        sx={{
                                            color: theme.palette.neutral[800],
                                            svg: { color: theme.palette.primary.main },

                                        }}
                                        onClick={() => handleRouteToRestaurant(restaurant)}

                                    >
                                        <Stack direction="row" gap={1} mb={1} >
                                            <Box width="0" flexGrow="1" sx={{ cursor: "pointer" }}>
                                                {restaurant?.name}{" "}
                                                <Box component="small" color="primary.main">
                                                    ({(restaurant?.distance / 1000).toFixed(2)}km {t("away")})
                                                </Box>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" gap={1} fontSize="0.75rem">
                                            <Box width="0" flexGrow="1">
                                                {restaurant?.address}
                                            </Box>
                                        </Stack>
                                    </Box>
                                </InfoWindowF>
                            )}
                        </MarkerF>
                    ))}
                </> : <> {isMounted ? (
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
                        <>
                        {
                          isRestaurant ?(
                              <Marker position={{ lat: latitude, lng: longitude }}>
                                  <RestaurantMarker width="60px" height="70px"  />
                              </Marker>
                          ):(
                              <Marker position={{ lat: latitude, lng: longitude }}>
                                  <MapMarker width="60px" height="70px"  />
                              </Marker>
                          )
                        }

                            {resLat && resLong && (
                                    <Marker position={{ lat: resLat, lng:resLong}}>
                                        <DeliveryManMarker width="60px" height="70px" />
                                    </Marker>
                                )}

                        </>
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
                )}</>}

            </GoogleMap>
        </CustomStackFullWidth>
    ) : (
        <CircularProgress />
    )
}

export default MapComponent
