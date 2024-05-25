import React from 'react'
import phoneIcon from "../../../../../public/static/profile/phoneInput.png"
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import CustomPhoneInput from '../../../CustomPhoneInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import CustomAlert from '../../../alert/CustomAlert'
import LoadingButton from '@mui/lab/LoadingButton'
import { usePostRegisterInfo } from "@/hooks/react-query/social-login/usePostRegisterInfo"
import { onErrorResponse, onSingleErrorResponse } from '../../../ErrorResponse'
import CustomImageContainer from "../../../CustomImageContainer";
import { CustomBoxForModal } from "../../auth.style";

const PhoneInputForm = (props) => {
    const { userInfo, jwtToken, medium, handleRegistrationOnSuccess, global, setModalFor } = props
    const { t } = useTranslation()
    const theme = useTheme();
    const { mutate, isLoading } = usePostRegisterInfo()
    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required(t('Please give a phone number'))
                .min(10, 'number must be 10 digits'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                handleOnSubmitFormik(values)
            } catch (err) { }
        },
    })
    const handleOnSubmitFormik = (values) => {
        const info = {
            email: userInfo?.email,
            token: jwtToken?.credential,
            unique_id: jwtToken?.clientId,
            medium: medium,
            phone: values.phone,
        }
        mutate(info, {
            onSuccess: (response) => {
                handleRegistrationOnSuccess(response?.token)
            },
            onError: onErrorResponse,
        })
    }
    const handleOnChange = (value) => {
        formik.setFieldValue('phone', `+${value}`)
    }
    return (
        <Stack padding="50px 20px 60px">
            <form onSubmit={formik.handleSubmit} noValidate>
                <CustomStackFullWidth spacing={5} justifyContent="center" alignItems='center'>
                    <CustomImageContainer
                        src={phoneIcon.src}
                        width="80px" height="80px"
                    />
                    <Typography fontSize="14px" textAlign="center" color={theme.palette.neutral[1000]}>
                        {t("Provide a valid phone number to complete your sign up")}
                    </Typography>
                    <CustomPhoneInput
                        value={formik.values.phone}
                        onHandleChange={handleOnChange}
                        initCountry={global?.country}
                        touched={formik.touched.phone}
                        errors={formik.errors.phone}
                        rtlChange="true"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isLoading}
                    >
                        {t('Continue')}
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
                </CustomStackFullWidth>
            </form>
        </Stack>
    )
}

PhoneInputForm.propTypes = {}

export default PhoneInputForm
