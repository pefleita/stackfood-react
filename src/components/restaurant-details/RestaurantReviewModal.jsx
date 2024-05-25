import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style";
import { Box, Stack } from "@mui/system";
import { useTheme } from "@mui/styles";
import { alpha, Grid, Typography } from "@mui/material";
import { getNumberWithConvertedDecimalPoint } from "@/utils/customFunctions";
import CustomRatings from "@/components/custom-ratings/CustomRatings";
import { t } from "i18next";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useQuery } from "react-query";
import { ReviewApi } from "@/hooks/react-query/config/reviewlist";
import { onErrorResponse } from "@/components/ErrorResponse";
import 'simplebar/dist/simplebar.min.css'
import SimpleBar from 'simplebar-react'
import CustomImageContainer from "@/components/CustomImageContainer";
import { useSelector } from "react-redux";
import DotSpin from "@/components/home/restaurant/DotSpin";
import { StyledSimpleBar } from "@/components/restaurant-details/RestaurantMapView";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main,
    },
}));

const RestaurantReviewModal = ({
    product_avg_rating,
    rating_count,
    reviews_comments_count, id

}) => {
    const [review_count, setReview_Count] = useState({})
    const theme = useTheme()
    const { global } = useSelector((state) => state.globalSettings)
    const { isLoading, data, isError, error, refetch } = useQuery(
        [`review-list`, id],
        () => ReviewApi.reviewList(id),
        {
            onError: onErrorResponse,
        }
    )
    const getStart = () => {
        const ratingCounts = {
            one_star: 0,
            two_star: 0, // Corrected typo from "start" to "star"
            three_star: 0, // Corrected typo from "start" to "star"
            four_star: 0, // Corrected typo from "start" to "star"
            five_star: 0, // Corrected typo from "start" to "star"
        };

        data?.data?.forEach((item) => {
            switch (item?.rating) {
                case 1:
                    ratingCounts.one_star += 1;
                    break;
                case 2:
                    ratingCounts.two_star += 1;
                    break;
                case 3:
                    ratingCounts.three_star += 1;
                    break;
                case 4:
                    ratingCounts.four_star += 1;
                    break;
                case 5:
                    ratingCounts.five_star += 1;
                    break;
                default:
                    // Handle unexpected rating value if necessary
                    break;
            }
        });

        // Now, we update the state just once after all counts are computed
        setReview_Count((prevReviewCount) => ({
            ...prevReviewCount,
            ...ratingCounts,
        }));
    }
    useEffect(() => {
        if (data) {
            getStart()
        }
    }, [data]);
    const getPercentOfNumber = (value, percentRate) => {
        return percentRate ? (value * percentRate) / 100 : 0;
    };

    return (

        <CustomStackFullWidth sx={{
            padding: {
                xs: "1rem",
                sm: "1rem",
                md: "1.2rem"
            }
        }}>
            <SimpleBar style={{ maxHeight: "60vh" }}>
                <CustomStackFullWidth backgroundColor={alpha(theme.palette.neutral[400], .1)}
                    padding="2rem"
                    borderRadius="8px"
                    // margin=".5rem"
                >
                    <Grid container gap={{ xs: 2, md: 0 }}>
                        <Grid item xs={12} sm={12} md={6} >
                            <Stack>
                                <Typography component="span" fontSize="50px" color={theme.palette.primary.main} fontWeight="500">
                                    {getNumberWithConvertedDecimalPoint(
                                        product_avg_rating,
                                        // digitAfterDecimalPoint
                                        1
                                    )}
                                    <Typography component="span" fontSize="35px" color={theme.palette.primary.light} fontWeight="500">
                                        /5
                                    </Typography>
                                </Typography>
                                <CustomRatings readOnly ratingValue={product_avg_rating} />
                                <Stack direction='row' spacing={1} marginTop=".8rem">
                                    <Typography fontSize="13px" color={theme.palette.neutral[600]} backgroundColor={alpha(theme.palette.neutral[500], .2)} padding="2px 6px" borderRadius="4px">
                                        {JSON.stringify(rating_count)}{' '}
                                        {t('Ratings')}
                                    </Typography>
                                    <Typography fontSize="13px" color={theme.palette.neutral[600]} backgroundColor={alpha(theme.palette.neutral[500], .2)} padding="2px 6px" borderRadius="4px">
                                        {JSON.stringify(reviews_comments_count)}{' '}
                                        {t('Reviews')}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} >
                            <Stack gap={1.5}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography fontSize="14px" >
                                        5
                                    </Typography>
                                    <Box flexGrow={1}>
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={review_count?.five_star}
                                        />
                                    </Box>
                                    <Typography fontSize="14px" color={theme.palette.neutral[600]}>
                                        {getPercentOfNumber(100, review_count?.five_star) ?? 0}%
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography fontSize="14px" >
                                        4
                                    </Typography>
                                    <Box flexGrow={1}>
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={review_count?.four_star}
                                        />
                                    </Box>
                                    <Typography fontSize="14px" color={theme.palette.neutral[600]}>
                                        {getPercentOfNumber(100, review_count?.four_star) ?? 0}%
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography fontSize="14px" >
                                        3
                                    </Typography>
                                    <Box flexGrow={1}>
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={review_count?.three_star}
                                        />
                                    </Box>
                                    <Typography fontSize="14px" color={theme.palette.neutral[600]}>
                                        {getPercentOfNumber(100, review_count?.three_star) ?? 0}%
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography fontSize="14px" >
                                        2
                                    </Typography>
                                    <Box flexGrow={1}>
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={review_count?.two_star}
                                        />
                                    </Box>
                                    <Typography fontSize="14px" color={theme.palette.neutral[600]}>
                                        {getPercentOfNumber(100, review_count?.two_star) ?? 0}%
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography fontSize="14px" >
                                        1
                                    </Typography>
                                    <Box flexGrow={1}>
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={review_count?.one_star}
                                        />
                                    </Box>
                                    <Typography fontSize="14px" color={theme.palette.neutral[600]}>
                                        {getPercentOfNumber(100, review_count?.one_star) ?? 0}%
                                    </Typography>
                                </Stack>
                            </Stack>

                        </Grid>
                    </Grid>
                </CustomStackFullWidth>

                {data && data?.data?.map((review) => (
                    <Grid container key={review?.id} padding="10px" spacing={2} justifyContent="space-between">
                        <Grid item xs={8} sm={8} md={9.5}>
                            <Stack gap={1} justifyContent="flex-end">
                                <Typography fontSize="14px" fontWeight="500">
                                    {review?.customer_name}
                                </Typography>
                                <CustomRatings readOnly ratingValue={review.rating} />
                                <Typography color={theme.palette.neutral[600]} fontSize="12px" fontWeight="400">
                                    {review?.comment}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4} sm={4} md={2.5}>
                            <Stack justifyContent="center" spacing={.5}>
                                <Stack padding="7px" borderRadius="8px"
                                    sx={{
                                        border: ".8px solid",
                                        borderColor: theme => theme.palette.neutral[300]
                                    }}
                                >
                                    <CustomImageContainer src={`${global?.base_urls?.product_image_url}/${review.food_image}`}
                                        objectFit="cover"
                                        height="74px"
                                        borderRadius="8px"
                                    />
                                </Stack>
                                <Typography textAlign="center" color={theme.palette.neutral[600]} fontSize="10px" fontWeight="400">
                                    {review.food_name}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                ))}
                {isLoading && <Stack marginTop="1rem">
                    <DotSpin />

                </Stack>}
            </SimpleBar>
        </CustomStackFullWidth>
    );
};

export default RestaurantReviewModal;
