import { styled, TextField } from '@mui/material'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'

export const CustomTextFieldStyle = styled(TextField)(
    ({ theme, borderColor, languageDirection,height }) => ({
        border: borderColor && `1px solid ${borderColor}`,
        borderRadius: borderColor && '10px',
        backgroundColor: theme.palette.neutral[100],
        '& .MuiOutlinedInput-root': {
            flexDirection: languageDirection && languageDirection === "rtl" ? "row-reverse" : "row",
            borderRadius: "4px",
        },
        "& .MuiInputBase-root": {
            height:height?? 45,
            fontSize: "12px",
            fontWeight: 400
        },
        "& .MuiInputLabel-root": {
            fontSize: "12px"
        },
        "& .MuiOutlinedInput-input": {
            fontSize: "12px",
            fontWeight: 400
        },
    })
)
