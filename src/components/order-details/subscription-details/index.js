import React, { useEffect, useState } from 'react';
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style";
import { CustomTypography } from "../../custom-tables/Tables.style";
import { alpha, Box, Button, Grid, Stack, styled, Typography, useMediaQuery } from "@mui/material";
import { FormatedDateWithTimeAnotherType, getDateFormatAnotherWay } from "@/utils/customFunctions";
import CustomModal from "../../custom-modal/CustomModal";
import Logs from "./Logs";
import { useGeLogs } from "@/hooks/react-query/subscription/useGeLogs";
import SubscriptionSchedules from "./SubscriptionSchedules";
import { ProductDetailsWrapper } from '../OrderDetail.style';
import { useTheme } from "@mui/styles";

const StatusColor = styled(Box)(({ theme, status }) => ({
    backgroundColor: status === 'active' ? theme.palette.success.main : theme.palette.error.main,
    height: '10px',
    width: '10px',
    borderRadius: '50%'

}))

const SubscriptionDetails = props => {
    const {
        subscriptionData,
        t,
        subscriptionSchedules,
        orderId,
        paymentMethod,
        subscriptionCancelled,
        subscriptionCancellationReason,
        subscriptionCancellationNote,
        subscriptionOrderNote,
        orderAmount

    } = props
    const theme=useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [openDeliveryLog, setOpenDeliveryLog] = useState(false)
    const [openPauseLog, setOpenPauseLog] = useState(false)
    const [deliveryOffset, setDeliveryOffset] = useState(1)
    const [pauseOffset, setPauseOffset] = useState(1)
    const { refetch, data, isRefetching,isLoading } = useGeLogs('delivery-log', deliveryOffset, subscriptionData?.id)
    const {
        refetch: pauseLogRefetch, data: pauseLogData, isRefetching: isPauseRefetching,isLoading:pauseLoading
    } = useGeLogs('pause-log', pauseOffset, subscriptionData?.id)
    useEffect(() => {
        openDeliveryLog && refetch()

    }, [openDeliveryLog, deliveryOffset])
    useEffect(() => {
        openPauseLog && pauseLogRefetch()
    }, [openPauseLog, pauseOffset])
    return (
        <ProductDetailsWrapper sx={{ padding: "20px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} align='center'>
                    <CustomTypography variant="h4" fontWeight="600">
                        {t('Subscription Details')}
                    </CustomTypography>
                </Grid>
                <Grid item xs={12}>
                    <CustomStackFullWidth spacing={1}>
                        {/*<CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'*/}
                        {/*    flexWrap='wrap'>*/}
                        {/*    <Typography variant="h5">*/}
                        {/*        {t('Payment method')}*/}
                        {/*    </Typography>*/}

                        {/*    <Typography*/}
                        {/*        sx={{*/}
                        {/*            fontWeight: '700',*/}
                        {/*            color: (theme) => theme.palette.primary.main,*/}
                        {/*            textTransform: 'capitalize',*/}
                        {/*        }}*/}
                        {/*        align="left"*/}
                        {/*    >*/}
                        {/*        {paymentMethod && t(paymentMethod).replaceAll('_', ' ')}*/}
                        {/*    </Typography>*/}
                        {/*</CustomStackFullWidth>*/}
                        <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                            flexWrap='wrap'>
                            <Typography fontSize="14px">
                                {t('Status')}
                            </Typography>
                            <Stack direction='row' alignItems='center' spacing={.5} paddingX="5px" borderRadius="3px" backgroundColor={subscriptionData?.status === 'active'? alpha(theme.palette.success.main,.2):alpha(theme.palette.error.main,.2)}>
                                {/*<StatusColor status={subscriptionData?.status} />*/}
                                <Typography textTransform="capitalize" fontWeight="600" fontSize="12" color={subscriptionData?.status === 'active'?theme.palette.success.main:theme.palette.error.main}>
                                    {t(subscriptionData?.status)}
                                </Typography>
                            </Stack>
                        </CustomStackFullWidth>
                        {subscriptionCancelled &&
                            <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center'
                                gap='8px'
                                flexWrap='wrap'>
                                <Typography variant="h5">
                                    {t('Subscription cancelled by:')}
                                </Typography>
                                <Stack direction='row' alignItems='center' spacing={.5}>
                                    <Typography variant="h5">
                                        {subscriptionCancelled}
                                    </Typography>
                                </Stack>
                            </CustomStackFullWidth>}
                        {subscriptionCancellationReason &&
                            <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center'
                                gap='8px'
                                flexWrap='wrap'>
                                <Typography variant="h5">
                                    {t('Cancellation reason:')}
                                </Typography>
                                <Stack direction='row' alignItems='center' spacing={.5}>
                                    <Typography variant="h5" color='red'>
                                        {subscriptionCancellationReason}
                                    </Typography>
                                </Stack>
                            </CustomStackFullWidth>}
                        {
                            subscriptionCancellationNote && <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center'
                                gap='8px'
                                flexWrap='wrap'>
                                <Typography variant="h5">
                                    {t('Cancellation note:')}
                                </Typography>
                                <Stack direction='row' alignItems='center' spacing={.5}>
                                    <Typography variant="h5" >
                                        {subscriptionCancellationNote}
                                    </Typography>
                                </Stack>
                            </CustomStackFullWidth>
                        }
                        {
                            subscriptionOrderNote && <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center'
                                gap='8px'
                                flexWrap='wrap'>
                                <Typography variant="h5">
                                    {t('Order note:')}
                                </Typography>
                                <Stack direction='row' alignItems='center' spacing={.5}>
                                    <Typography variant="h5" >
                                        {subscriptionOrderNote}
                                    </Typography>
                                </Stack>
                            </CustomStackFullWidth>
                        }
                        {/* <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                        flexWrap='wrap'>
                        <Typography variant="h5">
                        {t('Order id:')}
                        </Typography>
                        <Typography variant="h5">
                            {`#${orderId}`}
                            </Typography>
                        </CustomStackFullWidth> */}
                        {/*<CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'*/}
                        {/*    flexWrap='wrap'>*/}
                        {/*    <Typography variant="h5">*/}
                        {/*        {t('Created at:')}*/}
                        {/*    </Typography>*/}
                        {/*    <Typography variant="h5">*/}
                        {/*        {FormatedDateWithTimeAnotherType(subscriptionData?.created_at)}*/}
                        {/*    </Typography>*/}
                        {/*</CustomStackFullWidth>*/}


                        {/*<CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'*/}
                        {/*    flexWrap='wrap'>*/}
                        {/*    <Typography variant="h5">*/}
                        {/*        {t('Subscription date:')}*/}
                        {/*    </Typography>*/}
                        {/*    <Typography*/}
                        {/*        variant="h5">{getDateFormatAnotherWay(t(subscriptionData?.start_at))} - {getDateFormatAnotherWay(subscriptionData?.end_at)}*/}
                        {/*    </Typography>*/}
                        {/*</CustomStackFullWidth>*/}
                        <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                            flexWrap='wrap'>
                            <Typography fontSize='14px' textTransform='capitalize'>
                                {t('type')}
                            </Typography>
                            <Typography component="span"
                                        fontSize='14px'
                                        textTransform='capitalize'>
                                {t(subscriptionData?.type)}
                                <Typography component="span" fontSize='11px' color={theme.palette.neutral[400]}>
                                    ({getDateFormatAnotherWay(t(subscriptionData?.start_at))} - {getDateFormatAnotherWay(subscriptionData?.end_at)})
                                </Typography>
                            </Typography>
                        </CustomStackFullWidth>
                        <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                              flexWrap='wrap'>
                            <Typography fontSize='14px' textTransform='capitalize'>
                                {t('Total Order')}
                            </Typography>
                            <Typography component="span"
                                        fontSize='14px'
                                        textTransform='capitalize'>
                                {subscriptionData?.quantity}
                            </Typography>
                        </CustomStackFullWidth>
                        <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                              flexWrap='wrap'>
                            <Typography fontSize='14px' textTransform='capitalize'>
                                {t('Delivered')}
                            </Typography>
                            <Typography component="span"
                                        fontSize='14px'
                                        textTransform='capitalize'>
                                {subscriptionData?.delivered_count}
                            </Typography>
                        </CustomStackFullWidth>
                        <CustomStackFullWidth direction='row' justifyContent='space-between' alignItems='center' gap='8px'
                                              flexWrap='wrap'>
                            <Typography fontSize='14px' textTransform='capitalize'>
                                {t('Canceled')}
                            </Typography>
                            <Typography component="span"
                                        fontSize='14px'
                                        textTransform='capitalize'>
                                {subscriptionData?.canceled_count}
                            </Typography>
                        </CustomStackFullWidth>
                        <CustomStackFullWidth  direction={subscriptionData?.type==="daily" ? "row":"column"} spacing={1} sx={{backgroundColor:theme=>theme.palette.sectionBg,padding:'10px', borderRadius:"10px"}} justifyContent={subscriptionData?.type==="daily" ? "space-between":"flex-start"} >
                            <Typography fontSize="14px" fontWeight="500" component="span">
                                {t('Subscription Schedule: ')}
                                <Typography fontSize="12px" component="span">
                                    {`${t('You’ll get your order ')} ${t(subscriptionData?.type)} ${t(' at')}`}
                                </Typography>
                            </Typography>
                            <SubscriptionSchedules subscriptionSchedules={subscriptionSchedules} t={t} />
                        </CustomStackFullWidth>
                    </CustomStackFullWidth>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button onClick={() => setOpenDeliveryLog(true)} fullWidth variant='outlined'
                        sx={{ color: 'primary.main',borderRadius:"5px",fontWeight:"400" }}>
                        {t('Delivery Log')}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button onClick={() => setOpenPauseLog(true)} fullWidth variant='outlined' sx={{ color: theme=>theme.palette.neutral[1000],borderRadius:"5px",borderColor:theme=>theme.palette.neutral[400],fontWeight:"400" }}>
                        {t('Pause Log')}
                    </Button>
                </Grid>
            </Grid>
            <CustomModal  maxWidth={isSmall?"350px":"450px"} openModal={openDeliveryLog}
                setModalOpen={setOpenDeliveryLog}>
                <Logs title='Delivery Log' t={t} logs={data} offset={deliveryOffset} setOffset={setDeliveryOffset}
                      isLoading={isLoading || isRefetching} onClose={()=>setOpenDeliveryLog(false)} orderAmount={orderAmount} />
            </CustomModal>
            <CustomModal openModal={openPauseLog}

                setModalOpen={setOpenPauseLog}>
                <Logs title='Pause Log' t={t} logs={pauseLogData} offset={pauseOffset} setOffset={setPauseOffset}
                      pauseLoading={pauseLoading||isPauseRefetching} onClose={()=>setOpenPauseLog(false)} />
            </CustomModal>
        </ProductDetailsWrapper>
    );
};

SubscriptionDetails.propTypes = {};

export default SubscriptionDetails;