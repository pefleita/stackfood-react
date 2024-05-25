import { Stack, Typography, alpha, styled, useTheme } from '@mui/material'
import React from 'react'
import CustomImageContainer from '../CustomImageContainer'
import { t } from 'i18next'

const ContactItemWrapper = styled(Stack)(({ theme }) => ({
    borderRadius: "10px",
    gap: "25px",
    alignItems: "center",
    paddingBlock: "35px",
    cursor: "pointer",
    boxShadow: `0px 4px 4px 0px ${alpha(theme.palette.neutral[900], 0.1)}`,
    '&:hover': {
        boxShadow: `0px 10px 30px 0px ${alpha(theme.palette.neutral[900], 0.1)}`,
    },
}))
const ContactItem = ({ icon, title, subTitle, onClick }) => {
    const theme = useTheme();
    return (
        <ContactItemWrapper onClick={onClick}>
            <CustomImageContainer
                src={icon}
                alt='logo'
                width="70px"
                objectFit='contained'
            />
            <Stack alignItems="center" gap="7px">
                <Typography fontWeight={600} color={theme.palette.neutral[1000]}>{t(title)}</Typography>
                <Typography color={theme.palette.neutral[400]}>{t(subTitle)}</Typography>
            </Stack>
        </ContactItemWrapper>
    )
}
export default ContactItem