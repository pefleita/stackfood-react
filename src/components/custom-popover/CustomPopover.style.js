import { Stack, styled } from "@mui/material";

export const CustomPopoverWrapper = styled(Stack)(
    ({ theme, maxWidth, padding, width, bgColor }) => ({
        backgroundColor: bgColor || theme.palette.neutral[1800],
        textAlign: "center",
        alignItems: "center",
        width: width || "100%",
        maxWidth: maxWidth || "450px",
        gap: "15px",
        padding: padding || "15px 25px"
    })
)