import React from 'react';
import {CustomTypographyBold} from "../styled-components/CustomStyles.style";
import {useTranslation} from "react-i18next";


const CustomPageTitle = props => {
    const {t,textAlign} =useTranslation()
    const {title} = props
    return (
        <CustomTypographyBold  textAlign={textAlign}>
           {t(title)}
       </CustomTypographyBold>
    );
};
export default CustomPageTitle;