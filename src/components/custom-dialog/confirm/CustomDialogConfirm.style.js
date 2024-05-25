import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'

export const WrapperForCustomDialogConfirm = styled(Paper)(({ theme,width }) => ({
    padding:"1rem",
    maxWidth:"29.313rem",
    width: "100%",
    [theme.breakpoints.up('md')]: {
        width: width?width:'31.313rem',
    },
}))
