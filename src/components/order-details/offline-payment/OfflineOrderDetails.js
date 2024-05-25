import { Grid, IconButton, Stack, Typography, alpha, useTheme } from '@mui/material'
import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { CustomOrderStatus, IformationGridWithBorder, OfflineWrapper } from '../OrderDetail.style'
import OfflinePayment from '../../checkout-page/assets/OfflinePayment'
import { t } from 'i18next'
import EditOrder from '../assets/EditOrder'
import CustomModal from '../../custom-modal/CustomModal';
import CloseIcon from "@mui/icons-material/Close";
import OfflinePaymentDetailsEdit from './OfflinePaymentDetailsEdit'
import OfflinePaymentDenied from '../../../assets/images/icons/OfflinePaymentDenied'
import { ReadMore } from '../../landingpage/ReadMore'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VerificationFailedModal from "./VerificationFailedModal";
import { useRouter } from "next/router";

import { toast } from "react-hot-toast";
import { getToken } from "../../checkout-page/functions/getGuestUserId";
import useMediaQuery from "@mui/material/useMediaQuery";

const OfflineOrderDetails = ({ trackData, refetchTrackData }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const router = useRouter()
    const [openOfflineModal, setOpenOfflineModal] = useState(false);
    const [paymentFailedModal, setPaymentFailedModal]=useState(false);
    const backgroundColorStatus = () => {
        if (trackData?.offline_payment?.data?.status === "pending") {
            return { color: theme.palette.info.dark, status: `${t("Verification Pending")}` };
        }
        if (trackData?.offline_payment?.data?.status === "verified") {
            return { color: theme.palette.success.main, status: `${t("Payment Verified")}` };
        }
        if (trackData?.offline_payment?.data?.status === "denied") {
            return { color: theme.palette.error.main, status: `${t("Verification Failed")}` };
        }
    };
    useEffect(()=>{
        if(trackData?.offline_payment?.data?.status === "denied"){
            setPaymentFailedModal(true)
        }
    },[trackData?.offline_payment?.data?.status])
    const onClose=() => {
        setPaymentFailedModal(false)
    }
    const ChatWithAdmin=()=>{
        if(getToken()){
            router.push(
                {
                    pathname: "/info",
                    query: {
                        page: "inbox",
                        type: "admin",
                        // id: trackData?.data
                        //     ?.restaurant
                        //     .vendor_id,
                        // routeName: "vendor_id",
                        chatFrom: "true"
                    }
                }
            )
        }else{
            toast.error("Please login to chat with admin")
        }

    }
    return (
        <Stack padding="10px">
            <Stack flexDirection={{ xs: "column", md: "row" }} gap="10px" justifyContent="space-between" paddingBottom="15px">
                <Stack flexDirection="row">
                    <Typography
                        color={theme.palette.neutral[400]}
                        fontSize="14px"
                        fontWeight={400}
                        sx={{ textTransform: "capitalize", wordWrap: "break-word" }}
                    >
                        {t("Method")}
                    </Typography>
                    <Typography
                        fontSize="14px"
                        fontWeight='400'
                        color={theme.palette.neutral[1000]}

                    >&nbsp;&nbsp;: &nbsp;&nbsp;
                        {(trackData?.offline_payment !== null && trackData?.payment_method !== "partial_payment") ? (
                            `${t("Offline Payment")} (${trackData?.offline_payment?.data?.method_name})`
                        ) : (
                            trackData?.payment_method.replaceAll('_', ' ')
                        )
                        }
                    </Typography>
                </Stack>

                <Stack>
                    {trackData && trackData?.offline_payment !== null ? (
                        <CustomOrderStatus color={backgroundColorStatus()?.color} >
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: "14px",
                                    color: backgroundColorStatus()?.color,
                                    fontWeight: '600'
                                }}>
                                {backgroundColorStatus()?.status}
                            </Typography>
                        </CustomOrderStatus>
                    ) : (
                        <Typography
                            sx={{ fontWeight: '400' }}
                            align="left"
                        >
                            {trackData &&
                                trackData?.payment_status ===
                                'paid' ? (
                                <span
                                    style={{
                                        color: `${theme.palette.success.main}`,
                                    }}
                                >
                                    {t('Paid')}
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: 'red',
                                    }}
                                >
                                    {t('Unpaid')}
                                </span>
                            )}
                        </Typography>
                    )}
                </Stack>
            </Stack>
            {trackData?.offline_payment?.data?.status === "denied" &&
                <Grid container>
                    <Grid item md={12} xs={12} sx={{paddingBottom:"25px", paddingTop:"10px"}}>
                        <CustomStackFullWidth
                            sx={{
                                backgroundColor:theme=>alpha(theme.palette.nonVeg,.3),
                                padding: "16px ",
                                borderRadius: "10px",
                                width: "100%",
                                gap: "15px",
                            }}
                        >
                            <CustomStackFullWidth
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <ReportProblemIcon sx={{color:theme=>theme.palette.error.main}}/>
                                <ReadMore limits="110">
                                    {trackData?.offline_payment?.data?.admin_note}
                                </ReadMore>
                            </CustomStackFullWidth>

                        </CustomStackFullWidth>
                    </Grid>
                </Grid>}
            <Grid container spacing={trackData?.offline_payment?.data?.status === "verified"?0:2}>
                <Grid item md={12} sm={12} xs={12}>
                    <IformationGridWithBorder
                        isVerfired={trackData?.offline_payment?.data?.status === "verified"}
                        container
                        md={12}
                        xs={12}
                        position="relative"
                    >
                        <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <Stack flexDirection="row" gap={1} alignItems="center">
                                <OfflinePayment />
                                <Typography fontSize="12px" fontWeight='500'>
                                    {t('My Payment Information')}
                                </Typography>
                            </Stack>
                            {trackData?.offline_payment?.data?.status !== "verified" &&
                                <OfflineWrapper>
                                    <IconButton onClick={() => setOpenOfflineModal(true)}>
                                        <EditOrder />
                                    </IconButton>
                                </OfflineWrapper>
                            }
                        </Stack>
                        <CustomStackFullWidth>
                            {trackData?.offline_payment?.input?.map((item, index) => (
                                <Stack flexDirection="row" paddingTop="5px">
                                    <Typography
                                        color={theme.palette.neutral[400]}
                                        fontSize="12px"
                                        fontWeight={400}
                                        sx={{ textTransform: "capitalize", wordWrap: "break-word" }}
                                    >
                                        {item.user_input.replaceAll("_", " ")}{" "}
                                    </Typography>
                                    <Typography
                                        fontSize="12px"
                                        fontWeight={400}
                                        color={theme.palette.neutral[1000]}
                                        sx={{ wordWrap: "break-word" }}
                                    >
                                         : &nbsp;&nbsp; {item.user_data}
                                    </Typography>
                                </Stack>
                            ))}
                            {trackData?.offline_payment?.data?.customer_note &&
                                <Stack flexDirection="row" paddingTop="5px">
                                    <Typography
                                        color={theme.palette.neutral[400]}
                                        fontSize="12px"
                                        fontWeight={400}
                                        sx={{
                                            textTransform: "capitalize",
                                            wordWrap: "break-word",
                                            whiteSpace: "pre-line"
                                        }}
                                    >
                                        {t("Note")}
                                    </Typography>
                                    <Typography
                                        fontSize="12px"
                                        fontWeight={400}
                                        color={theme.palette.neutral[1000]}
                                        sx={{
                                            wordWrap: "break-word"
                                        }}
                                    >
                                        : &nbsp;&nbsp; {trackData?.offline_payment?.data?.customer_note}
                                    </Typography>
                                </Stack>
                            }

                        </CustomStackFullWidth>
                    </IformationGridWithBorder>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <Grid
                        container
                        marginTop={trackData?.offline_payment?.data?.status === "verified" && "1rem"}
                        padding={trackData?.offline_payment?.data?.status === "verified"?"0rem":"1rem"}
                        md={12}
                        xs={12}
                    >
                        <Stack flexDirection="row" gap={1} alignItems="center">
                            <OfflinePayment />
                            <Typography fontSize="12px" fontWeight='500'>
                                {`${trackData?.offline_payment?.data?.method_name} ${t("Information")}`}
                            </Typography>
                        </Stack>
                        <CustomStackFullWidth paddingTop="10px">
                            {trackData?.offline_payment?.method_fields?.map((item, index) => (
                                <Stack flexDirection="row" paddingTop="5px">
                                    <Typography
                                        minWidth="90px"
                                        color={theme.palette.neutral[400]}
                                        fontSize="12px"
                                        fontWeight={400}
                                        sx={{ textTransform: "capitalize", wordWrap: "break-word" }}
                                    >
                                        {item.input_name.replaceAll("_", " ")}
                                    </Typography>
                                    <Typography
                                        fontSize="12px"
                                        fontWeight={400}
                                        color={theme.palette.neutral[1000]}
                                        sx={{ wordWrap: "break-word" }}
                                    >
                                        : &nbsp;&nbsp; {item.input_data}
                                    </Typography>
                                </Stack>
                            ))}

                        </CustomStackFullWidth>
                    </Grid>
                </Grid>
            </Grid>


            <CustomModal
                openModal={openOfflineModal}
                setModalOpen={setOpenOfflineModal}
                maxWidth={isSmall ?"350px":"450px"}
            >
                <CustomStackFullWidth
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ position: "relative" }}
                >
                    <IconButton
                        onClick={() => setOpenOfflineModal(false)}
                        sx={{
                            zIndex: "99",
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: (theme) => theme.palette.neutral[100],
                            borderRadius: "50%",
                            [theme.breakpoints.down("md")]: {
                                top: 10,
                                right: 5,
                            },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "24px", fontWeight: "500" }} />
                    </IconButton>
                </CustomStackFullWidth>
                <OfflinePaymentDetailsEdit
                    trackOrderData={trackData}
                    refetchTrackData={refetchTrackData}
                    // data={data}
                    setOpenOfflineModal={setOpenOfflineModal}
                />
            </CustomModal>
            {paymentFailedModal && <CustomModal openModal={paymentFailedModal} setModalOpen={setPaymentFailedModal}>
              <VerificationFailedModal onClose={onClose} ChatWithAdmin={ChatWithAdmin}/>
            </CustomModal>}
        </Stack>
    )
}

export default OfflineOrderDetails