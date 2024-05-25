import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Button, Typography } from "@mui/material";
import { t } from "i18next";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/styles";
import CustomImageContainer from "../../CustomImageContainer";
import offLineImage from "../assets/offFailed.png";
import CloseIcon from "@mui/icons-material/Close";

const VerificationFailedModal = ({onClose,ChatWithAdmin}) => {
    const theme=useTheme()
    return (
        <CustomStackFullWidth padding="2rem 1rem" justifyContent="center" alignItems="center" spacing={2} sx={{position:"relative"}}>
            <button className="closebtn" onClick={onClose}>
                <CloseIcon sx={{ fontSize: '16px' }} />
            </button>
            <CustomImageContainer src={offLineImage.src} width="70px" height="70px" />
            <CustomStackFullWidth spacing={1} justifyContent="center" alignItems="center" sx={{ maxWidth: "363px" }}>
                <Typography fontSize="16px" fontWeight="700">{t("Payment Verification Failed !")}</Typography>
                <Typography fontSize="14px" color={theme.palette.neutral[400]} textAlign="center">
                    {t("You payment is declined by admin. Please contact with admin for further query")}
                </Typography>
            </CustomStackFullWidth>
            <CustomStackFullWidth direction="row" spacing={1} justifyContent="center" alignItems="center">
                <Button onClick={ChatWithAdmin} variant="outlined" sx={{ color: theme => theme.palette.primary.main ,fontSize:"14px",fontWeight:"400",paddingY:"5px"}}>
                    {t("Chat with Admin")}
                </Button>
                <Button variant="contained" sx={{ color: theme => theme.palette.neutral[100],paddingX:"50px",paddingY:"7px",fontSize:"14px",fontWeight:"400" }} onClick={onClose}>
                    {t("Cancel")}
                </Button>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    );
};

export default VerificationFailedModal;
