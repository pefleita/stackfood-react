import React from 'react'
import { Button, Stack, styled, Typography } from '@mui/material'
import {
    LandingPageTypography,
    LandingPageTypographyWhite,
} from './landingPageStyle'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import AppLinks from './AppLinks'
import { useTheme } from '@mui/material/styles'

const DownloadComponent = (props) => {
    const theme = useTheme()
    const { landing_page_links, download_app_data } = props
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const ImageButton = styled(Button)(({ theme }) => ({
        width: '153px',
        height: '50px',
        padding: '0',
    }))
    const goToApp = (s) => {
        window.open(s)
    }

    return (
        <>
            <CustomStackFullWidth alignItems="center" justifyContent="center" gap="15px">
                <Stack alignItems="center" justifyContent="center" gap="5px">
                    <LandingPageTypography
                        fontSize={{ xs: '20', sm: '25', md: '29px' }}
                        fontWeight="700"
                    >
                        {download_app_data?.react_download_apps_title}
                    </LandingPageTypography>
                    <Stack>
                        <Typography
                            fontSize={{ xs: '12px', sm: '18px', md: '18px' }}
                            fontWeight="500"
                            color={theme.palette.primary.main}
                        >
                            {download_app_data?.react_download_apps_sub_title}
                        </Typography>
                        <Typography
                            sx={{ fontWeight: '400' }}
                            fontSize={{ xs: '14px', sm: '16px' }}
                            color={theme.palette.neutral[400]}
                        >
                            {download_app_data?.react_download_apps_tag}
                        </Typography>
                    </Stack>
                </Stack>
                <AppLinks
                    global={global}
                    download_app_data={download_app_data}
                    width="172px"
                />
            </CustomStackFullWidth>
        </>
    )
}

export default DownloadComponent
