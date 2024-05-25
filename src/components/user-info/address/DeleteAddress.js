import React, { useEffect, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useMutation } from 'react-query'
import { AddressApi } from '../../../hooks/react-query/config/addressApi'
import locationImage from '../../../assets/images/locationImage.png'
import { useTranslation } from 'react-i18next'
import CustomImageContainer from '../../CustomImageContainer'
import { toast } from 'react-hot-toast'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'
import { onErrorResponse } from '../../ErrorResponse'

const DeleteAddress = ({ handleClose, addressId, refetch }) => {
    const [mapImg, setMapImg] = useState()
    const { t } = useTranslation()
    const theme = useTheme();
    const {
        mutate: deleteMutation,
        isLoading,
        error,
    } = useMutation(AddressApi.deleteAddress, {
        onSuccess: () => {
            toast.success(t('Address removed successfully.'))
            handleClose?.()
            refetch()
        },
        onError: onErrorResponse,
    })
    const deleteAddredd = () => {
        deleteMutation(addressId)
    }
    useEffect(() => {
        setMapImg(locationImage.src)
    }, [])

    return (
        <>
            <CustomImageContainer
                src={mapImg}
                alt={t('map-image')}
                height="34px"
                width="34px"
                objectFit="contained"
            />
            <Typography
                id="modal-modal-description"
                fontWeight={500}
            >
                {t('Delete this address?')}
            </Typography>
            <Stack flexDirection="row" gap="15px">
                <Button
                    sx={{
                        background: (theme) =>
                            theme.palette.neutral[300],
                        color: `${theme.palette.neutral[1000]} !important`,
                        width: '85px',
                        fontWeight: 400,
                        '&:hover': {
                            background: (theme) =>
                                theme.palette.neutral[500],
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
                        width: '90px',
                        '&:hover': {
                            background: (theme) =>
                                theme.palette.error.dark,
                        },
                    }}
                    onClick={() => deleteAddredd()}
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
        </>
    )
}

export default DeleteAddress
