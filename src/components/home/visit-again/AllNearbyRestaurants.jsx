import CustomSearch from '@/components/custom-search/CustomSearch'
import LatestRestaurantCard from '@/components/restaurant-details/LatestRestaurantCard'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import { CircularProgress, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import SearchRestaurent from './SearchRestaurent'
import CustomEmptyResult from '@/components/empty-view/CustomEmptyResult'
import { noRestaurantsImage } from '@/utils/LocalImages'

const AllNearbyRestaurants = ({ restaurants, setRestaurants,allRestaurants, isLoading, hoveredMarkerId, seletedRestaurentRef }) => {
    const theme = useTheme();
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { global } = useSelector((state) => state.globalSettings)
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        if (hoveredMarkerId && seletedRestaurentRef.current) {
            const cardElement = document.getElementById(`restaurent-${hoveredMarkerId}`);
            if (cardElement) {
                cardElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
        }
    }, [hoveredMarkerId, seletedRestaurentRef]);

    const forSmallDevice = {
        height: "100%",
        width: "100%"
    }
    const forLargeDevice = {
        maxHeight: "55vh"
    }


    return (
        <CustomStackFullWidth padding={{ xs: "20px", sm: "10px 0 0 10px", md: "20px 0 0 20px" }} borderRadius="8px" gap="20px">
            <Stack pr={!isXSmall && "30px"}>
                <SearchRestaurent
                    restaurants={restaurants}
                    setRestaurants={setRestaurants}
                    allRestaurants={allRestaurants}
                />
            </Stack>
            {isLoading ? (
                <Stack alignItems="center" justifyContent="center" minHeight={isXSmall ? "210px" : "55vh"}>
                    <CircularProgress />
                </Stack>) : (
                <SimpleBar style={isXSmall ? forSmallDevice : forLargeDevice}>
                    <CustomStackFullWidth paddingBlock={isXSmall && "10px"} gap="20px" flexDirection={isXSmall ? 'row' : 'column'} ref={seletedRestaurentRef}>
                        {restaurants?.length === 0 ? (
                            <CustomStackFullWidth alignItems="center" justifyContent="center">
                                <CustomEmptyResult
                                    height="150px"
                                    width="150px"
                                    image={noRestaurantsImage}
                                    label="No Restaurants Found"
                                />
                            </CustomStackFullWidth>
                        ) : (
                            <>
                                {restaurants?.map((restaurantData) => (
                                    <LatestRestaurantCard
                                        key={restaurantData?.id}
                                        id={`restaurent-${restaurantData.id}`}
                                        image={restaurantData?.cover_photo}
                                        logo={restaurantData?.logo}
                                        name={restaurantData?.name}
                                        restaurantImageUrl={
                                            global?.base_urls
                                        }
                                        restaurantDiscount={
                                            restaurantData.discount &&
                                            restaurantData.discount
                                        }
                                        delivery_fee={
                                            restaurantData?.delivery_fee
                                        }
                                        open={restaurantData?.open}
                                        active={restaurantData?.active}
                                        delivery_time={
                                            restaurantData?.delivery_time
                                        }
                                        discount={restaurantData?.discount}
                                        cuisines={restaurantData?.cuisine}
                                        coupons={restaurantData?.coupons}
                                        slug={restaurantData?.slug}
                                        zone_id={restaurantData?.zone_id}
                                        distance={restaurantData?.distance}
                                        foods_count={restaurantData?.foods_count}
                                        hoveredMarkerId={hoveredMarkerId}
                                    />
                                ))}
                            </>
                        )
                        }
                    </CustomStackFullWidth>
                </SimpleBar>

            )}
        </CustomStackFullWidth>
    )
}

export default AllNearbyRestaurants