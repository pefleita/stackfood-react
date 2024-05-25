import React, { useState } from "react";
import { alpha, Button, Grid, Stack, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import Link from 'next/link'

import {
    ButtonTypography,
    DateTypography,
    OrderAmountTypography,
    OrderBox,
    OrderIdTypography,
    PendingButton,
    SuccessButton,
    TrackButton,
    TrackhButton,
} from './OrderHistory.style'
import { getAmount, getDateFormat } from "@/utils/customFunctions"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import CustomFormatedDateTime from '../date/CustomFormatedDateTime'
import CustomImageContainer from '../CustomImageContainer'
import { Box } from '@mui/system'
import {
    setDeliveryManInfoByDispatch,
    setOrderDetailsByDispatch,
} from "@/redux/slices/searchFilter"
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import startReview from '../../../public/static/star-review.png'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { getToken } from '../checkout-page/functions/getGuestUserId'
import Reorder from '../order-details/Reorder'
import ReviewSideDrawer from "@/components/order-details/ReviewSideDrawer";
const OrderCard = ({ order, index, isXs, offset, limit }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const theme = useTheme()
    const [openReviewModal, setOpenReviewModal] = useState(false)
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { global } = useSelector((state) => state.globalSettings)
    const restaurantImage = global?.base_urls?.restaurant_image_url
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const dispatch = useDispatch()
    const handleClick = () => {
        if (order?.delivery_man) {
            dispatch(setDeliveryManInfoByDispatch(order?.delivery_man))
        }
        router.push(
            { pathname: "/info", query: { page: "order", orderId:order?.id } },
            undefined,
            { shallow: true }
        );
       
    }
    const serialNumber = (offset - 1) * limit + index + 1
    const handleClickTrackOrder = () => {
        if (order?.delivery_man) {
            dispatch(setDeliveryManInfoByDispatch(order?.delivery_man))
        }
        router.push({
            pathname: '/info',
            query: {
                page:"order",
                orderId:order?.id ,
                isTrackOrder:true

            },
        })
    }
    const handleRateButtonClick = () => {
        dispatch(setDeliveryManInfoByDispatch(order?.delivery_man))
        setOpenReviewModal(true)
    }
    const deliveredInformation = () => (
        <Stack flexDirection="row" gap="20px" justifyContent="flex-end" pt={{ xs: "10px", sm: "0px", md: "0px" }}>
            <Button
                onClick={() => handleRateButtonClick()}
                variant="outlined"
                sx={{
                    p: {
                        xs: '5px',
                        sm: '5px',
                        md: '6px',
                    },
                }}
            >
                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                    gap={{ xs: "5px", sm: "6px", md: "10px" }}
                    flexWrap="wrap"
                >
                    <CustomImageContainer
                        src={startReview.src}
                        width={{ xs: "15px", md: "20px" }}
                        height={{ xs: "15px", md: "20px" }}
                    />
                    <CustomColouredTypography color="primary" fontWeight={600} fontSize="14px" smallFont="12px">
                        {t('Give Review')}
                    </CustomColouredTypography>
                </Stack>
            </Button>
            {/*{(global?.repeat_order_option && getToken()) && (*/}

            {/*    <Reorder*/}
            {/*        // orderData={data?.data?.details}*/}
            {/*        orderZoneId={order?.restaurant?.zone_id}*/}
            {/*    />*/}
            {/*)}*/}
        </Stack>
    )
    const notDeliveredInformation = () => (
        <Stack
            spacing={1}
            // alignItems={{ xs: 'flex-end', md: 'center' }}
            alignItems='flex-end'
        >
            {order?.order_status !== 'delivered' &&
                order?.order_status !== 'failed' &&
                order?.order_status !== 'canceled' &&
                order?.order_status !== 'refund_requested' &&
                order?.order_status !== 'refunded' && (
                    <Stack flexWrap="wrap">
                        <TrackButton
                            size="small"
                            onClick={() => handleClickTrackOrder()}
                            sx={{padding:{xs:"7px 7px"},height:"30px"}}
                        >
                            <LocalShippingIcon sx={{ fontSize: '14px' }} />
                            {t('Track Order')}
                        </TrackButton>
                    </Stack>
                )}
            {/*{(global?.repeat_order_option && getToken()) && (order?.order_status === 'canceled') && (*/}

            {/*    <Reorder*/}
            {/*        // orderData={data?.data?.details}*/}
            {/*        orderZoneId={order?.restaurant?.zone_id}*/}
            {/*    />*/}
            {/*)}*/}
        </Stack >
    )
    const themeColor = theme.palette.success.main
    return (
        <>
            <Card
                padding="1rem"
                sx={{
                    backgroundColor:
                        theme.palette.mode === 'dark'
                            ? (theme) => theme.palette.cardBackground1
                            : (isXSmall ? "white" : (theme) => alpha(theme.palette.neutral[200], 0.6)),
                    padding: '1rem',
                    width: '100%',
                    borderRadius: '5px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                }}
            >
                <Grid container alignItems={{ xs: "flex-start", md: "center" }} spacing={1}>
                    {!isXSmall && (
                        <Grid item xs={2} sm={1} md={1} textAlign="center">
                            {serialNumber}
                        </Grid>
                    )}

                    <Grid item xs={9} sm={4.5} md={4}>
                        <CustomStackFullWidth
                            direction="row"
                            spacing={2}
                            onClick={handleClick}
                        >
                            <CustomImageContainer
                                src={`${restaurantImage}/${order?.restaurant?.logo}`}
                                width="60px"
                                height="60px"
                                borderRadius="5px"
                                objectFit="cover"
                            />
                            <Stack>
                                <Typography fontSize={{xs:"13px",md: "14px" }} fontWeight="600">
                                    {order?.restaurant?.name}
                                </Typography>
                                <CustomColouredTypography
                                    fontSize="12px"
                                    fontWeight="400"
                                    sx={{
                                        textTransform: ' capitalize',
                                        color:
                                            order?.order_status ===
                                            'delivered' && themeColor,
                                    }}
                                >
                                    {order?.order_status === 'failed'
                                        ? t('Payment Failed')
                                        : t(order?.order_status).replaceAll(
                                            '_',
                                            ' '
                                        )}
                                </CustomColouredTypography>
                                <Typography
                                    fontSize="12px"
                                    fontWeight="400"
                                    color={theme.palette.neutral[400]}
                                >
                                    {order?.order_status == 'delivered' ? (
                                        <CustomFormatedDateTime
                                            date={order?.delivered}
                                        />
                                    ) : (
                                        <CustomFormatedDateTime
                                            date={order?.created_at}
                                        />
                                    )}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={3} sm={2} md={2.5}>
                        <Typography
                            fontSize={isXSmall ? "13px" : "16px"}
                            fontWeight="500"
                            textAlign={isXSmall ? 'left' : 'center'}
                        >
                            {getAmount(
                                order?.order_amount,
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4.5} md={4.5} align="right">
                        {(order?.order_status == 'delivered' && !order?.is_reviewed) || (order?.order_status == 'delivered' && !order?.is_reviewed && !order?.is_dm_reviewed)
                            ? deliveredInformation()
                            : notDeliveredInformation()}
                    </Grid>
                </Grid>
                <ReviewSideDrawer
                    open={openReviewModal}
                    onClose={() => setOpenReviewModal(false)}
                    orderId={order?.id}
                />
            </Card>
        </>
    )
}

export default OrderCard
