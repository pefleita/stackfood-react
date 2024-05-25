import React from 'react'
import PropTypes from 'prop-types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style"
import ListItemText from '@mui/material/ListItemText'
import { alpha, ListItemButton, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import Divider from '@mui/material/Divider'
import CustomAlert from '../../alert/CustomAlert'
import CustomCheckOutShimmer from '../../CustomShimmerForCheckout/CustomCheckOutShimmer'
import { useTheme } from "@mui/material/styles";
import { ACTIONS } from "../states/additionalInformationStates";
import CustomImageContainer from "@/components/CustomImageContainer";
import noAddress from "../assets/no-address.png"
import { Box, Stack } from "@mui/system";
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'



const AddressSelectionList = (props) => {
    const theme = useTheme()
    const { renderOnNavbar, selectedAddress, data, allAddress, handleLatLng, t, address, isRefetching, additionalInformationDispatch } = props
    const handleClick = (adres) => {
        handleLatLng(adres)
    }
    return (
        <CustomStackFullWidth minWidth="300px">
            <SimpleBar style={{ maxHeight: 300, width: "100%" }}>

                <List
                    sx={{
                        width: '100%',
                        marginTop: ".3rem",
                        paddingRight:"15px"
                        // bgcolor: 'background.paper',


                    }}
                >
                    {data &&
                        allAddress?.length > 0 &&
                        allAddress?.map((adres, index, array) => (
                            <React.Fragment key={adres.id}>
                                <ListItemButton
                                    onClick={() => handleClick(adres)}
                                    alignItems="flex-start"
                                    sx={{
                                        padding: '10px',
                                        border: "1px solid",
                                        borderColor: theme => theme.palette.neutral[200],
                                        borderRadius: "10px",
                                        cursor: 'pointer',
                                        marginBottom: index !== array.length - 1 ? "1rem" : undefined,
                                        width: "100%",
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.primary.main, .2),
                                        }
                                    }}
                                    selected={adres.id === selectedAddress?.id}
                                >
                                    <CustomStackFullWidth
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Radio
                                            checked={adres.id === selectedAddress?.id}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        />
                                        <ListItemText
                                            primary={
                                                <Typography textTransform="capitalize" fontSize="14px" fontWeight="500">
                                                    {t(adres.address_type)}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    noWrap
                                                    fontSize="12px"
                                                    maxWidth="285px"
                                                    color={theme.palette.neutral[400]}
                                                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                >
                                                    {adres.address}
                                                </Typography>
                                            }
                                        />
                                    </CustomStackFullWidth>
                                </ListItemButton>
                            </React.Fragment>
                        ))}

                    {renderOnNavbar === 'true' ? (
                        <>
                            {!isRefetching && allAddress?.length === 0 && (
                                <CustomAlert
                                    type="info"
                                    text={t('No saved addresses found to select.')}
                                />
                            )}
                        </>
                    ) : (
                        <>{!isRefetching && allAddress?.length === 0 &&
                            <CustomStackFullWidth spacing={3} alignItems="center" justifyContent="center">
                                <CustomImageContainer width="120px" height="117px" objectFit="contain" src={noAddress.src} />
                                <Stack maxWidth="206px" width="100%" alignItems="center">
                                    <Typography fontSize="1rem" fontWeight="600">{t("Oops!")}</Typography>
                                    <Typography fontSize="12px" color={theme.palette.neutral[400]}>
                                        {t("You don’t have any saved address yet. please save address to continue")}
                                    </Typography>
                                </Stack>
                            </CustomStackFullWidth>}</>

                    )}

                    {!data && <CustomCheckOutShimmer />}
                </List>

            </SimpleBar>
        </CustomStackFullWidth>
    )
}

AddressSelectionList.propTypes = {}

export default AddressSelectionList
