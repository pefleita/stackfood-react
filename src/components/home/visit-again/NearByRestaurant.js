import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { onErrorResponse } from "../../ErrorResponse";
import { Grid, IconButton, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { RestaurantsApiNearBy } from "@/hooks/react-query/restaurants/getNearByRestaurants";
import AllNearbyRestaurants from "./AllNearbyRestaurants";
import MapComponentFindNear from "./MapComponentFindNear";
import { RTL } from "@/components/RTL/RTL";

const NearByRestaurant = () => {
    const theme = useTheme()
    const router = useRouter()
    const offset = 1
    const page_limit = 20
    const type = "all"
    const filterType = "all"
    const searchKey = ""
    let currentLocation = undefined;
    let languageDirection = undefined
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const seletedRestaurentRef = useRef(null);
    const [restaurants, setRestaurants] = useState(null)
    const [allRestaurants, setAllrestaurants] = useState(null)
    const [hoveredMarkerId, setHoveredMarkerId] = useState(null)
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    if (typeof window !== 'undefined') {
        currentLocation = JSON.parse(localStorage.getItem('currentLatLng'))
        //hostname = window.location.hostnam
    }
    const { isLoading, data, isError, error, refetch, isRefetching } = useQuery(
        ['all-restaurant', offset, page_limit],
        () =>
            RestaurantsApiNearBy.restaurants({
                offset,
                page_limit,
                type,
                filterType,
                searchKey,
            }),
        {
            onError: onErrorResponse,
            enabled: false,
            onSuccess: (fetchData) => {
                setRestaurants(fetchData?.data?.restaurants)
                setAllrestaurants(fetchData?.data?.restaurants)
            }
        }
    )
    const handleRouteToRestaurant = (restaurant) => {
        router.push({
            pathname: `/restaurant/[id]`,
            query: {
                id: `${restaurant?.slug ? restaurant?.slug : restaurant?.id}`,
                restaurant_zone_id: restaurant?.zone_id,
            },
        })
    }
    useEffect(async () => {
        await refetch()
    }, [])
    const customMapStyle = {
        width: '100%',
        height: isXSmall ? '55vh' : '65vh',
        borderRadius: isXSmall ? '0px' : "8px",
    }
    return (
        <RTL direction={languageDirection}>
            <Grid container>
                <Grid item xs={12} sm={6.5} md={7.5}>
                    <Stack borderRadius="8px">
                        <MapComponentFindNear
                            handleRouteToRestaurant={handleRouteToRestaurant}
                            latitude={currentLocation?.lat}
                            longitude={currentLocation?.lng}
                            data={restaurants}
                            customMapStyle={customMapStyle}
                            hoveredMarkerId={hoveredMarkerId}
                            setHoveredMarkerId={setHoveredMarkerId}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={5.5} md={4.5}>
                    <AllNearbyRestaurants
                        seletedRestaurentRef={seletedRestaurentRef}
                        isLoading={isRefetching}
                        restaurants={restaurants}
                        setRestaurants={setRestaurants}
                        hoveredMarkerId={hoveredMarkerId}
                        allRestaurants={allRestaurants}
                    />
                </Grid>
            </Grid>
        </RTL>

    );
};

export default NearByRestaurant;