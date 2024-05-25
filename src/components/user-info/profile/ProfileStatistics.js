import React from 'react'
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Paper,
    Stack,
    useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from '../../CustomImageContainer'
import Router from 'next/router'

const ProfileStatistics = ({ value, title, image, pathname }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { t } = useTranslation()
    const handleRoute = (value) => {
        Router.push(
            {
                pathname: '/info',
                query: { page: value },
            },
            undefined,
            { shallow: true }
        )
    }
    return (
        <Stack
            sx={{ cursor: 'pointer', marginInlineEnd: "10px" }}
            onClick={() => handleRoute(pathname)}
        >
            <CustomPaperBigCard
                padding="1rem"
                sx={{ minHeight: '85px' }}
                elevation={6}
            >
                <CustomStackFullWidth>
                    <Stack
                        flexGrow="wrap"
                        width="100%"
                        justifyContent="space-between"
                        direction="row"
                    >
                        <Typography
                            fontSize="24px"
                            sx={{
                                fontWeight: '500',
                                lineHeight: "1.3"
                            }}
                            color={theme.palette.primary.main}
                        >
                            {value}
                        </Typography>
                        <CustomImageContainer
                            src={image}
                            width="26px"
                            height="26px"
                            objectFit="contain"
                        />
                    </Stack>
                    <Typography
                        sx={{ fontSize: '14px', textTransform: 'capitalize', lineHeight: "1" }}
                        color={theme.palette.neutral[500]}
                    >
                        {t(title)}
                    </Typography>
                </CustomStackFullWidth>
            </CustomPaperBigCard>
        </Stack>
    )
}
export default ProfileStatistics
