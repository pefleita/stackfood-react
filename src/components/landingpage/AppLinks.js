import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography, useTheme } from '@mui/material'
import { CustomButton } from './Landingpage.style'
import CustomImageContainer from '../CustomImageContainer'
import AppStore from '../../../public/static/AppStore.png'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { t } from 'i18next'
import GooglePlay from '@/assets/images/icons/GooglePlay'
import AppleIcon from '@/assets/images/icons/AppleIcon'

const AppLinks = (props) => {
    const { global, download_app_data, width, isFooter } = props
    const [backgroundColor, setBackgroundColor] = useState();
    const theme = useTheme();
    const goToApp = (href) => {
        window.open(href)
    }
    let languageDirection
    let mode
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
        mode = localStorage.getItem('mode')
    }

    useEffect(() => {
        setBackgroundColor(handleBackgroundColor)
    }, [mode])


    const handleBackgroundColor = () => {
        let color;
        if (isFooter) {
            color = theme.palette.footerAppBg;
        } else {
            if (mode === 'dark') {
                color = theme.palette.footerAppBg;
            } else {
                color = theme.palette.neutral[1000];
            }
        }
        return color
    }

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
            gap={languageDirection === 'rtl' && '10px'}
        >
            {download_app_data?.react_download_apps_play_store
                ?.react_download_apps_play_store_status === '1' && (
                    <CustomButton
                        backgroundColor={backgroundColor}
                        onClick={() =>
                            goToApp(
                                download_app_data?.react_download_apps_play_store
                                    ?.react_download_apps_play_store_link
                            )
                        }
                    >
                        <Stack flexDirection="row" padding="5px 10px" gap="8px" alignItems="center">
                            <GooglePlay />
                            <Stack>
                                <Typography fontSize={{ xs: "10px", md: "12px" }} color={theme.palette.whiteText.main}>{t("GET IT ON")}</Typography>
                                <Typography fontSize={{ xs: "12px", md: "16px" }} color={theme.palette.whiteText.main} fontWeight={700}>{t('Google Play')}</Typography>
                            </Stack>
                        </Stack>
                    </CustomButton>
                )}

            {download_app_data?.react_download_apps_app_store
                ?.react_download_apps_link_status === '1' && (
                    <CustomButton
                        backgroundColor={backgroundColor}
                        onClick={() =>
                            goToApp(
                                download_app_data?.react_download_apps_app_store
                                    ?.react_download_apps_link
                            )
                        }
                    >
                        <Stack flexDirection="row" padding="5px 10px" gap="8px" alignItems="center">
                            <AppleIcon />
                            <Stack>
                                <Typography fontSize={{ xs: "10px", md: "12px" }} color={theme.palette.whiteText.main}>{t("Download on")}</Typography>
                                <Typography fontSize={{ xs: "12px", md: "16px" }} color={theme.palette.whiteText.main} fontWeight={700}>{t('App Store')}</Typography>
                            </Stack>
                        </Stack>
                    </CustomButton>
                )}

            {/* </Link> */}
        </Stack>
    )
}

AppLinks.propTypes = {}

export default AppLinks
