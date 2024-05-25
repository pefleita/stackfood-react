import React from 'react'
import { DashedBox } from '../../gurbage/admin/components/forms/FormWithFormik.style'
import { Stack, Tooltip, Typography } from "@mui/material";
import cloudIcon from '../../assets/images/icons/cloud-upload.png'
import FileFormatInfo from '../file-format-text/FileFormatInfo'
import {
    FileUploadHeader,
    FileUploadTextContainer,
    ImageContainerFileUpload,
} from './FileUpload.style'
import {
    CustomTypographyEllipsis,
    CustomTypographyGray,
} from '../../styled-components/CustomTypographies.style'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CustomDotBox } from "../file-previewer/FilePreviewer.style";
import ProfileImagePlaceholder from "../../assets/images/ProfileImagePlaceholder";
import BackupIcon from '@mui/icons-material/Backup';
import { t } from "i18next";
import { useTheme } from "@mui/styles";

const FileUpload = (props) => {
    const {
        anchor,
        color,
        width,
        errorStatus,
        labelText,
        titleText,
        hintText,
        alignItems
    } = props
const theme=useTheme()
    return (
        <Stack width="100%" spacing={3}>
            {titleText && (
                <FileUploadHeader>
                    <CustomTypographyGray variant="h5">
                        {titleText}
                    </CustomTypographyGray>
                </FileUploadHeader>
            )}
            <Stack alignItems="baseline" justifyContent="center" spacing={3}>
                <CustomDotBox
                    onClick={() => anchor.current.click()}
                    color={color}
                    component="label"
                    width={width}
                    errorStatus={errorStatus}
                >
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <ImageContainerFileUpload>
                            <BackupIcon style={{width:"40px",height:"40px",color:"#758590"}} />
                            {/*<img src={cloudIcon.src} alt="cloudIcon" />*/}
                        </ImageContainerFileUpload>
                        <Tooltip title={labelText}>
                            <FileUploadTextContainer>
                                <Typography component="span"  sx={{fontSize:"16px",color:theme=>theme.palette.neutral[600],fontWeight:"500"}}>
                                    {/*{t("Drag & drop or")}*/}
                                    <Typography  component="span" sx={{marginInline:"5px",fontWeight:"500",textDecoration:"underLine",color:theme=>theme.palette.primary.main}}>
                                        {t("browse")}
                                    </Typography>
                                    <Typography  component="span" fontWeight="500">
                                        {t("your file")}
                                    </Typography>
                                </Typography>
                                <Typography fontSize="12px" color={theme.palette.neutral[600]}>{t("Only  jpg, png, jpeg with max 10 Image")}</Typography>
                            </FileUploadTextContainer>
                        </Tooltip>
                    </Stack>
                </CustomDotBox>
                {hintText && <FileFormatInfo text={hintText} />}
            </Stack>
        </Stack>
    )
}

FileUpload.propTypes = {}

export default FileUpload
