import React, { useRef, useState } from 'react'
import { Box, Stack, Typography, TextField, useTheme } from '@mui/material'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
    StyledInputBase,
} from '../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import OutlinedInput from '@mui/material/OutlinedInput'
import LoadingButton from '@mui/lab/LoadingButton'
import { useOtp } from '../../../hooks/react-query/config/forgot-password/useOtp'
import * as Yup from 'yup'
import OtpInput from "react-otp-input";
import otpImage from "@/assets/images/otp.svg"
import CustomImageContainer from '@/components/CustomImageContainer'
import { CustomToaster } from '@/components/custom-toaster/CustomToaster'

const OtpForm = ({ data, formSubmitHandler, isLoading, goBack }) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const [otp, setOtp] = useState("");
    const otpFormik = useFormik({
        initialValues: {
            reset_token: '',
            phone: data?.phone,
        },
        validationSchema: Yup.object({
            reset_token: Yup.string().required(t('field is empty')),
        }),
        onSubmit: async (values) => {
            try {
                formSubmitHandler(values)
            } catch (err) {

            }
        },
    })

    return (
        <CustomPaperBigCard width="auto" noboxshadow="true">
            <CustomStackFullWidth maxWidth="330px" gap="25px" alignItems="center" justifyContent="center">
                <CustomImageContainer
                    src={otpImage.src}
                    alt='logo'
                    width="160px"
                    objectFit='contained'
                />
                <Typography textAlign="center">
                    {t('Submit the OTP code sent to your registered phone number and verify')}
                </Typography>
                {/* <Typography>{data?.phone}</Typography> */}
                <form onSubmit={otpFormik.handleSubmit}>
                    <Stack
                        padding="0 20px"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {/* <StyledInputBase
                            // inputRef={input => input && input.focus()}
                            inputProps={{ maxLength: 4 }}
                            width="100px"
                            onChange={otpFormik.handleChange}
                            value={otpFormik.values.reset_token}
                            name="reset_token"
                            error={
                                otpFormik.touched.reset_token &&
                                Boolean(otpFormik.errors.reset_token)
                            }
                            helperText={
                                otpFormik.touched.reset_token &&
                                otpFormik.errors.reset_token
                            }
                            touched={otpFormik.touched.reset_token}
                            required
                        /> */}
                        <Box
                            sx={{
                                div: {
                                    gap: "20px",
                                },
                                input: {
                                    flexGrow: "1",
                                    background: "transparent",
                                    color: theme.palette.primary.main,
                                    fontSize: "16px",
                                    outline: "none",
                                    height: "45px",
                                    width: "45px !important",
                                    borderRadius: "10px",
                                    border: "1.6px solid " + theme.palette.primary.main,
                                },
                            }}
                        >
                            <OtpInput
                                value={otpFormik.values.reset_token}
                                onChange={(otp) => otpFormik.setFieldValue('reset_token', otp)}
                                numInputs={4}
                                onBlur={otpFormik.handleBlur('reset_token')}
                                renderInput={(props) => <input {...props} />}
                                error={
                                    otpFormik.touched.reset_token &&
                                    Boolean(otpFormik.errors.reset_token)
                                }
                            />
                            {/* <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                renderInput={(props) => <input {...props} />}
                            /> */}
                        </Box>

                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                            disabled={!otpFormik.values.reset_token || otpFormik.values.reset_token.length !== 4}
                        >
                            {t('Verify')}
                        </LoadingButton>
                    </Stack>
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
                                goBack()
                            }}>
                            {t("Go Back")}
                        </Typography>
                    </Stack>
                </form>
            </CustomStackFullWidth>
        </CustomPaperBigCard>
    )
}
export default OtpForm
