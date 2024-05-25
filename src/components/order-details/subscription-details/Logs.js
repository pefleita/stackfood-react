import React from 'react';
import { alpha, Paper, Stack, Typography } from "@mui/material";
import {CustomStackFullWidth} from "@/styled-components/CustomStyles.style";
import {CustomTypography} from "../../custom-tables/Tables.style";
import Skeleton from "@mui/material/Skeleton";
import { FormatedDateWithTimeAnotherType, getAmount, getDateFormatAnotherWay } from "@/utils/customFunctions";
import CustomePagination from "../../pagination/Pagination";
import CustomEmptyResult from "../../empty-view/CustomEmptyResult";
import nodata from "../../../../public/static/lagNodata.png";
import CustomFormatedTime from "../../date/CustomFormatedTime";
import { useTheme } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { t } from 'i18next';
const Logs = props => {
    const { title, logs, offset,setOffset, pauseLoading,isLoading,onClose,orderAmount} = props
    const theme=useTheme()
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const deliveryLogs = () => {
        return <CustomStackFullWidth spacing={2}>
            {isLoading ? <Skeleton width="100%"/>:
             <>
                 {logs?.data?.map((log,index) => {
                     return (
                         <CustomStackFullWidth direction='row' key={log?.id}
                                               alignItems='center'
                                               justifyContent='space-between'
                                               spacing={2}>
                             <Stack>
                                 <Typography fontSize="14px" color={theme.palette.neutral[400]}><span>{`#${index+1}`}</span></Typography>
                             </Stack>
                             <Stack direction="row" width="100%"
                                    justifyContent="space-between"
                                    borderRadius="10px"
                                    padding=".9rem"
                                    alignItems='center'
                                    boxShadow="0px 5px 10px 0px rgba(51, 66, 87, 0.05)"
                                    border="1px solid rgba(3, 157, 85, 0.10)"
                             >
                                 <Stack>
                                     <Typography fontSize="13px" fontWeight="600">{t(`order Id# ${log?.order_id}`)}</Typography>
                                     <Typography fontSize='12px'>{FormatedDateWithTimeAnotherType(log?.created_at)}</Typography>
                                 </Stack>
                                 <Stack >
                                     <Typography textAlign="right" fontSize="14px" fontWeight="600">
                                         {getAmount(
                                             orderAmount,
                                             currencySymbolDirection,
                                             currencySymbol,
                                             digitAfterDecimalPoint
                                         )}
                                     </Typography>
                                     <Typography textTransform='capitalize' sx={{
                                         paddingX:"5px" ,
                                         fontSize:"12px",
                                         backgroundColor:theme=>alpha(theme.palette.success.light,.1),
                                         color:theme=>theme.palette.success.main ,
                                         borderRadius: '3px'
                                     }}>{log?.order_status}</Typography>
                                 </Stack>
                             </Stack>

                         </CustomStackFullWidth>
                     )
                 })}
                 <Stack  spacing={2} pb=".5rem">
                     {logs?.pending_order_logs?.length>0 &&
                         <Typography component="span" fontWeight="500" fontSize="14px" textAlign="center" >
                             {t("Upcoming")} : {" "}
                             <Typography component="span" fontWeight="400" fontSize="12px" color={theme.palette.neutral[400]}>
                                 {t("You’ll get your order timely")}
                             </Typography>
                         </Typography>
                     }
                     <CustomStackFullWidth  spacing={2}>
                         {
                             logs?.pending_order_logs?.length >0 &&
                             logs?.pending_order_logs?.slice(0,3)?.map((log,index) =>(
                                 <CustomStackFullWidth direction='row' key={log?.id}
                                                       alignItems='center'
                                                       justifyContent='space-between'
                                                       spacing={2}>
                                     <Stack>
                                         <Typography fontSize="14px" color={theme.palette.neutral[400]}><span>{`#${index+1+logs?.data?.length}`}</span></Typography>
                                     </Stack>
                                     <Stack direction="row" width="100%" justifyContent="space-between" borderRadius="10px"
                                            padding=".9rem"
                                            alignItems='center'
                                            backgroundColor={theme.palette.sectionBg}
                                            boxShadow="0px 0px 2px 0px rgba(51, 66, 87, 0.40)"
                                     >
                                         <Stack>
                                             <Typography fontSize="13px" fontWeight="600">{t("order Id#")}</Typography>
                                             <Typography fontSize='12px'>{FormatedDateWithTimeAnotherType(log)}</Typography>
                                         </Stack>
                                         <Stack >
                                             <Typography textAlign="right" fontSize="14px" fontWeight="600">
                                                 {getAmount(
                                                     orderAmount,
                                                     currencySymbolDirection,
                                                     currencySymbol,
                                                     digitAfterDecimalPoint
                                                 )}
                                             </Typography>
                                             <Typography textTransform='capitalize' sx={{
                                                 paddingX:"5px" ,
                                                 fontSize:"12px",
                                                 backgroundColor:theme =>alpha(theme.palette.info.light,.2),
                                                 color:theme =>theme.palette.info.main,
                                                 borderRadius: '3px',
                                                 textAlign: 'center'
                                             }}>{t("Pending")}</Typography>
                                         </Stack>
                                     </Stack>
                                 </CustomStackFullWidth>
                             ))
                         }
                     </CustomStackFullWidth>
                 </Stack>
             </>
            }
        </CustomStackFullWidth>
    }
    const pauseLogs = () => {
        return <CustomStackFullWidth spacing={2}>
            {pauseLoading ?<Skeleton width="100%"/> :<>
                {logs?.data?.map((log,index) => {
                    return <CustomStackFullWidth direction='row' key={log?.id} alignItems='center' spacing={2}>
                        <Typography fontSize="14px" color={theme.palette.neutral[400]}>
                            {`#${index+1}`}
                        </Typography>
                        <Stack direction="row" width="100%" justifyContent="space-between" borderRadius="10px" padding=".9rem" alignItems='center' backgroundColor={theme.palette.sectionBg}>
                            <Typography fontSize="13px" fontWeight="600">{t('Log id:-')} <span>{`#${log?.id}`}</span></Typography>
                            <Typography fontSize='12px'
                                        color={theme.palette.neutral[1000]}>
                                {getDateFormatAnotherWay(log?.from)} - {getDateFormatAnotherWay(log?.to)}
                            </Typography>

                        </Stack>
                    </CustomStackFullWidth>
                })}
                {logs?.data?.length===0 &&
                    <CustomEmptyResult width="200px" height="80px" image={nodata} label="No logs found"/>}
            </> }

        </CustomStackFullWidth>

    }
    return (
        <Paper sx={{ padding: '1rem', minHeight: '200px',position:"relative"}}>
             <Box sx={{position:"absolute",right:"1%",top:"1%"}}>
                <IconButton onClick={onClose}>
                    <CloseIcon sx={{fontSize:"16px"}}/>
                </IconButton>
             </Box>
            <CustomStackFullWidth alignItems='center' justifyContent='center' spacing={3}>
                <CustomTypography variant="h4" fontWeight="600">
                    {t(title)}
                </CustomTypography>
                <CustomStackFullWidth alignItems='center' justifyContent='space-between' >
                    {title?.includes('Delivery') ? deliveryLogs() : pauseLogs()}
                    {/*{ logs?.data?.length > 0 ?  :*/}
                    {/*    <CustomEmptyResult width="200px" height="80px" image={nodata} label="No logs found"/> }*/}
                    {
                        logs?.total_size>10&& <CustomePagination
                            total_size={logs?.total_size}
                            page_limit={logs?.limit}
                            offset={offset}
                            setOffset={setOffset}
                        />
                    }
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </Paper>
    )
        ;
};

Logs.propTypes = {};

export default Logs;