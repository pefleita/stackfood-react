import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style";
import CustomMapSearch from "../join-restaurant/CustomMapSearch";
import GoogleMapComponent from "../landingpage/google-map/GoogleMapComponent";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { useGetLocation } from "@/utils/custom-hook/useGetLocation";
import { setLocation } from "@/redux/slices/addressData";

const MapWithSearch = ({ orderType, padding, coords, mapHeight, rerenderMap, isGps }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const { global } = useSelector((state) => state.globalSettings)
    const { location, formatted_address } = useSelector((state) => state.addressData)
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const {
        setDisablePickButton,
        locationEnabled,
        setLocationEnabled,
        searchKey,
        setSearchKey,
        setEnabled,
        placeDetailsEnabled,
        setPlaceDetailsEnabled,
        placeDescription,
        setPlaceDescription,
        predictions,
        setPlaceId,
        setLocations, isLoadingPlacesApi,
        currentLocationValue } = useGetLocation(coords);
    let currentLocation = undefined;
    if (typeof window !== 'undefined') {
        currentLocation = JSON.parse(localStorage.getItem('currentLatLng'))
        //hostname = window.location.hostnam
    }
    return (

        <CustomStackFullWidth
            spacing={1}
            gap="12px"
        >
            {orderType !== "take_away" &&
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
                />}

            {!!location && orderType !== "take_away" && (
                <GoogleMapComponent
                    key={rerenderMap}
                    setLocation={setLocations}
                    location={location}
                    setPlaceDetailsEnabled={
                        setPlaceDetailsEnabled
                    }
                    placeDetailsEnabled={
                        placeDetailsEnabled
                    }
                    locationEnabled={locationEnabled}
                    setPlaceDescription={
                        setPlaceDescription
                    }
                    setLocationEnabled={setLocationEnabled}
                    setDisablePickButton={
                        setDisablePickButton
                    }
                    height={isSmall ? mapHeight : "448px"}
                    isGps={isGps}

                />
            )}
        </CustomStackFullWidth>

    );
};

export default MapWithSearch;
