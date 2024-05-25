import { styled } from '@mui/material/styles'
import { alpha, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Rating } from '@mui/material'

export const CustomRating = styled(Rating)(({ theme, color,borderColor }) => ({
    color: color ? color :theme.palette.primary.main,
    borderColor:borderColor || theme.palette.primary.main,

    '& .MuiSvgIcon-root': {
        fill: color ? color : (theme) => theme.palette.primary.main,
    },
    [theme.breakpoints.down('md')]: {
        // styles
        fontSize: '1rem',
    },
}))
