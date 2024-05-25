import React, { memo, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import {
    Box,
    Typography,
    useMediaQuery,
    Stack,

} from '@mui/material'
import { useSelector } from 'react-redux'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useTranslation } from 'react-i18next'
import noData from '../../../public/static/resturants.png'
import { useTheme } from '@mui/material/styles'
import { onSingleErrorResponse } from '../ErrorResponse'
import { RTL } from '../RTL/RTL'
import CustomImageContainer from '../CustomImageContainer'
import restaurantIcon from '../../../public/static/result_count.svg'
import { mockData } from './mockData'
import RestaurantTab from './restaurant/RestaurantTab'
import { useGetRestaurant } from "@/hooks/react-query/restaurants/useGetRestaurant"
import DotSpin from './restaurant/DotSpin'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { useInView } from 'react-intersection-observer'
import { removeDuplicates } from "@/utils/customFunctions"
import useScrollSticky from "./Search-filter-tag/useScrollSticky";
import { CustomChip } from "@/components/home/Search-filter-tag/FilterTag";
import { t } from "i18next";
import { AllRestaurantFilterData } from "@/components/home/restaurant/AllRestaurantFilterData";
const Restaurant = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const [type, setType] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const [searchKey, setSearchKey] = useState(' ')
    const [offset, setOffSet] = useState(1)
    const [page_limit, setPage_Limit] = useState(12)
    const [resData, setResData] = useState([])
    const matchesToMd = useMediaQuery('(min-width:740px)')
    const matchesToScroll = useMediaQuery('(min-width:828px)')
    const matchesToSmall = useMediaQuery('(min-width:400px)')
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [filterByData, setFilterByData] = useState({})
    const [forFilter, setForFilter] = useState(false)
    const { ref, inView } = useInView()
    const [isFilterTrue, setIsFilterTrue] = useState(false)
    const [checkedFilterKey, setCheckedFilterKey] = useState(
        AllRestaurantFilterData
    )
    const refs = useRef(null)
    const tabMenurefs = useRef(null)

    const responsiveTop = isSmall ? 2000 : matchesToScroll ? 3100 : 3950

    const {
        data,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        fetchPage,
        refetch,
    } = useGetRestaurant({
        filterByData,
        offset,
        page_limit,
        filterType,
        searchKey,
    })
    const successHandler = (res) => {
        if (res?.restaurants?.length > 0) {
            if (offset === 2 || offset === 1) {
                setResData((prev) =>
                    removeDuplicates(
                        [...new Set([...res?.restaurants])],
                        'id'
                    )
                )

            } else {
                setResData((prev) =>
                    removeDuplicates(
                        [...new Set([...prev, ...res?.restaurants])],
                        'id'
                    )
                )
            }


        } else {
            if (offset === 1) {
                setResData(res?.restaurants)
            }
        }
    }
    const handleStoreData = () => {
        if (data && data?.pages?.length > 0) {
            data?.pages?.forEach((item) => {
                successHandler(item)
            })
        }
    }
    useEffect(() => {
        handleStoreData()
        //window.scrollTo(0, responsiveTop)
    }, [data, forFilter, filterByData, filterType])


    const scrollToSection5 = () => {
        if (tabMenurefs.current) {
            const section5Top = tabMenurefs.current.offsetTop;
            if (offset > 1) {
                window.scrollTo({
                    top: section5Top - 200,
                    behavior: 'smooth',
                });
            }

        }
    };

    const handleChange = (event, newValue) => {
        setFilterType(newValue)
        setOffSet(1)
        setForFilter(true)
        scrollToSection5()
        setIsFilterTrue(true)
    }
    useEffect(() => {
        setForFilter(false)
    }, [])

    useEffect(() => {
        if (inView) {
            fetchNextPage()
            setOffSet((prevState) => prevState + 1)
        }
    }, [inView])

    useEffect(async () => {
        if (forFilter) {
            setOffSet(1)
            //fetchPage(2)
            await refetch()
        }
    }, [forFilter, filterByData, filterType])
    let mode = undefined
    if (typeof window !== 'undefined') {
        mode = localStorage.getItem('mode')
    }
    const lightColor = theme.palette.neutral[1000]
    const languageDirection = localStorage.getItem('direction')
    const handleDelete = (itemId) => {
        const tempData = checkedFilterKey.map((items) =>
            items?.id === itemId ? { ...items, isActive: false } : items
        )
        setCheckedFilterKey(tempData)

    }
    const getActiveFilter = checkedFilterKey?.filter((item, index) => item?.isActive)
    return (
        <RTL direction={languageDirection}>
            <Grid
                container
                sx={{ paddingBlockStart: { xs: "0px", sm: '1.6rem' }, paddingBlockEnd: '2rem' }}
                rowGap="1rem"
            >
                <Box id="all-restaurant-tabs" />
                <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        borderBottom: `1px solid ${theme.palette.borderBottomBg}`,
                        position: 'sticky',
                        top: { xs: "93px", md: "100px" },
                        padding: '15px 10px 0px 0px',
                        zIndex: 5,
                        background: theme.palette.neutral[1800],
                    }}
                >
                    <Grid item xs={12} sm={12} md={4}>
                        <Stack direction="row" spacing={1}>
                            <CustomImageContainer
                                src={restaurantIcon.src}
                                width="26px"
                                height="26px"
                            />
                            <Typography
                                variant="h3"
                                color={theme.palette.neutral[1000]}
                                fontWeight="500"
                            >
                                {data?.pages[0]?.total_size} {t('Restaurants')}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} >
                        <RestaurantTab
                            filterByData={filterByData}
                            setFilterByData={setFilterByData}
                            filterType={filterType}
                            handleChange={handleChange}
                            mockData={mockData}
                            setOffSet={setOffSet}
                            setForFilter={setForFilter}
                            responsiveTop={responsiveTop}
                            forFilter={forFilter}
                            setResData={setResData}
                            scrollToSection5={scrollToSection5}
                            offset={offset}
                            isFilterTrue={isFilterTrue}
                            checkedFilterKey={checkedFilterKey}
                            setCheckedFilterKey={setCheckedFilterKey}

                        />
                    </Grid>

                </Grid>
                {getActiveFilter?.length > 0 &&
                    <Grid item xs={12} sm={12} md={12} >
                        {getActiveFilter?.map((item, i) => {
                            return <CustomChip
                                label={item?.name}
                                variant="outlined"
                                onDelete={() => handleDelete(item?.id)}
                                sx={{
                                    marginRight: "1rem",
                                    "&:hover": {
                                        color: theme => theme.palette.neutral[1000]
                                    },
                                    "& .MuiChip-deleteIcon": { // Styling the delete icon
                                        marginRight: "0px",// Example color
                                        marginLeft: "4px",
                                        color: '#a7a7a7 !important',
                                    }
                                }}
                            />
                        })}
                    </Grid>}

                <Grid item xs={12} sm={12} md={12} container spacing={2} ref={tabMenurefs}>
                    {data && (
                        <>
                            {resData?.map((restaurantData) => (
                                <Grid
                                    key={restaurantData?.id}
                                    item
                                    md={3}
                                    sm={matchesToMd ? 4 : 6}
                                    xs={12}
                                >
                                    <RestaurantBoxCard
                                        key={restaurantData?.id}
                                        id={restaurantData.id}
                                        image={restaurantData?.cover_photo}
                                        name={restaurantData?.name}
                                        rating={restaurantData?.avg_rating}
                                        restaurantImageUrl={
                                            global?.base_urls
                                                ?.restaurant_cover_photo_url
                                        }
                                        restaurantDiscount={
                                            restaurantData.discount &&
                                            restaurantData.discount
                                        }
                                        freeDelivery={
                                            restaurantData.free_delivery
                                        }
                                        open={restaurantData?.open}
                                        active={restaurantData?.active}
                                        delivery_time={
                                            restaurantData?.delivery_time
                                        }
                                        cuisines={restaurantData?.cuisine}
                                        coupons={restaurantData?.coupons}
                                        slug={restaurantData?.slug}
                                        zone_id={restaurantData?.zone_id}
                                        rating_count={restaurantData?.rating_count}
                                        opening_time={restaurantData?.current_opening_time}
                                    />
                                </Grid>
                            ))}
                        </>
                    )}
                    <Stack ref={ref}></Stack>
                    {isLoading && !isFetchingNextPage &&
                        (<>
                            {resData.length === 0 && (
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    sx={{
                                        paddingBlockEnd: '30px',
                                        paddingBlockStart: '30px',
                                    }}
                                >
                                    <CustomEmptyResult
                                        image={noData}
                                        label="No restaurant found"
                                    />
                                </Grid>
                            )}
                        </>)
                    }
                </Grid>
                {isFetchingNextPage && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            paddingBlockEnd: '30px',
                            paddingBlockStart: '30px',
                        }}
                    >
                        <Stack sx={{ minHeight: '30vh' }}>
                            <DotSpin />
                        </Stack>
                    </Grid>
                )}
                {isLoading && !isFetchingNextPage && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            paddingBlockEnd: '30px',
                            paddingBlockStart: '30px',
                        }}
                    >
                        <Stack sx={{ minHeight: '40vh' }}>
                            <DotSpin />
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </RTL>
    )
}

export default Restaurant
