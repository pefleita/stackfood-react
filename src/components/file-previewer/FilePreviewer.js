import React, { useEffect, useState } from 'react'
import {
    CustomBoxForFilePreviewer, CustomBoxImageText,
    FilePreviewerWrapper,
    IconButtonImagePreviewer
} from "./FilePreviewer.style";
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
// import { CustomBoxImageText } from '../form-fields/FileInputField'
import { Grid, Stack } from '@mui/material'
import FileInputField from '../form-fields/FileInputField'
import pdfIcon from '../../assets/images/icons/pdf.png'
import docIcon from '../../assets/images/icons/docx.png'
import txtIcon from '../../assets/images/icons/txt-file.png'
import folderIcon from '../../assets/images/icons/folder.png'
import CustomImageContainer from '../CustomImageContainer'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const FilePreviewer = (props) => {
    const {
        file,
        anchor,
        deleteImage,
        hintText,
        width,
        onChange,
        onDelete,
        errorStatus,
        acceptedFileInput,
        label,
        titleText,
        gridControl,
        fullWidth
    } = props

    const [multipleImages, setMultipleImages] = useState([])
    useEffect(() => {
        if (file?.length > 0) {
            const newImages = []
            file.forEach((image) =>
                newImages.push({
                    url: URL.createObjectURL(image),
                    type: image.name.split('.').pop(),
                })
            )
            setMultipleImages(newImages)
        } else {
        }
    }, [file])
    const renderFilePreview = () => {
        if (file?.length > 0) {
            return (
                <Grid container spacing={fullWidth?0:3} rowGap={fullWidth?"1.5rem":"0rem"} columnGap={fullWidth?".8rem":"0rem"}>
                    <Grid
                        item
                        xs={12}
                        sm={gridControl === 'true' ? 4 : 3}
                        md={fullWidth?12:gridControl === 'true' ? 4 : 3}
                    >
                        <FileInputField
                            titleText={titleText}
                            label={label}
                            hintText={hintText}
                            errorStatus={errorStatus}
                            width
                            onChange={onChange}
                            acceptedFileInput={acceptedFileInput}
                        />
                    </Grid>
                    {multipleImages.map((image, index) => {
                        return (
                            <Grid
                                item
                                xs={12}
                                sm={gridControl === 'true' ? 4 : 3}
                                md={gridControl === 'true' ?fullWidth? 2.5:4 : 3}
                                key={index}
                            >
                                <CustomBoxForFilePreviewer fullWidth={fullWidth} width={width}>
                                    {previewBasedOnType(image, index)}
                                    <IconButtonImagePreviewer
                                        onClick={() => onDelete(index)}
                                    >
                                        <DeleteForeverIcon style={{  fontSize:"1rem"}} />
                                    </IconButtonImagePreviewer>
                                </CustomBoxForFilePreviewer>
                            </Grid>
                        )
                    })}

                </Grid>
            )
        } else {
            const previewImage = {
                url: URL.createObjectURL(file),
                type: file.name.split('.').pop(),
            }
            return (
                <CustomBoxForFilePreviewer fullWidth={fullWidth}>
                    {previewBasedOnType(previewImage)}
                    <IconButtonImagePreviewer onClick={() => deleteImage()}>
                        <DeleteIcon />
                    </IconButtonImagePreviewer>
                </CustomBoxForFilePreviewer>
            )
        }
    }
    const previewBasedOnType = (file, fileIndex) => {
        if (
            file.type === 'jpg' ||
            file.type === 'jpeg' ||
            file.type === 'gif' ||
            file.type === 'png'
        ) {
            return (
                <FilePreviewerWrapper
                    fullWidth={fullWidth}
                // onClick={() => anchor.current.click()}
                // width={width}
                    borderRadius="5px"
                >
                    <CustomImageContainer src={file.url} alt="preview" objectFit="cover" />
                    {/*<img src={file.url} alt="preview" />*/}
                </FilePreviewerWrapper>
            )
        } else if (file.type === 'pdf') {
            return (
                <FilePreviewerWrapper
                    // onClick={() => anchor.current.click()}
                    objectFit
                    // width={width}
                >
                    <CustomImageContainer src={pdfIcon} alt="pdf" />
                </FilePreviewerWrapper>
            )
        } else if (file.type === 'docx' || file.type === 'docx') {
            return (
                <FilePreviewerWrapper
                    // onClick={() => anchor.current.click()}
                    objectFit
                    // width={width}
                >
                    <CustomImageContainer src={docIcon} alt="doc" />
                </FilePreviewerWrapper>
            )
        } else if (file.type === 'txt') {
            return (
                <FilePreviewerWrapper
                    // onClick={() => anchor.current.click()}
                    objectFit
                    // width={width}
                >
                    <CustomImageContainer src={txtIcon} alt="text" />
                </FilePreviewerWrapper>
            )
        } else {
            return (
                <FilePreviewerWrapper
                    // onClick={() => anchor.current.click()}
                    objectFit
                    // width={width}
                >
                    <CustomImageContainer src={folderIcon} alt="text" />
                </FilePreviewerWrapper>
            )
        }
    }
    return (
        <Stack width="100%" alignItems="center" spacing={3}>
            {renderFilePreview()}
            {hintText && (
                <CustomBoxImageText>
                    <Typography>{hintText}</Typography>
                </CustomBoxImageText>
            )}
        </Stack>
    )
}
FilePreviewer.propTypes = {}
export default FilePreviewer
