import { Grid, styled } from "@mui/material";

export const ProfileGrid = styled(Grid)(({ theme }) => ({
    paddingTop: "2px",
    paddingLeft: "2px",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
        paddingTop: "0",
        paddingLeft: "0",
    },
}))