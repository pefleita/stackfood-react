import React, { useState } from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { CustomPaperBigCard, CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import { useResetPassword } from '../../../hooks/react-query/config/forgot-password/useResetPassword'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import newPasswordImage from "@/assets/images/new_password.svg"
import CustomImageContainer from '@/components/CustomImageContainer'
import { CustomSigninOutLine } from '../sign-in'
import { alpha } from '@material-ui/core'
import LockIcon from '@mui/icons-material/Lock';
import { CustomTypography } from '@/components/custom-tables/Tables.style'

const NewPassword = ({ data, goBack, setModalFor }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const { t } = useTranslation()
    const router = useRouter()
    const theme = useTheme()

    const newPassFormik = useFormik({
        initialValues: {
            reset_token: data.reset_token,
            phone: data.phone,
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required(t('No password provided.'))
                .min(
                    6,
                    t('Password is too short - should be 6 chars minimum.')
                ),
            confirm_password: Yup.string()
                .required(t('No Confirm Password provided.'))
                .oneOf([Yup.ref('password'), null], t('Passwords must match')),
        }),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitHandler(values)
            } catch (err) { }
        },
    })
    const onSuccessHandler = (res) => {
        if (res) {
            toast.success(res.message)
            // router.push('/home')
            setModalFor('sign-in')
        }
    }
    const { mutate, isLoading } = useResetPassword(onSuccessHandler)
    const formSubmitHandler = (values) => {
        mutate(values, { onSuccess: onSuccessHandler })
    }
    return (
        <CustomPaperBigCard width="auto" padding="0" noboxshadow="true">
            <CustomStackFullWidth gap="40px" alignItems="center" justifyContent="center">
                <Stack gap="8px" alignItems="center">
                    <CustomImageContainer
                        src={newPasswordImage.src}
                        alt='logo'
                        width="100px"
                        objectFit='contained'
                    />
                    <Typography fontSize="16px" fontWeight={600}>{t('Number verification is successful')}</Typography>
                    <Typography fontSize="14px" sx={{ color: theme.palette.neutral[400] }}>{t('Please type your new password')}</Typography>
                </Stack>
                <form noValidate onSubmit={newPassFormik.handleSubmit}>
                    <CustomStackFullWidth gap="40px">
                        <FormControl

                            variant="outlined"
                            fullWidth
                        >
                            <InputLabel
                                required
                                sx={{
                                    color: (theme) =>
                                        theme.palette.neutral[600],
                                    fontSize: "14px"

                                }}
                                htmlFor="outlined-adornment-password"
                            >
                                {t('Password')}
                            </InputLabel>
                            <CustomSigninOutLine
                                required
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder={t("Enter your password")}
                                value={newPassFormik.values.password}
                                onChange={newPassFormik.handleChange}
                                error={
                                    newPassFormik.touched.password &&
                                    Boolean(newPassFormik.errors.password)
                                }
                                helperText={
                                    newPassFormik.touched.password &&
                                    newPassFormik.errors.password
                                }
                                touched={newPassFormik.touched.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prevState) => !prevState
                                                )
                                            }
                                            //   onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                startAdornment={<InputAdornment position="start" sx={{ marginInlineEnd: "0px !important" }}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="start"
                                    >
                                        <LockIcon sx={{ fontSize: "1.2rem", color: theme => alpha(theme.palette.neutral[400], .5) }} />
                                    </IconButton>
                                </InputAdornment>}
                                label="Password"
                            />
                            {newPassFormik.errors.password && (
                                <CustomTypography
                                    variant="subtitle2"
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.error.main,
                                    }}
                                >
                                    {newPassFormik.errors.password}
                                </CustomTypography>
                            )}
                        </FormControl>
                        {/* <FormControl
                            variant="outlined"
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                {t('Password')}
                            </InputLabel>
                            <OutlinedInput
                                require
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={newPassFormik.values.password}
                                onChange={newPassFormik.handleChange}
                                error={
                                    newPassFormik.touched.password &&
                                    Boolean(newPassFormik.errors.password)
                                }
                                helperText={
                                    newPassFormik.touched.password &&
                                    newPassFormik.errors.password
                                }
                                touched={newPassFormik.touched.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prevState) => !prevState
                                                )
                                            }
                                            //   onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={t('Password')}
                            />
                            {newPassFormik.errors.password && (
                                <FormHelperText sx={{ color: '#FF686A' }}>
                                    {newPassFormik.errors.password}
                                </FormHelperText>
                            )}
                        </FormControl> */}
                        <FormControl

                            variant="outlined"
                            fullWidth
                        >
                            <InputLabel
                                required
                                sx={{
                                    color: (theme) =>
                                        theme.palette.neutral[600],
                                    fontSize: "14px"

                                }}
                                htmlFor="outlined-adornment-password"
                            >
                                {t('Confirm Password')}
                            </InputLabel>
                            <CustomSigninOutLine
                                require
                                type={showConfirmPassword ? 'text' : 'password'}
                                label={t('Confirm Password')}
                                id="confirm_password"
                                name="confirm_password"
                                value={newPassFormik.values.confirm_password}
                                onChange={newPassFormik.handleChange}
                                placeholder={t("Enter your password")}
                                error={
                                    newPassFormik.touched.confirm_password &&
                                    Boolean(
                                        newPassFormik.errors.confirm_password
                                    )
                                }
                                helperText={
                                    newPassFormik.touched.confirm_password &&
                                    newPassFormik.errors.confirm_password
                                }
                                touched={newPassFormik.touched.confirm_password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setConfirmShowPassword(
                                                    (prevState) => !prevState
                                                )
                                            }
                                            //   onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                startAdornment={<InputAdornment position="start" sx={{ marginInlineEnd: "0px !important" }}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="start"
                                    >
                                        <LockIcon sx={{ fontSize: "1.2rem", color: theme => alpha(theme.palette.neutral[400], .5) }} />
                                    </IconButton>
                                </InputAdornment>}
                            />
                            {newPassFormik.errors.confirm_password && (
                                <CustomTypography
                                    variant="subtitle2"
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.error.main,
                                    }}
                                >
                                    {newPassFormik.errors.confirm_password}
                                </CustomTypography>
                            )}
                        </FormControl>
                        {/* <FormControl
                            variant="outlined"
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                {t('Confirm Password')}
                            </InputLabel>
                            <OutlinedInput
                                require
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirm_password"
                                name="confirm_password"
                                value={newPassFormik.values.confirm_password}
                                onChange={newPassFormik.handleChange}
                                error={
                                    newPassFormik.touched.confirm_password &&
                                    Boolean(
                                        newPassFormik.errors.confirm_password
                                    )
                                }
                                helperText={
                                    newPassFormik.touched.confirm_password &&
                                    newPassFormik.errors.confirm_password
                                }
                                touched={newPassFormik.touched.confirm_password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setConfirmShowPassword(
                                                    (prevState) => !prevState
                                                )
                                            }
                                            //   onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={t('Confirm Password')}
                            />
                            {newPassFormik.errors.confirm_password && (
                                <FormHelperText sx={{ color: '#FF686A' }}>
                                    {newPassFormik.errors.confirm_password}
                                </FormHelperText>
                            )}
                        </FormControl> */}
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                        // loading={isLoading}
                        >
                            {t('Update')}
                        </LoadingButton>
                    </CustomStackFullWidth>
                </form>
                {/* <LoadingButton
                    onClick={goBack}
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                // loading={isLoading}
                >
                    {t('Back')}
                </LoadingButton> */}
            </CustomStackFullWidth>
        </CustomPaperBigCard >
    )
}
export default NewPassword
