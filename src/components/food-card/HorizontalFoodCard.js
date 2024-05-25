import React, { useState } from 'react'
import {
    CustomFavICon,
    CustomFoodCard,
    CustomFoodCardNew,
} from './FoodCard.style'
import { Box, Stack } from '@mui/system'
import CustomImageContainer from '../CustomImageContainer'
import test_image from '../../../public/static/testImage.svg'
import { IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import VagSvg from '../foodDetail-modal/VagSvg'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
    CustomOverlayBox,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import {
    getAmount,
    getConvertDiscount,
    getReviewCount,
    isAvailable,
} from '../../utils/customFunctions'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StartPriceView from '../foodDetail-modal/StartPriceView'
import FoodDetailModal from '../foodDetail-modal/FoodDetailModal'
import { RTL } from '../RTL/RTL'
import { t } from 'i18next'
import FoodRating from './FoodRating'
import { CustomTypographyEllipsis } from '../../styled-components/CustomTypographies.style'
import FoodCardIncrementAndDecrement from './FoodCardIncrementAndDecrement'
import AfterAddToCart from './AfterAddToCart'
import CartClearModal from '../foodDetail-modal/CartClearModal'
import CircularLoader from "../loader/CircularLoader";
import { useSelector } from 'react-redux'
import StarIcon from '@mui/icons-material/Star';
import CustomPopover from '../custom-popover/CustomPopover'
import CustomPopoverWithItem from '../custom-popover/CustomPopoverWithItem'
import WishListImage from '../../assets/images/WishListImage'
import DeleteIcon from '../../assets/images/icons/DeleteIcon'
import HalalSvg from "@/components/food-card/HalalSvg";

const HorizontalFoodCard = (props) => {
    const {
        setOpenModal,
        product,
        imageUrl,
        isInList,
        languageDirection,
        addToFavorite,
        deleteWishlistItem,
        available_time_starts,
        available_time_ends,
        handleFoodDetailModal,
        handleBadge,
        addToCart,
        isInCart,
        getQuantity,
        incrOpen,
        setIncrOpen,
        handleClickQuantityButton,
        addToCartLoading,
        isRestaurantDetails,
        inWishListPage = "false",
        horizontal
    } = props
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const { global } = useSelector((state) => state.globalSettings)
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const handleClick = (e) => {
        deleteWishlistItem(product?.id, e)
    }
    const handleClickDelete = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
    };
    return (
        <>
            <RTL direction={languageDirection}>
                <CustomFoodCardNew
                    horizontal
                    onClick={handleFoodDetailModal}
                    background={theme.palette.cardBackground1}
                    width="100%"
                >
                    <Stack
                        direction="row"
                        spacing={1.5}
                        width="100%"
                        sx={{ overflow: 'hidden' }}
                    >
                        <Stack
                            position="relative"
                            sx={{
                                transition: `${theme.transitions.create(
                                    ['background-color', 'transform'],
                                    {
                                        duration:
                                            theme.transitions.duration.standard,
                                    }
                                )}`,
                                marginLeft: languageDirection === "rtl" && ".8rem !important",
                                '&:hover': {
                                    transform: 'scale(1.04)',
                                }
                            }}
                        >
                            <CustomImageContainer
                                src={imageUrl}
                                width="115px"
                                smWidth="95px"
                                smHeight="95px"
                                height="95px"
                                borderRadius="3px"
                                objectFit="cover"
                            />

                            {!isAvailable(
                                available_time_starts,
                                available_time_ends
                            ) ? (
                                <CustomOverlayBox>
                                    <Typography align="center" variant="h5">
                                        {t('Not Available now')}
                                    </Typography>
                                </CustomOverlayBox>
                            ) : (
                                <Stack
                                    position="absolute"
                                    top="10%"
                                    left="0"
                                    zIndex="1"
                                >
                                    {handleBadge(
                                        product,
                                        currencySymbol,
                                        currencySymbolDirection,
                                        digitAfterDecimalPoint,
                                        product?.available_date_ends
                                    )}
                                </Stack>
                            )}
                        </Stack>
                        <Stack gap="7px" width="100%" >
                            <Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    flexWrap="wrap"
                                    spacing={0.5}
                                >
                                    <Typography
                                        fontSize="14px"
                                        fontWeight="500"
                                        maxWidth="120px"
                                        noWrap
                                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        color={theme.palette.neutral[1200]}
                                    >
                                        {product?.name}
                                    </Typography>
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
                                <Typography
                                    variant="subtitle2"
                                    fontSize="12px"
                                    fontWeight={400}
                                    color={theme.palette.neutral[400]}
                                    mt="-3px"
                                >
                                    {product?.restaurant_name}
                                </Typography>
                            </Stack>
                            <Stack flexDirection="row" gap="5px" >
                                <Typography
                                    fontSize={{ xs: "12px", md: "14px" }}
                                    fontWeight={400}
                                    color={theme.palette.text.secondary}
                                >
                                    {getReviewCount(product?.rating_count)}
                                </Typography>
                                {
                                    ((product?.avg_rating !== 0 && isRestaurantDetails && !isSmall) ||
                                        (!isRestaurantDetails && product?.avg_rating !== 0)) ? (
                                        <FoodRating product_avg_rating={product?.avg_rating} />) :
                                        ("")
                                }
                            </Stack>

                            <StartPriceView
                                data={product}
                                hideStartFromText="true"
                                handleBadge={handleBadge}
                            />
                        </Stack>

                        <Stack
                            justifyContent="space-between"
                            alignItems=" flex-end"
                        >
                            {!product?.available_date_ends && (
                                <>
                                    {!isInList(product.id) ? (
                                        <IconButton
                                            onClick={(e) => addToFavorite(e)}
                                            sx={{ padding: '3px' }}
                                        >
                                            <FavoriteBorderIcon color="primary" />
                                        </IconButton>
                                    ) : (
                                        <>{inWishListPage === "true" ? (
                                            <IconButton
                                                onClick={handleClickDelete}
                                                sx={{ padding: '3px' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        ) : (

                                            <IconButton
                                                onClick={(e) => deleteWishlistItem(product.id, e)}
                                                sx={{ padding: '3px' }}
                                            >
                                                <FavoriteIcon color="primary" />
                                            </IconButton>
                                        )

                                        }

                                        </>
                                    )}
                                </>
                            )}
                            {!isInCart && (
                                <IconButton
                                    onClick={(e) => addToCart(e)}
                                    sx={{ padding: '3px' }}
                                >
                                    {addToCartLoading ? <CircularLoader size="20px" /> : <AddShoppingCartIcon color="primary" />}

                                </IconButton>
                            )}
                            {isInCart && !incrOpen && (
                                <AfterAddToCart
                                    isInCart={isInCart}
                                    product={product}
                                    getQuantity={getQuantity}
                                    handleClickQuantityButton={
                                        handleClickQuantityButton
                                    }
                                    setIncrOpen={setIncrOpen}
                                    incrOpen={incrOpen}
                                    addToCartLoading={addToCartLoading}
                                    horizontal={horizontal}
                                />
                            )}
                        </Stack>
                    </Stack>
                    <Box
                        position="relative"
                        width="100%"
                        sx={{
                            width: {
                                xs: 'calc(100% - 85px)',
                                sm: 'calc(100% - 130px)',
                            },
                            marginInlineStart: 'auto',
                        }}
                    >
                        {isInCart && incrOpen && (
                            <AfterAddToCart
                                isInCart={isInCart}
                                product={product}
                                getQuantity={getQuantity}
                                handleClickQuantityButton={
                                    handleClickQuantityButton
                                }
                                setIncrOpen={setIncrOpen}
                                incrOpen={incrOpen}
                                position="-30px"
                                horizontal={horizontal}
                            />
                        )}
                    </Box>
                </CustomFoodCardNew>
            </RTL >
            <CustomPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                maxWidth="421px"
                padding="20px 35px 25px"
            >
                <CustomPopoverWithItem
                    icon={<WishListImage />}
                    deleteItem={handleClick}
                    handleClose={handleClose}
                    confirmButtonText="Yes , Remove"
                    cancelButtonText="Cancel"
                    title="Remove this food"
                    subTitle="Want to remove this food your favourite list ?"
                />

            </CustomPopover>
        </>
    )
}

export default HorizontalFoodCard
