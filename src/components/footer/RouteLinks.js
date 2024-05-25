import React, { useState } from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'

import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { toast } from 'react-hot-toast'
import { Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { t } from 'i18next'
import { router } from 'next/client'
import MapModal from '../landingpage/google-map/MapModal'
import { CustomToaster } from '../custom-toaster/CustomToaster'
import { alpha } from '@material-ui/core'

const RouteLinks = (props) => {
    const { token, global, title, RouteLinksData, isCenter } = props
    const zoneId = localStorage.getItem('zoneid')
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState({})
    const handleClose = () => {
        setOpen(false)
        // if (router.pathname !== '/') {
        //     handleModalClose()
        // }
    }
    const handleClick = (href, value) => {
        if (value === 'loyalty' || value === 'wallets') {
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
                CustomToaster('error', "You must be login to access this page.");
                // handleOpen()
            }
        } else if (
            value === 'popular' ||
            value === 'latest' ||
            value === 'best-reviewed-foods'
        ) {
            if (zoneId) {
                Router.push({
                    pathname: '/home',

                    query: {
                        restaurantType: value,
                    },
                })
            } else {
                CustomToaster("error", "You must pick a zone to access this page.")
                setUrl({
                    pathname: '/home',
                    query: value,
                })
                setOpen(true)
            }
        } else if (value === 'cuisines') {
            if (zoneId) {
                Router.push(href)
            } else {
                CustomToaster("error", "You must pick a zone to access this page.")
                setUrl({pathname: '/cuisines'})
                setOpen(true)
            }
        }
        else if (value === 'restaurant_owner') {
            window.open(href)
        }
        else if (value === 'delivery_man') {
            window.open(href)
        } else if (value === 'track_order') {
            if (zoneId) {
                Router.push(href)
            } else {
                CustomToaster("error", "You must pick a zone to access this page.")
                //toast.error(t('You must pick a zone to access this page.'))
                setUrl({
                    pathname: '/home',
                    query: value,
                })
                setOpen(true)
            }
        } else {
            Router.push(href, undefined, { shallow: true })
        }
    }
    const languageDirection = localStorage.getItem('direction')
    const handleClickToRoute = (href) => {
        router.push(href, undefined, { shallow: true })
    }

    return (
        <CustomStackFullWidth spacing={{ xs: 1.2, sm: 2 }} alignItems={isCenter && 'center'}>
            <Typography
                color={alpha(theme.palette.whiteContainer.main, 0.8)}
                fontSize="14px"
                fontWeight="600"
            >
                {t(title)}
            </Typography>

            {RouteLinksData.map((item, index) => {
                return (
                    <CustomColouredTypography
                        key={index}
                        fontsize={isXSmall ? '14px' : '14px'}
                        color="whiteContainer.main"
                        onClick={() => handleClick(item.link, item.value)}
                        sx={{
                            cursor: 'pointer',
                            fontWeight: 300,
                            color: alpha(theme.palette.whiteContainer.main, 0.8),
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {t(item.name)}
                    </CustomColouredTypography>
                )
            })}
            {title === 'Other' && global?.refund_policy_status !== 0 && (
                <CustomColouredTypography
                    fontsize={isXSmall ? '13px' : '14px'}
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute('/refund-policy')}
                    sx={{
                        fontWeight: 300,
                        color: alpha(theme.palette.whiteContainer.main, 0.8),
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Refund Policy')}
                </CustomColouredTypography>
            )}
            {title === 'Other' && global?.cancellation_policy_status !== 0 && (
                <CustomColouredTypography
                    fontsize={isXSmall ? '13px' : '14px'}
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute('/cancellation-policy')}
                    sx={{
                        fontWeight: 300,
                        color: alpha(theme.palette.whiteContainer.main, 0.8),
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Cancellation Policy')}
                </CustomColouredTypography>
            )}
            {open && <MapModal redirectUrl={url} open={open} handleClose={handleClose} />}
        </CustomStackFullWidth>
    )
}

RouteLinks.propTypes = {}

export default RouteLinks
