import { Button, Grid, Stack, Typography, styled, useMediaQuery, useTheme, IconButton, SwipeableDrawer, Skeleton } from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";
import { CustomStackFullWidth, SliderCustom } from "@/styled-components/CustomStyles.style";
import { MapSetionWrapper, VisitAgainWrapper } from "../HomeStyle";
import FindNearbyIcon from "../../../assets/images/icons/FindNearbyIcon";
import { t } from "i18next";
import RoomIcon from "@mui/icons-material/Room";
import Slider from "react-slick";
import RestaurantBoxCard from "../../restaurant-details/RestaurantBoxCard";
import { HandleNext, HandlePrev } from "../../CustomSliderIcon";
import { useOrderAgainRestaurants } from "@/hooks/react-query/wanna-try-again/useOrderAgainRestaurants";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomModal from "../../custom-modal/CustomModal";
import MapComponent from "../../restaurant-details/google-address/MapComponent";
import { Box } from "@mui/system";
import NearByRestaurant from "./NearByRestaurant";
import { useRecommendedRestaurant } from "@/hooks/react-query/wanna-try-again/useRecommendedRestaurant";
import { useRecentlyViewRestaurantsOnSuccess } from "@/hooks/react-query/recently-view-restaurants/useRecentlyViewRestaurants";
import FoodCardShimmer from "../../food-card/FoodCarShimmer";
import CloseIcon from "@mui/icons-material/Close";
import { getToken } from "../../checkout-page/functions/getGuestUserId";

const CustomSlider = styled(Stack)(
    ({ theme, languageDirection, gap, paddingBottom, isCenter }) => (isCenter && {
        // height: "100%",
        // paddingY: '1rem',
        justifyContent: "center",
        '& .custom-slide ': {
            transform: "scale(.9)",
            transition: "all 500ms ease-in-out",

        },
        '& .custom-active-slide ': {
            transform: "scale(1)",
            zIndex: "1000",
            transition: "all 500ms ease-in-out",
            opacity: 1,
        },
        '& .slick-list': {
            display: "flex"
        },
        '& .slick-slider': {
            '& .slick-list': {
                '& .slick-track': {
                    float: languageDirection === 'rtl' ? 'right' : 'left',
                    gap: gap ? gap : '8px',
                    paddingBottom: paddingBottom || 0,
                },
            },
            '& .slick-dots': {
                bottom: '-22px !important',
                textAlign: 'center !important',
                left: '0 !important',
                '& li': {
                    '& .slick-active': {
                        '& button': {
                            '&::before': {
                                content: '" "',
                                fontSize: '12px !important',
                            },
                        },
                    },
                },
            },
        },
        '& .slick-track': {
            marginLeft: "-15px !important",
            gap: "30px !important",
            '@media screen and (max-width: 450px)': {
                marginLeft: "85px !important",
            },
        }
    })
)
const Puller = styled('div')(({ theme }) => ({
    width: '80px',
    height: '4px',
    backgroundColor: theme.palette.neutral[400],
    borderRadius: 3,
    position: 'absolute',
    top: 20,
}));

