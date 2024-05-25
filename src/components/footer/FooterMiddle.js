import React from 'react'
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style"
import {
    Box,
    Container,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import LogoSide from '../navbar/second-navbar/LogoSide'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import SocialLinks from './SocialLinks'
import AppLinks from '../landingpage/AppLinks'
import RouteLinks from './RouteLinks'
import { useTheme } from '@mui/material/styles'
import { QuickLinkData } from './QuickLinkData'
import { OtherData } from './OtherData'
import { QuickLinkData1 } from './QuickLinkData1'
import ContactInfo from './ContactInfo'
import CustomContainer from '../container'
import { alpha } from '@material-ui/core'

const FooterMiddle = ({ landingPageLink, landingPageData }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const { token } = useSelector((state) => state.userToken)
    const { t } = useTranslation()
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isXSmall = useMediaQuery(theme.breakpoints.down('md'))
    const businessLogo = global?.logo
    return (
        <CustomStackFullWidth alignItems="center" pt={{ xs: "1rem", sm: "2rem" }}>
            <CustomContainer>
                <Grid
                    container
                    spacing={{ xs: 3, md: 4 }}
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        align={isSmall && 'center'}
                    >
                        <CustomStackFullWidth
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            alignItems={{
                                xs: 'center',
                                sm: 'center',
                                md: 'flex-start',
                            }}
                            justifyContent="flex-start"
                        >
                            <Link href={zoneid ? '/home' : '/'}>
                                <LogoSide
                                    global={global}
                                    businessLogo={businessLogo}
                                />
                            </Link>
                            <Typography
                                fontSize="14px"
                                color={alpha(theme.palette.whiteContainer.main, 0.8)}
                            >
                                {landingPageData?.footer_data}
                            </Typography>
                            <ContactInfo global={global} />
                            <AppLinks
                                isFooter={true}
                                global={global}
                                download_app_data={
                                    landingPageData?.download_app_section
                                }
                                width="140px"
                            />
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        md={2.6}
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Box>
                            <RouteLinks
                                token={token}
                                global={global}
                                title="Quick Links"
                                RouteLinksData={QuickLinkData}
                            />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        md={2.6}
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Box>
                            <RouteLinks
                                token={token}
                                global={global}
                                title='Quick Links'
                                RouteLinksData={QuickLinkData1}
                            />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={2.6}
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Box alignItems="center" justifyContent="center">
                            <RouteLinks
                                token={token}
                                global={global}
                                title="Other"
                                RouteLinksData={OtherData}
                                isCenter={isSmall && true}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CustomContainer>
        </CustomStackFullWidth>
    )
}

FooterMiddle.propTypes = {}

export default FooterMiddle
