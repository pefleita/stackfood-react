import { styled, Box, Card, alpha, Stack } from '@mui/material'

export const WalletBox = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    background: `linear-gradient(180deg, ${alpha(
        theme.palette.primary.main,
        0.8
    )} 0%, ${theme.palette.primary.main} 100%)`,
    borderRadius: '10px',
    padding: '25px 15px 15px 20px',
}))

export const WalletBoxSection = styled(Box)((theme) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    padding: '20px',
    marginTop: '2rem',
}))
