import React from 'react'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { t } from 'i18next'
import { useTheme } from '@mui/material/styles'
import { PrimaryButton } from '../../products-page/FoodOrRestaurant'
import EditIcon from '@mui/icons-material/Edit'
import EditSvg from './EditSvg'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CustomDivWithBorder } from './Profile.style'
const PersonalDetails = ({ data }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <CustomStackFullWidth>
            <CustomDivWithBorder>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        // paddingLeft={!isSmall && '20px'}
                    >
                        <CustomStackFullWidth gap="10px">
                            <Stack direction="row" spacing={2}>
                                <Typography fontSize="14px" fontWeight="500">
                                    {t('First Name')}
                                </Typography>
                                <Typography
                                    fontSize="14px"
                                    fontWeight="400"
                                    color={theme.palette.neutral[500]}
                                >
                                    {data?.data?.f_name}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Typography fontSize="14px" fontWeight="500">
                                    {t('Last Name')}&nbsp;
                                </Typography>
                                <Typography
                                    fontSize="14px"
                                    fontWeight="400"
                                    color={theme.palette.neutral[500]}
                                >
                                    {data?.data?.l_name}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}>
                        <CustomStackFullWidth gap="10px">
                            <Stack direction="row" spacing={2}>
                                <Typography fontSize="14px" fontWeight="500">
                                    {t('Phone')}
                                </Typography>
                                <Typography
                                    fontSize="14px"
                                    fontWeight="400"
                                    color={theme.palette.neutral[500]}
                                >
                                    {data?.data?.phone}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Typography fontSize="14px" fontWeight="500">
                                    {t('Email')}&nbsp;&nbsp;
                                </Typography>
                                <Typography
                                    fontSize="14px"
                                    fontWeight="400"
                                    color={theme.palette.neutral[500]}
                                >
                                    {data?.data?.email}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>
                    </Grid>
                </Grid>
            </CustomDivWithBorder>
        </CustomStackFullWidth>
    )
}

export default PersonalDetails
