import { styled } from '@mui/material/styles'
import { Box, Divider, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';


export const OrderDetailGrid = styled(Grid)(() => ({
    background: '#FFFFFF',
    boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.1)',
    borderRadius: '10px',
    padding: '10px 20px'

}))
export const OrderDetailBox = styled(Box)(() => ({
    paddingTop: '10px',
    paddingBottom: '70px'

}))
export const HeadingBox = styled(Box)(() => ({
    padding: '10px 0px 20px 0px',
    textAlign: 'center'
}))
export const StepBox = styled(Box)(({theme}) => ({
    padding: '35px 0px 10px 0px',
    width: '100%',
    [theme.breakpoints.down("md")]: {
        padding: '25px 0px 10px 0px',
    },

}))