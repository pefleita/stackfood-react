import { Divider } from '@mui/material'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'

export const CustomBoxForModal = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '670px',
    //width: '100%',
    background: theme.palette.background.paper,
    boxShadow: 24,
    padding: '2.8rem',
    maxHeight: '90vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '0.1em',
    },
    '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.neutral[300],
        outline: `1px solid ${theme.palette.neutral[300]}`,
    },
    [theme.breakpoints.between('xs', 'sm')]: {
        // styles
        padding: '2rem',
        maxWidth: '330px',
        minWidth: '340px',
    },
    // [theme.breakpoints.down('sm')]: {
    //     padding: '1rem',
    //     maxWidth: '300px',
    //     minWidth: '270px',
    // },
}))
