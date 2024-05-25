import React from 'react'
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style"
import nofood from '../../assets/gif/no-food.gif'
import { Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomImageContainer from '../CustomImageContainer'

const CustomEmptyResult = ({ label, image, height, width, subTitle }) => {
    const { t } = useTranslation()
    const theme = useTheme();
    return (
        <CustomStackFullWidth alignItems="center" justifyContent="center" gap="10px">
            <CustomImageContainer src={image ? image.src : nofood.src} alt="my gif" height={height || 300} width={width || 300} objectFit="contain" />
            <Stack alignItems="center" justifyContent="center" gap="5px">
                <Typography fontSize="14px" fontWeight={600} color={subTitle ? (theme.palette.neutral[1000]) : (theme.palette.neutral[400])}>
                    {label ? t(label) : t('Not found')}
                </Typography>
                {subTitle && <Typography color={theme.palette.neutral[400]} fontSize="12px" fontWeight={400}>
                    {t(subTitle)}
                </Typography>}
            </Stack>
        </CustomStackFullWidth>
    )
}

CustomEmptyResult.propTypes = {}

export default CustomEmptyResult
