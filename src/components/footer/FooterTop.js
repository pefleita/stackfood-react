import React, { useState } from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import {
    alpha,
    Button,
    Container,
    Grid,
    InputAdornment,
    InputBase,
    Paper,
    Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CustomTypographyGray } from '../error/Errors.style'
import { usePostNewsletterEmail } from "@/hooks/react-query/newsletter/usePostNewsletterEmail"
import { onErrorResponse } from "../ErrorResponse";
import LoadingButton from '@mui/lab/LoadingButton'
import CustomContainer from '../container'
import CustomImageContainer from '../CustomImageContainer'
import burgerImage from '../../../public/static/vecteezy_burger-png-graphic-clipart-design_19607061_179 1.svg'
import cteezyImage from '../../../public/static/vecteezy.svg'
import { useTheme } from '@emotion/react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Stack } from '@mui/system'
import { RTL } from '../RTL/RTL'
import { CustomToaster } from '../custom-toaster/CustomToaster'
import FooterBG from "../../../public/static/footer/footerBG.png"

const FooterTop = ({ landingPageData }) => {
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [emailAddress, setEmailAddress] = useState(null)
    const [errorText, setErrorText] = useState(null)

    const { t } = useTranslation()
    const languageDirection = localStorage.getItem('direction')
    const { mutate, isLoading } = usePostNewsletterEmail()
    const handleSuccess = () => {
        // toast.success(t('Subscribed Successfully'), {
        //     id: 'subscribed-toaster',
        // })
        CustomToaster('success', 'Subscribed Successfully.');
        setEmailAddress('')
        setErrorText(null)
    }
    const handleSubmit = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (regex.test(emailAddress) === true) {
            mutate(
                { email: emailAddress },
                {
                    onSuccess: handleSuccess,
                    onError: onErrorResponse,
                }
            )
        } else {
            setErrorText(t('Please insert a valid email.'))
        }
    }

    return (
        <CustomStackFullWidth
            alignItems="center"
            minHeight="144px"
            sx={{
                backgroundImage: `url(${FooterBG.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition:"center"
            }}
        >
            <CustomStackFullWidth minHeight="144px" sx={{ backgroundColor: (theme) =>theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.7): alpha(theme.palette.primary.light, 0.3), }}>
                <CustomContainer>
                    <Stack flexDirection={{ xs: "cloumn", sm: "row" }} alignItems="center" justifyContent="space-between" paddingBlock="20px">
                        <CustomStackFullWidth alignItems={{ xs: "center", sm: "flex-start" }} gap="10px">
                            <CustomColouredTypography
                                variant="h3"
                                color={"#141313"}
                                fontweight="600"
                            >
                                {landingPageData?.news_letter_title}
                            </CustomColouredTypography>
                            <Typography
                                fontSize="14px"
                                color={"#414141"}
                                fontweight="400"
                                maxWidth="300px"
                                textAlign={{ xs: "center", sm: "left" }}
                            >
                                {landingPageData?.news_letter_sub_title}
                            </Typography>
                        </CustomStackFullWidth>
                        <CustomStackFullWidth alignItems="flex-end">
                            <Paper
                                elevation={0}
                                sx={{
                                    mt: 1,
                                    p: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    maxWidth: '362px',
                                    border: errorText && `1px solid ${theme.palette.error.light}`,
                                    background: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? alpha(
                                                theme.palette.neutral[100],
                                                0.7
                                            )
                                            : theme.palette.whiteContainer.main,
                                }}
                            >
                                <InputBase
                                    sx={{
                                        ml: 1.5,
                                        padding: '8px',
                                        flex: 1,
                                        color: (theme) =>
                                            theme.palette.neutral[500],
                                        align: 'center',
                                    }}
                                    value={emailAddress}
                                    type="email"
                                    placeholder={t('Your Email Address')}
                                    onChange={(e) =>
                                        setEmailAddress(e.target.value)
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <LoadingButton
                                                loading={isLoading}
                                                type="submit"
                                                onClick={handleSubmit}
                                                sx={{
                                                    background: `radial-gradient(50% 50% at 50% 50%, ${theme.palette.customColor.eight} 0%, ${theme.palette.customColor.nine} 100%)`,
                                                    borderRadius: '5px',
                                                    minWidth: '45px',
                                                    padding: '5px 10px',
                                                }}
                                            >
                                                <KeyboardArrowRightIcon
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette
                                                                .neutral[100],
                                                        transform:
                                                            languageDirection ===
                                                            'rtl' &&
                                                            'rotate(180deg)',
                                                    }}
                                                />
                                            </LoadingButton>
                                        </InputAdornment>
                                    }
                                />
                            </Paper>
                            {errorText &&
                                <Typography fontWeight={600} sx={{ padding: "5px", marginLeft: "15px", color: theme.palette.error.pureRed }} textAlign="left">* {errorText}</Typography>}
                        </CustomStackFullWidth>
                    </Stack>
                </CustomContainer>
            </CustomStackFullWidth>
        </CustomStackFullWidth >
    )
}

export default FooterTop
