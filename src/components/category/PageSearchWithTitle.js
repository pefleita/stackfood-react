import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CustomPageTitle from "../CustomPageTitle";
import CustomSearch from "../custom-search/CustomSearch";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/system";
import { useTheme } from "@mui/styles";

const PageSearchWithTitle = ({title,handleSearchResult,label}) => {
    const {t,textAlign} =useTranslation()
    const theme=useTheme()
    return (
        <CustomStackFullWidth justifyContent="center" alignItems="center" spacing={2.5}>
            <CustomPageTitle title={title} textAlign="center"/>
             <Stack maxWidth="450px" width="100%">
                <CustomSearch
                    handleSearchResult={handleSearchResult}
                    label={t(label)}
                    backgroundColor={theme.palette.neutral[200]}
                    borderRadius=".5rem"
                />
             </Stack>
        </CustomStackFullWidth>
    );
};

export default PageSearchWithTitle;
