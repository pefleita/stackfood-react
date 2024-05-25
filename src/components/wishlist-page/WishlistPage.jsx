import React, { useState, useEffect } from 'react'
import { Box, Grid, Stack } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useWishListResDelete } from "@/hooks/react-query/config/wish-list/useWishListResDelete"
import { useDispatch, useSelector } from 'react-redux'
import { removeWishListRes } from "@/redux/slices/wishList"

import WishListShimmer from './WishListShimmer'
import WishListRestaurantCard from './WishListRestaurantCard'
import { useTranslation } from 'react-i18next'
import FoodOrRestaurant from '../products-page/FoodOrRestaurant'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { CustomPaperBigCard, NoDataFoundWrapper } from "@/styled-components/CustomStyles.style"
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@emotion/react'
import Meta from '../Meta'
import { noFoodFoundImage, noRestaurantsImage } from "@/utils/LocalImages"
import FoodCard from '../food-card/FoodCard'
import { setFoodOrRestaurant } from "@/redux/slices/searchFilter";

const WishlistPage = () => {
    const { foodOrRestaurant } = useSelector((state) => state.searchFilterStore)
    const theme = useTheme()
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const matches = useMediaQuery('(max-width:655px)')
    //const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const { wishLists } = useSelector((state) => state.wishList)

    const onSuccessHandlerForResDelete = (res) => {
        if (res) {
            dispatch(removeWishListRes(res))
        }
    }
    const { mutate: restaurantMutate } = useWishListResDelete(
        onSuccessHandlerForResDelete
    )
    const deleteWishlistRes = (id) => {
        restaurantMutate(id, {
            onSuccess: onSuccessHandlerForResDelete(id),
        })
    }

    useEffect(() => { }, [wishLists])

    return (
        <>
            {' '}
            <Meta
                title={` My Wish List-${global?.business_name}`}
                description=""
                keywords=""
            />
            <CustomPaperBigCard
                padding={isXSmall ? '10px 10px' : '30px 40px'}
                border={false}
                sx={{ minHeight: !isXSmall && '558px', boxShadow: isXSmall && 'unset' }}
            >
                <Box sx={{with:"100%"}}>
                    <FoodOrRestaurant
                        foodOrRestaurant={foodOrRestaurant}
                        setFoodOrRestaurant={setFoodOrRestaurant}
                    />
                    {wishLists ? (
                        <>
                            {foodOrRestaurant === 'products' && (
                                <>
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{ paddingBlockStart: '1rem' }}

                                    >
                                        {wishLists?.food?.map((product) => {
                                            return (
                                                <Grid
                                                    item
                                                    md={6}
                                                    sm={matches ? 12 : 6}
                                                    xs={12}
                                                    key={product?.id}
                                                >
                                                    <FoodCard
                                                        product={product}
                                                        inWishListPage="true"
                                                        productImageUrl={
                                                            global?.base_urls?.product_image_url
                                                        }
                                                        horizontal="true"
                                                        hasBackGroundSection="true"
                                                    />
                                                </Grid>
                                            )
                                        })}
                                        {wishLists?.food?.length === 0 && (
                                            <Stack alignItems="center" width="100%" justifyContent="center" minHeight="30vh" pt={{ xs: "40px", md: "110px" }}>
                                                <CustomEmptyResult
                                                    label='No Favourite Food Found'
                                                    image={noFoodFoundImage}
                                                    height={160}
                                                    width={160}
                                                />
                                            </Stack>
                                        )}
                                    </Grid>
                                </>
                            )}
                            {foodOrRestaurant === 'restaurants' && (
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{ paddingBlockStart: '1rem' }}
                                >
                                    {wishLists?.restaurant?.map(
                                        (restaurantItem) => {
                                            return (
                                                <Grid
                                                    item
                                                    md={6}
                                                    sm={6}
                                                    xs={12}
                                                >
                                                    <WishListRestaurantCard
                                                        key={
                                                            restaurantItem?.id
                                                        }
                                                        restaurant={
                                                            restaurantItem
                                                        }
                                                        deleteWishlistRes={
                                                            deleteWishlistRes
                                                        }
                                                        restaurantImageUrl={
                                                            global
                                                                ?.base_urls
                                                                ?.restaurant_image_url
                                                        }
                                                        rating={restaurantItem?.rating_count}
                                                    />
                                                </Grid>
                                            )
                                        }
                                    )}
                                    {wishLists?.restaurant?.length ===
                                        0 && (
                                            <Stack alignItems="center" width="100%" justifyContent="center" minHeight="30vh" pt={{ xs: "60px", md: "110px" }}>
                                                <CustomEmptyResult
                                                    label='No Favourite Restaurant Found'
                                                    image={noRestaurantsImage}
                                                    height={120}
                                                    width={120}
                                                />
                                            </Stack>

                                        )}
                                </Grid>
                            )}
                        </>
                    ) : (
                        <WishListShimmer />
                    )}
                </Box>
            </CustomPaperBigCard>
        </>
    )
}

export default WishlistPage
