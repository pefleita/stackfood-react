import React from 'react'
import { HeadingBox } from './OrderDetail.style'
import { Typography } from '@mui/material'
import CustomFormatedDateTime from '../date/CustomFormatedDateTime'
import { useTranslation } from 'react-i18next'
import { CustomTypography } from '../custom-tables/Tables.style'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

const TopDetails = ({ data, trackData }) => {
    const { t } = useTranslation()
    return (
        <HeadingBox>
            <CustomStackFullWidth alignItems="center" justifyContent="center">
                {trackData?.data?.scheduled === 1 && (
                    <CustomTypography>
                        {t('Order scheduled')} :
                        <CustomFormatedDateTime
                            date={trackData?.data?.schedule_at}
                        />
                    </CustomTypography>
                )}
            </CustomStackFullWidth>
        </HeadingBox>
    )
}

export default TopDetails
