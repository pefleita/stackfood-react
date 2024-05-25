import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Box, CircularProgress, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import { t } from "i18next";
import { IconWrapper, grayscaleMapStyles } from '@/components/landingpage/google-map/Map.style';
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NearMeIcon from '@mui/icons-material/NearMe';
import MapMarker from "@/components/landingpage/google-map/MapMarker";
import RestaurantMarker from "@/components/restaurant-details/RestaurantMarker";
import DeliveryManMarker from "@/components/restaurant-details/google-address/DeliveryManMarker";
import { useGeolocated } from 'react-geolocated';
import { useGetLocation } from '@/utils/custom-hook/useGetLocation';
import CustomMapSearch from '@/components/join-restaurant/CustomMapSearch';
import CustomerLocationPin from '@/assets/images/location-pins/CustomerLocationPin';
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "@/redux/slices/addressData";

const containerStyle = {
    width: '100%',
    height: '250px',
};

const MapComponentFindNear = ({
    latitude,
    longitude,
    data,
    handleRouteToRestaurant,
    customMapStyle,
    resLat,
    resLong,
    hoveredMarkerId,
    setHoveredMarkerId
}) => {
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [openUserMsg, setOpenUserMsg] = useState(false);
    const dispatch = useDispatch()
    const theme = useTheme();
    const { location } = useSelector((state) => state.addressData)
    const { userLocationUpdate } = useSelector((state) => state.globalSettings)
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [userLocation, setUserLocation] = useState({ lat: location?.lat, lng: location?.lng })
    // useEffect(() => {
    //     setUserLocation({ lat: location?.lat, lng:  location?.lng })
    // }, [ location?.lng,location?.lat])
    const {

        searchKey,
        setSearchKey,
        setEnabled,
        placeDetailsEnabled,
        setPlaceDetailsEnabled,
        placeDescription,
        setPlaceDescription,
        predictions,
        setPlaceId,
        setLocations,
        isLoadingPlacesApi,
        currentLocationValue,
        value
    } = useGetLocation(coords);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
            isGeolocationEnabled: true,
        });
    const handleAgreeLocation = () => {
        if (coords) {
            setUserLocation({ lat: coords?.latitude, lng: coords?.longitude })
        }
    }
    const center = {
        lat: parseFloat(userLocation?.lat),
        lng: parseFloat(userLocation?.lng),
    };
    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    );
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    });



    const onLoad = useCallback(function callback(map) {
        setZoom(10);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

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

    const handleSearchLocation = (lat, lng) => {
        setUserLocation({ lat, lng });
    };
    useEffect(() => {
        setUserLocation({ lat: location?.lat, lng: location?.lng })
    }, [location])

    useEffect(() => {
        dispatch(setLocation({
            lat: latitude, lng: longitude
        }
        ))
    }, [])

    return isLoaded ? (
        <CustomStackFullWidth position="relative" className="map">
            <Stack position="absolute" zIndex={1} bottom="20px" left="20px" direction="column" spacing={1}>
                <Stack sx={{ backgroundColor: theme.palette.neutral[1800], borderRadius: "50%" }}>
                    <IconButton onClick={handleAgreeLocation}>
                        <GpsFixedIcon color="primary" />
                    </IconButton>
                </Stack>
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
            <CustomStackFullWidth position="absolute" zIndex={1} top={isXSmall ? "50px" : "20px"} paddingInline="20px" spacing={1}>
                <CustomMapSearch
                    setSearchKey={setSearchKey}
                    setEnabled={setEnabled}
                    predictions={predictions}
                    setPlaceId={setPlaceId}
                    setPlaceDetailsEnabled={
                        setPlaceDetailsEnabled
                    }
                    setPlaceDescription={setPlaceDescription}
                    border={theme.palette.primary.main}
                    searchKey={searchKey}
                    placeDescription={placeDescription}
                    isLoadingPlacesApi={isLoadingPlacesApi}
                    currentLocationValue={currentLocationValue}
                />
            </CustomStackFullWidth>
            <GoogleMap
                mapContainerStyle={customMapStyle ? customMapStyle : containerStyle}
                center={center}
                onLoad={onLoad}
                zoom={zoom}
                onUnmount={onUnmount}
                options=
                {{
                    ...options,
                    styles: grayscaleMapStyles
                }}
            >
                <Marker
                    key={`user`}
                    position={{
                        lat: parseFloat(userLocation?.lat),
                        lng: parseFloat(userLocation?.lng),
                    }}
                    icon={{
                        url: 'static/location-pins/customer_location_icon.svg',
                        scaledSize: new window.google.maps.Size(55, 55),
                    }}
                    onClick={() => setOpenUserMsg(!openUserMsg)}
                >
                    {openUserMsg && (
                        <InfoWindow
                            position={{
                                lat: parseFloat(userLocation?.lat),
                                lng: parseFloat(userLocation?.lng),
                            }}
                            pixelOffset={new window.google.maps.Size(0, -30)} >
                            <Box
                                sx={{
                                    color: theme.palette.neutral[800],
                                    svg: { color: theme.palette.primary.main },

                                }}
                            >
                                <Box width="0" flexGrow="1" sx={{ cursor: "pointer" }}>
                                </Box>
                                <Stack direction="row" gap={1} mb={1} >
                                    <Box width="0" flexGrow="1" sx={{ cursor: "pointer" }}>
                                        <Typography>{t("We will deliver here")}</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </InfoWindow>)}
                </Marker>
                {data?.length > 0 ? (
                    data.map((restaurant) => (
                        <Marker
                            key={`${restaurant.name}-${parseFloat(restaurant.latitude)}-${parseFloat(restaurant.longitude)}`}
                            position={{
                                lat: parseFloat(restaurant.latitude),
                                lng: parseFloat(restaurant.longitude),
                            }}
                            icon={{
                                url: 'static/location-pins/restaurant_location_icon.svg',
                                scaledSize: hoveredMarkerId === `restaurent-${restaurant.id}` ? new window.google.maps.Size(60, 60) : new window.google.maps.Size(45, 45),
                            }}
                            onClick={() => setHoveredMarkerId(`restaurent-${restaurant.id}`)}
                        >
                            {hoveredMarkerId === `restaurent-${restaurant.id}` && (
                                <InfoWindow
                                    position={{
                                        lat: parseFloat(restaurant.latitude),
                                        lng: parseFloat(restaurant.longitude),
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
                                                {restaurant.name}{" "}
                                                <Box component="small" color="primary.main">
                                                    ({(restaurant.distance / 1000).toFixed(2)}km {t("away")})
                                                </Box>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" gap={1} fontSize="0.75rem">
                                            <Box width="0" flexGrow="1">
                                                {restaurant.address}
                                            </Box>
                                        </Stack>
                                    </Box>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))
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
        </CustomStackFullWidth >
    ) : (
        <CircularProgress />
    )
}

export default MapComponentFindNear;