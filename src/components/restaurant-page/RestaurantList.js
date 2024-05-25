import { Box, Chip, Grid, MenuItem, Popover, Select } from "@mui/material";
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useSelector } from 'react-redux'
import { RestaurantsApi } from "@/hooks/react-query/config/restaurantApi"
import { useQuery } from 'react-query'
//import LinearProgress from '@mui/material/LinearProgress'
import CustomePagination from '../pagination/Pagination'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { CustomPaperBigCard, CustomStackFullWidth } from "@/styled-components/CustomStyles.style";

import { onErrorResponse } from '../ErrorResponse'
import RestaurantListShimmer from './RestaurantListShimmer'
import PageSearchWithTitle from "../category/PageSearchWithTitle";
import CustomDivider from "../CustomDivider";
import FilterButton from "../Button/FilterButton";
import RestaurantFilterCard from "../home/restaurant/RestaurantFilterCard";
import { mockData } from "./restaurantpageData";
import { handleFilterData } from "../category/helper";
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import 'simplebar-react/dist/simplebar.min.css'
import { Stack } from "@mui/system";
import CustomEmptyResult from "../empty-view/CustomEmptyResult";
import { noRestaurantsImage } from "@/utils/LocalImages";
import CustomShimmerRestaurant from "../CustomShimmer/CustomShimmerRestaurant";

