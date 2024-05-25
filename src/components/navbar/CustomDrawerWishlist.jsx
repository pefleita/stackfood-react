import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { t } from 'i18next'
import { RTL } from '../RTL/RTL'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import CloseIcon from "@mui/icons-material/Close";
import FoodOrRestaurant from '../products-page/FoodOrRestaurant'
import { setFoodOrRestaurant } from '@/redux/slices/searchFilter'
import FoodCard from '../food-card/FoodCard'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { noFoodFoundImage, noRestaurantsImage } from '@/utils/LocalImages'
import WishListRestaurantCard from '../wishlist-page/WishListRestaurantCard'
import { useWishListResDelete } from '@/hooks/react-query/config/wish-list/useWishListResDelete'
import CustomSideDrawer from '../side-drawer/CustomSideDrawer'
import { removeWishListRes } from '@/redux/slices/wishList'

const CustomDrawerWishlist = (props) => {
    const { openWishlistModal, setOpenWishlistModal } = props; 
    const dispatch = useDispatch()
    const theme = useTheme()
    const { foodOrRestaurant } = useSelector((state) => state.searchFilterStore)
    const { global, token } = useSelector((state) => state.globalSettings)
    const { wishLists } = useSelector((state) => state.wishList)
    const languageDirection = localStorage.getItem('direction')
    const handleCloseModal = () => {
        setOpenWishlistModal(!openWishlistModal)
    }
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
    return (
        <RTL direction={languageDirection}>
            <Drawer
                anchor="right"
                open={openWishlistModal}
                onClose={handleCloseModal}
                sx={{ zIndex: theme.zIndex.appBar + 10, }}
            >
                <CustomStackFullWidth>
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            zIndex: "99",
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: (theme) => theme.palette.neutral[100],
                            borderRadius: "50%",
                        }}
                    >
                        <CloseIcon sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" }, fontWeight: "500" }} />
                    </IconButton>
                    <Stack alignItems="center" gap="20px" padding={{xs:"20px 15px",sm:"40px 30px"}} width={{ xs: "90vw", sm: "490px" }}>
                        <Typography fontSize="16px" fontWeight={700}>{t("Wishlist")}</Typography>
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
                                            item
                                            md={12}
                                            xs={12}
                                            spacing={2}
                                            sx={{ paddingBlockStart: '1rem' }}
                                            justifyContent="center"
                                        >
                                            {wishLists?.food?.map((product) => {
                                                return (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        key={product?.id}
                                                    >
                                                        <FoodCard
                                                            product={product}
                                                            inWishListPage="true"
                                                            inWishListModal="true"
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
                                                <Stack minHeight="30vh" pt={{ xs: "40px", md: "110px" }}>
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
                                        item
                                        md={12}
                                        xs={12}
                                        spacing={2}
                                        sx={{ paddingBlockStart: '1rem' }}
                                        justifyContent="center"
                                    >
                                        {wishLists?.restaurant?.map(
                                            (restaurantItem) => {
                                                return (
                                                    <Grid
                                                        item
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
                                                        />
                                                    </Grid>
                                                )
                                            }
                                        )}
                                        {wishLists?.restaurant?.length ===
                                            0 && (
                                                <Stack minHeight="30vh" pt={{ xs: "60px", md: "110px" }}>
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
                    </Stack>
                </CustomStackFullWidth>
            </Drawer>
        </RTL>
    )
}
export default CustomDrawerWishlist