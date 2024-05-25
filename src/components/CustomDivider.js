import React from "react"
import Link from "next/link"
import {Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const CustomDivider=({phone,children,marginTop})=>{
    const theme=useTheme()
    return <Stack width="100%" sx={{borderBottom: `1.5px solid ${theme.palette.neutral[300]}`}}></Stack>

}
export default CustomDivider