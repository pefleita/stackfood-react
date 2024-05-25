import React, { useState } from "react";
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import SignUpValidation from '../auth/SignUpValidation'
import {
    CustomColouredTypography,
    CustomFullDivider,
    CustomStackFullWidth,
    CustomTypographyBold,
} from "@/styled-components/CustomStyles.style"
import { Button, Grid, Stack } from "@mui/material";
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTranslation } from 'react-i18next'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import { CustomTypographyGray } from '../error/Errors.style'
import CustomRatings from '../custom-ratings/CustomRatings'
import Divider from '@mui/material/Divider'
import CustomImageContainer from '../CustomImageContainer'
import { useSelector } from 'react-redux'
import { getAmount } from "@/utils/customFunctions"
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { ReviewApi } from './ReviewApi'
import { onErrorResponse } from '../ErrorResponse'

const ItemForm = ({ data,notNow,id,refetchOrderReview,refetchTrackData ,setReviewedItem}) => {
    const { t } = useTranslation()

    const { global } = useSelector((state) => state.globalSettings)
    const productImage = global?.base_urls?.product_image_url
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint
    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { mutate, isLoading, error } = useMutation(
        'submit-review',
        ReviewApi.submit
    )
    const formik = useFormik({
        initialValues: {
            rating: '',
            comment: '',
        },
        onSubmit: async (values, helpers) => {
            try {

                handleFormsubmit(values)
            } catch (err) {}
        },
    })
    const handleChangeRatings = (value) => {
        formik.setFieldValue('rating', value)
    }
    const handleSuccess=(response)=>{
        setReviewedItem(data)
        // refetchOrderReview()
        refetchTrackData()
        formik.setFieldValue('rating', 0)
        formik.setFieldValue('comment', '')
        toast.success(response?.data?.message)
        // CustomerToaster()
        // const restReviewItem
    }
    const handleFormsubmit = (values) => {
        const formData = {
            ...values,
            delivery_man_id: null,
            food_id: data?.food_id,
            order_id: id,
        }
        mutate(formData, {
            onSuccess:handleSuccess,
            onError: onErrorResponse,
        })
    }
    const languageDirection = localStorage.getItem('direction')
    return (
        <CustomStackFullWidth>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <CustomStackFullWidth
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}
                                gap={
                                    languageDirection === 'rtl'
                                        ? '1rem'
                                        : '0rem'
                                }
                            >
                                <CustomImageContainer
                                    src={`${productImage}/${data?.food_details?.image}`}
                                    width="60px"
                                    height="60px"
                                    borderRadius="5px"
                                    objectFit="cover"
                                />
                                <Stack>
                                    <CustomTypographyBold fontSize="13px" fontWeight="600">
                                        {data?.food_details?.name}
                                    </CustomTypographyBold>
                                    <CustomTypographyBold fontSize="12px" fontWeight="400">
                                        {data?.food_details?.restaurant_name}
                                    </CustomTypographyBold>
                                </Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <CustomTypographyBold fontSize="12px" fontWeight="600">
                                    {getAmount(
                                        data?.food_details?.price,
                                        currencySymbolDirection,
                                        currencySymbol,
                                        digitAfterDecimalPoint
                                    )}
                                </CustomTypographyBold>
                            </Stack>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Divider sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                        <Stack alignItems="center">
                            <CustomTypographyBold fontSize="14px" fontWeight="700">
                                {t('Rate the food')}
                            </CustomTypographyBold>
                            <CustomRatings
                                handleChangeRatings={handleChangeRatings}
                                ratingValue={formik.values.rating}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                        <Stack alignItems="center" spacing={1}>
                            <CustomTypographyGray sx={{ fontSize: '14px' }} fontweight="400">
                                {t('Share your valuable feedback')}
                            </CustomTypographyGray>
                            <CustomTextFieldWithFormik
                                type="text"
                                label={t('Type here')}
                                touched={formik.touched.comment}
                                errors={formik.errors.comment}
                                fieldProps={formik.getFieldProps('comment')}
                                multiline
                                rows={2}
                                // onChangeHandler={RestaurantNameHandler}
                                value={formik.values.comment}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <LoadingButton
                                fullWidth
                                variant="contained"
                                type="submit"
                                loading={isLoading}
                                // sx={{ width: '100%' }}
                            >
                                {t('Submit')}
                            </LoadingButton>
                            <Button onClick={()=>notNow(data?.id)}>
                                {t("Not Now")}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </CustomStackFullWidth>
    )
}

ItemForm.propTypes = {}

export default ItemForm
