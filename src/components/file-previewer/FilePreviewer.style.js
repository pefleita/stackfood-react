import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { ImageContainer } from '../../styled-components/CustomStyles.style'
import IconButton from '@mui/material/IconButton'
import React from 'react'

export const FilePreviewerWrapper = styled(ImageContainer)(
    ({ theme, width, objectFit, height, borderRadius,fullWidth }) => ({
        cursor: 'pointer',
        height:fullWidth?'77px': '8.75rem',
        maxWidth: width,
        width: '100%',
        borderRadius:fullWidth?'5px': '50%',
        marginRight: 'auto',
        marginLeft: 'auto',
        border:fullWidth ? '1px dashed':"none",
        borderColor:theme.palette.neutral[300],
        '& img': {
            borderRadius: borderRadius ? borderRadius : "12px",
            height: '100%',
            objectFit: objectFit ? 'contained' : 'cover',
        },
    })
)

export const IconButtonImagePreviewer = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.neutral[100],
    color: theme.palette.error.light,
    position: 'absolute',
    borderRadius: '5px',
    top:3,
    right: 3,
    padding:"2px",
    border:"2px solid",
    borderColor: theme.palette.error.light,

}))
export const CustomBoxForFilePreviewer = styled(Box)(({ theme, width,fullWidth }) => ({
    width: width ? width : '100%',
    position: 'relative',
    height: fullWidth ? "77px":'10.25rem',
    // justifyContent:"center"
}))
export const CustomDotBox = styled(Box)(({ theme, width, error, borderRadius }) => ({
    width: width && '100%',
    position: 'relative',
    height: '9.25rem',
    border: `1px dashed ${theme.palette.neutral[400]}`,
    borderRadius: borderRadius ? borderRadius : "10px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderColor: error && 'red',
}))
export const CustomBoxImageText = styled(Box)(({ theme }) => ({
    maxWidth: '14.375rem',
}))
