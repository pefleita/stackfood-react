import React from 'react';
import { toast } from 'react-hot-toast';
import { IconButton, Stack, Typography, alpha, styled, useTheme } from '@mui/material';
import { t } from 'i18next';
import ErrorIcon from './assets/ErrorIcon';
import InfoIcon from './assets/InfoIcon';
import SuccessIcon from './assets/SuccessIcon';
import WarningIcon from './assets/WarningIcon';
import CommonIcon from './assets/CommonIcon';
import CloseIcon from "@mui/icons-material/Close";

const setBorder = (status, theme, borderColor) => {
  if (status === "success" || status === "error" || status === "info" || status === "warning") {
    return theme.palette[status].main
  } else {
    if (borderColor) {
      return borderColor
    } else {
      if (borderColor === false) {
        return theme.palette.background.toaster
      } else {
        return theme.palette.warning.main
      }
    }
  }
}
const CustomToasterWrapper = styled(Stack)(({ theme, status, subtitle, borderColor }) => ({
  flexDirection: 'row',
  position: "relative",
  gap: "16px",
  backgroundColor: theme.palette.background.toaster,
  borderRadius: "10px",
  padding: "20px",
  border: `1px solid ${alpha(theme.palette.neutral[700], 0.2)}`,
  borderLeft: "4px solid",
  borderLeftColor: setBorder(status, theme, borderColor),
  boxShadow: `0px 12px 32px 0px ${alpha(theme.palette.neutral[800], 0.1)}`,
  alignItems: subtitle ? "flex-start" : "center",
}));

const CustomToast = ({ status, title, subtitle, icon, borderColor, isClose, isToken }) => {
  const theme = useTheme()
  return (
    <CustomToasterWrapper status={status} subtitle={subtitle} borderColor={borderColor}>
      {icon}
      <Stack gap="7px">
        <Typography
          fontSize="16px"
          fontWeight={600}
          color={theme.palette.neutral[1000]}
        >
          {t(title)}
        </Typography>
        {subtitle &&
          <Typography
            fontSize="12px"
            fontWeight={400}
            color={theme.palette.neutral[900]}
            sx={{ width: "100%", maxWidth: "283px" }}
          >
            {t(subtitle)}
          </Typography>
        }
        {isToken &&
          <Typography color={theme.palette.primary.main}>{t("Why am I seeing this?")}</Typography>
        }
      </Stack>
      {isClose &&
        <IconButton
          sx={{ position: "absolute", top: subtitle ? 10 : 3, right: subtitle ? 15 : 3 }}
          onClick={() => toast.remove()}
        >
          <CloseIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      }
    </CustomToasterWrapper>
  )
};

export const CustomToasterTokenExpired = (title, subtitle) => {

  toast.custom(
    <CustomToast
      status='custom'
      icon={<CommonIcon />}
      title={title}
      subtitle={subtitle}
      isToken={true}
    />,
    {
      duration: 4000,
      position: 'top-center',
      icon: false,
    }
  );
}

export const CustomToaster = (status, title, subtitle, icon, borderColor, isClose) => {
  let toasterIcon;
  if (icon) {
    toasterIcon = icon
  } else {
    if (icon === false) {
      toasterIcon = null;
    } else {
      switch (status) {
        case "success":
          toasterIcon = <SuccessIcon />
          break;
        case "error":
          toasterIcon = <ErrorIcon />
          break;
        case "info":
          toasterIcon = <InfoIcon />
          break;
        case "warning":
          toasterIcon = <WarningIcon />
          break;
        default:
          toasterIcon = <CommonIcon />
          break;
      }
    }
  }
  toast.custom(
    <CustomToast
      status={status}
      icon={toasterIcon}
      title={title}
      subtitle={subtitle}
      borderColor={borderColor}
      isClose={isClose}
    />,
    {
      duration: 4000,
      position: 'top-center',
      icon: false,
    }
  );
}

//--------- Usage -----------
//**here subTitle is optional
// CustomToaster('success', 'Success', 'Your action was successful.');
// CustomToaster('error', 'Error', 'Something went wrong.');
// CustomToaster('info', 'Info', 'Informational message.');
// CustomToaster('warning', 'warning', 'Warning message.');

//if you want to use a custom icon then send a icon from chiid (for all status)
// CustomToaster('error', 'Error', 'Something went wrong.', <CustomIcon />);
// CustomToaster('custom', 'Custom Title', 'Custom Subtitle!', <CustomIcon />, false);

//no need start icon and no border color
// CustomToaster('custom', 'Custom Title', 'Custom Subtitle!', false, false);


//Add close icon 
// CustomToaster('custom', 'Custom Title', 'Custom Subtitle!', false, false, true);
// CustomToaster('custom', 'Custom Title', 'Custom Subtitle!', <CustomIcon />, false, true);
// CustomToaster('custom', 'Custom Title', 'Custom Subtitle!', <CustomIcon />, true, true);