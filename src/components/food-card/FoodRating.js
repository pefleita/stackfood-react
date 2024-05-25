import React from 'react'
import { Stack } from '@mui/system'
import StarIcon from '@mui/icons-material/Star'
import { alpha, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { getNumberWithConvertedDecimalPoint } from '../../utils/customFunctions'
import { useSelector } from 'react-redux'
import { CustomChip } from './FoodCard.style'

const FoodRating = ({ product_avg_rating }) => {
    const theme = useTheme()
    const starColor = theme.palette.whiteContainer.main
    const { global } = useSelector((state) => state.globalSettings)

    // let digitAfterDecimalPoint
    // if (global) {
    //     digitAfterDecimalPoint = global.digit_after_decimal_point
    // }
    return (
        <CustomChip
            background={theme.palette.customColor.eleven}
            label={
                <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={0.5}
                    alignItems="center"
                >
                    <Typography
                        fontSize="12px"
                        fontWeight="600"
                        color={theme.palette.whiteContainer.main}
                        lineHeight={1.6}
                    >
                        {getNumberWithConvertedDecimalPoint(
                            product_avg_rating,
                            // digitAfterDecimalPoint
                            1
                        )}
                    </Typography>
                    <StarIcon
                        style={{
                            width: '12px',
                            height: '12px',
                            color: starColor,
                        }}
                    />
                </Stack>
            }
        ></CustomChip>
    )
}

export default FoodRating
