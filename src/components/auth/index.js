import { Modal, Box, IconButton, useTheme, Stack } from '@mui/material'
import React, { useState } from 'react'
import SignInPage from './sign-in'
import SignUpPage from './sign-up'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/customer";
import { useQuery } from "react-query";
import { ProfileApi } from "@/hooks/react-query/config/profileApi";
import { onSingleErrorResponse } from "../ErrorResponse";
import { setWishList } from "@/redux/slices/wishList";
import { useWishListGet } from "@/hooks/react-query/config/wish-list/useWishListGet";
import { toast } from "react-hot-toast";
import { loginSuccessFull } from "@/utils/ToasterMessages";
import { setToken } from "@/redux/slices/userToken";
import { t } from "i18next";
import PhoneInputForm from "./sign-in/social-login/PhoneInputForm";
import ForgotPassword from './forgot-password/ForgotPassword';
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style';
import CloseIcon from "@mui/icons-material/Close";
import { CustomBoxForModal } from './auth.style';
import { CustomToaster } from '../custom-toaster/CustomToaster';

const AuthModal = ({
    open,
    handleClose,
    signInSuccess,
    modalFor,
    setModalFor, cartListRefetch
}) => {
    const { openMapDrawer,global } = useSelector((state) => state.globalSettings)
    const theme = useTheme()
    const { userInfo: fbUserInfo, jwtToken: fbJwtToken } = useSelector(
        (state) => state.fbCredentialsStore
    )
    const [signInPage, setSignInPage] = useState(true)
    const [userInfo, setUserInfo] = useState(null)
    const [jwtToken, setJwtToken] = useState(null)
    const [medium, setMedium] = useState("")
    const user = medium === "google" ? userInfo : fbUserInfo
    const jwt = medium === "google" ? jwtToken : fbJwtToken

    const dispatch = useDispatch()
    const userOnSuccessHandler = (res) => {
        dispatch(setUser(res?.data))
    }
    const { refetch: profileRefatch } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,
        {
            enabled: false,
            onSuccess: userOnSuccessHandler,
            onError: onSingleErrorResponse,
        }
    )
    let zoneid = undefined;
    if (typeof window !== "undefined") {
        zoneid = localStorage.getItem("zoneid");
    }
    const onSuccessHandler = (res) => {
        dispatch(setWishList(res))
    }
    const { refetch } = useWishListGet(onSuccessHandler)
    const handleSuccess = async (value) => {
        localStorage.setItem('token', value)
        // toast.success(t(loginSuccessFull))
        CustomToaster('success', loginSuccessFull);
        if(zoneid){
            await refetch()
        }
        await profileRefatch()
        dispatch(setToken(value))
        handleClose?.()
    }
    const handleRegistrationOnSuccess = (token) => {
        //registration on success func remaining
        // setOpenModal(false)
        handleSuccess(token)
        handleClose()
    }
    const handleModal = () => {
        if (modalFor === 'sign-in') {
            return (
                <SignInPage
                    signInSuccess={signInSuccess}
                    handleClose={handleClose}
                    setModalFor={setModalFor}
                    setSignInPage={setSignInPage}
                    cartListRefetch={cartListRefetch}
                    setJwtToken={setJwtToken}
                    setUserInfo={setUserInfo}
                    handleSuccess={handleSuccess}
                    setMedium={setMedium}
                    zoneid={zoneid}

                />
            )
        } else if (modalFor === "phone_modal") {
            return (
                <>
                    {user && jwt?.clientId && (
                        <PhoneInputForm
                            userInfo={user}
                            jwtToken={jwt}
                            global={global}
                            medium={medium}
                            handleRegistrationOnSuccess={
                                handleRegistrationOnSuccess
                            }
                            setModalFor={setModalFor}
                        />
                    )}
                </>
            )
        }
        else if (modalFor === "forgot_password") {
            return <ForgotPassword setModalFor={setModalFor} />

        } else {
            return (
                <SignUpPage
                    handleClose={handleClose}
                    setSignInPage={setSignInPage}
                    setModalFor={setModalFor}
                    setJwtToken={setJwtToken}
                    setUserInfo={setUserInfo}
                    handleSuccess={handleSuccess}
                    setMedium={setMedium}
                />
            )
        }
    }
    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                maxWidth="400px"

            >
                <CustomBoxForModal>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ position: "relative" }}
                    >
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                zIndex: "99",
                                position: "absolute",
                                top: -40,
                                right: -40,
                                backgroundColor: (theme) => theme.palette.neutral[100],
                                borderRadius: "50%",
                                [theme.breakpoints.down("sm")]: {
                                    top: -30,
                                    right: -30,
                                },
                            }}
                        >
                            <CloseIcon sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" }, fontWeight: "500" }} />
                        </IconButton>
                    </Stack>
                    {handleModal()}
                </CustomBoxForModal>
            </Modal>
        </Box>
    )
}

export default AuthModal