const RestaurantList = () => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [checkedFilterKey, setCheckedFilterKey] = useState(
        mockData
    )
    const [filterByData, setFilterByData] = useState({})
    const [forFilter, setForFilter] = useState(false)
    const [page_limit, setPageLimit] = useState(16)
    const [offset, setOffset] = useState(1)
    const matchesToSmall = useMediaQuery('(min-width:400px)')
    const [searchKey, setSearchKey] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const { global } = useSelector((state) => state.globalSettings)
    const [priceAndRating,setPriceAndRating] = useState({
        price:[],
        rating:0
    })
    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])

    const { isLoading, data, isError, error, refetch,isRefetching } = useQuery(
        ['all-restaurant', offset, page_limit,filterByData,priceAndRating],
        () =>
            RestaurantsApi.restaurants({
                offset,
                page_limit,
                searchKey,
                filterByData,
                priceAndRating
            }),
        {
            onError: onErrorResponse,
        }
    )


    useEffect(()=>{
        handleFilterData(checkedFilterKey,setFilterByData,setOffset,setForFilter)
    },[checkedFilterKey])

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

    const handleDropClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleDropClose = () => {
        setAnchorEl(null)
    }
    const getSelectedFilter =  checkedFilterKey?.filter((item) => item?.isActive)
    const handleDelete = (chipItem) => {
        const tempData = checkedFilterKey?.map(
            (items) => items?.value === chipItem?.value ? { ...items, isActive: false } : items
        );
        setCheckedFilterKey(tempData);
    };

    const handleChangeRatings = (value) => {
        setPriceAndRating({
            ...priceAndRating,
            rating: value,
        })
        setForFilter(true)
    }
    const handleReset = () => {
        const data = checkedFilterKey?.map((item) => ({
            ...item,
            isActive: false
        }));
        setCheckedFilterKey(data)
        setPriceAndRating({
            price:[],
            rating:0
        })
        //handleDropClose()

    };
    return (
        <>
            {languageDirection && (
                <Box mt={{ xs: '4rem', md: '8.5rem' }} mb="1rem">
                    <Grid
                        container
                        spacing={{xs:1,sm:2,md:2}}
                        alignItems="center"
                        justifyContent="center"
                        mt="1rem"
                    >
                        <Grid item md={12} sm={12} xs={12} >
                            <PageSearchWithTitle title={t("Choose Food from  your Favourite Restaurants")} handleSearchResult={handleSearchResult}
                                                 label="Search restaurants..."
                            />
                        </Grid>
                        <Grid item md={12} align="right" sm={12} xs={12}>
                            <CustomStackFullWidth direction="row" justifyContent="flex-end"   alignItems="center" spacing={1}>
                                <SimpleBar style={{ width: '100%' }}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent={{
                                            xs: 'flex-start',
                                            sm: 'flex-start',
                                            md: 'flex-end',
                                        }}
                                        alignItems="center"
                                    >
                                        {getSelectedFilter?.map((item) => (
                                            <Chip
                                                sx={{fontWeight:"400",color:theme.palette.neutral[500],fontSize:"12px",padding:"0px 5px",height:"30px"}}
                                                label={item?.name}
                                                variant="outlined"
                                                onDelete={() => handleDelete(item)}
                                            />
                                        ))}
                                    </Stack>
                                </SimpleBar>
                                <FilterButton
                                    id="fade-button"
                                    handleClick={handleDropClick}
                                />
                            </CustomStackFullWidth>
                        </Grid>
                        <Grid item md={12}>
                            <CustomDivider marginTop="0rem"/>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            container
                            spacing={{xs:1,sm:2,md:4}}
                            marginTop={{xs:"0rem",md:".1rem"}}
                        >
                            {data?.data?.restaurants?.map((restaurantData) => {
                                if (restaurantData) {
                                    return (
                                        <Grid
                                            item
                                            xs={ 12}
                                            sm={4}
                                            md={3}
                                        >
                                            <RestaurantBoxCard
                                                slug={restaurantData?.slug}
                                                image={
                                                    restaurantData?.cover_photo
                                                }
                                                name={restaurantData?.name}
                                                rating={
                                                    restaurantData?.avg_rating
                                                }
                                                restaurantImageUrl={
                                                    global?.base_urls
                                                        ?.restaurant_cover_photo_url
                                                }
                                                id={restaurantData?.id}
                                                active={restaurantData.active}
                                                open={restaurantData.open}
                                                restaurantDiscount={
                                                    restaurantData.discount &&
                                                    restaurantData.discount
                                                }
                                                freeDelivery={
                                                    restaurantData.free_delivery
                                                }
                                                delivery_time={
                                                    restaurantData?.delivery_time
                                                }
                                                cuisines={
                                                    restaurantData?.cuisine
                                                }
                                                rating_count={restaurantData?.rating_count}
                                                coupons={restaurantData?.coupons}
                                                opening_time={restaurantData?.current_opening_time}
                                            />
                                        </Grid>
                                    )
                                }
                            })}
                            {isLoading && <CustomShimmerRestaurant />}
                            {data?.data?.restaurants?.length === 0 && (
                                <CustomEmptyResult
                                    label="No Restaurants found"
                                    image={noRestaurantsImage}
                                />
                            )}
                        </Grid>
                        {data?.data?.restaurants?.length > 0 &&
                            <Grid item xs={12} sm={12} md={12}>
                                <CustomePagination
                                    total_size={data?.data?.total_size}
                                    page_limit={page_limit}
                                    offset={offset}
                                    setOffset={setOffset}
                                />
                            </Grid>}

                    </Grid>
                    <Popover
                        onClose={() => handleDropClose()}
                        id="fade-button"
                        open={open}
                        anchorEl={anchorEl}
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
                            top: '5px',
                        }}
                        disableScrollLock={true}
                        disableRestoreFocus
                    >
                        <RestaurantFilterCard
                            mockData={mockData}
                            rowWise
                            checkboxData={checkedFilterKey}
                            handleDropClose={handleDropClose}
                            anchorEl={anchorEl}
                            // setFilterByData={setFilterByData}
                            //handleFilter={handleFilter}
                            setCheckedFilterKey={setCheckedFilterKey}
                            handleChangeRatings={handleChangeRatings}
                            priceAndRating={priceAndRating}
                            handleReset={handleReset}

                        />
                    </Popover>
                </Box>
            )}
        </>
    )
}

export default RestaurantList