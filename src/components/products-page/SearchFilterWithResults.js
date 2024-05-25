import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"

import { Grid, Stack, useMediaQuery } from "@mui/material";
import FoodOrRestaurant from './FoodOrRestaurant'
import ProductList from './ProductList'
import RestaurantsData from '../category/RestaurantsData'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { useTheme } from '@mui/material/styles'
import { AnimationDots } from './AnimationDots'
import { noFoodFoundImage, noRestaurantsImage } from "@/utils/LocalImages"
import CustomePagination from "../pagination/Pagination";

const SearchFilterWithResults = ({
    searchValue,
    count,
    foodOrRestaurant,
    setFoodOrRestaurant,
    data,
    isLoading,
    offset,
    page_limit,
    setOffset,
    global,
    handleFilter,
    handleClearAll,
    isNetworkCalling,
    popularFoodisLoading,
    restaurantIsLoading,
    page,
    restaurantType, totalData,
                                     filterData

}) => {
    const theme = useTheme()
    return (
        <CustomStackFullWidth
            spacing={2}
            sx={{
                minHeight: '53vh',
                marginTop: page || restaurantType ? '0px' : '20px',
            }}
        >
            <Grid container gap="15px">
                <Grid item xs={12} sm={12} md={12} align="center">
                    {!page && !restaurantType && (
                        <FoodOrRestaurant
                            filterData={filterData}
                            foodOrRestaurant={foodOrRestaurant}
                            setFoodOrRestaurant={setFoodOrRestaurant}
                        />
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    spacing={2}
                    paddingTop="1rem"
                >
                    {(foodOrRestaurant === 'products' || page)  && (
                        <>
                            {(isLoading || isNetworkCalling) ?
                                <Stack
                                 width="100%"
                                 minHeight="500px"

                                > <AnimationDots align="center" /></Stack>
                            :
                                <>
                                    {data?.data?.products?.length > 0 && (
                                        <ProductList
                                            product_list={data?.data}
                                            offset={offset}
                                            page_limit={page_limit}
                                            setOffset={setOffset}
                                        />
                                    )}
                                    {data?.data?.products?.length === 0 &&  (
                                        <CustomEmptyResult
                                            label="No food found"
                                            image={noFoodFoundImage}
                                        />
                                    )}
                                </>
                            }

                        </>
                    )}
                    {foodOrRestaurant === 'restaurants' && (
                        <>
                            {(isLoading || isNetworkCalling)?(  <Stack
                                width="100%"
                                minHeight="500px"

                            > <AnimationDots align="center" /></Stack>):<>
                                {data && !isLoading && (
                                    <RestaurantsData
                                        resData={data}
                                        offset={offset}
                                        page_limit={page_limit}
                                        setOffset={setOffset}
                                        global={global}
                                        restaurantType={restaurantType}
                                    />
                                )}
                                {data?.data?.restaurants?.length === 0 && (
                                    <CustomEmptyResult
                                        label="No restaurant found"
                                        image={noRestaurantsImage}
                                    />
                                )}
                            </>}

                        </>
                    )}
                </Grid>
                {/*{totalData>0 && totalData>page_limit && !isLoading&&*/}
                {/*    <Grid item md={12} xs={12} sm={12}>*/}
                {/*    <CustomePagination page_limit={page_limit}*/}
                {/*                       setOffset={setOffset}*/}
                {/*                       offset={offset}*/}
                {/*                       total_size={totalData}*/}
                {/*    />*/}
                {/*   </Grid>*/}
                {/*}*/}

            </Grid>
        </CustomStackFullWidth>
    )
}

SearchFilterWithResults.propTypes = {}

export default SearchFilterWithResults
