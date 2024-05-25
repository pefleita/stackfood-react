import React from 'react'
import CustomContainer from '../../container'
import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import CustomImageContainer from '../../CustomImageContainer'
import { LoadingButton } from '@mui/lab'
import { t } from 'i18next'

const DeleteAccount = ({ deleteUserHandler, handleClose, isLoading }) => {
    const theme = useTheme();
    return (
        <CustomContainer>
            <Typography fontSize="12px" pb="15px">
                {t("If you delete your account. All your data & history in this profile will be deleted")}
            </Typography>
            <Stack flexDirection="row" gap="15px" pb="10px">
                <Button
                    sx={{
                        background: (theme) =>
                            theme.palette.neutral[400],
                        color: `${theme.palette.neutral[100]} !important`,
                        width: '120px',
                        fontWeight: 400,
                        '&:hover': {
                            background: (theme) =>
                                theme.palette.neutral[400],
                        },
                    }}
                    onClick={handleClose}
                >
                    {t('No')}
                </Button>
                <LoadingButton
                    loading={isLoading}
                    sx={{
                        background: (theme) =>
                            theme.palette.error.main,
                        color: (theme) =>
                            theme.palette.neutral[100],
                        width: '120px',
                        '&:hover': {
                            background: (theme) =>
                                theme.palette.neutral[1000],
                        },
                    }}
                    onClick={() => deleteUserHandler()}
                >
                    <Typography
                        sx={{
                            color: (theme) =>
                                theme.palette.neutral[100],
                        }}
                    >
                        {t('Delete')}
                    </Typography>
                </LoadingButton>
            </Stack>
        </CustomContainer>
    )
}

export default DeleteAccount