import React from 'react'
import { NoSsr, Typography } from "@mui/material";
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Stack } from '@mui/system'
import { useTheme } from '@emotion/react'
import CustomImageContainer from '../CustomImageContainer'
import MiddleSection from './MiddleSection'
import ItemSection from './ItemSection'
import CustomPageTitle from "../CustomPageTitle";
import CustomEmptyResult from "../empty-view/CustomEmptyResult";
import { noRestaurantsImage } from "../../utils/LocalImages";
import { RTL } from "../RTL/RTL";

const BasicCampaign = ({
    campaignsDetails,
    configData,
    isRefetching,
    isLoading,
}) => {
    const theme = useTheme()
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const camImage = `${configData?.base_urls?.campaign_image_url}/${campaignsDetails?.image}`

    return (
        <CustomStackFullWidth paddingTop={{ xs: '10px', md: "60px" }}>
          <NoSsr>
             <RTL direction={languageDirection}>
                 <Stack
                     paddingBottom="2rem"
                     paddingTop="1rem"
                     rowGap="1rem"
                 >
                     {  campaignsDetails!=="undefined" && <>
                         <MiddleSection
                             campaignsDetails={campaignsDetails}
                             image={camImage}
                             isLoading={isLoading}
                         />
                         <CustomPageTitle title="Restaurants"  textAlign="left"/>
                         <ItemSection
                             configData={configData}
                             campaignsDetails={campaignsDetails}
                             isLoading={isLoading}
                             isRefetching={isRefetching}
                         />
                     </>
                     }

                     {!isLoading && !campaignsDetails &&  <CustomEmptyResult
                         label="No store found"
                         image={noRestaurantsImage}
                     />}
                 </Stack>
             </RTL>

          </NoSsr>
        </CustomStackFullWidth>
    )
}

export default BasicCampaign
