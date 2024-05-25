import React, { useEffect, useState } from 'react'
import FoodOrRestaurant from '../../components/products-page/FoodOrRestaurant'
import ProductList from '../products-page/ProductList'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, Grid, NoSsr, Popover, Typography } from "@mui/material";
import FoodNavigation from '../restaurant-details/foodSection/FoodNavigation'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { CategoryApi } from "@/hooks/react-query/config/categoryApi"
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
import {
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import RestaurantsData from './RestaurantsData'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { noFoodFoundImage, noRestaurantsImage } from "@/utils/LocalImages"
import CustomPageTitle from "../CustomPageTitle";
import CustomDivider from "../CustomDivider";
import FilterButton from "../Button/FilterButton";
import RestaurantFilterCard from "../home/restaurant/RestaurantFilterCard";
import { mockData } from "./categoryFilterData";
import { handleFilterData } from "./helper";
import { setFoodOrRestaurant } from "@/redux/slices/searchFilter";
import { isAction } from "@reduxjs/toolkit";

const CategoryDetailsPage = ({
                                 data,
                                 id,
                                 category_id,
                                 setCategoryId,
                                 resData,
                                 offset,
                                 page_limit,
                                 type,
                                 setOffset,
                                 setType,
                                 filterByData,
                                 setFilterByData, name, priceAndRating, setPriceAndRating, isLoading
                             }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [highestPrice, setHighestPrice] = useState(0)
    const open = Boolean(anchorEl)
    //const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    // const [priceAndRating,setPriceAndRating] = useState({
    //     price:'',
    //     rating:''
    // })
    const [checkedFilterKey, setCheckedFilterKey] = useState(
        mockData
    )
    const { foodOrRestaurant } = useSelector((state) => state.searchFilterStore)
    const [forFilter, setForFilter] = useState(false)
    const [isFirstRender, setIsFirstRender] = useState(true);
    //const [offset, setOffSet] = useState(1)
    //const [filterByData, setFilterByData] = useState({})
    const [catetoryMenus, setCategoryMenus] = useState([])
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()

    const {
        isLoading: isLoadingChilds,
        data: childesData,
        isError,
        error,
        refetch,
    } = useQuery([`category-Childes`, id], () =>
        CategoryApi.categoriesChildes(id)
    )
    useEffect(() => {
        if (childesData && id?.length > 0) {
            setCategoryMenus(childesData.data)
        }
        setCategoryId(id)
    }, [childesData, id])
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const handleDropClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleDropClose = () => {
        setAnchorEl(null)
    }
    useEffect(() => {
        handleFilterData(checkedFilterKey, setFilterByData, setOffset, setForFilter)
    }, [checkedFilterKey])

    const handlePrice = (value) => {
        setPriceAndRating({
            ...priceAndRating,
            price: value,
        })
        setForFilter(true)
    }
    const handleChangeRatings = (value) => {
        setPriceAndRating({
            ...priceAndRating,
            rating: value,
        })
        setForFilter(true)
    }
    const getFoodOrRestaurant = (value) => {
        setFoodOrRestaurant(value)

    }
    useEffect(() => {
        if (foodOrRestaurant === "restaurants") {
            setOffset(1)
        }
    }, [foodOrRestaurant]);
    useEffect(() => {
        if (data && isFirstRender) {
            //const getHighestPrice = Math?.max(...data?.data?.products?.map(food => food.price));
            setHighestPrice(data?.data?.max_price);
            setIsFirstRender(false); // Set isFirstRender to false after the first render
        }
        return ()=>{
            setIsFirstRender(true)
        }
    }, [data,id]);

    const handleReset = () => {
        const data = checkedFilterKey?.map((item) => ({
            ...item,
            isActive: false
        }));
        setCheckedFilterKey(data)
        setPriceAndRating(
            {
                price:[],
                rating:0
            }
        )
    };

    return (
        <NoSsr>
            <Grid container spacing={{ xs: 1, sm: 3, md: 2 }}>
                <Grid item md={12} sm={12} xs={12} align="center">
                    <CustomPageTitle title={`${t("Search Result for")} "${name}"`} textAlign="center" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} align="center">
                    <NoSsr>
                        <FoodOrRestaurant
                            foodOrRestaurant={foodOrRestaurant}
                            setFoodOrRestaurant={setFoodOrRestaurant}
                            isRestaurant                        />
                        <CustomDivider marginTop="0px" />
                    </NoSsr>
                </Grid>
                <Grid item xs={12} sm={12} md={12} align="left" mt="0rem">
                    <CustomStackFullWidth direction="row" justifyContent={catetoryMenus?.length>0?"space-between":"flex-end"} alignItems="center">
                        {catetoryMenus?.length>0 &&
                            <FoodNavigation
                                catetoryMenus={catetoryMenus}
                                setCategoryId={setCategoryId}
                                category_id={category_id}
                                id={id}
                            />}

                        <FilterButton
                            id="fade-button"
                            handleClick={handleDropClick}
                            //activeFilters={activeFilters}

                        />
                    </CustomStackFullWidth>

                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    spacing={{ xs: 1, md: foodOrRestaurant === 'products' ? 2 : 4 }}
                >
                    {foodOrRestaurant === 'products' &&
                        (data?.data ? (
                            <>
                                <ProductList
                                    product_list={data?.data}
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                />
                                {data?.data?.products.length === 0 && (
                                    <CustomEmptyResult
                                        image={noFoodFoundImage}
                                        label=" No Food Found"
                                    />
                                )}
                            </>
                        ) : (
                            <CustomShimmerForBestFood />
                        ))}

                    {foodOrRestaurant === 'restaurants' &&
                        (resData ? (
                            <>
                                <RestaurantsData
                                    resData={resData}
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                    global={global}
                                />
                                {resData.data.total_size === 0 && (
                                    <CustomStackFullWidth sx={{ mt: '10px' }}>
                                        <CustomEmptyResult
                                            image={noRestaurantsImage}
                                            label="No Restaurants Found"
                                        />
                                    </CustomStackFullWidth>
                                )}
                            </>
                        ) : (
                            <>
                                <CustomShimmerRestaurant />
                            </>
                        ))}
                </Grid>
            </Grid>
            <Popover
                onClose={() => handleDropClose()}
                id="fade-button"
                open={open}
                anchorEl={anchorEl}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

                sx={{
                    zIndex: 999,
                }}
                disableRestoreFocus
            >
                <RestaurantFilterCard
                    mockData={mockData}
                    rowWise
                    checkboxData={checkedFilterKey}
                    handleDropClose={handleDropClose}
                    anchorEl={anchorEl}
                    highestPrice={highestPrice}
                    setFilterByData={setFilterByData}
                    //handleFilter={handleFilter}
                    //handleClearAll={handleClearAll}
                    setCheckedFilterKey={setCheckedFilterKey}
                    foodOrRestaurant={foodOrRestaurant}
                    handlePrice={handlePrice}
                    handleChangeRatings={handleChangeRatings}
                    priceAndRating={priceAndRating}
                    handleReset={handleReset}
                />
            </Popover>
        </NoSsr>
    )
}

export default CategoryDetailsPage