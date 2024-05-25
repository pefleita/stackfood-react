import React from 'react'
import { List, ListItem, Typography } from '@mui/material'
import { t } from 'i18next'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'

const HowToUse = () => {
    return (
        <CustomStackFullWidth
            alignItems="start"
            justifyContent="center"
            sx={{ height: '100%' }}
            spacing={1}
            padding="1rem"
        >
            <Typography fontSize="14px" fontWeight="700">
                {t('How to use')}
            </Typography>
            <List
                sx={{
                    listStyleType: 'disc',
                    pl: 4,
                    pt: 0,
                    '& .MuiListItem-root': {
                        display: 'list-item',
                        paddingLeft: '0px',
                        paddingBottom: '0px',
                        paddingTop: '0px',
                    },
                }}
            >
                <ListItem key="item1">
                    <Typography fontSize="13px" fontWeight="400">
                        {t(
                            'Earn money for your wallet by completing offers and challenges.'
                        )}
                    </Typography>
                </ListItem>
                <ListItem key="item2">
                    <Typography fontSize="13px" fontWeight="400">
                        {t('Convert your loyalty points into wallet funds.')}
                    </Typography>
                </ListItem>
                <ListItem key="item3">
                    <Typography fontSize="13px" fontWeight="400">
                        {t(
                            'Admin also rewards top customers with wallet funds.'
                        )}
                    </Typography>
                </ListItem>
                <ListItem key="item4">
                    <Typography fontSize="13px" fontWeight="400">
                        {t('Use your wallet funds when placing an order.')}
                    </Typography>
                </ListItem>
            </List>
        </CustomStackFullWidth>
    )
}

export default HowToUse
