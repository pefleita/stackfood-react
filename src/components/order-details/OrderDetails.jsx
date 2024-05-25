
import React, { useEffect, useState } from 'react'
import {
    alpha,
    Box,
    Button,
    Divider,
    Grid,
    IconButton, NoSsr,
    Stack,
    styled,
    Typography,
    useMediaQuery
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star'
import {

    CalculationGrid,
    CustomOrderStatus,
    CustomProductDivider,
    IformationGrid,
    IformationGridWithBorder,
    InfoTypography,
    InstructionWrapper,
    OrderFoodAmount,
    OrderFoodName,
    OrderStatusBox,
    OrderStatusGrid,
    OrderSummaryGrid,
    ProductDetailsWrapper,
    RefundButton,
    TitleTypography,
    TotalGrid,
} from './OrderDetail.style'
import { useQuery } from 'react-query'
import { OrderApi } from "@/hooks/react-query/config/orderApi"
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { getAmount } from "@/utils/customFunctions"
import { useDispatch, useSelector } from "react-redux";
import { ImageSource } from "@/utils/ImageSource"
import {
    CustomColouredTypography,
    CustomPaperBigCard,
    CustomStackFullWidth
} from "@/styled-components/CustomStyles.style";
import TopDetails from './TopDetails'
import OrderDetailsBottom from './OrderDetailsBottom'
import OrderDetailsShimmer from './OrderDetailsShimmer'
import GifShimmer from './GifShimmer'
import PaymentUpdate from './PaymentUpdate'
import CustomImageContainer from '../CustomImageContainer'
import { CustomTypography } from '../custom-tables/Tables.style'
import ChatIcon from '@mui/icons-material/Chat'
import Link from 'next/link'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import { useTheme } from '@mui/material/styles'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import RefundModal from '../order-history/RefundModal'
import { useGetRefundReasons } from "@/hooks/react-query/refund-request/useGetRefundReasons"
import { useStoreRefundRequest } from "@/hooks/react-query/refund-request/useStoreRefundRequest"
import { toast } from 'react-hot-toast'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import { getVariationNames } from './OrderSummeryVariations'
import DeliveryTimeInfoVisibility from './DeliveryTimeInfoVisibility'
import Refund from './Refund'
import Reorder from './Reorder'
import SubscriptionDetails from './subscription-details'
import BottomActions from './subscription-details/BottomActions'
import Skeleton from '@mui/material/Skeleton'
import OfflineOrderDetails from './offline-payment/OfflineOrderDetails'
import CustomModal from '../custom-modal/CustomModal'
import CloseIcon from "@mui/icons-material/Close";
import OfflineDetailsModal from './offline-payment/OfflineDetailsModal'
import { getGuestId, getToken } from "../checkout-page/functions/getGuestUserId";
import jwt from 'base-64'
import { clearOfflinePaymentInfo, setOrderDetailsModal } from "@/redux/slices/OfflinePayment"
import { RTL } from '../RTL/RTL'
import Meta from '../Meta'
import CustomFormatedDateTime from '../date/CustomFormatedDateTime'
import DeliveryIcon from '../../assets/images/icons/DeliveryIcon'
import CustomDivider from "../CustomDivider";

import TrackingPage from "../order-tracking/TrackingPage";
import startReview from "../../../public/static/star-review.png";
import ReviewSideDrawer from "@/components/order-details/ReviewSideDrawer";
import { setDeliveryManInfoByDispatch } from "@/redux/slices/searchFilter";
import CustomAvatar from "@/components/custom-avatar/CustomAvatar";
import CustomRatings from "@/components/custom-ratings/CustomRatings";
import InfoIcon from '@mui/icons-material/Info';

import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import { CustomToaster } from "@/components/custom-toaster/CustomToaster";
const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: alpha(theme.palette.neutral[1000],.8),
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.neutral[1000],
        color:theme.palette.neutral[100]
    },
}));
function getRestaurantValue(data, key) {
    return data?.data?.details[0]?.food_details?.[key]
}

function getSubTotal(data, addOnsPrice = 0) {
    // let sun_total = 0;
    let totalPrice = 0
    if (data?.data?.details?.length > 0) {
        data?.data?.details?.map((item) => {
            totalPrice +=
                item.food_details.price * item.food_details.order_count
        })
        if (addOnsPrice > 0) return totalPrice + addOnsPrice
        return totalPrice
    }

    return totalPrice
}

function getAddons(data) {
    let totalAddons = 0
    if (data?.data?.details?.length > 0) {
        data?.data?.details?.map((item) => {
            totalAddons += item.total_add_on_price
        })
        return totalAddons
    }
    return totalAddons
}

function getDiscount(data) {
    let totalDiscount = 0
    if (data?.data?.details?.length > 0) {
        data?.data?.details?.map((item) => {
            totalDiscount += item.discount_on_food
        })

        return totalDiscount
    }

    return totalDiscount
}

function getTotalTax(data) {
    let totalTax = 0
    if (data?.data?.details?.length > 0) {
        data?.data?.details.map((item) => {
            totalTax += item.tax_amount
        })

        return totalTax
    }

    return totalTax
}

function getTotalPrice(subTotal, discountPrice, taxAmount) {
    return subTotal + taxAmount - discountPrice
}

const getItemsPrice = (items) => {
    const productPrice = items?.reduce(
        (total, product) => product?.price * product?.quantity + total,
        0
    )
    return productPrice
}
const getAddOnsPrice = (items) => {
    let productAddonsPrice = items?.reduce(
        (total, product) =>
            (product.add_ons.length > 0
                ? product?.add_ons?.reduce(
                    (cTotal, cProduct) =>
                        cProduct.price * cProduct.quantity + cTotal,
                    0
                )
                : 0) + total,
        0
    )
    return productAddonsPrice
}

const getSubTotalPrice = (dataList) => {
    return getItemsPrice(dataList) + getAddOnsPrice(dataList)
}
const getAddOnsNames = (addOns) => {
    const names = addOns.map(
        (item, index) =>
            `${addOns[0].name}(${addOns[0]?.quantity})${index !== addOns?.length - 1 ? ',' : ''
            }`
    )
    return names
}