const VisitAgain = () => {
    const theme = useTheme();
    const drawerBleeding = 0;
    const [hoverOn, setHoverOn] = useState(false);
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const languageDirection = localStorage.getItem('direction')
    const [open, setOpen] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const { global } = useSelector((state) => state.globalSettings);
    const token = getToken()
    const [userData, setUserData] = useState(null);
    const [text, setText] = useState({ title: "", subTitle: "" })
    const [dataIsLoading, setDataIsLoading] = useState(false)
    const [imageIndex, setImageIndex] = useState(null);
    useEffect(() => {
        setImageIndex(0)
    }, [])
    const handleSuccess1 = (response) => {

        setUserData(response);
        if (response?.length === 0) {
            recentlyRefetch();
        }
        setText({ title: `${t("Wanna Try  Again!")}`, subTitle: `${t("Get your recent food from the restaurant you recently visited")}` });
    }
    const handleSuccess2 = (response) => {
        setUserData(response);
        if (response?.length === 0) {
            refetchRecommended()
        }
        setText({ title: `${t("Let’s Try Something New")}`, subTitle: `${t("Our Latest Recommendations Just for You!")}` });

    }
    const handleSuccess3 = (response) => {
        setUserData(response);

        if (response?.length === 0) {
            refetchRecommended()
        }
        setText({ title: `${t("Visit  Again!")}`, subTitle: `${t("Get your desired item from your recent visit!")}` });

    }
    const { data, isLoading, refetch, isRefetching } = useOrderAgainRestaurants(handleSuccess1);

    const {
        isLoading: isloadingRecommended,
        refetch: refetchRecommended,
        isRefetching: isRefetchingRecommended
    } = useRecommendedRestaurant(handleSuccess2);

    const {
        isLoading: isLoadingRecent,
        refetch: recentlyRefetch,
        isRefetching: isRefetchingRecent
    } = useRecentlyViewRestaurantsOnSuccess(handleSuccess3)


    useEffect(() => {
        getUserData();
    }, [token]);

    const getUserData = () => {
        if (token) {
            refetch();
        } else {
            refetchRecommended();
        }
    }
    const toggleDrawer = () => () => {
        setOpenDrawer(!openDrawer)
    };
    const settings = {
        speed: 500,
        slidesToShow: 3,
        centerMode: userData?.length <= 3 ? false : true,
        slidesToScroll: 1,
        dots: true,
        initialSlide: 0,
        infinite: userData?.length <= 3 ? false : true,
        centerPadding: "0px",
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        beforeChange: (current, next) => setImageIndex(next),
        // rtl:true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 0,
                    dots: true
                }
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 0,
                    dots: true
                }
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 0,
                    dots: true
                }
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 3,
                    dots: true,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2.1,
                    initialSlide: 0,
                    dots: false,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1.3,
                    initialSlide: 1,
                    dots: false,
                    // infinite: false,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1.3,
                    initialSlide: 0,
                    dots: false,
                    // infinite: false,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1.3,
                    initialSlide: 0,
                    dots: false,
                    // infinite: false,
                }
            }
        ]
    };

    return (
        <Grid container spacing={3} paddingTop="30px">
            <Grid item xs={12} md={3.5}>
                <MapSetionWrapper>
                    <div className="map-overly">
                        <CustomStackFullWidth alignItems="center">
                            <FindNearbyIcon />
                            <Typography
                                fontSize="18px"
                                fontWeight={600}
                                color={theme.palette.whiteText.main}
                            >
                                {t("Find Nearby ")}
                            </Typography>
                            <Typography
                                component="span"
                                fontSize="14px"
                                fontWeight={400}
                                color={theme.palette.whiteText.main}
                            >
                                {t("Restaurant Near from You")}
                            </Typography>

                        </CustomStackFullWidth>
                        {isXSmall ? (
                            <Button
                                variant="contained"
                                startIcon={<RoomIcon />}
                                onClick={((toggleDrawer()))}
                                sx={{
                                    backgroundColor: theme.palette.whiteContainer.main,
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        backgroundColor: theme.palette.neutral[200]
                                    }
                                }}
                            >
                                {t("See Location")}
                            </Button>

                        ) : (
                            <Button
                                variant="contained"
                                startIcon={<RoomIcon />}
                                onClick={() => setOpen(true)}
                                sx={{
                                    backgroundColor: theme.palette.whiteContainer.main,
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        backgroundColor: theme.palette.neutral[200]
                                    }
                                }}
                            >
                                {t("See Location")}
                            </Button>

                        )

                        }

                    </div>
                </MapSetionWrapper>
            </Grid>
            <Grid
                item
                xs={12}
                md={8.5}
                onMouseEnter={() => setHoverOn(true)}
                onMouseLeave={() => setHoverOn(false)}
            >
                <VisitAgainWrapper>
                    <Stack alignItems="center">
                        <Typography
                            fontSize={{ xs: "18px", md: "20px" }}
                            fontWeight={{ xs: "500", md: "700" }}
                            color={theme.palette.primary.main}
                        >
                            {text?.title}
                        </Typography>
                        <Typography
                            textAlign="center"
                            fontSize={{ xs: "14px", md: "16px" }}
                            fontWeight={{ xs: "400", md: "400" }}
                            color={theme.palette.text.secondary}
                        >
                            {text?.subTitle}
                        </Typography>

                    </Stack>
                    {(isLoading || isLoadingRecent || isloadingRecommended) ? (
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <Stack flexDirection="row" gap="25px" alignItems="center" padding="0px 30px">
                                    {!isXSmall && <FoodCardShimmer cardWidth="280px" cardHeight="230px" />}
                                    <FoodCardShimmer cardWidth="350px" cardHeight="270px" />
                                    {!isXSmall && <FoodCardShimmer cardWidth="280px" cardHeight="230px" />}
                                </Stack>
                            </Grid>
                        </Grid>) : (
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <CustomSlider
                                    gap="12px"
                                    paddingBottom={isSmall ? "10px" : "20px"}
                                    languageDirection={languageDirection}
                                    isCenter={userData?.length <= 3 ? false : true}
                                >
                                    <Slider {...settings}>
                                        {userData?.map((restaurantData, index) => {
                                            return (
                                                <RestaurantBoxCard
                                                    // className={isSmall? "" : (index === imageIndex ? "custom-active-slide" : "custom-slide")}
                                                    className={index === imageIndex ? "custom-active-slide" : "custom-slide"}
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
                                                    visitAgain={true}
                                                    foods={restaurantData?.foods}
                                                    opening_time={restaurantData?.current_opening_time}
                                                />

                                            );
                                        }
                                        )}
                                    </Slider>
                                </CustomSlider>
                            </Grid>
                        </Grid>
                    )}
                </VisitAgainWrapper>
                <Stack>
                </Stack>
            </Grid>
            {
                open &&
                <CustomModal openModal={open} setModalOpen={setOpen} maxWidth={{ xs: "90%", sm: "98vw", md: "1000px" }}>
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        height="65%"
                        sx={{ position: "relative" }}
                    >
                        <IconButton
                            sx={{ position: "absolute", top: 3, right: 3 }}
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon sx={{ fontSize: "16px" }} />
                        </IconButton>
                        <NearByRestaurant />
                    </CustomStackFullWidth>
                </CustomModal>
            }
            {openDrawer && <SwipeableDrawer
                anchor="bottom"
                open={openDrawer}
                onClose={toggleDrawer()}
                onOpen={toggleDrawer()}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        borderRadius: "20px 20px 0 0"
                    }
                }}
            >
                <CustomStackFullWidth>
                    <CustomStackFullWidth
                        sx={{
                            position: 'absolute',
                            top: -drawerBleeding,
                            alignItems: "center",
                            zIndex: 300,
                            height: "45px",
                            background: `linear-gradient(179deg, #FFF 1.26%, rgba(255, 255, 255, 0.00) 98.74%)`
                        }}
                    >
                        <Puller />
                    </CustomStackFullWidth>
                    <Stack
                        sx={{
                            overflow: 'auto',
                            height: '93vh',
                            borderRadius: "20px",
                        }}
                    >
                        <NearByRestaurant />
                    </Stack>
                </CustomStackFullWidth>
            </SwipeableDrawer>}
        </Grid >
    );
};

export default memo(VisitAgain);