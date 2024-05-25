import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import CustomImageContainer from '../CustomImageContainer'
import locationAlertImage from '../../../public/static/locationAlert.svg'
import { Button, Typography, useTheme } from '@mui/material'
import { t } from 'i18next'
import { useDispatch } from 'react-redux'
import { setOpenMapDrawer } from '../../redux/slices/global'

const LocationModalAlert = ({setOpenAddressModalAlert}) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const handleOpen = () => {
        dispatch(setOpenMapDrawer(true))
        setOpenAddressModalAlert(false)
    }
    return (
        <CustomStackFullWidth
            p="1rem"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <CustomImageContainer
                src={locationAlertImage.src}
                width="70px"
                height="70px"
            />
            <Typography variant="h5" color={theme.palette.neutral[1000]}>
                {t("Insert delivery location")}
            </Typography>
            <Typography
                variant="subtitle2"
                color={theme.palette.neutral[400]}
                textAlign="center"
            >
                {t("Please add you delivery location so that we can review if the restaurant is available to deliver in your area or not  ")}
            </Typography>
            <Button 
            variant="outlined" 
            onClick={() => handleOpen()} 
            sx={{
                color: theme.palette.primary.main
                }}
                >
                {t("Pick from Map")}
            </Button>
        </CustomStackFullWidth>
    )
}

export default LocationModalAlert