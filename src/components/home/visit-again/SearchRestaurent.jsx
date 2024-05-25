import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { IconButton, InputAdornment, NoSsr, useTheme } from "@mui/material";
import { Search, StyledInputBase } from '@/components/custom-search/CustomSearch.style';
import { CloseIconWrapper, CustomStackFullWidth } from '@/styled-components/CustomStyles.style';

const SearchRestaurent = ({ restaurants, setRestaurants, allRestaurants }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const router = useRouter();
    let languageDirection = undefined;
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction');
    }

    const handleSearchResult = () => {
        if (value === '') {
            setRestaurants(allRestaurants)
        } else {
            const filteredRestaurants = allRestaurants?.filter(restaurant =>
                restaurant.name.toLowerCase().includes(value.toLowerCase())
            );
            setRestaurants(filteredRestaurants);
        }
    };

    const handleReset = () => {
        setValue('');
        setRestaurants(allRestaurants)
    };

    const handleChange = (value) => {
        setValue(value);
    };

    useEffect(() => {
        handleSearchResult();
    }, [value])

    return (
        <CustomStackFullWidth>
            <Search borderRadius="8px" backgroundColor={theme.palette.neutral[300]}>
                <StyledInputBase
                    placeholder={t("Search restaurants....")}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    inputProps={{ 'aria-label': 'search' }}
                    languageDirection={languageDirection}
                    sx={{
                        padding: "5px 10px"
                    }}
                    startAdornment={
                        <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                            <SearchIcon fontSize="medium" />
                        </InputAdornment>
                    }
                />
                {value !== '' && (
                    <CloseIconWrapper onClick={handleReset} languageDirection={languageDirection}>
                        <IconButton>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </CloseIconWrapper>
                )}
            </Search>
        </CustomStackFullWidth>
    );
};

export default SearchRestaurent;