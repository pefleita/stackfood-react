import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import { AuthApi } from "@/hooks/react-query/config/authApi"
import { useTheme } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'
import { useWishListGet } from "@/hooks/react-query/config/wish-list/useWishListGet"
import CustomPhoneInput from '../../CustomPhoneInput'
import 'react-phone-input-2/lib/material.css'
import { useTranslation } from 'react-i18next'
import {
    CustomLink,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { setWishList } from "@/redux/slices/wishList"
import CustomImageContainer from '../../CustomImageContainer'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { CustomBoxForModal } from '../auth.style'
import { ProfileApi } from "@/hooks/react-query/config/profileApi"
import { setUser } from "@/redux/slices/customer"
import SocialLogins from './social-login/SocialLogins'
import { RTL } from '../../RTL/RTL'
import { loginSuccessFull } from "@/utils/ToasterMessages"
import { onErrorResponse, onSingleErrorResponse } from '../../ErrorResponse'
import CustomModal from '../../custom-modal/CustomModal'
import OtpForm from '../forgot-password/OtpForm'
import { useVerifyPhone } from "@/hooks/react-query/otp/useVerifyPhone"
import { setToken } from "@/redux/slices/userToken"
import { getGuestId } from "../../checkout-page/functions/getGuestUserId";
import LockIcon from '@mui/icons-material/Lock';
import { Stack, alpha, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomToaster } from '@/components/custom-toaster/CustomToaster'



export const CustomSigninOutLine = styled(OutlinedInput)(({ theme, width }) => ({
    //maxWidth: '355px',
    width: width ? width : "355px",
    borderRadius: "4px",
    "&.MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-input": {
            padding: "12.5px 0px !important",
            fontSize: "14px",
            fontWeight: "400",
            alignItems: "center"

        } // Adjust the padding values as needed
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}))

const SignInPage = ({
    setSignInPage,
    handleClose,
    signInSuccess,
    setModalFor, cartListRefetch,
    setJwtToken, setUserInfo, handleSuccess, setMedium, zoneid
}) => {
    const [showPassword, setShowPassword] = useState(false)
    // const [profileData,setProfileData]=useState({})
    const { t } = useTranslation()
    // const [tempToken,setTempToken]=useState("")
    const theme = useTheme()
    const dispatch = useDispatch()
    const { global } = useSelector((state) => state.globalSettings)
    const businessLogo = global?.base_urls?.business_logo_url
    const router = useRouter()
    const guestId = getGuestId()
    const [isRemember, setIsRemember] = useState(false)
    const [openModal, setModalOpen] = useState(false)
    const [openOtpModal, setOpenOtpModal] = useState(false)
    const [otpData, setOtpData] = useState({ phone: '' })
    const [mainToken, setMainToken] = useState(null)

    let userDatafor = undefined
    if (typeof window !== 'undefined') {
        userDatafor = JSON.parse(localStorage.getItem('userDatafor'))
    }
    const loginFormik = useFormik({
        initialValues: {
            phone: userDatafor ? userDatafor.phone : '',
            password: userDatafor ? userDatafor.password : '',
            tandc: false,
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required(t('Please give a phone number'))
                .min(10, 'number must be 10 digits'),
            password: Yup.string()
                .min(6, t('Password is too short - should be 6 chars minimum.'))
                .required(t('Password is required')),
            // tandc: Yup.boolean().oneOf([true], 'Message'),
            // termsOfService:Yup.boolean()
            //     .oneOf([true], "You must accept the terms and conditions").required(t("Password is required"))
        }),
        onSubmit: async (values, helpers) => {
            try {
                if (isRemember) {
                    localStorage.setItem('userDatafor', JSON.stringify(values))
                }
                formSubmitHandler(values)
            } catch (err) { }
        },
    })

    const userOnSuccessHandler = (res) => {
        dispatch(setUser(res.data))
        handleClose?.()
        //handleClose()
    }
    const {
        data,
        isError,
        refetch: profileRefatch,
    } = useQuery(['profile-info'], ProfileApi.profileInfo, {
        enabled: false,
        onSuccess: userOnSuccessHandler,
        onError: onSingleErrorResponse,
    })
    const onSuccessHandler = (res) => {
        dispatch(setWishList(res))
    }

    const { refetch: wishlistRefetch } = useWishListGet(onSuccessHandler)
    useEffect(() => {
        if (otpData?.phone !== '') {
            setOpenOtpModal(true)
        }
    }, [otpData])

    const handleTokenAfterSignIn = async (response) => {
        if (response?.data) {
            localStorage.setItem('token', response?.data?.token)
            zoneid && await wishlistRefetch()
            await profileRefatch()
            await cartListRefetch();
            CustomToaster('success', loginSuccessFull);
            //always set this dispatch at end line. otherwise wishlist and profile will not refetch. This dispatch closes the modal.
            dispatch(setToken(response?.data?.token))
            if (router.pathname === "/order" || router.pathname === "/forgot-password") {
                router.push("/home")
            }
            //dispatch(cart(setItemIntoCart()));
        }
    }

    const {
        mutate: loginMutation,
        isLoading,
        error,
    } = useMutation('sign-in', AuthApi.signIn)

    const formSubmitHandler = (values) => {
        const newValues = { ...values, guest_id: guestId }
        loginMutation(newValues, {
            onSuccess: async (response) => {
                if (global?.customer_verification) {
                    if (
                        Number.parseInt(response?.data?.is_phone_verified) === 1
                    ) {
                        handleTokenAfterSignIn(response)
                        handleClose?.()
                    } else {
                        setOtpData({ phone: values?.phone })
                        setMainToken(response)
                    }
                } else {
                    handleTokenAfterSignIn(response)

                }
            },
            onError: onErrorResponse,
        })
    }

    const handleOnChange = (value) => {
        loginFormik.setFieldValue('phone', `+${value}`)
    }

    const gotoForgotPassword = () => {
        router.push('/forgot-password')
        handleClose()
    }
    const handleCheckbox = (e) => {
        // if (e.target.checked) {
        //     setIsChecked(false)
        // }
        loginFormik.setFieldValue('tandc', e.target.checked)
    }

    const rememberMeHandleChange = (e) => {
        if (e.target.checked) {
            setIsRemember(true)
        }
    }
    const handleClick = () => {
        window.open('/terms-and-conditions')
        // handleClose()
    }
    const { mutate: otpVerifyMutate, isLoading: isLoadingOtpVerifiyAPi } =
        useVerifyPhone()
    const otpFormSubmitHandler = (values) => {
        const onSuccessHandler = (res) => {
            toast.success(res?.message)
            setOpenOtpModal(false)
            handleTokenAfterSignIn(mainToken)
            handleClose()
        }
        otpVerifyMutate(values, {
            onSuccess: onSuccessHandler,
            onError: onSingleErrorResponse,
        })
    }

    const languageDirection = localStorage.getItem('direction')
    return (
        <Stack>
            <RTL direction={languageDirection}>
                <CustomStackFullWidth
                    alignItems="center"
                    spacing={{ xs: 0.5, md: 2 }}
                >
                    <CustomStackFullWidth
                        alignItems="center"
                        spacing={{ xs: 1, md: 0 }}
                    >
                        <CustomImageContainer
                            src={`${businessLogo}/${global?.logo}`}
                            width="50%"
                            height="70px"
                            alt="Logo"
                        />
                        <CustomTypography
                            sx={{ fontWeight: 'bold', fontSize: "22px" }}
                        >
                            {t('Sign In')}
                        </CustomTypography>
                    </CustomStackFullWidth>
                    <CustomStackFullWidth
                        alignItems="center"
                        spacing={{ xs: 1, md: 2 }}
                    >
                        <form onSubmit={loginFormik.handleSubmit} noValidate>
                            <CustomStackFullWidth
                                alignItems="center"
                                spacing={{ xs: 2, md: 4 }}
                            >
                                <CustomPhoneInput
                                    value={loginFormik.values.phone}
                                    onHandleChange={handleOnChange}
                                    initCountry={global?.country}
                                    touched={loginFormik.touched.phone}
                                    errors={loginFormik.errors.phone}
                                    rtlChange="true"
                                />
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
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="password"
                                        name="password"
                                        placeholder={t("Enter your password")}
                                        value={loginFormik.values.password}
                                        onChange={loginFormik.handleChange}
                                        error={
                                            loginFormik.touched.password &&
                                            Boolean(loginFormik.errors.password)
                                        }
                                        helperText={
                                            loginFormik.touched.password &&
                                            loginFormik.errors.password
                                        }
                                        touched={loginFormik.touched.password}
                                        endAdornment={
                                            <InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prevState) =>
                                                                !prevState
                                                        )
                                                    }
                                                    //   onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <Visibility sx={{ width: "20px", height: "20px", color: theme => alpha(theme.palette.neutral[400], .5) }} />
                                                    ) : (
                                                        <VisibilityOff sx={{ width: "20px", height: "20px", color: theme => alpha(theme.palette.neutral[400], .5) }} />
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
                                    {loginFormik.errors.password && (
                                        <CustomTypography
                                            variant="subtitle2"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.error.main,
                                            }}
                                        >
                                            {loginFormik.errors.password}
                                        </CustomTypography>
                                    )}
                                </FormControl>
                                <CustomStackFullWidth
                                    alignItems="center"
                                    sx={{ marginTop: '15px !important' }}
                                    justifyContent="space-between"
                                    direction="row"
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="remember"
                                                color="primary"
                                                onChange={
                                                    rememberMeHandleChange
                                                }
                                            />
                                        }
                                        label={
                                            <CustomTypography fontSize="12px" fontWeight="400">
                                                {t('Remember me')}
                                            </CustomTypography>
                                        }
                                    />
                                    <Typography
                                        // onClick={gotoForgotPassword}
                                        onClick={() => {
                                            setModalFor('forgot_password')
                                        }}
                                        sx={{
                                            fontSize: "12px",
                                            textTransform: 'none',
                                            cursor: 'pointer',
                                            color: alpha(theme.palette.error.main, 0.8),
                                        }}
                                    >
                                        {t('Forgot password?')}
                                    </Typography>
                                </CustomStackFullWidth>
                            </CustomStackFullWidth>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, fontSize: "14px", fontWeight: "500", marginBottom: ".6rem", height: "45px" }}
                                loading={isLoading}
                            >
                                {t('Sign In')}
                            </LoadingButton>
                        </form>
                    </CustomStackFullWidth>
                    {global?.social_login.length > 0 &&
                        global?.social_login?.some(
                            (item) => item.status === true
                        ) && (

                            <CustomStackFullWidth
                                alignItems="center"
                                justifyContent="center"
                                spacing={1}
                                sx={{ marginTop: '15px !important' }}
                            >
                                <SocialLogins
                                    socialLogins={global?.social_login}
                                    handleParentModalClose={handleClose}
                                    setJwtToken={setJwtToken}
                                    setUserInfo={setUserInfo}
                                    handleSuccess={handleSuccess}
                                    setModalFor={setModalFor}
                                    setMedium={setMedium}
                                />
                            </CustomStackFullWidth>
                        )}
                    <CustomStackFullWidth
                        alignItems="center"
                        spacing={0.5}
                        sx={{ paddingTop: '10px !important' }}
                    >
                        <CustomStackFullWidth
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={0.5}
                        >
                            <CustomTypography fontSize="14px" >
                                {t("Don't have an account?")}
                            </CustomTypography>
                            <CustomLink
                                onClick={() => {
                                    setModalFor('sign-up')
                                }}
                                variant="body2"
                            >
                                {t('Sign Up')}
                            </CustomLink>
                        </CustomStackFullWidth>
                        {/*<CustomStackFullWidth>*/}
                        {/*    <CustomColouredTypography*/}
                        {/*        color={theme.palette.primary.main}*/}
                        {/*        onClick={handleClick}*/}
                        {/*        sx={{*/}
                        {/*            cursor: 'pointer',*/}
                        {/*            textDecoration: 'underline',*/}
                        {/*            textAlign: 'center',*/}
                        {/*            fontWeight: '400',*/}
                        {/*            fontSize: '14px',*/}
                        {/*            [theme.breakpoints.down('sm')]: {*/}
                        {/*                fontSize: '12px',*/}
                        {/*                marginLeft: '0px',*/}
                        {/*            },*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        {t('Terms and conditions')}*/}
                        {/*    </CustomColouredTypography>*/}
                        {/*</CustomStackFullWidth>*/}
                    </CustomStackFullWidth>
                </CustomStackFullWidth>
            </RTL>
            <CustomModal
                openModal={openOtpModal}
                setModalOpen={setOpenOtpModal}
            >
                <OtpForm
                    data={otpData}
                    formSubmitHandler={otpFormSubmitHandler}
                    isLoading={isLoadingOtpVerifiyAPi}
                />
            </CustomModal>
        </Stack>
    )
}

export default SignInPage
