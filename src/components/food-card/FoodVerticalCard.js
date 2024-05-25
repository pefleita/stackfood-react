import React, { useState } from 'react'
import { CustomFoodCard, CustomFoodCardNew } from './FoodCard.style'
import { Chip, IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import ProductCardMedia from './ProductCardMedia'
import VagSvg from '../foodDetail-modal/VagSvg'
import { Stack } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { CustomTypographyGray } from '../error/Errors.style'
import StartPriceView from '../foodDetail-modal/StartPriceView'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { useSelector } from 'react-redux'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'
import AfterAddToCart from './AfterAddToCart'
import { HomeTextTypography } from '../home/HomeStyle'
import { getReviewCount } from '../../utils/customFunctions'
import FoodRating from './FoodRating'
import { t } from 'i18next'
import HalalSvg from "@/components/food-card/HalalSvg";
const FoodVerticalCard = (props) => {
    const {
        product,
        setOpenModal,
        productImageUrl,
        handleFoodDetailModal,
        deleteWishlistItem,
        isInList,
        addToFavorite,
        imageUrl,
        handleBadge,
        addToCart,
        isInCart,
        getQuantity,
        incrOpen,
        setIncrOpen,
        handleClickQuantityButton,
        hasBackGroundSection,
        isRestaurantDetails,
        horizontal
    } = props

    const [isTransformed, setIstransformed] = useState(false);
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <CustomFoodCardNew
            maxwidth="250px"
            onClick={(e) => handleFoodDetailModal(e)}
            onMouseEnter={() =>
                setIstransformed(true)
            }
            onMouseDown={() =>
                setIstransformed(true)
            }
            onMouseLeave={() =>
                setIstransformed(false)}
            background={
                hasBackGroundSection === 'true'
                    ? theme.palette.cardBackground1
                    : theme.palette.cardBackground2
            }
        >
            <CustomStackFullWidth  >
                <ProductCardMedia
                    id={product?.id}
                    onClick={handleFoodDetailModal}
                    available_time_starts={product?.available_time_starts}
                    available_time_ends={product?.available_time_ends}
                    available_date_ends={product?.available_date_ends}
                    imageUrl={imageUrl}
                    alt={product?.name}
                    addToFavorite={addToFavorite}
                    isInList={isInList}
                    deleteWishlistItem={deleteWishlistItem}
                    handleBadge={handleBadge}
                    product={product}
                    isInCart={isInCart}
                    getQuantity={getQuantity}
                    setIncrOpen={setIncrOpen}
                    handleClickQuantityButton={handleClickQuantityButton}
                    addToCart={addToCart}
                    isTransformed={isTransformed}
                    incrOpen={incrOpen}
                    isRestaurantDetails={isRestaurantDetails}
                    rating_count={product?.rating_count}
                    horizontal={horizontal}
                />
                <CustomStackFullWidth sx={{ padding: '5px' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap="5px"
                        sx={{ position: 'relative' }}
                    >
                        <Stack flexDirection="row" alignItems="center" gap="5px">
                            <Typography
                                fontSize="13px"
                                fontWeight="500"
                                maxWidth={{xs:"120px", sm: "130px", md:"150px"}}
                                noWrap
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                color={theme.palette.neutral[1200]}
                            >
                                {product?.name}
                            </Typography>
                            {/* <Typography fontSize={{ xs: "13px", sm: "14px", md: "15px" }} fontWeight={500} whiteSpace="nowrap">
                                {product?.name.length > 13 ? `${product?.name.slice(0, 13)}... ` : product?.name}
                            </Typography> */}
                            <VagSvg
                                color={
                                    Number(product?.veg) === 0
                                        ? theme.palette.nonVeg
                                        : theme.palette.success.light
                                }
                            />
                            {product?.halal_tag_status===1 && product?.is_halal===1 &&  <Tooltip arrow title={t("This is a halal food")}>
                                <IconButton sx={{padding:"0px"}}>
                                    <HalalSvg/>
                                </IconButton>
                            </Tooltip>}

                        </Stack>

                    </Stack>
                    <Stack flexDirection="row" gap="5px" marginTop="2px" marginBottom="2px">
                        <Typography
                            fontSize={{ xs: "12px", md: "14px" }}
                            fontWeight={400}
                            color={theme.palette.text.secondary}
                        >
                            {getReviewCount(product?.rating_count)}
                        </Typography>
                        {((product?.avg_rating !== 0 && isRestaurantDetails && !isSmall) || (!isRestaurantDetails && product?.avg_rating !== 0)) ? <FoodRating product_avg_rating={product?.avg_rating} /> : ""}
                    </Stack>
                    <StartPriceView
                        data={product}
                        handleBadge={handleBadge}
                        available_date_ends={product?.available_date_ends}
                    />
                    {/* </Stack> */}
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </CustomFoodCardNew>
    )
}

export default FoodVerticalCard
