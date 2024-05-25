import React from 'react'
import { CustomDotBox } from '../file-previewer/FilePreviewer.style'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import ProfileImagePlaceholder from '../../assets/images/ProfileImagePlaceholder'

const ImageUploaderThumbnail = ({ label, maxWidth, width, error, borderRadius, isIcon }) => {
    const theme = useTheme();

    return (
        <CustomDotBox width={width} error={error} borderRadius={borderRadius}>
            <Stack alignItems="center" gap="10px">
                <ProfileImagePlaceholder />
                <Typography
                    maxWidth="77px"
                    fontSize="12px"
                    textAlign="center"
                    color={theme.palette.neutral[400]}
                >
                    {label}
                </Typography>
            </Stack>
            {isIcon &&
                <Stack sx={{
                    position: "absolute",
                    bottom: "0px",
                    right: "-15px",
                    filter: "drop-shadow(0px 0px 10px rgba(199, 198, 198, 0.25))"
                }}>
                    <IconButton sx={{ height: "39px", width: "39px", backgroundColor: theme.palette.neutral[100] }} >
                        <CreateOutlinedIcon sx={{ color: theme.palette.info.main }} />
                    </IconButton>
                </Stack>

            }
        </CustomDotBox>
    )
}
export default ImageUploaderThumbnail
