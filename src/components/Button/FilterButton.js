import React from 'react'
import { Box, Stack } from "@mui/system";
import TuneIcon from '@mui/icons-material/Tune';
import { Button, Typography } from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { t } from 'i18next'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
const FilterButton = ({ handleClick, activeFilters, forSearch }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Button
            variant="outlined"
            sx={{
                padding: { xs: (forSearch ? '5px 30px' : "4px 8px"), sm: '4px 8px', md: '5px 8px' },
                borderRadius: '6px',
                color: theme => theme.palette.primary.main,
                borderColor: theme => theme.palette.primary.main,
                marginBottom: "5px",
                minWidth: "33px"
            }}
            onClick={handleClick}
        >
            <Stack direction="row" alignItems="center" spacing={0.5} paddingX=".5rem">
                {activeFilters?.length > 0 &&
                    <Box
                        sx={{
                            backgroundColor: theme => theme.palette.primary.main,
                            color: theme => theme.palette.neutral[100],
                            borderRadius: '50%',
                            fontSize: "12px",
                            width: '19px',
                            height: '19px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '5px',
                            marginRight: '5px',
                        }}>
                        {activeFilters?.length}
                    </Box>}
                <FilterAltIcon
                    style={{
                        width: '14px',
                        height: '14px',
                    }}
                    sx={{ color: theme.palette.primary.main }}

                />

                {!isSmall && (
                    <Typography
                        fontSize="12px"
                        fontWeight="500"
                        color={theme.palette.primary.main}
                    >
                        {t('Filter')}
                    </Typography>
                )}

            </Stack>
        </Button>
    )
}

export default FilterButton
