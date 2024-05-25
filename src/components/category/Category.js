import { Container, CssBaseline } from '@mui/material'
import React, { useEffect, useState } from "react";
import CategoryList from './CategoryList'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CustomContainer from '../container'
import PageSearchWithTitle from "./PageSearchWithTitle";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { CategoryApi } from "../../hooks/react-query/config/categoryApi";
import { onErrorResponse } from "../ErrorResponse";
import CustomShimmerCategories from "../CustomShimmer/CustomShimmerCategories";
import { t } from 'i18next';

const Category = () => {
    const matches = useMediaQuery('(max-width:1180px)')
    const [searchKey, setSearchKey] = useState('')

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['category'],
        () => CategoryApi.categories(searchKey),
        {
            onError: onErrorResponse,
        }
    )

    useEffect(async () => {
        await refetch()
    }, [searchKey])

    const handleSearchResult = async (values) => {
        if (values === '') {
            await refetch()
            setSearchKey('')
        } else {
            //setType('all')
            setSearchKey(values)
        }
    }
    return (
        <>
            <CssBaseline />
            <CustomContainer>
                    <Box sx={{marginTop:{xs:"4rem",sm:"5rem",md:"8.5rem"},marginBottom:{xs:"1rem",sm:"1.5rem",md:"2rem"}}}>
                        <PageSearchWithTitle title="Choose Your Favourite Category" handleSearchResult={handleSearchResult}
                         label={t("Search categories ...")}
                        />
                        <CategoryList data={data} isLoading={isLoading} matches={matches} />
                    </Box>
            </CustomContainer>
        </>
    )
}

export default Category
