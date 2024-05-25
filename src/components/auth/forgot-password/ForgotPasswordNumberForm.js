import React from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import CustomPhoneInput from '../../CustomPhoneInput'
import { useSelector } from 'react-redux'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForgotPassword } from '../../../hooks/react-query/config/forgot-password/useForgotPassword'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { onErrorResponse } from '../../ErrorResponse'
import forgotPasswordImage from '../../../assets/images/forgotPasswordImage.svg'
import CustomImageContainer from '../../CustomImageContainer'
const ForgotPasswordNumberForm = ({ data, goNext, handleFirstForm, setModalFor }) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const { global, token } = useSelector((state) => state.globalSettings)
    const phoneFormik = useFormik({
        initialValues: {
            phone: data ? data.phone : '',
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required(t('Please give a phone number'))
                .min(10, 'number must be 10 digits'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitHandler(values)
            } catch (err) { }
        },
    })

    const onSuccessHandler = (res) => {
        if (res) {
            goNext()
            toast.success(res.message)
        }
    }

    const { mutate, isLoading } = useForgotPassword({
        onSuccessHandler,
        onError: (errors) => {
            onErrorResponse(errors)
        },
    })
    const formSubmitHandler = (values) => {
        handleFirstForm(values)
        mutate(values, {
            onSuccess: onSuccessHandler,
            onError: onErrorResponse,
        })
    }
    const handleOnChange = (value) => {
        phoneFormik.setFieldValue('phone', `+${value}`)
    }
    return (
        <Stack padding={{ xs: "15", sm: "30px 35px" }} >
            <CustomStackFullWidth alignItems="center" gap="20px" maxWidth="340px">
                <CustomImageContainer
                    src={forgotPasswordImage.src}
                    alt='logo'
                    width="160px"
                    objectFit='contained'
                />
                <Typography fontSize="16px" fontWeight={600} sx={{ color: theme.palette.text.formHeader }}>
                    {t('Forgot Password')}
                </Typography>
                <Typography fontSize="14px" sx={{ textAlign: "center", color: theme.palette.neutral[600] }}>
                    {t('Don’t worry! Give your registered number & get OTP to update your password.')}
                </Typography>
                <CustomStackFullWidth>
                    <form noValidate onSubmit={phoneFormik.handleSubmit}>
                        <CustomPhoneInput
                            value={phoneFormik.values.phone}
                            onHandleChange={handleOnChange}
                            initCountry={global?.country}
                            touched={phoneFormik.touched.phone}
                            errors={phoneFormik.errors.phone}
                            rtlChange="true"
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                        >
                            {t('GET OTP')}
                        </LoadingButton>
                        <Stack mt="10px">
                            <Typography
                                textAlign="center"
                                sx={{
                                    cursor: "pointer",
                                    color: theme.palette.neutral[500],
                                    "&:hover": {
                                        color: theme.palette.primary.main,
                                    }
                                }}
                                onClick={() => {
                                    setModalFor('sign-in')
                                    // goNext()
                                }}>
                                {t("Go Back")}
                            </Typography>
                        </Stack>
                    </form>
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </Stack>
    )
}
export default ForgotPasswordNumberForm
