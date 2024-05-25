import React, { useState } from 'react'
import { alpha, Collapse, Typography } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getDataLimit } from '../../utils/customFunctions'
import { t } from 'i18next'
import { useTheme } from '@emotion/react'

const CollapsableMenu = ({ value, toggleDrawers, setOpenDrawer, pathName }) => {
    const router = useRouter()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const handleClick = () => setOpen(!open)
    const handleRoute = (id) => {
        router.push(`${value.path}/${id}`)
        setOpen(false)
        setOpenDrawer(false)
    }
    const handleView = () => {
        router.push(pathName)
        setOpen(false)
        setOpenDrawer(false)
    }
    const textColor = theme.palette.whiteContainer.main
    return (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    borderBottom:"1px solid",
                    borderBottomColor:theme=>alpha(theme.palette.neutral[300],.3),
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        color: `${textColor}`,
                    },
                }}
            >
                <ListItemText primary={<Typography sx={{ fontSize: '12px' }}>{t(value?.text)}</Typography>} />
                {open ? <ExpandLess sx={{fontSize:"16px"}} /> : <ExpandMore sx={{fontSize:"16px"}} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {getDataLimit(value.items)?.map((item, index) => (
                        <ListItemButton
                            sx={{
                                borderBottom:"1px solid",
                                borderBottomColor:theme=>alpha(theme.palette.neutral[300],.3),
                                pl: 4,
                                '&:hover': {
                                    backgroundColor: (theme) =>
                                        alpha(theme.palette.primary.main, 0.2),
                                },
                            }}
                            key={index}
                            onClick={() => handleRoute(item.id)}
                        >
                            <ListItemText primary={<Typography sx={{ fontSize: '12px' }}>{item.name}</Typography>}></ListItemText>
                        </ListItemButton>
                    ))}
                    <ListItemButton
                        sx={{
                            padding: '3px',
                            color: (theme) => theme.palette.primary.main,
                            textAlign: 'center',

                            borderRadius: '10px',
                            marginRight: '20px',
                            marginLeft: '22px',
                        }}
                        onClick={handleView}
                    >
                        <ListItemText primary={<Typography sx={{ fontSize: '12px',textDecoration:"underLine" }}>{t('View all')}</Typography>}></ListItemText>
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    )
}

export default CollapsableMenu
