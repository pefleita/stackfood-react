import React from 'react'
import {
    FilePreviewerWrapper,
    CustomBoxForFilePreviewer,
    IconButtonImagePreviewer,
} from '../file-previewer/FilePreviewer.style'
import { InputLabel } from '@mui/material'
import ImageUploaderThumbnail from './ImageUploaderThumbnail'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomImageContainer from '../CustomImageContainer'

const ImagePreviewer = ({
    anchor,
    file,
    label,
    width,
    imageUrl,
    borderRadius,
    error,
    isIcon
}) => {


    let previewImage
    if (typeof file !== 'string') {
        previewImage = {
            url: URL.createObjectURL(file), // type: file.name.split('.').pop(),
        }
    } else previewImage = file

    return (
        <>
            <CustomBoxForFilePreviewer>
                {previewImage ? (
                    <FilePreviewerWrapper
                        onClick={() => anchor.current.click()}
                        width={width}
                        height="100px"
                        objectFit
                        borderRadius={borderRadius}
                    >
                        {typeof file !== 'string' ? (
                            <CustomImageContainer
                                src={previewImage.url}
                                alt="preview"
                                objectFit="cover"
                            />
                        ) : (
                            <CustomImageContainer
                                src={`${imageUrl}/${previewImage}`}
                                alt="preview"
                                objectFit="cover"
                            />
                        )}
                    </FilePreviewerWrapper>
                ) : (
                    <FilePreviewerWrapper
                        onClick={() => anchor.current.click()}
                        width={width}
                        height="100px"
                        objectFit
                        borderRadius={borderRadius}
                    >
                        <ImageUploaderThumbnail
                            label={label}
                            width={width}
                            error={error}
                            isIcon={isIcon}
                            borderRadius={borderRadius}
                        />
                    </FilePreviewerWrapper>
                )}
            </CustomBoxForFilePreviewer>
            {/* <CustomImageContainer
                src={image}
                height="100px"
                width="150px"
                borderRadius=".6rem"
                objectFit="cover"
            /> */}
        </>
    )
}

export default ImagePreviewer
