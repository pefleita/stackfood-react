import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import FeaturedCategoryCard from '../featured-category-item/FeaturedCategoryCard'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'
import CustomShimmerCategories from '../CustomShimmer/CustomShimmerCategories'
import CustomPageTitle from '../CustomPageTitle'
import CustomSearch from '../custom-search/CustomSearch'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import useMediaQuery from '@mui/material/useMediaQuery'
import CustomDivider from "../CustomDivider";
import CustomEmptyResult from "../empty-view/CustomEmptyResult";

const CategoryList = ({matches,data,isLoading}) => {
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)


    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CustomShimmerCategories
                    itemCount="20"
                    smItemCount="9"
                    gridControl="true"
                />
            </Box>
        )
    }

    return (
        <Box mt="1.5rem">
            <Grid
                container
                item
                spacing={{ xs: 0, md: 2, lg: 2 }}

            >
                <Grid item md={12}>
                    <CustomDivider/>
                </Grid>
                {data?.data?.map((categoryItem) => (
                    <Grid item md={matches ? 2 : 1.7} sm={3} xs={4} mt=".5rem">
                        <FeaturedCategoryCard
                            key={categoryItem?.id}
                            id={categoryItem?.id}
                            categoryImage={categoryItem?.image}
                            name={categoryItem?.name}
                            categoryImageUrl={
                                global?.base_urls?.category_image_url
                            }
                            height="55px"
                        />
                    </Grid>
                ))}
                {data?.data?.length===0 &&<CustomEmptyResult
                label="No category found"
                />}
            </Grid>
        </Box>
    )
}

export default CategoryList
