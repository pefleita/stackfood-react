import React from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import SocialLinks from './SocialLinks'
import { useSelector } from 'react-redux'
import { Stack, Typography, useMediaQuery } from '@mui/material'
import { RouteLinksData } from './RouteLinksData'
import { t } from 'i18next'
import { useTheme } from '@mui/material/styles'
import Router from 'next/router'
import { toast } from 'react-hot-toast'
import { RTL } from '../RTL/RTL'
import { CustomToaster } from '../custom-toaster/CustomToaster'
import { alpha } from '@material-ui/core'
import { Scrollbar } from '../Scrollbar'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import Slider from 'react-slick'

const FooterTopSection = () => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const handleClick = (href, value) => {
        if (value === 'profile') {
            if (token) {
                Router.push(
                    {
                        pathname: '/info',
                        query: { page: value },
                    },
                    undefined,
                    { shallow: true }
                )
            } else {
                CustomToaster("error", 'You must be login to access this page.')
            }
        } else {
            Router.push(href)
        }
    }
    const settings = {
        dots: false,
        infinite: false,
        variableWidth: true
    };
    return (
        <RTL direction={languageDirection}>
            <CustomStackFullWidth spacing={{ xs: 2, sm: 4 }}>
                <SocialLinks global={global} />
                {isSmall ? (
                    <Slider {...settings}>
                        {RouteLinksData.map((item, index) => {
                            return (
                                <CustomColouredTypography
                                    key={index}
                                    variant="h5"
                                    color="whiteContainer.main"
                                    onClick={() =>
                                        handleClick(item.link, item.value)
                                    }
                                    sx={{
                                        fontWeight: 400,
                                        color: alpha(theme.palette.whiteContainer.main, 0.8),
                                        cursor: 'pointer',
                                        borderLeft:
                                            index !== 0 &&
                                            `2px solid ${alpha(theme.palette.text.footerText, 0.8)}`,
                                        paddingLeft: '15px',

                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    {t(item.name)}
                                </CustomColouredTypography>
                            )
                        })}
                    </Slider>
                ) : (
                    <Stack
                        width="100%"
                        spacing={{ xs: 1.5, sm: 2 }}
                        alignItems="center"
                        justifyContent="center"
                        direction='row'
                    >
                        {RouteLinksData.map((item, index) => {
                            return (
                                <CustomColouredTypography
                                    key={index}
                                    variant="h5"
                                    color="whiteContainer.main"
                                    onClick={() =>
                                        handleClick(item.link, item.value)
                                    }
                                    sx={{
                                        fontWeight: 400,
                                        color: alpha(theme.palette.whiteContainer.main, 0.8),
                                        cursor: 'pointer',
                                        borderLeft:
                                            index !== 0 &&
                                            `2px solid ${alpha(theme.palette.text.footerText, 0.8)}`,
                                        paddingLeft: '15px',

                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    {t(item.name)}
                                </CustomColouredTypography>
                            )
                        })}
                    </Stack>)}
            </CustomStackFullWidth>
        </RTL >
    )
}

export default FooterTopSection