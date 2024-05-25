import React from 'react';
import { IconButton, Typography } from "@mui/material";
import { CustomPaperBigCard, CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import BasicInformation from "./BasicInformation";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const EditProfile = ({ data, refetch, deleteUserHandler }) => {
    return (
        <BasicInformation data={data} refetch={refetch} deleteUserHandler={deleteUserHandler} />
    );
};

export default EditProfile;
