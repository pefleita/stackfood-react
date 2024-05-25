import React, { useEffect, useState } from 'react'
import CustomModal from '../../../custom-modal/CustomModal'
import PhoneInputForm from './PhoneInputForm'
import CustomImageContainer from '../../../CustomImageContainer'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { usePostEmail } from "@/hooks/react-query/social-login/usePostEmail"
import { onErrorResponse } from '../../../ErrorResponse'
import OtpForm from '../../forgot-password/OtpForm'
import { useVerifyPhone } from "@/hooks/react-query/otp/useVerifyPhone"
import { toast } from 'react-hot-toast'
import facebookLatest from '../../../../../public/static/facebookLatest.png'
import { alpha, Button, Stack } from "@mui/material";
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
    setJwtTokenByDispatch,
    setUserInfoByDispatch,
} from "@/redux/slices/fbCredentials"
import { facebookAppId } from "@/utils/staticCredentials"
import { useTheme } from "@mui/styles";

const FbLoginComp = (props) => {
    const { handleSuccess, global, handleParentModalClose, setModalFor, setMedium, isSingle } = props
    const theme = useTheme()
    const [openModal, setOpenModal] = useState(false)
    const [openOtpModal, setOpenOtpModal] = useState(false)
    const [otpData, setOtpData] = useState({ phone: '' })
    const [mainToken, setMainToken] = useState(null)
    const dispatch = useDispatch()
    const appId = facebookAppId
    const { mutate } = usePostEmail()
    const handleToken = (response) => {
        if (response?.token) {
            handleSuccess(response.token)
        } else {
            setMedium("facebook")
            setModalFor("phone_modal")
            setOpenModal(true)
        }
    }
    useEffect(() => {
        if (otpData?.phone !== '') {
            setOpenOtpModal(true)
        }
    }, [otpData])
    const handlePostRequestOnSuccess = (response) => {
        if (global?.customer_verification) {
            if (Number.parseInt(response?.is_phone_verified) === 1) {
                handleToken(response)
            } else {
                if (response?.phone) {
                    setOtpData({ phone: response?.phone })
                }
                if (response?.token) {
                    setMainToken(response)
                }
            }
        } else {
            handleToken(response)
        }
    }
    const responseFacebook = async (res) => {

        dispatch(setUserInfoByDispatch(res))
        dispatch(setJwtTokenByDispatch(res))
        if (res?.status !== "unknown") {
            await mutate(
                {
                    email: res?.email,
                    token: res?.accessToken,
                    unique_id: res?.id,
                    medium: 'facebook',
                    phone: res?.phone,
                },
                {
                    onSuccess: handlePostRequestOnSuccess,
                    onError: (error) => {
                        error?.response?.data?.errors?.forEach((item) =>
                            item.code === 'email'
                                ? handleToken()
                                : toast.error(item.message)
                        )
                    },
                }
            )
        }

    }
    // const handleRegistrationOnSuccess = (token) => {
    //     //registration on success func remaining
    //     handleSuccess(token)
    //     handleParentModalClose()
    //     setOpenModal(false)
    // }
    const onSuccessHandler = (res) => {
        toast.success(res?.message)
        setOpenOtpModal(false)
        handleToken(mainToken)
        handleParentModalClose()
    }
    const { mutate: signInMutate, isLoading } = useVerifyPhone()
    const formSubmitHandler = (values) => {
        signInMutate(values, {
            onSuccess: onSuccessHandler,
            onError: onErrorResponse,
        })
    }
    const { t } = useTranslation()
    return (
        <Stack width={isSingle ? '100%' : 'fit-content'} maxWidth="355px" justifyContent="center">
            <FacebookLogin
                appId={appId}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                    <div
                        style={{ cursor: 'pointer', width: '100%' }}
                        onClick={renderProps.onClick}
                    >
                        <Stack
                            alignItems="center"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.newsletterBG,
                                height: '45px',
                                width: '100%',
                                borderRadius: '10px',
                                padding: '10px',
                                textAlign: 'center',
                                transition: 'box-shadow 0.3s',
                                '&:hover': {
                                    boxShadow: `0px 5px 10px 0px rgba(0, 0, 0, 0.3), 0px 2px 5px 0px rgba(0, 0, 0, 0.15)`,

                                }
                            }}
                        >
                            <CustomStackFullWidth
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                spacing={2}
                            >
                                <CustomImageContainer
                                    src={facebookLatest.src}
                                    alt="facebook"
                                    height="24px"
                                    width="24px"
                                    objectFit="cover"
                                    borderRadius="50%"
                                />
                                {isSingle &&
                                    <CustomColouredTypography
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.whiteContainer.main,
                                            fontWeight: "400"
                                        }}
                                    >
                                        {t('Continue with Facebook')}
                                    </CustomColouredTypography>
                                }

                            </CustomStackFullWidth>
                        </Stack>
                    </div>
                )}
            />
            {/*<CustomModal openModal={openModal} setModalOpen={setOpenModal}>*/}
            {/*    {userInfo && jwtToken && (*/}
            {/*        <PhoneInputForm*/}
            {/*            global={global}*/}
            {/*            userInfo={userInfo}*/}
            {/*            jwtToken={jwtToken}*/}
            {/*            medium="facebook"*/}
            {/*            handleRegistrationOnSuccess={*/}
            {/*                handleRegistrationOnSuccess*/}
            {/*            }*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</CustomModal>*/}
            <CustomModal
                openModal={openOtpModal}
                setModalOpen={setOpenOtpModal}
            >
                <OtpForm
                    data={otpData}
                    formSubmitHandler={formSubmitHandler}
                    isLoading={isLoading}
                />
            </CustomModal>
        </Stack>
    )
}

FbLoginComp.propTypes = {}

export default FbLoginComp
