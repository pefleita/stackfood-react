import { alpha, styled } from '@mui/material/styles'
import { Box, Button, Grid, TextField } from '@mui/material'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'

export const SaveButton = styled(Button)(({ theme }) => ({
    width: "100%",
    color: '#ffffff',
    fontWeight: "400",
    fontSize: '14px'
}))
export const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.neutral[400],
    borderColor: theme.palette.neutral[300],
    fontWeight: "400",
    fontSize: '14px',
    '&:hover': {
        borderColor: theme.palette.neutral[300]
    }
}))

export const ButtonBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        display: 'flex',
        justifyContent: 'center',

    },
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
        justifyContent: 'end',
    },
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'end',
    },
}))
export const CouponCard = styled(Grid)(({ theme }) => ({
    alignItems: 'center',
    justify: 'center'

}))
export const CustomDivWithBorder = styled(CustomStackFullWidth)(({ theme, isXSmall }) => ({
    border: isXSmall ? "none" : `1px solid ${alpha(theme.palette.neutral[300], 0.3)}`,
    borderRadius: "5px",
    padding: isXSmall ? "0px" : "20px 15px",

}))
export const CustomProfileTextfield = styled(TextField)(({ theme }) => ({
    width: "100%",
    "& .MuiInputBase-root": {
        height: 45,
        fontSize: "12px",
        fontWeight: 400
    },
    "& .MuiInputLabel-root": {
        fontSize: "12px"
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: "4px",
    },
    "& .MuiOutlinedInput-input": {
        fontSize: "12px",
        fontWeight: 400
    },

}))


