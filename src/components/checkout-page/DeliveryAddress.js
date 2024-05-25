import React, { useEffect, useState } from 'react'
import {
    Button,
    InputBase,
    Box,
    CircularProgress,
    Typography,
} from '@mui/material'

import { DeliveryCaption, SaveAddressBox, InputField } from './CheckOut.style'
import { useQuery } from 'react-query'
import { AddressApi } from "@/hooks/react-query/config/addressApi"
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import AddressSelectionField from './AddressSelectionField'
import AddressSelectionList from './order-summary/AddressSelectionList'
import { Stack } from "@mui/system";
import CustomPopover from "../custom-popover/CustomPopover";
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style";
import AddNewAddress from "@/components/user-info/address/AddNewAddress";
import { PrimaryButton } from "@/components/products-page/FoodOrRestaurant";
import { ACTIONS } from "@/components/checkout-page/states/additionalInformationStates";

const getZoneWiseAddresses = (addresses, restaurantId) => {
    const newArray = []
    addresses.forEach(item => item.zone_ids.includes(restaurantId) && newArray.push(item))
    return newArray

}
const DeliveryAddress = ({
    setAddress,
    address,
    hideAddressSelectionField,
    handleSize,
    renderOnNavbar,
    additionalInformationDispatch,
    restaurantId, token, handleAddressSetSuccess
}) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [allAddress, setAllAddress] = useState()
    const [selectedAddress,setSelectedAddress] = useState({})
    const [data, setData] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);

    const mainAddress = {
        ...address,
    }
    const handleSuccess = (response) => {
        if (restaurantId) {
            const newObj = {
                ...response.data,
                addresses: getZoneWiseAddresses(response.data.addresses, restaurantId)
            }
            setData(newObj)
        } else {
            setData(response.data)
        }


    }
    const { refetch, isRefetching } = useQuery(
        ['address-list'],
        AddressApi.addressList,
        {
            enabled: false,
            onSuccess: handleSuccess,
            onError: onSingleErrorResponse,
        }
    )
    useEffect(async () => {
        if (token) {
            await refetch()
        }

    }, [restaurantId])
    useEffect(() => {
        data && setAllAddress([mainAddress, ...data.addresses])
    }, [data])

    const handleLatLng = (values) => {
        if(renderOnNavbar==="true")
        {
            setAddress({ ...values, lat: values.latitude, lng: values.longitude })
            localStorage.setItem('currentLatLng', JSON.stringify({lat: values.latitude, lng: values.longitude}))
        }else{
            // setAddress({ ...values, lat: values.latitude, lng: values.longitude })
            setSelectedAddress({ ...values, lat: values.latitude, lng: values.longitude})
        }

    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null)
    };
    const handleSelectedAddress =() => {
        setAddress(selectedAddress)
        if(additionalInformationDispatch){
            additionalInformationDispatch({type:ACTIONS.setStreetNumber , payload:selectedAddress?.road|| '' })
            additionalInformationDispatch({type:ACTIONS.setHouseNumber, payload:selectedAddress?.house|| '' })
            additionalInformationDispatch({type:ACTIONS.setFloor , payload:selectedAddress?.floor || '' })
            additionalInformationDispatch({type:ACTIONS.setAddressType , payload:selectedAddress?.address_type || '' })
        }
        handleClose()
    }
    return (
        <>
            {!renderOnNavbar &&
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <DeliveryCaption>{t('Delivery Addresses')}</DeliveryCaption>
                    <SaveAddressBox onClick={handleClick}>
                        <Typography
                            color={theme.palette.primary.main}
                            sx={{ cursor: 'pointer' }}
                            fontSize="12px"
                            // onClick={handleRoute}
                        >
                            {t('Saved Address')}
                        </Typography>
                    </SaveAddressBox>
               </Stack>
            }
            {hideAddressSelectionField !== 'true' && (
                <AddressSelectionField
                    theme={theme}
                    address={address}
                    refetch={refetch}
                    t={t}
                />
            )}
            {renderOnNavbar === 'true' ? (
                <AddressSelectionList
                    data={data}
                    allAddress={data?.addresses}
                    handleLatLng={handleLatLng}
                    t={t}
                    address={address}

                />
            ) : (
                <SimpleBar style={{ maxHeight: 200 }}>
                    {/*<AddressSelectionList*/}
                    {/*    data={data}*/}
                    {/*    allAddress={allAddress}*/}
                    {/*    handleLatLng={handleLatLng}*/}
                    {/*    t={t}*/}
                    {/*    address={address}*/}
                    {/*    isRefetching={isRefetching}*/}
                    {/*    additionalInformationDispatch={additionalInformationDispatch}*/}
                    {/*/>*/}
                </SimpleBar>
            )}
            <CustomPopover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleClose={handleClose}
                padding="30px 30px 30px"
            >
                <CustomStackFullWidth >
                    <DeliveryCaption no_margin_bottom="true" no_margin_top="true" textAlign="left">{t('Saved Address')}</DeliveryCaption>
                    <AddressSelectionList
                        data={data}
                        allAddress={data?.addresses}
                        handleLatLng={handleLatLng}
                        t={t}
                        address={address}
                        isRefetching={isRefetching}
                        additionalInformationDispatch={additionalInformationDispatch}
                        selectedAddress={selectedAddress}
                        renderOnNavbar={renderOnNavbar}
                    />
                    <Stack justifyContent="center" width="100%" alignItems={data?.addresses?.length>0 ? "star":"center"}>
                        <AddNewAddress refetch={refetch} buttonbg="true" />
                    </Stack>
                    {data?.addresses?.length >0 &&
                        <Stack direction="row" spacing={1} justifyContent="flex-end" witdh="100%" pt=".5rem" gap="10px">
                            <Button variant="outlined"
                                    sx={{
                                        color:theme=>theme.palette.neutral[400],
                                        borderColor:theme=>theme.palette.neutral[300],
                                        '&:hover': {
                                            borderColor: theme=>theme.palette.neutral[300], // Change border color on hover if needed
                                        },
                                    }}
                                    onClick={handleClose}
                            >
                                {t("Cancel")}
                            </Button>
                            <PrimaryButton variant="contained" onClick={handleSelectedAddress}>{t("Select")}</PrimaryButton>
                        </Stack>
                    }

                </CustomStackFullWidth>


            </CustomPopover>

        </>
    )
}
export default DeliveryAddress
