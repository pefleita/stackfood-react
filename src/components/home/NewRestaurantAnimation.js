import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import Image from "next/image";
import gif from "../../../public/static/gif/newRestaurant.gif"
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/styles";

const NewRestaurantAnimations = () => {
    const theme=useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <CustomStackFullWidth direction="row" justifyContent="center" alignItems="center">
            {!isSmall ? <>
                <Image
                    src={gif}
                    alt="my gif"
                    height={150}
                    width={250}
                    objectFit="cover"
                />
                <Image
                    src={gif}
                    alt="my gif"
                    height={150}
                    width={250}
                    objectFit="cover"
                />
                <Image
                    src={gif}
                    alt="my gif"
                    height={150}
                    width={250}
                    objectFit="cover"
                />
                <Image
                    src={gif}
                    alt="my gif"
                    height={150}
                    width={250}
                    objectFit="cover"
                /></>:<>
                <Image
                    src={gif}
                    alt="my gif"
                    height={150}
                    width={250}
                    objectFit="cover"
                />
                <Image
                    src={gif}
                    alt="my gif"
                    height={150}
                    width={250}
                    objectFit="cover"
                /></>}

        </CustomStackFullWidth>
    );
};

export default NewRestaurantAnimations;
