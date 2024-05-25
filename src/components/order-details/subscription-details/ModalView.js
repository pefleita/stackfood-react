import React, { useState } from 'react';
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { CustomTypography } from "../../custom-tables/Tables.style";
import { CustomButtonPrimary } from "../../../styled-components/CustomButtons.style";
import { CustomStackFullWidth, CustomTextField } from "@/styled-components/CustomStyles.style";
import CustomMobileDateRangePicker from "../../custom-date-range-picker/CustomMobileDateRangePicker";
import moment from "moment/moment";
import CancelSubscriptionForm from "./CancelSubscriptionForm";
import CustomMobileDateRangePickers from "../../custom-date-range-picker/CustomMobileDateRangePicker";
import Calendar from "../../custom-date-range-picker/CustomMobileDateRangePicker";
import { RTL } from '@/components/RTL/RTL';

const ModalView = props => {
    const { title, t, minDate, maxDate, handleCancel, handleSuccess } = props
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const [textField, setTextField] = useState('')
    const [dateRange, setDateRange] = useState([])

    const isPauseSubscription = title.includes(t('pause'))
    const handleDateRange = (value) => {
        let val = [moment(value[0]?.startDate).format('yyyy/MM/DD HH:mm'), moment(value[0]?.endDate).format('yyyy/MM/DD HH:mm')]
        setDateRange(val)
    }
    const handlePauseClick = () => {
        return <CustomStackFullWidth alignItems='center' spacing={1.5} justifyContent="center">
            <Typography fontSize='13px' color='gray'>{t('Choose your preferable date range*')}</Typography>
            <Calendar handleValue={handleDateRange} minDate={minDate} maxDate={maxDate} />
        </CustomStackFullWidth>
    }
    const handleCancelClick = () => {
        return <CancelSubscriptionForm handleCancel={handleCancel} handleSuccess={handleSuccess} />
    }
    return (
        <Paper sx={{ padding: { xs: "1rem", md: '2rem' } }}>
            <Grid container spacing={3}>
                <Grid item align='center' xs={12}>
                    <ErrorOutlinedIcon sx={{ fontSize: '58px', color: 'primary.main' }} />
                </Grid>
                <Grid item align='center' xs={12}>
                    <CustomTypography variant="h4" textTransform='none'>
                        {t(title)}
                    </CustomTypography>
                </Grid>
                <Grid item align='center' xs={12}>
                    {isPauseSubscription ? handlePauseClick() : handleCancelClick()}
                </Grid>
                {
                    isPauseSubscription && <Grid item align='center' xs={12} container spacing={2}>
                        <Grid item xs={6}>
                            <Button fullWidth variant='outlined' sx={{ color: 'primary.main' }}
                                onClick={() => handleCancel?.()}>
                                {t("No")}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant='contained' onClick={() => handleSuccess?.(isPauseSubscription ? dateRange : textField)}>
                                {t("Yes")}
                            </Button>
                        </Grid>
                    </Grid>
                }


            </Grid>
        </Paper>
    );
};

ModalView.propTypes = {};

export default ModalView;