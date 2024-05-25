import React, { useEffect, useReducer, useState } from 'react'
import { Grid, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import CustomSideDrawer from '../side-drawer/CustomSideDrawer'
import MenuBar from './customer-layout/MenuBar'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import ProfileSideMenu from './ProfileSideMenu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { t } from 'i18next'
import MobileMenu from '../../assets/images/icons/MobileMenu'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from 'react-redux'
import { setEditProfile } from '../../redux/slices/editProfile'
import { RTL } from '../RTL/RTL'

const SideDrawer = ({ page, setAttributeId }) => {
    const theme = useTheme()
    const dispatch = useDispatch();
    const [pageTitle, setPageTitle] = useState(page)
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [languageDirection, setLanguageDirection] = useState('ltr')
    const { isEditProfile } = useSelector((state) => state.isEditProfile);
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (page === 'profile') {
            if (isEditProfile === true) {
                setPageTitle("Edit Profile")
            } else {
                setPageTitle("My Profile")
            }
        } else if (page === 'coupons') {
            setPageTitle("My Coupons")
        }
        else if(page === "order" || page === "order?flag=success" || page === "order?flag=cancel"){
            setPageTitle("Order")
        }
        else {
            dispatch(setEditProfile(false))
            setPageTitle(page)
        }
    }, [page, pageTitle, isEditProfile])

    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])
    return (
        <>
            {languageDirection && (
                <CustomStackFullWidth paddingBlock="13px 0px">
                    <Stack sx={{ position: "absolute", top: "58px", left: "15px" }}>
                        {(isSmall && isEditProfile === true) &&
                            <IconButton
                                onClick={() => dispatch(setEditProfile(false))}
                                sx={{
                                    width: "30px",
                                    height: "30px",
                                    color: theme => theme.palette.primary.main
                                }}
                            >
                                <ArrowBackIosNewIcon sx={{ fontSize: "10px" }} />
                            </IconButton>
                        }
                    </Stack>
                    <Stack alignItems='center'>
                        <Typography
                            variant="h3"
                            color={theme.palette.neutral[900]}
                            align="center"
                        >
                            {t(pageTitle)}
                        </Typography>
                    </Stack>
                    <Stack sx={{ position: "absolute", top: "55px", right: "15px" }}>
                        <IconButton
                            onClick={() => setOpen(true)}
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                            }}
                        >
                            <MobileMenu />
                        </IconButton>

                    </Stack>
                    <RTL direction={languageDirection}>
                        <CustomSideDrawer
                            open={open}
                            onClose={() => setOpen(false)}
                            anchor={
                                languageDirection === 'rtl' ? 'right' : 'left'
                            }
                        >
                            <ProfileSideMenu
                                onClose={() => setOpen(false)}
                                sidedrawer="true"
                                page={page}
                                setAttributeId={setAttributeId}
                            />
                        </CustomSideDrawer>
                    </RTL>
                </CustomStackFullWidth>
            )}
        </>
    )
}
export default SideDrawer
