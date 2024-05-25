import React from 'react';
import PropTypes from 'prop-types';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SmsIcon from '@mui/icons-material/Sms';
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import SmsSvg from './SmsSvg';
const StyledBox = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    height: '60vh',
}))
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
}))


const EmptyView = props => {
    const { t } = useTranslation()
    return (
        <StyledBox>
            <SmsSvg />
            <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="subtitle1"
            >
                {t("Select and start messaging!")}
            </Typography>
        </StyledBox>

    );
};

EmptyView.propTypes = {

};

export default EmptyView;