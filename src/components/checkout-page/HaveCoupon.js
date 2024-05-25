import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, InputAdornment, InputBase, Typography } from "@mui/material";
import {
    CouponButton,
    CouponGrid,
    CouponTitle,
    InputField,
} from './CheckOut.style'
import { useQuery } from 'react-query'
import { CouponApi } from "@/hooks/react-query/config/couponApi"
import { useTranslation } from 'react-i18next'
import { onErrorResponse } from '../ErrorResponse'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCouponInfo, setCouponType } from "@/redux/slices/global"
import { useTheme } from '@mui/material/styles'
import { cartItemsTotalAmount, getAmount } from "@/utils/customFunctions"
import AccountCircle from '@mui/icons-material/AccountCircle'
import CouponStartSvg from './assets/couponStartSvg'
import CustomPopover from "@/components/custom-popover/CustomPopover";
import CheckOutPromo from "@/components/checkout-page/order-summary/CheckOutPromo";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
const HaveCoupon = ({
    restaurant_id,
    setCouponDiscount,
    couponDiscount,
    cartList,
                        total_order_amount,
                        couponCode,
                        setCouponCode,
    data,
                        anchorEl,
                        setAnchorEl,
                        handleClose
}) => {
    const theme = useTheme()
    const router = useRouter();
    const { method } = router.query;
    const [zoneId, setZoneId] = useState(0)
    const [enable, setEnable] = useState(false)
    const[inputValue,setInputValue] = useState(null)
    const [isRefetchCall, setIsRefetchCall] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint
    if (cartList?.length > 0) {
    }

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    const handleSuccess = (response) => {
        const totalCartPrice = getAmount(cartItemsTotalAmount(cartList))
            const min_purchase = getAmount(
                response?.data?.min_purchase,
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
        if (
            Number.parseInt(response?.data?.min_purchase) <=
            Number.parseInt(totalCartPrice)
        ) {

            if(response?.data?.discount_type === "percent"){
                dispatch(setCouponInfo(response.data));
                toast.success(t("Coupon Applied"));
                dispatch(setCouponType(response.data.coupon_type));
                setCouponDiscount({ ...response.data, zoneId: zoneId });
                        if (typeof window !== 'undefined') {
                            if (response) {
                                localStorage.setItem('coupon', response.data.code)
                            }
                        }
            }else {
                if( totalCartPrice >= response?.data?.discount){
                    dispatch(setCouponInfo(response.data));
                    toast.success(t("Coupon Applied"));
                    dispatch(setCouponType(response.data.coupon_type));
                    setCouponDiscount({ ...response.data, zoneId: zoneId });
                            if (typeof window !== 'undefined') {
                                if (response) {
                                    localStorage.setItem('coupon', response.data.code)
                                }
                            }
                }else {
                    toast.error(
                        t("Your total price must be more then coupon amount")
                    );
                }
            }
        } else {
            toast.error(
                `$${t('Minimum purchase amount')} ${min_purchase}`
            );
        }
        handleClose()
    };
    const { isLoading, refetch ,isRefetching} = useQuery(
        'apply-coupon',
        () => CouponApi.applyCoupon(couponCode, restaurant_id),
        {
            retry:0,
            onSuccess: handleSuccess,
            onError: onErrorResponse,
            enabled: false,
        }
    )

    let couponStorage = undefined
    if (typeof window !== 'undefined') {
        couponStorage = localStorage.getItem('coupon')
    }
    useEffect(() => {
        setCouponCode(couponStorage)
        setInputValue(couponStorage)
        if (typeof window !== 'undefined') {
            let zoneid = JSON.parse(localStorage.getItem('zoneid'))
            setZoneId(zoneid[0])
        }
        if (couponStorage) {
            setEnable(true)
        }
        return () => {
            localStorage.removeItem('coupon')
        }
    }, [])
    const removeCoupon = () => {
        setInputValue(null)
        setCouponDiscount(null)
        localStorage.removeItem('coupon')
        setCouponCode(null)
        //dispatch(setCouponInfo(null))
    }
    const handleApply = (value) => {
        setIsRefetchCall(true)
        setInputValue(value)
        setCouponCode(value)

    }
    useEffect(() => {
        if(couponCode && isRefetchCall){
            refetch().then()
        }
    }, [couponCode]);
    const borderColor = theme.palette.primary.main
    return (
        <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="flex-start">
            { method !== "offline" && 
            <Grid item md={12} xs={12} sm={7}>
                <InputField
                    variant="outlined"
                    sx={{
                        border: `.5px solid ${borderColor}`,
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '3px',
                        borderRadius: '8px',
                        alignItems: 'center',
                    }}
                >
                    <InputBase
                        placeholder={t('Enter Voucher')}
                        sx={{
                            ml: 1,
                            flex: 1,
                            width: '100%',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '12px',
                                padding: '5px 0px 5px',
                            },
                        }}
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue ? inputValue : ''}
                        startAdornment={
                            <InputAdornment position="start">
                                <CouponStartSvg />
                            </InputAdornment>
                        }
                    />
                    <>
                        {!couponStorage && (
                            <CouponButton
                                loading={isLoading}
                                loadingPosition="start"
                                variant="contained"
                                onClick={()=>handleApply(inputValue)}
                                disabled={ inputValue==="" || !inputValue}
                            >
                                {t('Apply Now')}
                            </CouponButton>
                        )}
                        {couponStorage && (
                            <IconButton
                                // loading={isLoading}
                                loadingPosition="start"
                                variant="contained"
                                onClick={removeCoupon}
                            >
                               <CloseIcon sx={{fontSize:"16px"}}/>
                            </IconButton>
                        )}
                    </>
                </InputField>
            </Grid>
            }
            <CustomPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleClose={handleClose}
                padding="20px 10px 10px 10px"
                maxWidth="450px"

            >
                <CheckOutPromo loading={isLoading || isRefetching} handleClose={handleClose} data={data} handleApply={handleApply}/>
            </CustomPopover>
        </Grid>
    )
}
export default HaveCoupon
