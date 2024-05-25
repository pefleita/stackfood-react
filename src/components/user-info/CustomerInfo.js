import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { useSelector } from 'react-redux'
import CustomImageContainer from '../CustomImageContainer'
import { Avatar, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import { t } from 'i18next'
const CustomerInfo = () => {
    const theme = useTheme();
    const { userData } = useSelector((state) => state.user)
    const { global } = useSelector((state) => state.globalSettings)
    const customerbaseUrl = global?.base_urls?.customer_image_url

    return (
        <CustomStackFullWidth
            direction="row"
            gap="9px"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar
                sx={{
                    height: 68,
                    width: 70,
                    backgroundColor: userData?.image ? (theme) => theme.palette.neutral[100] : (theme) => theme.palette.neutral[400]
                }}
                src={`${customerbaseUrl}/${userData?.image}`}
            />
            <CustomStackFullWidth>
                <Typography fontSize="1rem" fontWeight="600">
                    {' '}
                    {userData?.f_name?.concat(' ', userData?.l_name)}
                </Typography>
                <Typography fontSize="0.75rem" fontWeight="400" color={theme.palette.neutral[500]}>
                    {userData?.phone}
                </Typography>
                <Typography fontSize="0.65rem" fontWeight="400" color={theme.palette.neutral[500]}>
                    {t('Joined')}{' '}
                    {moment(userData?.created_at).format('MMM Do YY')}
                </Typography>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

export default CustomerInfo
