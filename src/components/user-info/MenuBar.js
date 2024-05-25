import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { alpha, List, MenuItem, Typography } from '@mui/material'
import { t } from 'i18next'
import CustomImageContainer from '../CustomImageContainer'
import Router from 'next/router'
import { useSelector } from 'react-redux'

const MenuBar = ({ tabData, onClose, sidedrawer, page,setAttributeId }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const handleClick = (item) => {
        setAttributeId('')
        Router.push(
            {
                pathname: '/info',
                query: { page: item?.value },
            },
            undefined,
            { shallow: true }
        )
        sidedrawer === 'true' && onClose()
    }
    return (
        <List padding="0">
            {tabData.map((item, index) => {
                if (
                    (global?.customer_wallet_status === 0 && item.id === 5) ||
                    (global?.loyalty_point_status === 0 && item.id === 6) ||
                    (global?.ref_earning_status === 0 && item.id === 7)
                ) {
                    return null
                } else {
                    return (
                        <MenuItem
                            key={index}
                            selected={item.value === page}
                            onClick={() => handleClick(item)}
                            disableGutters="true"
                            sx={{
                                color: (theme) =>
                                    item.value === page &&
                                    theme.palette.primary.main,
                                paddingY: '0px',
                                marginBottom: '5px',
                                borderRadius: '5px',
                                '&:hover': {
                                    backgroundColor: (theme) =>
                                        alpha(theme.palette.primary.main, 0.2),
                                },
                                '&.Mui-selected': {
                                    backgroundColor: (theme) =>
                                        theme.palette.neutral[200],
                                },
                            }}
                        >
                            <CustomStackFullWidth
                                direction="row"
                                gap="10px"
                                padding="10px 15px"
                            >
                                <CustomImageContainer
                                    src={item?.img.src}
                                    width="20px"
                                />
                                <Typography fontSize="14px" fontWeight="500">
                                    {t(item.label.replaceAll('-', ' '))}
                                </Typography>
                            </CustomStackFullWidth>
                        </MenuItem>
                    )
                }
            })}
        </List>
    )
}

export default MenuBar
