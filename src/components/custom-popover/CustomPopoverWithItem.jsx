import React, { useEffect, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'

const CustomPopoverWithItem = ({
    title,
    subTitle,
    icon,
    handleClose,
    deleteItem,
    confirmButtonText,
    cancelButtonText,
    isLoading
}) => {
    const [mapImg, setMapImg] = useState()
    const { t } = useTranslation()
    const theme = useTheme();
    useEffect(() => {
        setMapImg(icon)
    }, [])

    return (
        <>
            {mapImg}
            <Stack gap="8px">
                <Typography
                    id="modal-modal-description"
                    fontSize="16px"
                    fontWeight={700}
                >
                    {t(title)}
                </Typography>
                <Typography
                    id="modal-modal-description"
                    fontSize="12px"
                    fontWeight={400}
                >
                    {t(subTitle)}
                </Typography>

            </Stack>
            <Stack flexDirection="row" gap="15px">
                <Button
                    sx={{
                        background: (theme) =>
                            theme.palette.neutral[300],
                        color: `${theme.palette.neutral[1000]} !important`,
                        width: '130px',
                        fontWeight: 400,
                        '&:hover': {
                            background: (theme) =>
                                theme.palette.neutral[500],
                        },
                    }}
                    onClick={handleClose}
                >
                    {t(cancelButtonText)}
                </Button>
                <LoadingButton
                    loading={isLoading}
                    sx={{
                        background: (theme) =>
                            theme.palette.error.main,
                        color: (theme) =>
                            theme.palette.neutral[100],
                        width: '130px',
                        '&:hover': {
                            background: (theme) =>
                                theme.palette.error.dark,
                        },
                    }}
                    onClick={(e) => deleteItem(e)}
                >
                    <Typography
                        sx={{
                            color: (theme) =>
                                theme.palette.neutral[100],
                        }}
                    >
                        {t(confirmButtonText)}
                    </Typography>
                </LoadingButton>
            </Stack>
        </>
    )
}

export default CustomPopoverWithItem
