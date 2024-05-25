import React from "react";
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/styles";
import CouponCard from "@/components/user-info/coupon/CouponCard";
import NoCouponSvg from "@/components/checkout-page/order-summary/NoCouponSvg";
import { useSelector } from "react-redux";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CheckOutPromo = ({ data, handleApply ,handleClose,loading}) => {
    const { global } = useSelector((state) => state.globalSettings);
    const theme = useTheme();
    const subTitle = t("Please add manually or collect promo from");
    return (
        <CustomStackFullWidth spacing={1.5} sx={{position:"relative"}} >
            <IconButton
                sx={{position:"absolute",top:-20,right:-10}}
                // loading={isLoading}
                loadingPosition="start"
                variant="contained"
                onClick={handleClose}
            >
                <CloseIcon sx={{fontSize:"16px"}}/>
            </IconButton>
            <Typography fontSize="14px" color={theme.palette.neutral[1000]}>
                {t("Available Promo")}
            </Typography>
                <Stack sx={{
                    backgroundColor: theme => theme.palette.neutral[300],
                    padding: "10px",
                    borderRadius: "5px",
                    width:"100%"
                }}
                       spacing={1}>
                    {data?.data?.length > 0 ? (
                        <>
                            {data?.data?.map((item,index) => (
                                <CouponCard key={index} loading={loading} getCouponCodeFromCard={handleApply} coupon={item} fromCheckout />
                            ))}
                        </>
                    ) : (
                        <Stack justifyContent="center" width="100%" alignItems="center" spacing={1}>
                            <NoCouponSvg />
                            <Typography fontSize="14px" fontWeight="500">{t("No Promo Available!")}</Typography>
                            <Typography fontSize="12px" color={theme.palette.neutral[400]}>{t(` ${subTitle} ${global?.business_name} `)}</Typography>
                        </Stack>
                    )}
                </Stack>
        </CustomStackFullWidth>
    );
};

export default CheckOutPromo;
