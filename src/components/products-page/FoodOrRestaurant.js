import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { alpha, Grid, Stack, styled, Typography } from '@mui/material'
import buttonImg from '../../../public/static/buttonImg/image 30.png'
import buttonImg2 from '../../../public/static/buttonImg/image 29.png'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'

import { useDispatch } from "react-redux";
import { setProductsOrRestaurants, setSelectedName, setSelectedValue } from "@/redux/slices/searchTagSlice";
import { setFoodOrRestaurant } from "../../redux/slices/searchFilter";
export const PrimaryButton = styled(Button)(
    ({
        backgroundColor,
        hoverBackgroundColor,
        borderRadius,
        theme,
        padding,
        color,
    }) => ({
        backgroundColor: backgroundColor,
        borderRadius: borderRadius ? borderRadius : '8px',
        color: theme.palette.neutral[100],
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
            color: hoverBackgroundColor,
        },
        [theme.breakpoints.down('sm')]: {
            padding: padding ? padding : '',
        },
    })
)
export default function FoodOrRestaurant({
    foodOrRestaurant,
    setFoodOrRestaurant,
    handleFilter,
                                             filterData
}) {
    const { t } = useTranslation()
    const theme = useTheme()
    const dispatch=useDispatch()
    const orangeColor = theme.palette.primary.main
    const isProduct = foodOrRestaurant === 'products'
    const isRestaurant = foodOrRestaurant === 'restaurants'
    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    React.useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])
    const handleClick = (value) => {
        dispatch(setFoodOrRestaurant(value))
        dispatch(setSelectedValue(""))
        dispatch(setSelectedName(""))
        
    }
    return (
        <>
            {languageDirection && (
                <Stack
                    alignItems="center"
                    justifyContent="flex-start"
                    direction="row"
                    spacing={{ xs: 3, sm: 4, md: 5 }}
                    gap={languageDirection === 'rtl' && '10px'}
                    marginTop={{ xs: '10px', sm: '10px', md: '0px' }}
                >
                    <Typography
                        onClick={() => handleClick('products')}
                        fontSize={{ xs: '14px', sm: '16px', md: '16px' }}
                        fontWeight={isProduct ? '600' : '400'}
                        sx={{
                            color: isProduct
                                ? (theme) => theme.palette.neutral[1000]
                                : (theme) => theme.palette.neutral[500],
                            cursor: 'pointer',
                        }}
                    >
                        {t('Foods')}
                        <Typography
                            sx={{
                                borderBottom: isProduct
                                    ? `5px solid ${theme.palette.primary.main}`
                                    : '',
                                borderRadius: '20px',
                                marginTop: '4px',
                            }}
                        ></Typography>
                    </Typography>
                    {
                        filterData?.sortBy !== "low" && filterData?.sortBy !=="high"  && (
                            <Typography
                                onClick={() => handleClick('restaurants')}
                                fontSize={{ xs: '14px', sm: '16px', md: '16px' }}
                                fontWeight={isRestaurant ? '600' : '400'}
                                sx={{
                                    color: isRestaurant
                                        ? (theme) => theme.palette.neutral[1000]
                                        : (theme) => theme.palette.neutral[500],
                                    cursor: 'pointer',
                                }}
                            >
                                {t('Restaurants')}
                                <Typography
                                    sx={{
                                        borderBottom: isRestaurant
                                            ? `5px solid ${theme.palette.primary.main}`
                                            : '',
                                        borderRadius: '20px',
                                        marginTop: '4px',
                                    }}
                                />
                            </Typography>
                        )
                    }

                </Stack>
            )}
        </>
    )
}