const OrderDetails = ({OrderIdDigital}) => {
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const router = useRouter()
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const { orderId, phone, isTrackOrder, token } = router.query
    const { global } = useSelector((state) => state.globalSettings)
    const { orderDetailsModal } = useSelector((state) => state.offlinePayment);
    const [openOfflineModal, setOpenOfflineModal] = useState(orderDetailsModal);
    const [openModal, setOpenModal] = useState(false)
    const [openReviewModal, setOpenReviewModal] = useState(false)

    const guestId = getGuestId();
    const userPhone = phone && jwt.decode(phone)
    const tempOrderId = orderId ? orderId : OrderIdDigital
    const restaurantBaseUrl = global?.base_urls?.restaurant_image_url
    const deliveryManImage = global?.base_urls?.delivery_man_image_url
    let languageDirection = undefined
    const tip_text=t("order delivered out of")
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { data: reasonsData } = useGetRefundReasons()

    const { mutate, isLoading: refundIsLoading } = useStoreRefundRequest()
    const formSubmitHandler = (values) => {
        const tempValue = { ...values, orderId:tempOrderId }
        const onSuccessHandler = async (resData) => {
            if (resData) {
                await refetchTrackData()
                toast.success(resData.message)
                setOpenModal(false)
            }
        }
        mutate(tempValue, {
            onSuccess: onSuccessHandler,
            onError: onErrorResponse,
        })
    }

    const {
        isLoading,
        data,
        isError,
        error,
        refetch: refetchOrderDetails,
    } = useQuery(['order-details', tempOrderId], () => OrderApi.orderDetails(tempOrderId, userPhone, guestId), {
        onError: onSingleErrorResponse,
    })



    const { data: trackData, refetch: refetchTrackData, isLoading: trackOrderLoading } = useQuery(
        [`category-tracking`, tempOrderId],
        () => OrderApi.orderTracking(tempOrderId, userPhone, guestId)
    )


    if (isLoading) {
        return <OrderDetailsShimmer />
    }
    const productBaseUrlCampaign = global?.base_urls?.campaign_image_url
    const productBaseUrl = global?.base_urls?.product_image_url
    const refetchAll = async () => {
        await refetchOrderDetails()
        await refetchTrackData()
    }

    const  handleTotalAmount = () => {
        if (trackData?.data?.subscription) {
            if (trackData?.data?.subscription?.quantity > 0) {
                return (
                    trackData?.data?.order_amount *
                    trackData?.data?.subscription?.quantity
                )
            } else {
                return trackData?.data?.order_amount
            }
        } else {
            return trackData?.data?.order_amount
        }
    }
    const handleOfflineClose = () => {
        dispatch(clearOfflinePaymentInfo());
        dispatch(setOrderDetailsModal(false));
        setOpenOfflineModal(false)
    }
    const backgroundColorStatus = () => {
        if (trackData?.data?.offline_payment?.data?.status === "pending") {
            return { color: theme.palette.info.dark, status: `${t("Verification Pending")}` };
        }
        if (trackData?.data?.offline_payment?.data?.status === "verified") {
            return { color: theme.palette.success.main, status: `${t("Payment Verified")}` };
        }
        if (trackData?.data?.offline_payment?.data?.status === "denied") {
            return { color: theme.palette.error.main, status: `${t("Verification Failed")}` };
        }
    };
    const backgroundColorOrderStatus = () => {
        if (trackData?.data?.order_status === "delivered") {
            return theme.palette.success.main;
        }
        else if (trackData?.data?.order_status === "canceled") {
            return theme.palette.error.main;
        }
        else {
            return theme.palette.info.dark;
        }
    };
    const getCommonValue = (data, key) => {
        return data?.data?.details[0]?.[key]
    }
    const handleSideDrawer=()=>{
        dispatch(setDeliveryManInfoByDispatch(trackData?.data?.delivery_man))
        setOpenReviewModal(true)
    }

//



    const getReviewButton = (trackData) => {
        if (!trackData?.data?.is_reviewed && !trackData?.data?.is_dm_reviewed ) {
            return (
                <Button
                    onClick={handleSideDrawer}
                    variant="outlined"
                    sx={{
                        p: {
                            xs: '5px',
                            sm: '5px',
                            md: '2px 10px',
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
            );
        } else if (!trackData?.data?.is_reviewed) {
            return (
                <Button
                    onClick={handleSideDrawer}
                    variant="outlined"
                    sx={{
                        p: {
                            xs: '5px',
                            sm: '5px',
                            md: '2px 10px',
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
            );
        }
        else if (!trackData?.data?.is_dm_reviewed) {
            return (
                <Button
                    onClick={handleSideDrawer}
                    variant="outlined"
                    sx={{
                        p: {
                            xs: '5px',
                            sm: '5px',
                            md: '2px 10px',
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
            );
        }else {
            return  null
        }
    };

    return (
        <NoSsr>
            <Meta title={`Order details - ${global?.business_name}`} />
            <CustomPaperBigCard
                padding={isXSmall ? '0' : '0px'}
                border={false}
                nopadding={isXSmall && "true"}
                sx={{ minHeight: !isXSmall && '558px', boxShadow: isXSmall && 'unset',marginBottom:"1rem" }}
            >
                <Grid container>
                    <Grid item xs={12} md={7} padding={{ xs: "10px", sm: "20px", md: "20px" }}>
                        <Stack direction="row" gap="10px" justifyContent={{ xs: "center", md: "flex-start" }}>
                            <Typography
                                sx={{
                                    color: 'customColor.fifteen',
                                    fontSize: '18px',
                                    fontWeight: '600',

                                }}
                            >
                                {trackData?.data?.subscription !== null? t("Subscription"):t('Order')} # {getCommonValue(data, 'order_id')}
                            </Typography>
                            {trackData && (
                                <CustomOrderStatus color={backgroundColorOrderStatus()}>
                                    <Typography
                                        component="span"
                                        textTransform="capitalize"
                                        color={backgroundColorOrderStatus()}
                                        align="left"
                                        fontSize={{ xs: "13px", md: "14px" }}
                                        fontWeight="bold"
                                    >
                                        {t(trackData?.data?.order_status).replaceAll('_', ' ')}
                                    </Typography>
                                </CustomOrderStatus>

                            )}
                            <CustomOrderStatus color={theme.palette.success.main}>
                            <Typography fontSize="12px" fontWeight="500" textTransform="capitalize" color={theme.palette.success.main}>
                                {trackData?.data?.order_type==="delivery" ? t("Home Delivery"):t(trackData?.data?.order_type).replaceAll('_', ' ')}
                            </Typography>
                            </CustomOrderStatus>
                        </Stack>
                        <Stack height="100%" flexDirection={{ xs: "column", md: "row" }} gap="5px" alignItems={{ md: "left", xs: "center" }}>
                            <Stack flexDirection="row" gap="5px" paddingInlineEnd="5px" alignItems="center" >
                                <Typography fontSize="12px" fontWeight={400} sx={{ color: theme.palette.text.secondary, }}>
                                    {t("Order date:")}
                                </Typography>
                                <Typography fontSize="12px" fontWeight={500}
                                    sx={{ color: theme.palette.customColor.fifteen, }}>
                                    <CustomFormatedDateTime
                                        date={data?.data?.details?.[0]?.created_at}
                                    />
                                </Typography>
                                 {/*<Typography fontSize="12px" fontWeight="500" textTransform="capitalize" color={theme.palette.success.main}>*/}
                                 {/*    {t(trackData?.data?.order_type).replaceAll('_', ' ')}*/}

                                 {/*</Typography>*/}
                            </Stack>
                            {trackData?.data?.scheduled!==0 &&
                                <Stack flexDirection="row" gap="5px" paddingInlineEnd="5px" alignItems="center" >
                                    <Typography fontSize="12px" fontWeight={400} sx={{ color: theme.palette.text.secondary, }}>
                                        {t("Scheduled delivery")}
                                    </Typography>
                                    <Typography fontSize="12px" fontWeight={500}
                                                sx={{ color: theme.palette.customColor.fifteen, }}>
                                        <CustomFormatedDateTime
                                            date={trackData?.data?.schedule_at}
                                        />
                                    </Typography>
                                </Stack>}

                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={5} padding={{ xs: "10px", sm: "20px", md: "20px" }}>
                        <Stack width="100%" flexDirection="row" justifyContent={{ xs: "center", sm: "flex-end", md: "flex-end" }}>
                            {
                                trackData && (
                                    <>
                                        {trackData?.data?.order_status === 'delivered' && !isTrackOrder && getToken() &&  (
                                            <Stack flexDirection="row" gap="15px">
                                                {getReviewButton(trackData)}
                                                {trackData?.data?.subscription === null &&  (global?.repeat_order_option && getToken()) && !isTrackOrder && (
                                                    <Reorder
                                                        orderData={data?.data?.details}
                                                        orderZoneId={
                                                            trackData?.data?.restaurant
                                                                ?.zone_id
                                                        }
                                                    />
                                                )}
                                            </Stack>
                                        )}
                                        { trackData?.data?.subscription === null &&  trackData && getToken() &&
                                            (trackData?.data?.order_status === 'canceled' ||
                                                trackData?.data?.order_status === 'failed') && (
                                                <Stack>
                                                    {global?.repeat_order_option && (
                                                        <Reorder
                                                            orderData={data?.data?.details}
                                                            orderZoneId={
                                                                trackData?.data?.zone_id
                                                            }
                                                        />
                                                    )}
                                                    {trackData?.data?.order_status ===
                                                        'failed' && (
                                                            <PaymentUpdate
                                                                id={tempOrderId}
                                                                refetchOrderDetails={
                                                                    refetchOrderDetails
                                                                }
                                                                refetchTrackData={
                                                                    refetchTrackData
                                                                }
                                                                trackData={trackData}
                                                            />
                                                        )}
                                                </Stack>
                                            )}
                                        {trackData && (
                                            trackData?.data?.order_status === 'accepted' ||
                                            trackData?.data?.order_status === 'pending' ||
                                            trackData?.data?.order_status === 'processing' ||
                                            trackData?.data?.order_status === 'confirmed' ||
                                            trackData?.data?.order_status === 'handover' ||
                                            trackData?.data?.order_status === 'picked_up'
                                            // trackData?.data?.subscription
                                        ) &&
                                            (
                                                <OrderDetailsBottom
                                                    id={tempOrderId}
                                                    refetchOrderDetails={refetchOrderDetails}
                                                    refetchTrackData={refetchTrackData}
                                                    trackData={trackData}
                                                    isTrackOrder={isTrackOrder}
                                                />
                                            )}
                                    </>
                                )
                            }
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <CustomDivider marginTop="10px" />
                </Grid>
                {isTrackOrder ? (<>
                    {!trackOrderLoading && <TrackingPage data={trackData?.data} />}
                </>) : (
                    <>
                        <Grid container spacing={2} padding={{ xs: "10px", sm: "15px", md: "15px" }}>
                            <Grid item xs={12} sm={7.3} md={7.3} display="flex" flexDirection="column" gap={{ xs: "15px", sm: "20px", md: "25px" }}>
                                {trackData && trackData?.data?.subscription === null && trackData?.data?.order_status !== 'pending' && (
                                    <>
                                        {trackData ? (
                                            <DeliveryTimeInfoVisibility trackData={trackData} />
                                        ) : (
                                            <GifShimmer />
                                        )}
                                    </>
                                )}
                                {trackData &&
                                    trackData?.data &&
                                    trackData?.data?.subscription !== null && (
                                        <SubscriptionDetails
                                            subscriptionData={
                                                trackData?.data?.subscription
                                            }
                                            t={t}
                                            subscriptionSchedules={
                                                data?.data?.subscription_schedules
                                            }
                                            orderId={trackData?.data?.id}
                                            paymentMethod={
                                                trackData?.data?.payment_method
                                            }
                                            subscriptionCancelled={
                                                trackData?.data?.canceled_by
                                            }
                                            subscriptionCancellationReason={
                                                trackData?.data?.cancellation_reason
                                            }
                                            subscriptionCancellationNote={
                                                trackData?.data?.cancellation_note
                                            }
                                            subscriptionOrderNote={
                                                trackData?.data?.order_note
                                            }
                                            orderAmount={trackData?.data?.order_amount}
                                        />
                                    )}

                                <ProductDetailsWrapper>
                                    {data?.data?.details?.length > 0 &&
                                        data?.data?.details?.map((product, id) => (
                                            <Stack key={id}>
                                                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                                                    <Stack flexDirection="row" gap="17px">
                                                        <Stack>
                                                            {product.item_campaign_id ? (
                                                                <CustomImageContainer
                                                                    src={`${productBaseUrlCampaign}/${product.food_details.image}`}
                                                                    height="60px"
                                                                    maxWidth="60px"
                                                                    width="100%"
                                                                    loading="lazy"
                                                                    smHeight="50px"
                                                                    borderRadius="5px"
                                                                />
                                                            ) : (
                                                                <CustomImageContainer
                                                                    src={`${productBaseUrl}/${product.food_details.image}`}
                                                                    height="60px"
                                                                    maxWidth="60px"
                                                                    width="100%"
                                                                    loading="lazy"
                                                                    smHeight="50px"
                                                                    borderRadius="5px"
                                                                    objectFit="contained"
                                                                />
                                                            )}
                                                        </Stack>
                                                        <Stack>
                                                            <OrderFoodName fontSize="13px" fontWeight={600} color={theme.palette.customColor.fifteen}>
                                                                {product?.food_details?.name}
                                                            </OrderFoodName>
                                                            {product?.add_ons.length > 0 && (
                                                                <OrderFoodName color={theme.palette.customColor.fifteen}>
                                                                    {t('Addons')}:{' '}
                                                                    {getAddOnsNames(
                                                                        product?.add_ons
                                                                    )}
                                                                </OrderFoodName>
                                                            )}
                                                            {product?.variation?.length > 0 && (
                                                                < >
                                                                    {getVariationNames(product, t)}
                                                                </>
                                                            )}

                                                            <OrderFoodName color={theme.palette.customColor.fifteen}>
                                                                {t('Unit Price ')}:{' '}
                                                                {getAmount(
                                                                    product?.food_details
                                                                        ?.price,
                                                                    currencySymbolDirection,
                                                                    currencySymbol,
                                                                    digitAfterDecimalPoint
                                                                )}
                                                            </OrderFoodName>

                                                        </Stack>
                                                    </Stack>
                                                    <Stack>
                                                        <OrderFoodAmount>
                                                            {getAmount(
                                                                product?.price * product?.quantity,
                                                                currencySymbolDirection,
                                                                currencySymbol,
                                                                digitAfterDecimalPoint
                                                            )}
                                                        </OrderFoodAmount>
                                                        <OrderFoodName color={theme.palette.text.secondary} textAlign='end'>
                                                            {t('Qty')}: {product?.quantity}
                                                        </OrderFoodName>
                                                    </Stack>
                                                </Stack>
                                                {(data?.data?.details?.length - 1) > id &&
                                                    <Stack padding="15px 5px 15px 0px">
                                                        <CustomProductDivider variant='middle' component='div' />
                                                    </Stack>
                                                }
                                            </Stack>
                                        ))}
                                </ProductDetailsWrapper>
                                {trackData &&
                                    trackData?.data
                                        ?.delivery_instruction && (
                                        <Stack gap="10px">
                                            <TitleTypography>
                                                {t('Instructions')}
                                            </TitleTypography>
                                            <InstructionWrapper>
                                                {trackData ? (
                                                    <Typography
                                                        component="span"
                                                        textTransform="capitalize"
                                                        align="left"
                                                        fontSize={{ xs: "12px", sm: "12px", md: "14px" }}
                                                        color={theme.palette.neutral[400]}
                                                    >
                                                        {t(
                                                            trackData?.data
                                                                ?.delivery_instruction
                                                        )}
                                                    </Typography>
                                                ) : (
                                                    <Skeleton
                                                        width="100px"
                                                        variant="text"
                                                    />
                                                )}
                                            </InstructionWrapper>
                                        </Stack>
                                    )}
                                {trackData && trackData?.data?.unavailable_item_note && (
                                    <Stack gap="10px">
                                        <TitleTypography>
                                            {t('Unavailable item note')}
                                        </TitleTypography>
                                        <InstructionWrapper>
                                            {trackData ? (
                                                <Typography
                                                    component="span"
                                                    textTransform="capitalize"
                                                    align="left"
                                                    fontSize={{ xs: "12px", sm: "12px", md: "14px" }}
                                                    color={theme.palette.neutral[400]}
                                                >
                                                    {t(
                                                        trackData?.data
                                                            ?.unavailable_item_note
                                                    )}
                                                </Typography>
                                            ) : (
                                                <Skeleton
                                                    width="100px"
                                                    variant="text"
                                                />
                                            )}
                                        </InstructionWrapper>
                                    </Stack>
                                )}
                                {trackData && trackData?.data?.order_note && (
                                    <Stack gap="10px">
                                        <TitleTypography>
                                            {t('Order note')}
                                        </TitleTypography>
                                        <InstructionWrapper>
                                            {trackData ? (
                                                <Typography
                                                    component="span"
                                                    textTransform="capitalize"
                                                    align="left"
                                                    fontSize="14px"
                                                    color={theme.palette.neutral[400]}
                                                >
                                                    {t(
                                                        trackData?.data?.order_note
                                                    )}
                                                </Typography>
                                            ) : (
                                                <Skeleton
                                                    width="100px"
                                                    variant="text"
                                                />
                                            )}
                                        </InstructionWrapper>
                                    </Stack>
                                )}
                                <Stack gap="25px">
                                    <TitleTypography>
                                        {t('Restaurants Information')}
                                    </TitleTypography>
                                    <IformationGrid>
                                        <Stack flexDirection="row" gap="16px" alignItems="center">
                                            <Stack>
                                                {trackData && (
                                                    <CustomImageContainer
                                                        src={ImageSource(
                                                            restaurantBaseUrl,
                                                            trackData?.data?.restaurant
                                                                ?.logo
                                                        )}
                                                        height="80px"
                                                        width="80px"
                                                        borderRadius=".5rem"
                                                        objectFit="contain"
                                                    />
                                                )}
                                            </Stack>
                                            <Stack>
                                                <InfoTypography sx={{ fontWeight: '500' }}>
                                                    {trackData &&
                                                        trackData?.data?.restaurant?.name}
                                                </InfoTypography>
                                                <InfoTypography sx={{ fontWeight: 'bold' }}>
                                                    {trackData &&
                                                        trackData?.data?.restaurant?.avg_rating?.toFixed(
                                                            1
                                                        )}
                                                    <StarIcon
                                                        sx={{
                                                            fontSize: '16px',
                                                            color: (theme) =>
                                                                theme.palette.primary.main,
                                                        }}
                                                    />{' '}
                                                </InfoTypography>
                                                <InfoTypography>
                                                    {t('Address')} :{' '}
                                                    {trackData &&
                                                        trackData?.data?.restaurant
                                                            ?.address}
                                                </InfoTypography>
                                            </Stack>
                                        </Stack>


                                        {trackData &&
                                            trackData?.data?.order_status !==
                                            'delivered' &&
                                            trackData?.data?.order_status !==
                                            'failed' &&
                                            trackData?.data?.order_status !==
                                            'canceled' &&
                                            trackData?.data?.order_status !==
                                            'refunded' &&
                                            trackData?.data?.restaurant
                                                ?.restaurant_model === 'subscription' &&
                                            Number.parseInt(
                                                trackData?.data?.restaurant
                                                    ?.restaurant_sub?.chat
                                            ) === 1 && getToken() && (
                                                <Stack
                                                    justifyContent="flex-end"
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <Link
                                                        href={{
                                                            pathname: '/info',
                                                            query: {
                                                                page: 'inbox',
                                                                type: 'vendor',
                                                                id: trackData?.data
                                                                    ?.restaurant
                                                                    .vendor_id,
                                                                routeName: 'vendor_id',
                                                                chatFrom: 'true',
                                                            },
                                                        }}
                                                    >
                                                        <ChatIcon
                                                            sx={{
                                                                height: 25,
                                                                width: 25,
                                                                color: (theme) =>
                                                                    theme.palette
                                                                        .primary.main,
                                                            }}
                                                        ></ChatIcon>
                                                    </Link>
                                                </Stack>
                                            )}
                                        {trackData &&
                                            trackData?.data?.order_status !==
                                            'delivered' &&
                                            trackData?.data?.order_status !==
                                            'failed' &&
                                            trackData?.data?.order_status !==
                                            'canceled' &&
                                            trackData?.data?.order_status !==
                                            'refunded' &&
                                            trackData?.data?.restaurant
                                                ?.restaurant_model === 'commission' && getToken() && (
                                                <Stack
                                                    justifyContent="flex-end"
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <Link
                                                        href={{
                                                            pathname: '/info',
                                                            query: {
                                                                page: 'inbox',
                                                                type: 'vendor',
                                                                id: trackData?.data
                                                                    ?.restaurant
                                                                    .vendor_id,
                                                                routeName: 'vendor_id',
                                                                chatFrom: 'true',
                                                                restaurantName:
                                                                    trackData?.data
                                                                        ?.restaurant
                                                                        ?.name,
                                                                logo: trackData?.data
                                                                    ?.restaurant?.logo,
                                                            },
                                                        }}
                                                    >
                                                        <ChatIcon
                                                            sx={{
                                                                height: 25,
                                                                width: 25,
                                                                color: (theme) =>
                                                                    theme.palette
                                                                        .primary.main,
                                                            }}
                                                        ></ChatIcon>
                                                    </Link>
                                                </Stack>
                                            )}
                                    </IformationGrid>
                                    {trackData?.data?.delivery_man
                                        && trackData?.data?.order_status !==
                                        'delivered' &&
                                        trackData?.data?.order_status !==
                                        'failed' &&
                                        trackData?.data?.order_status !==
                                        'canceled' &&
                                        trackData?.data?.order_status !==
                                        'refunded' && getToken()  &&
                                        <Stack gap="25px">
                                            <TitleTypography>
                                                {t('Delivery Man Information')}
                                            </TitleTypography>
                                            <IformationGrid bgColor={theme.palette.sectionBg}>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Stack>
                                                        {trackData && (
                                                            <CustomImageContainer
                                                                src={`${deliveryManImage}/${trackData?.data?.delivery_man?.image}`}
                                                                height="80px"
                                                                width="80px"
                                                                borderRadius=".5rem"
                                                                objectFit="cover"
                                                                alt={trackData?.data?.delivery_man?.f_name}
                                                            />
                                                        )}
                                                    </Stack>
                                                    <Stack alignItems="flex-start">
                                                        <Typography fontSize="16px" fontweight="500">
                                                            {trackData?.data?.delivery_man?.f_name.concat(
                                                                ' ',
                                                                trackData?.data?.delivery_man?.l_name
                                                            )}
                                                        </Typography>
                                                        <InfoTypography sx={{ fontWeight: 'bold' ,}}>
                                                            {trackData &&
                                                                trackData?.data?.delivery_man?.avg_rating?.toFixed(
                                                                    1
                                                                )}
                                                            <StarIcon
                                                                sx={{
                                                                    marginLeft:"4px",
                                                                    fontSize: '16px',
                                                                    color: (theme) =>
                                                                        theme.palette.primary.main,
                                                                }}
                                                            />{' '}
                                                        </InfoTypography>
                                                    </Stack>
                                                </Stack>
                                                <Stack direction="row" spacing={2}>
                                                    {/*<Typography>call</Typography>*/}
                                                    <Stack sx={{ cursor: 'pointer' }}>
                                                        <Link
                                                            href={{
                                                                pathname: '/info',
                                                                query: {
                                                                    page: 'inbox',
                                                                    type: 'delivery_man',
                                                                    id: trackData?.data?.delivery_man?.id,
                                                                    routeName: 'delivery_man_id',
                                                                    chatFrom: 'true',
                                                                    restaurantName: trackData?.data?.delivery_man?.f_name,
                                                                    logo: trackData?.data?.delivery_man?.image,
                                                                },
                                                            }}
                                                        >
                                                            <ChatIcon
                                                                sx={{
                                                                    height: 25,
                                                                    width: 25,
                                                                    color: (theme) =>
                                                                        theme.palette.primary.main,
                                                                }}
                                                            ></ChatIcon>
                                                        </Link>
                                                    </Stack>
                                                </Stack>
                                            </IformationGrid>
                                        </Stack>
                                    }

                                    <Stack gap="15px">
                                        <TitleTypography>
                                            {t('Payment Information')}
                                        </TitleTypography>
                                        <ProductDetailsWrapper isVerfired={trackData?.offline_payment?.data?.status === "verified"}>
                                            {(trackData?.data?.payment_method === "offline_payment" || trackData?.data?.offline_payment !== null) &&
                                                < OfflineOrderDetails trackData={trackData?.data} refetchTrackData={refetchTrackData} />}
                                            {trackData?.data?.payment_method !== "offline_payment" &&
                                                <Stack direction={{ xs: "column", sm: "row", md: "row" }} justifyContent="space-between">
                                                    <Stack direction="row">
                                                        <Typography
                                                            color={theme.palette.neutral[400]}
                                                            fontSize="14px"
                                                            fontWeight={400}
                                                            sx={{ textTransform: "capitalize", wordWrap: "break-word" }}
                                                        >
                                                            {t("Method")}
                                                        </Typography>
                                                        <Typography
                                                            fontSize="14px"
                                                            fontWeight='400'
                                                            color={theme.palette.neutral[400]}
                                                            sx={{ textTransform: "capitalize", wordWrap: "break-word" }}

                                                        > &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp; {(trackData?.data?.offline_payment !== null && trackData?.data?.payment_method !== "partial_payment") ? (
                                                            `${t("Offline Payment")} (${trackData?.data?.offline_payment?.data?.method_name})`
                                                        ) : (
                                                            `${t(trackData?.data?.payment_method).replaceAll('_', ' ')}`
                                                        )
                                                            }
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography
                                                            fontSize="14px"
                                                            fontWeight='400'
                                                            color={theme.palette.neutral[400]}
                                                            sx={{ textTransform: "capitalize", wordWrap: "break-word" }}
                                                            align="left"
                                                        >
                                                            {t('Payment Status')}
                                                        </Typography>&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;
                                                        {trackData && trackData?.data?.offline_payment !== null ? (
                                                            <Typography
                                                                component="span"
                                                                sx={{
                                                                    fontSize: "14px",
                                                                    color: backgroundColorStatus().color,
                                                                    fontWeight: '400'
                                                                }}>
                                                                {backgroundColorStatus().status}
                                                            </Typography>

                                                        ) : (
                                                            <Typography
                                                                sx={{ fontWeight: '400', fontSize: "14px", }}
                                                                align="left"
                                                            >
                                                                {trackData &&
                                                                    trackData?.data?.payment_status ===
                                                                    'paid' ? (
                                                                    <span
                                                                        style={{
                                                                            color: `${theme.palette.success.main}`,
                                                                        }}
                                                                    >
                                                                        {t('Paid')}
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        style={{
                                                                            color: 'red',
                                                                        }}
                                                                    >
                                                                        {t('Unpaid')}
                                                                    </span>
                                                                )}
                                                            </Typography>
                                                        )
                                                        }
                                                    </Stack>
                                                </Stack>}
                                            {global?.order_delivery_verification &&
                                                <Stack direction="row">
                                                    <Typography
                                                        color={theme.palette.neutral[400]}
                                                        fontSize="14px"
                                                        fontWeight={400}
                                                        sx={{ textTransform: "capitalize", wordWrap: "break-word" }}
                                                    >
                                                        {t("Order Otp")}
                                                    </Typography>
                                                    <Typography
                                                        fontSize="14px"
                                                        fontWeight='400'
                                                        color={theme.palette.neutral[400]}
                                                        sx={{ textTransform: "capitalize", wordWrap: "break-word" }}

                                                    > &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp; {trackData?.data?.otp}
                                                    </Typography>
                                                </Stack>
                                            }

                                        </ProductDetailsWrapper>
                                    </Stack>
                                    {trackData?.data?.refund &&
                                        <Stack width="100%" mt=".5rem">
                                            <Stack spacing={1} alignItems="center" direction="row">
                                                {trackData?.data?.refund &&
                                                    trackData?.data?.order_status ===
                                                    'refund_request_canceled' ? (
                                                    <Refund
                                                        t={t}
                                                        title="Refund cancellation"
                                                        note={
                                                            trackData?.data?.refund
                                                                ?.admin_note
                                                        }
                                                    />

                                                ) : (
                                                    trackData?.data?.order_status ===
                                                    'refund_requested' && (

                                                        <Refund
                                                            t={t}
                                                            title="Refund request"
                                                            note={
                                                                trackData?.data?.refund
                                                                    ?.customer_note
                                                            }
                                                            reason={
                                                                trackData?.data?.refund
                                                                    ?.customer_reason
                                                            }
                                                            image={
                                                                trackData?.data?.refund
                                                                    ?.image
                                                            }
                                                        />
                                                    )
                                                )}

                                            </Stack>
                                        </Stack>
                                    }
                                    {trackData?.data?.order_status === "canceled" && (
                                        <Stack spacing={1.2}>
                                            <TitleTypography>
                                                {t('Cancellation Note')}
                                            </TitleTypography>
                                            <Stack padding="20px 16px" borderRadius="10px" backgroundColor={alpha(theme.palette.nonVeg, .1)}>
                                                <Typography fontSize="14px" color={theme.palette.neutral[400]}>
                                                    {trackData?.data?.cancellation_reason}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    )}

                                </Stack>

                            </Grid>
                            <Grid item sm={4.7} xs={12}
                            >
                                <OrderSummaryGrid container sx={{
                                    position: "sticky",
                                    top: { xs: "90px", md: "130px" },
                                    zIndex: 9, background: theme => theme.palette.neutral[100],
                                    borderRadius: "5px"
                                }}>
                                    <Grid item md={12} xs={12} >
                                        <Typography fontSize="16px" lineHeight="28px" fontWeight={500} sx={{ paddingBlock: "12px", color: theme.palette.neutral[1000] }}>
                                            {t('Summary')}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        item
                                        md={12}
                                        xs={12}
                                        spacing={1}
                                    >
                                        <Grid item md={7} xs={8}>
                                            <InfoTypography>
                                                {t('Items Price')}
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={5} xs={4}>
                                            <InfoTypography align="right">
                                                {data &&
                                                    getAmount(
                                                        getItemsPrice(data?.data?.details),
                                                        currencySymbolDirection,
                                                        currencySymbol,
                                                        digitAfterDecimalPoint
                                                    )}
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={8} xs={8}>
                                            <InfoTypography>
                                                {t('Addons Price')}
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={4} xs={4}>
                                            <InfoTypography align="right">
                                                {data &&
                                                    getAmount(
                                                        getAddOnsPrice(data?.data?.details),
                                                        currencySymbolDirection,
                                                        currencySymbol,
                                                        digitAfterDecimalPoint
                                                    )}
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={7} xs={8}>
                                            <InfoTypography>
                                                {t('Discount')}
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={5} xs={4}>
                                            <InfoTypography align="right">
                                                (-)
                                                <InfoTypography
                                                    component="span"
                                                    marginLeft="4px"

                                                >
                                                    {trackData &&
                                                        trackData?.data
                                                            ?.restaurant_discount_amount
                                                        ? getAmount(
                                                            trackData?.data
                                                                ?.restaurant_discount_amount,
                                                            currencySymbolDirection,
                                                            currencySymbol,
                                                            digitAfterDecimalPoint
                                                        )
                                                        : getAmount(
                                                            0,
                                                            currencySymbolDirection,
                                                            currencySymbol,
                                                            digitAfterDecimalPoint
                                                        )}
                                                </InfoTypography>
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={8} xs={8}>
                                            <InfoTypography>
                                                {t('Coupon Discount')}
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={4} xs={4}>
                                            <InfoTypography align="right">
                                                (-)
                                                <InfoTypography
                                                    component="span"
                                                    marginLeft="4px"
                                                >
                                                    {trackData &&
                                                        getAmount(
                                                            trackData?.data
                                                                ?.coupon_discount_amount,
                                                            currencySymbolDirection,
                                                            currencySymbol,
                                                            digitAfterDecimalPoint
                                                        )}
                                                </InfoTypography>
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={8} xs={8}>
                                            <InfoTypography>
                                                {t('VAT/TAX')}(
                                                {getRestaurantValue(data, 'tax')}%{' '}
                                                {global?.tax_included === 1 &&
                                                    t('Included')}{' '}
                                                )
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={4} xs={4} align="right">
                                            <InfoTypography>
                                                {global?.tax_included === 1 ? '' : '(+)'}
                                                <InfoTypography
                                                    component="span"
                                                    marginLeft="4px"
                                                >
                                                    {trackData &&
                                                        getAmount(
                                                            trackData?.data
                                                                ?.total_tax_amount,
                                                            currencySymbolDirection,
                                                            currencySymbol,
                                                            digitAfterDecimalPoint
                                                        )}
                                                </InfoTypography>
                                            </InfoTypography>
                                        </Grid>
                                        {trackData && trackData?.data?.dm_tips > 0 && (
                                            <>
                                                <Grid item md={8} xs={8}>
                                                    <InfoTypography>
                                                        {t('Delivery man tips')}
                                                    </InfoTypography>
                                                </Grid>
                                                <Grid item md={4} xs={4}>
                                                    <InfoTypography align="right">
                                                        {getAmount(
                                                            trackData?.data?.dm_tips,
                                                            currencySymbolDirection,
                                                            currencySymbol,
                                                            digitAfterDecimalPoint
                                                        )}
                                                    </InfoTypography>
                                                </Grid>
                                            </>
                                        )}
                                        {trackData &&
                                            global?.additional_charge_status === 1 && (
                                                <>
                                                    <Grid item md={8} xs={8}>
                                                        <InfoTypography>
                                                            {t(
                                                                global?.additional_charge_name
                                                            )}
                                                        </InfoTypography>
                                                    </Grid>
                                                    <Grid item md={4} xs={4}>
                                                        <InfoTypography
                                                            align="right"
                                                        >
                                                            {getAmount(
                                                                trackData?.data
                                                                    ?.additional_charge,
                                                                currencySymbolDirection,
                                                                currencySymbol,
                                                                digitAfterDecimalPoint
                                                            )}
                                                        </InfoTypography>
                                                    </Grid>
                                                </>
                                            )}
                                        <Grid item md={8} xs={8}>
                                            <InfoTypography>
                                                {t('Delivery fee')}
                                            </InfoTypography>
                                        </Grid>
                                        <Grid item md={4} xs={4}>
                                            <InfoTypography align="right">
                                                {trackData &&
                                                    getAmount(
                                                        trackData?.data?.delivery_charge,
                                                        currencySymbolDirection,
                                                        currencySymbol,
                                                        digitAfterDecimalPoint
                                                    )}
                                            </InfoTypography>
                                        </Grid>

                                    </Grid>
                                    <Grid item md={12} xs={12} mb="10px">
                                        <Stack
                                            width="100%"
                                            sx={{
                                                mt: '12px',
                                                borderBottom: `0.088rem dashed ${theme.palette.neutral[300]}`,
                                            }}
                                        ></Stack>
                                    </Grid>
                                    <TotalGrid container md={12} xs={12}>
                                        <Grid item md={8} xs={8}>
                                            <Typography fontSize="16px" fontWeight="400" sx={{ color: theme.palette.neutral[400] }}>
                                                {t('Total')}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={4} xs={4} align="right">
                                            <Typography fontWeight="400" color={theme.palette.neutral[400]}>
                                                {trackData &&
                                                    getAmount(
                                                        handleTotalAmount(),
                                                        currencySymbolDirection,
                                                        currencySymbol,
                                                        digitAfterDecimalPoint
                                                    )}
                                            </Typography>
                                        </Grid>
                                        {trackData?.data?.subscription !== null && (
                                            <>
                                                <Grid item md={8} xs={8} pt=".5rem" pb=".5rem">
                                                  <Stack direction="row" alignItems="center">
                                                      <InfoTypography >
                                                          {`${t('Total Delivered')} (${trackData?.data?.subscription?.delivered_count})`}
                                                      </InfoTypography>
                                                      <CustomTooltip title={`${trackData?.data?.subscription?.delivered_count} ${tip_text} ${trackData?.data?.subscription?.quantity}`} arrow placement="top"
                                                      >
                                                          <InfoIcon sx={{fontSize:"20px",color:theme=>theme.palette.info.main}}/>
                                                      </CustomTooltip>

                                                  </Stack>
                                                </Grid>
                                                <Grid item md={4} xs={4} pt=".5rem" pb=".5rem">
                                                    <InfoTypography align="right"
                                                    >
                                                        (-){
                                                          getAmount(
                                                              trackData?.data?.subscription?.paid_amount,
                                                              currencySymbolDirection,
                                                              currencySymbol,
                                                              digitAfterDecimalPoint
                                                          )
                                                        }
                                                    </InfoTypography>
                                                </Grid>
                                                <Grid item md={8} xs={8}>
                                                    <Typography fontWeight="600" >
                                                        {t('Due')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={4} xs={4}>
                                                    <Typography fontWeight="600" align="right"
                                                    >{
                                                        getAmount(
                                                            handleTotalAmount()-trackData?.data?.subscription?.paid_amount,
                                                            currencySymbolDirection,
                                                            currencySymbol,
                                                            digitAfterDecimalPoint
                                                        )
                                                    }
                                                    </Typography>
                                                </Grid>
                                            </>
                                        )}
                                        {
                                            trackData &&
                                            trackData?.data?.subscription !== null &&
                                            trackData?.data?.subscription?.status !== 'canceled' && (
                                                //this bottom actions are for subscriptions order
                                                <BottomActions
                                                    refetchAll={refetchAll}
                                                    subscriptionId={trackData?.data?.subscription?.id}
                                                    t={t}
                                                    minDate={trackData?.data?.subscription?.start_at}
                                                    maxDate={trackData?.data?.subscription?.end_at}
                                                />
                                            )
                                        }
                                        {trackData?.data?.partially_paid_amount &&
                                            trackData?.data?.order_status !== 'canceled' ? (
                                            <>
                                                <Grid item md={8} xs={8}>
                                                    <Typography
                                                        textTransform="capitalize"
                                                        variant="h5"
                                                    >
                                                        {t('Paid by wallet')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={4} xs={4} align="right">
                                                    <Typography variant="h5">
                                                        (-){' '}
                                                        {trackData &&
                                                            getAmount(
                                                                trackData?.data
                                                                    ?.partially_paid_amount,
                                                                currencySymbolDirection,
                                                                currencySymbol,
                                                                digitAfterDecimalPoint
                                                            )}
                                                    </Typography>
                                                </Grid>
                                            </>
                                        ) : null}

                                        {trackData?.data?.payment_method ===
                                            'partial_payment' ? (
                                            <>
                                                {trackData?.data?.payments[1]
                                                    ?.payment_status === 'unpaid' ? (
                                                    <>
                                                        {' '}
                                                        <Grid item md={8} xs={8}>
                                                            <Typography
                                                                textTransform="capitalize"
                                                                variant="h5"
                                                            >
                                                                {t('Due Payment')} (
                                                                {trackData &&
                                                                    t(
                                                                        trackData?.data
                                                                            ?.payments[1]
                                                                            ?.payment_method
                                                                    ).replaceAll('_', ' ')}
                                                                )
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            xs={4}
                                                            align="right"
                                                        >
                                                            <Typography variant="h5">
                                                                {trackData &&
                                                                    getAmount(
                                                                        trackData?.data
                                                                            ?.order_amount -
                                                                        trackData?.data
                                                                            ?.partially_paid_amount,
                                                                        currencySymbolDirection,
                                                                        currencySymbol,
                                                                        digitAfterDecimalPoint
                                                                    )}
                                                            </Typography>
                                                        </Grid>
                                                    </>
                                                ) : (
                                                    <>
                                                        {' '}
                                                        <Grid item md={8} xs={8}>
                                                            <Typography
                                                                textTransform="capitalize"
                                                                variant="h5"
                                                            >
                                                                {t('Paid By')} (
                                                                {trackData &&
                                                                    t(
                                                                        trackData?.data
                                                                            ?.payments[1]
                                                                            ?.payment_method
                                                                    ).replaceAll('_', ' ')}
                                                                )
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={4}
                                                            xs={4}
                                                            align="right"
                                                        >
                                                            <Typography variant="h5">
                                                                {trackData &&
                                                                    getAmount(
                                                                        trackData?.data
                                                                            ?.order_amount -
                                                                        trackData?.data
                                                                            ?.partially_paid_amount,
                                                                        currencySymbolDirection,
                                                                        currencySymbol,
                                                                        digitAfterDecimalPoint
                                                                    )}
                                                            </Typography>
                                                        </Grid>
                                                    </>
                                                )}
                                            </>
                                        ) : null}
                                    </TotalGrid>
                                    {global?.refund_active_status && (trackData?.data?.order_status === 'delivered') && (trackData && trackData?.data?.subscription === null) && getToken() &&  (
                                        <RefundButton
                                            variant="outlined"
                                            onClick={() => setOpenModal(true)}
                                        >
                                            {t('Refund Request')}
                                        </RefundButton>
                                    )}
                                </OrderSummaryGrid>
                            </Grid>
                        </Grid>

                    </>
                )}

            </CustomPaperBigCard>
            {
                (getToken() && orderDetailsModal) &&
                <CustomModal
                    maxWidth="670px"
                    openModal={openOfflineModal}
                    setModalOpen={setOpenOfflineModal}
                >
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ position: "relative" }}
                    >
                        <IconButton
                            onClick={() => setOpenOfflineModal(false)}
                            sx={{
                                zIndex: "99",
                                position: "absolute",
                                top: 10,
                                right: 10,
                                backgroundColor: (theme) => theme.palette.neutral[100],
                                borderRadius: "50%",
                                [theme.breakpoints.down("md")]: {
                                    top: 10,
                                    right: 5,
                                },
                            }}
                        >
                            <CloseIcon sx={{ fontSize: "24px", fontWeight: "500" }} />
                        </IconButton>
                    </CustomStackFullWidth>
                    <OfflineDetailsModal
                        trackData={trackData?.data}
                        // trackDataIsLoading={trackDataIsLoading}
                        // trackDataIsFetching={trackDataIsFetching}
                        handleOfflineClose={handleOfflineClose}
                    />
                </CustomModal>
            }
            {/*{*/}
            {/*    trackData &&*/}
            {/*    trackData?.data?.subscription !== null &&*/}
            {/*    trackData?.data?.subscription?.status !== 'canceled' && (*/}
            {/*        //this bottom actions are for subscriptions order*/}
            {/*        <BottomActions*/}
            {/*            refetchAll={refetchAll}*/}
            {/*            subscriptionId={trackData?.data?.subscription?.id}*/}
            {/*            t={t}*/}
            {/*            minDate={trackData?.data?.subscription?.start_at}*/}
            {/*            maxDate={trackData?.data?.subscription?.end_at}*/}
            {/*        />*/}
            {/*    )*/}
            {/*}*/}

            <RefundModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                reasons={reasonsData?.refund_reasons}
                formSubmit={formSubmitHandler}
                refundIsLoading={refundIsLoading}
            />
            <ReviewSideDrawer
             open={openReviewModal}
             onClose={() => setOpenReviewModal(false)}
             orderId={tempOrderId}
             refetchTrackData={refetchTrackData}
               is_reviewed={trackData?.data?.is_reviewed}
             is_dm_reviewed={trackData?.data?.is_dm_reviewed}

            />
        </NoSsr>
    )
}

export default OrderDetails