import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Autocomplete, Paper, styled, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search';

const CssTextField = styled(TextField)(({ theme, border }) => ({
    '& label.Mui-focused': {
        color: '#EF7822',
        background: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#EF7822',
        background: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiFormLabel-root':{
        lineHeight:"1em !important",
        fontSize:"14px",
    },
    '& .MuiOutlinedInput-input':{
        fontWeight:"400",
    },
    '& .MuiOutlinedInput-root': {
        height: '45px',
        padding: '4px 4px 4px 16px',
        fontSize:"14px",
        fontWeight:"400 !important",
        border: border ? border : '',
        '& fieldset': {
            borderColor: '#EF7822',
        },
        '&:hover fieldset': {
            borderColor: '#EF7822',
            border: `1px solid ${border}`,
        },
        '&.Mui-focused fieldset': {
            borderColor: '#EF7822',
        },
    },
}))
const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
    // Override the z-index for the popover
    '& .MuiAutocomplete-root': {
        zIndex: 1500 , // Change this value as needed
    },
}));
const CustomMapSearch = ({
    border,
    setSearchKey,
    setEnabled,
    predictions,
    setPlaceId,
    setPlaceDescription,
    setPlaceDetailsEnabled,
    searchKey,
    placeDescription,
    isLoadingPlacesApi, currentLocationValue
}) => {
    const { t } = useTranslation()


    return (
        <>
            <CustomStackFullWidth mb="1rem">
                <Paper
                    variant="outlined"
                    sx={{
                        width: '100%',
                    }}
                >
                    <CustomAutocomplete
                        fullWidth
                        freeSolo
                        id="combo-box-demo"
                        getOptionLabel={(option) => option.description}
                        options={predictions}
                        value={currentLocationValue}
                        loading={isLoadingPlacesApi}
                        loadingText={t('Loading...')}
                        onChange={(event, value) => {
                            if (value) {
                                if (value.place_id) {
                                    setPlaceId(value?.place_id)
                                    setPlaceDescription(value?.description)
                                }
                            }
                            setPlaceDescription(value?.description)
                            setPlaceDetailsEnabled(true)
                        }}
                        clearOnBlur={true}
                        renderInput={(params) => (
                            <CssTextField

                                border={border}

                                {...params}
                                placeholder={t('Search location here...')}
                                onChange={(event) => {
                                    setSearchKey({
                                        description: event.target.value,
                                    })
                                    if (event.target.value) {
                                        setEnabled(true)
                                    } else {
                                        setEnabled(false)
                                    }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <SearchIcon color="disabled" sx={{fontSize:"1.7rem"}}/>
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                </Paper>
            </CustomStackFullWidth>
        </>
    )
}
export default CustomMapSearch
