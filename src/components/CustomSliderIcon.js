import {LeftArrowStyle, RightArrowStyle} from "./home/HomeStyle";
import { CustomIconButton, CustomSideOverLay } from "./home/food-campaign/FoodCampaign.style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const HandleNext = ({ onClick, className ,overLay}) => (
    <>
        {overLay ? <CustomSideOverLay
            left="unset"
            right="0"
            isdisabled={className?.includes('slick-disabled')}
        >
            <RightArrowStyle
                right="1%"
                // languageDirection={languageDirection}
                isdisabled={className?.includes('slick-disabled')}
            >

                <CustomIconButton  onClick={onClick}>
                    <ArrowForwardIosIcon style={{width:"14px",height:"14px"}} />
                </CustomIconButton>
            </RightArrowStyle>
        </CustomSideOverLay>:

            <RightArrowStyle
                right="1%"
                // languageDirection={languageDirection}
                isdisabled={className?.includes('slick-disabled')}
            >

                <CustomIconButton  onClick={onClick}>
                    <ArrowForwardIosIcon style={{width:"14px",height:"14px"}} />
                </CustomIconButton>
            </RightArrowStyle>
       }

    </>
)
 export const HandlePrev = ({ onClick, className }) => (
    <>
        <LeftArrowStyle
            // languageDirection={languageDirection}
            left="1%"
            isdisabled={className?.includes('slick-disabled')}
        >
            <CustomIconButton onClick={onClick}>
                <ArrowBackIosNewIcon style={{width:"14px",height:"14px"}} fontWeight="700" />
            </CustomIconButton>
        </LeftArrowStyle>
    </>
)