import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Stack, Typography } from "@mui/material";
import {
    CustomColouredTypography,
    CustomStackFullWidth,
    CustomTypographyBold,
} from "@/styled-components/CustomStyles.style"
import CustomImageContainer from '../CustomImageContainer'
import { CustomTypographyGray } from '../error/Errors.style'
import Divider from '@mui/material/Divider'
import CustomRatings from '../custom-ratings/CustomRatings'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from 'react-query'
import { ReviewApi } from './ReviewApi'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { onErrorResponse } from '../ErrorResponse'
import { CustomTypography } from '../custom-tables/Tables.style'
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from "@mui/styles";
import { setDeliveryManInfoByDispatch } from "@/redux/slices/searchFilter";

const DeliverymanForm = ({ data, orderId,onClose,refetchTrackData }) => {
    const theme=useTheme()
    const dispatch=useDispatch()
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const productImage = global?.base_urls?.delivery_man_image_url
    const { mutate, isLoading, error } = useMutation(
        'submit-review-deliveryman',
        ReviewApi.deliveryman
    )
    const formik = useFormik({
        initialValues: {
            rating: '',
            comment: '',
        },
        onSubmit: async (values, helpers) => {
            try {
                handleFormsubmit(values)
            } catch (err) {

            }
        },
    })
    const handleChangeRatings = (value) => {
        formik.setFieldValue('rating', value)
    }
    const handleSuccess=(response)=>{
        formik.setFieldValue('rating', 0)
        formik.setFieldValue('comment', '')
        toast.success(response?.data?.message)
        refetchTrackData()
        //onClose()
        // const restReviewItem
    }
    const handleFormsubmit = (values) => {
        const formData = {
            ...values,
            delivery_man_id: data?.id,
            order_id: orderId,
        }
        mutate(formData, {
            onSuccess:handleSuccess,
            onError: onErrorResponse,
        })
    }
    const notNow=(values) => {
        dispatch(setDeliveryManInfoByDispatch(null))
        //onClose()
    }
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
                            >
                                <CustomImageContainer
                                    src={`${productImage}/${data?.image}`}
                                    width="60px"
                                    height="60px"
                                    borderRadius="50%"
                                />
                                <Stack>
                                    <CustomTypographyBold fontSize="13px" fontWeight="600">
                                        {data?.f_name.concat(' ', data?.l_name)}
                                    </CustomTypographyBold>
                                    <Stack direction="row"  spacing={.5}>
                                        <StarIcon sx={{width:"12px",height:"12px",color:theme=>theme.palette.primary.main}}/>
                                        <Stack direction="row">
                                            <Typography fontSize="10px" color={theme.palette.neutral[500]}>
                                                {data?.avg_rating.toFixed(1)}
                                            </Typography>
                                            <Typography fontSize="10px" color={theme.palette.neutral[500]}>
                                                ({data?.rating_count} )
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </Stack>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Divider sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                        <Stack alignItems="center">
                            <CustomTypographyBold fontSize="13px" fontWeight="600">
                                {t('Rate the deliveryman')}
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
                            <Button onClick={notNow}>
                                {t("Not Now")}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </CustomStackFullWidth>
    )
}

DeliverymanForm.propTypes = {}

export default DeliverymanForm
