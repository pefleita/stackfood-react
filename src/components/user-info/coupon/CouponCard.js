import React, { useState } from 'react'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import { Button, IconButton, Stack, Typography } from "@mui/material";
import CustomImageContainer from '../../CustomImageContainer'
import percentageCoupon from '../../../../public/static/profile/couponper.svg'
import CouponVector from './CouponVector'
import CouponCopy from './CouponCopy'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { getAmount, getProductDiscount } from "@/utils/customFunctions";
import { t } from 'i18next'
import CustomCopyWithTooltip from './CustomCopyWithToolTip'
import Card from '@mui/material/Card'
import amount_coupon from '../../../../public/static/profile/amountcoupon.svg'
import { CouponTypography } from '../loyality/Loyality.style'
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";

const CouponCard = ({ coupon,fromCheckout,getCouponCodeFromCard ,loading}) => {
    const theme = useTheme()
    const valid_until = t('Valid until')
    const min=t("*min purchase")
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const imageHandler = () => {
        if (coupon?.discount_type === 'percent') {
            return (
                <CustomImageContainer
                    src={percentageCoupon.src}
                    width="30px"
                    height="30px"
                />
            )
        } else {
            return (
                <Stack position="relative">
                    <CouponTypography>{currencySymbol}</CouponTypography>
                    <CustomImageContainer
                        src={amount_coupon.src}
                        width="30px"
                        height="30px"
                    />
                </Stack>
            )
        }
    }
    return (
        <Card
            elevation={9}
            sx={{
                padding: '.5rem',
                boxShadow:
                    '0px 0px 2px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.05)',
                position: ' relative',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.cardBackground1
                        : theme.palette.neutral[100],
                '&::after': {
                    position: ' absolute',
                    content: '""',
                    height: '40px',
                    right: '-20px',
                    borderRadius: '40px',
                    zIndex: '1',
                    top: '30%',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? theme.palette.cardBackground2
                            : theme.palette.neutral[200],
                    width: '40px',
                },
                '&::before': {
                    position: ' absolute',
                    content: '""',
                    height: '40px',
                    left: '-20px',
                    borderRadius: '40px',
                    zIndex: '1',
                    top: '30%',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? theme.palette.cardBackground2
                            : theme.palette.neutral[200],
                    width: '40px',
                    boxShadow:
                        '0px 0px 2px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.05)',
                },
            }}
        >
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                direction="row"
                spacing={2}
            >
                <Stack
                    sx={{ paddingInlineStart: '15px' }}
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    maxWidth="100px"
                >
                    {imageHandler()}
                    <Typography
                        fontSize={{ xs: '13px', sm: '15px', md: '16px' }}
                        fontWeight="600"
                        textAlign="center"
                    >
                        {coupon?.coupon_type === 'free_delivery'
                            ? 'Free Delivery'
                            : coupon?.discount_type === 'percent'
                                ? `${coupon?.discount} %`
                                : getAmount(
                                    coupon.discount,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}{' '}
                        {coupon?.coupon_type === 'free_delivery'
                            ? ''
                            : t('OFF')}
                    </Typography>
                </Stack>
                <CouponVector />
                <CustomStackFullWidth spacing={0.5} padding="8px" justifyContent="center" alignItems="center">
                    {coupon?.coupon_type === 'restaurant_wise' && (
                        <Typography fontSize="12px" fontWeight="500">
                            {coupon?.data}
                        </Typography>
                    )}
                    <Typography   fontSize="12px" fontWeight="500" textAlign="center" color={theme.palette.neutral[1000]}>
                        {`${ moment(coupon?.start_date).format('DD MMM, YYYY')} to ${moment(coupon?.expire_date).format('DD MMM, YYYY')}`}
                    </Typography>
                    <Typography  fontSize="10px" fontWeight="500" color={theme.palette.neutral[500]}>
                        {`${min} ${ getAmount(
                            coupon?.min_purchase,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}`}
                    </Typography>
                    {fromCheckout &&
                    <LoadingButton variant="contained"
                                   // loading={loading}
                            onClick={()=>getCouponCodeFromCard(coupon?.code)}
                    sx={{padding:"4px 4px",width:"80px",fontSize:'12px'}}>
                        {("Apply")}
                    </LoadingButton>
                    }
                </CustomStackFullWidth>

                <Stack alignSelf="start">
                    {!fromCheckout &&  <IconButton>
                        <CustomCopyWithTooltip t={t} value={coupon?.code} />
                    </IconButton>}

                </Stack>
                {/*<CouponPercentage/>*/}
            </CustomStackFullWidth>
        </Card>
    )
}

export default CouponCard
