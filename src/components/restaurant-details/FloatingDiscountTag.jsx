import React from "react";
import { Stack } from "@mui/system";
import DiscountCircleTagSvg from "@/components/restaurant-details/DiscountCircleTagSvg";
import { alpha, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { getAmount, getDiscountForTag, restaurantDiscountTag } from "@/utils/customFunctions";
import { t } from "i18next";

const FloatingDiscountTag = ({resDiscount,freeDelivery}) => {
   const theme=useTheme()
 const restaurantDiscountTag = (
        restaurantDiscount,
        freeDelivery,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint
    ) => {
        const off = t('% off')
        const amountOff = t('off')
        if (restaurantDiscount?.discount_type === 'percent') {
            return `${getDiscountForTag(restaurantDiscount)}${off}`
        }
        if (restaurantDiscount?.discount_type === 'amount') {
            return `${getAmount(
                restaurantDiscount.discount,
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )}${amountOff}`
        } else return null
    }
    return (
         <Stack
           sx={{
            position: "fixed",
            right: 20,
            top: { xs:"60%", md:"55%" },
            cursor: "pointer",
            zIndex: "999",
           }}>
             <Stack sx={{
                 borderRadius:"50%",
                 //filter:"drop-shadow(0px 12px 25px rgba(0, 0, 0, 0.10))",
                 position: "relative",
                 "&::before": {
                     position: "absolute",
                     content:"''",
                     inset:'2px',
                     background:"#FFF3E7",
                     borderRadius:'50%',
                     zIndex:'2'
                 },
                 "&::after": {
                     position: "absolute",
                     content:"''",
                     inset:'0',
                     background: "linear-gradient(284deg, #FF8200 9.64%, rgba(255, 130, 0, 0.00) 93.09%)",
                     borderRadius:'50%',
                     animation: "App-logo-spin 2s linear infinite"
                 },
                 "svg": {
                     position: "relative",
                     zIndex: '3'
                 }
             }}>
                 <DiscountCircleTagSvg/>
                 <Stack sx={{ position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     zIndex:'4'
                 }}>
                  <Typography fontSize="14px" fontWeight="500" color={theme.palette.primary.main} textAlign="center" textTransform="uppercase" >
                      {restaurantDiscountTag(resDiscount,freeDelivery)}
                      {/*{restaurantDiscount}*/}
                  </Typography>
                 </Stack>
             </Stack>
        </Stack>
    );
};

export default FloatingDiscountTag;
