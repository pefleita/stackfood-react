import { LoadingButton } from "@mui/lab";
import { Button, styled } from "@mui/material";
import React from "react";

const ResetButton = styled(Button)(({ theme }) => ({
  borderRadius: "5px",
  borderColor: theme.palette.neutral[400],
  color: theme.palette.neutral[400],
  marginRight: "5px",
  paddingInline: "30px",
}));

export const SaveButton = styled(LoadingButton)(({ theme }) => ({
  color: "#ffffff",
  borderRadius: "5px",

  [theme.breakpoints.up("xs")]: {
    height: "42.04px",
  },
  [theme.breakpoints.up("md")]: {
    color: "#ffffff",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
  },
}));

const FormSubmitButton = ({ handleReset, isLoading, reset, submit }) => {
  return (
    <>
      <ResetButton variant="outlined" onClick={handleReset}>
        {reset}
      </ResetButton>
      <SaveButton
        // Fixing the syntax for applying marginTop on xs breakpoint
        variant="contained"
        type="submit"
        loading={isLoading}
      >
        {submit}
      </SaveButton>
    </>
  );
};

export default FormSubmitButton;