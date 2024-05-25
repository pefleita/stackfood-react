import React, { useEffect, useState } from 'react'
import { Box, Grid, Stack } from '@mui/material'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import { useTranslation } from 'react-i18next'
import CustomShimmerCard from '../customShimmerForProfile/CustomShimmerCard'
import CustomePagination from '../pagination/Pagination'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
    NoDataFoundWrapper,
} from '../../styled-components/CustomStyles.style'
import { useTheme } from '@mui/material/styles'
import { setOrderType } from '../../redux/slices/orderType'
import useMediaQuery from '@mui/material/useMediaQuery'
import { onSingleErrorResponse } from '../ErrorResponse'
import OutLineGroupButtons from './OutLineGroupButtons'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'

export const buttonsData = [
    { title: 'Ongoing', value: 'running-orders' },
    { title: 'Previous', value: 'list' },
    { title: 'Subscription', value: 'order-subscription-list' },
]
import Meta from '../Meta'
import { noOrderFound } from '../../utils/LocalImages'
import { useRouter } from 'next/router'

const OrderHistoryPage = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const router = useRouter()
    const route = router.query;
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const { orderType } = useSelector((state) => state.orderType)
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(1)
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { isLoading, data, isError, error, refetch } = useQuery(
        [orderType === 'orders-list', orderType, limit, offset],
        () => OrderApi.orderHistory(orderType, limit, offset),
        {
            onError: onSingleErrorResponse,
        }
    )
    const handleOrderType = (value) => {
        setOffset(1)
        dispatch(setOrderType(value))
    }
    useEffect(() => {
        dispatch(setOrderType(orderType ? orderType : 'running-orders'))
        orderType && refetch()
    }, [])

    return (
        <>
            <Meta
                title={` My Order-${global?.business_name}`}
                description=""
                keywords=""
            />
            <CustomPaperBigCard
                padding={isXSmall ? '10px 10px' : '30px 40px'}
                border={false}

                sx={{ minHeight: !isXSmall && '558px', boxShadow: isXSmall && 'unset' }}
            >
                <Grid container spacing={2.4} >
                    <Grid item xs={12} sm={12} md={12}>
                        <OutLineGroupButtons
                            handleSelection={handleOrderType}
                            buttonsData={buttonsData}
                            selected={orderType}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} columnSpacing={3}>
                        {data?.data?.orders?.map((order, index) => (
                            <OrderCard
                                key={index}
                                order={order}
                                index={index}
                                limit={limit}
                                offset={offset}
                            />
                        ))}
                        {isLoading && (
                            <Box mb="1rem">
                                <CustomShimmerCard />
                            </Box>
                        )}
                        <CustomStackFullWidth
                            sx={{ height: '50px' }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {data?.data?.total_size > 10 && (
                                <CustomePagination
                                    total_size={data?.data?.total_size}
                                    page_limit={limit}
                                    offset={offset}
                                    setOffset={setOffset}
                                />
                            )}
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        {data?.data?.orders?.length === 0 && (
                            <Stack minHeight="30vh" pt={{ xs: "10px", md: "50px" }}>
                                <CustomEmptyResult
                                    label="No Order found"
                                    image={noOrderFound}
                                    height={80}
                                    width={80}
                                />
                            </Stack>
                        )}

                    </Grid>
                </Grid>
            </CustomPaperBigCard>
        </>
    )
}

export default OrderHistoryPage
