import React, { useState } from 'react'
import {
    Grid,
    Box,
    TextField,
    Typography,
    Card,
    OutlinedInput,
    Stack,
    Button,
} from '@mui/material'
import { SaveButton, ButtonBox, CustomDivWithBorder, CustomProfileTextfield } from './Profile.style'
import { useFormik } from 'formik'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTranslation } from 'react-i18next'
import ValidationSechemaProfile from './Validation'
import * as Yup from 'yup'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { AccountCircle } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

const AccountInformation = ({ data, formSubmit }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const { f_name, l_name, phone, email } = data
    const profileFormik = useFormik({
        initialValues: {
            f_name: f_name ? f_name : '',
            l_name: l_name ? l_name : '',
            email: email ? email : '',
            phone: phone ? phone : '',
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
                .required(t('Confirm Password'))
                .oneOf([Yup.ref('password'), null], t('Passwords must match')),
        }),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitOnSuccess(values)
                profileFormik.values.password = ""
                profileFormik.values.confirm_password = ""
            } catch (err) { }
        },
    })
    const formSubmitOnSuccess = (values) => {
        setShowPassword(false)
        setConfirmShowPassword(false)
        formSubmit(values)
    }
    return (
        <>
            <Typography
                fontSize="16px"
                fontWeight="500"
                color={theme.palette.neutral[1000]}
            >
                {t('Change Password')}
            </Typography>
            <CustomDivWithBorder>
                <form noValidate onSubmit={profileFormik.handleSubmit}>
                    <Grid
                        container
                        md={12}
                        xs={12}
                        spacing={2}
                    >
                        <Grid item md={5} xs={12}>
                            <CustomProfileTextfield
                                required
                                id="password"
                                variant="outlined"
                                placeholder={t("6+ Character")}
                                value={profileFormik.values.password}
                                onChange={profileFormik.handleChange}
                                name="password"
                                label={t('Password')}
                                type={showPassword ? 'text' : 'password'}
                                InputLabelProps={{ shrink: true }}
                                error={
                                    profileFormik.touched.password &&
                                    Boolean(profileFormik.errors.password)
                                }
                                helperText={
                                    profileFormik.touched.password &&
                                    profileFormik.errors.password
                                }
                                InputProps={{
                                    endAdornment: (
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
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <CustomProfileTextfield
                                required
                                id="confirm_password"
                                label={t('Confirm Password')}
                                placeholder={t("6+ Character")}
                                variant="outlined"
                                name="confirm_password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={profileFormik.values.confirm_password}
                                onChange={profileFormik.handleChange}
                                InputLabelProps={{ shrink: true }}
                                error={
                                    profileFormik.touched.confirm_password &&
                                    Boolean(profileFormik.errors.confirm_password)
                                }
                                helperText={
                                    profileFormik.touched.confirm_password &&
                                    profileFormik.errors.confirm_password
                                }
                                touched={profileFormik.touched.confirm_password}
                                InputProps={{
                                    endAdornment: (
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
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Stack>
                                <SaveButton fullWidth variant="contained" type="submit">
                                    {t('Change')}
                                </SaveButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </CustomDivWithBorder>
        </>
    )
}

export default AccountInformation
