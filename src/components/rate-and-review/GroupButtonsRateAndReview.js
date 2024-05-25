import React from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup, Stack, Tabs, Typography } from "@mui/material";
import { RestaurantDetailsNavButton } from '../food-card/FoodCard.style'
import { useTranslation } from 'react-i18next'
import { useTheme } from "@mui/styles";

const GroupButtonsRateAndReview = ({ setType, type ,is_reviewed,is_dm_reviewed,reviewItemsIsEmpty,deliveryManInfo}) => {
    const { t } = useTranslation()
    const theme=useTheme()
    const isProduct = type === 'items'
    const isDeliveryMan = type === 'delivery_man'
    return (
        <Stack
            alignItems="center"
            justifyContent="flex-start"
            direction="row"
            spacing={{ xs: 1, sm:2, md: 2.5 }}
            //gap={languageDirection === 'rtl' && '10px'}
            marginTop={{ xs: '10px', sm: '10px', md: '0px' }}
        >
            {(reviewItemsIsEmpty?.length>0 || !is_reviewed ) &&  <Typography
                onClick={() => setType("items")}
                fontSize={{ xs: "14px", sm: "16px", md: "16px" }}
                fontWeight={isProduct ? "600" : "400"}
                sx={{
                    color: isProduct
                        ? (theme) => theme.palette.neutral[1000]
                        : (theme) => theme.palette.neutral[500],
                    cursor: "pointer"
                }}
            >
                {t("Items")}
                <Typography
                    sx={{
                        borderBottom: isProduct
                            ? `3px solid ${theme.palette.primary.main}`
                            : "",
                        borderRadius: "20px",
                        marginTop: "4px"
                    }}
                ></Typography>
            </Typography>}
            {(!is_dm_reviewed ) &&
                <Typography
                    onClick={() => setType('delivery_man')}
                    fontSize={{ xs: '14px', sm: '16px', md: '16px' }}
                    fontWeight={isDeliveryMan ? '600' : '400'}
                    sx={{
                        color: isDeliveryMan
                            ? (theme) => theme.palette.neutral[1000]
                            : (theme) => theme.palette.neutral[500],
                        cursor: 'pointer',
                    }}
                >
                    {t('Delivery man')}
                    <Typography
                        sx={{
                            borderBottom: isDeliveryMan
                                ? `3px solid ${theme.palette.primary.main}`
                                : '',
                            borderRadius: '20px',
                            marginTop: '4px',
                        }}
                    ></Typography>
                </Typography>}

        </Stack>


        // <Tabs
        //     orientation="horizontal"
        //     // variant="contained"
        //     variant="scrollable"
        //     scrollButtons="auto"
        //     aria-label="scrollable auto tabs example"
        // >
        //     <ButtonGroup>
        //         <RestaurantDetailsNavButton
        //             background={type === 'items'}
        //             onClick={() => setType('items')}
        //             sx={{ width: { xs: '80px', md: '100px' } }}
        //         >
        //             {t('Items')}
        //         </RestaurantDetailsNavButton>
        //         <RestaurantDetailsNavButton
        //             // color={
        //             //     type === 'veg' ? 'primary' : 'whiteContainer'
        //             // }
        //             background={type === 'delivery_man'}
        //             onClick={() => setType('delivery_man')}
        //             sx={{ width: { xs: '80px', md: '100px' } }}
        //         >
        //             {t('Delivery man')}
        //         </RestaurantDetailsNavButton>
        //     </ButtonGroup>
        // </Tabs>
    )
}

GroupButtonsRateAndReview.propTypes = {}

export default GroupButtonsRateAndReview
