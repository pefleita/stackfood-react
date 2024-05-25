import React, { useState } from "react";
import { Stack } from "@mui/system";
import CustomImageContainer from "@/components/CustomImageContainer";
import MapComponent from "@/components/restaurant-details/google-address/MapComponent";
import { Accordion, AccordionDetails, AccordionSummary, Button, styled, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import CustomDivider from "@/components/CustomDivider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { t } from "i18next";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CustomAccordion } from "@/styled-components/CustomStyles.style";
import { CustomTypographyEllipsis } from "@/styled-components/CustomTypographies.style";
import moment from "moment";
import 'simplebar/dist/simplebar.min.css'
import SimpleBar from 'simplebar-react'

export const StyledSimpleBar = styled(SimpleBar)(({ theme }) => ({
    maxHeight: "72vh",
    "& .simplebar-track.simplebar-vertical": {
        right: "-14px !important"
    }

}))
const RestaurantMapView = ({ details, restaurantCoverUrl }) => {
    const theme = useTheme()
    const availableTimeText = t("Today Available Till")
    const [expanded, setExpanded] = useState(false);
    const getToday = () => {
        const today = new Date()
        const dayOfWeekNumber = today.getDay();
        return details?.schedules?.filter((schedule) => schedule?.day === dayOfWeekNumber)
    }
    const closingTimes = getToday().map(entry => entry.closing_time);
    const maxClosingTime = moment.max(closingTimes.map(time => moment(time, 'HH:mm:ss')));
    const formattedMaxClosingTime = maxClosingTime.format('HH:mm:ss');

    const groupedSchedule = details?.schedules?.reduce((acc, curr) => {
        const { day, opening_time, closing_time } = curr;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push({ opening_time, closing_time });
        return acc;
    }, {});

    const finalSchedule = [];
    for (let i = 0; i <= 6; i++) {
        const day = i;
        if (groupedSchedule[day]) {
            const schedule = groupedSchedule[day].map(({ opening_time, closing_time }) => ({
                opening_time: moment(opening_time, "HH:mm:ss").format("hh:mm A"),
                closing_time: moment(closing_time, "HH:mm:ss").format("hh:mm A")
            }));
            finalSchedule.push({ day, schedule })
        }
        else {
            finalSchedule.push({
                day: i,
                schedule: [{ opening_time: "day off" }]
            });
        }
    }

    const getDayName = (day) => {
        switch (day) {
            case 0: {
                return "Sunday"
            }
            case 1: {
                return "Monday"
            }
            case 2: {
                return "Tuesday"
            }
            case 3: {
                return 'Wednesday'
            }
            case 4: {
                return 'Thursday'
            }
            case 5: {
                return 'Friday'
            }
            case 6: {
                return 'Saturday'
            }
        }
    }
    const handleChange = () => {
        setExpanded(!expanded)
    }

    return (

        <Stack p="1rem" spacing={1} >
            <StyledSimpleBar>
                <CustomImageContainer src={`${restaurantCoverUrl}/${details.cover_photo}`}
                    height="206px"
                    objectFit="cover"
                    width="100%" />
                <Stack marginBottom=".5rem" >
                    <Typography fontSize="22px" fontWeight="700" color={theme.palette.neutral[1000]}>
                        {details?.name}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={0.5}
                        flexWrap="wrap"
                        marginTop=".2rem"
                    >
                        {details?.cuisine?.length > 0 &&
                            details?.cuisine?.map((cuisine, index) => (
                                <CustomTypographyEllipsis
                                    align="left"
                                    fontSize="14px"
                                    color={theme.palette.neutral[600]}
                                >
                                    {' '}
                                    {cuisine?.name}{' '}
                                    {details?.cuisine.length - 1 === index
                                        ? ''
                                        : ','}
                                </CustomTypographyEllipsis>
                            ))}
                    </Stack>
                </Stack>

                <CustomAccordion onChange={handleChange}>
                    <AccordionSummary
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={1}>
                                <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
                                <Typography fontWeight="600" fontSize={{ xs: "13px", sm: "13px", md: "16px" }}>
                                    {`${availableTimeText} ${moment(formattedMaxClosingTime, "HH:mm:ss").format("hh:mm A")}`}
                                </Typography>
                            </Stack>
                            <Button variant="outlined"
                                sx={{
                                    padding: { xs: '2px 4px', sm: '3px 6px', md: '5px 8px' },
                                    color: theme => theme.palette.primary.main,
                                    borderColor: theme => theme.palette.primary.main,
                                    fontSize: "12px",
                                    borderRadius: "6px"

                                }}
                                endIcon={!expanded ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                            >
                                {expanded ? t("See Less") : t("See More")}
                            </Button>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Stack spacing={1}>
                            <Typography fontSize="14px" >
                                {t("Weekly schedule")}
                            </Typography>
                            <CustomDivider />
                            {finalSchedule?.map((item, index) => (
                                <Stack spacing={1}>
                                    <Typography fontSize={{ xs: "12px", sm: "13px", md: "14px" }} fontWeight="700" color={theme.palette.neutral[700]}>
                                        {t(getDayName(item?.day))}
                                    </Typography>
                                    <Stack direction='row' spacing={2} >
                                        {
                                            item?.schedule?.map((itemTime, index) => (
                                                <>
                                                    {itemTime?.closing_time ? (
                                                        <Typography fontSize={{ xs: "12px", sm: "13px", md: "14px" }} fontWeight="400" color={theme.palette.neutral[500]} marginTop="5px">
                                                            {itemTime?.opening_time} - {itemTime?.closing_time} {(item?.schedule.length > 1 && item?.schedule.length-1 !== index) && ","}
                                                        </Typography>
                                                    ) : (
                                                        <Typography fontSize={{ xs: "12px", sm: "13px", md: "14px" }} fontWeight="400" color={theme.palette.neutral[500]} marginTop="5px" textTransform="capitalize">
                                                            {itemTime?.opening_time}
                                                        </Typography>
                                                    )}

                                                </>


                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            ))}

                        </Stack>
                    </AccordionDetails>
                </CustomAccordion>

                <Stack direction="row" spacing={1} paddingBottom="16px" alignItems="center">
                    <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography fontWeight="600" fontSize={{ xs: "13px", sm: "13px", md: "16px" }} color={theme.palette.neutral[1000]}>
                        {details?.address}
                    </Typography>
                </Stack>
                <MapComponent latitude={details?.latitude} longitude={details?.longitude} isRestaurant />
            </StyledSimpleBar>
        </Stack>

    );
};

export default RestaurantMapView;
