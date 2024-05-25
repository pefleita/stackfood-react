import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import CustomImageContainer from '../CustomImageContainer'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { useTheme } from "@mui/styles";

const ImagePreviewOnModal = (props) => {
    const theme=useTheme()
    const { modalImage, handleModalClose } = props
    return (
        <CustomStackFullWidth
            sx={{
                position: 'relative',
                width: { xs: '270px', sm: '500px' },
                backgroundColor:theme.palette.neutral[100],
                borderRadius:"10px",
                padding:"10px",
            }}
            alignItems="flex-end"
            //spacing={1}
        >
            <button
                onClick={() => handleModalClose(false)}
                className="closebtn"
            >
                <CloseIcon sx={{ fontSize: '16px' }} />
            </button>
            <CustomImageContainer src={modalImage} width="100%" height="100%" objectFit="contain" />
        </CustomStackFullWidth>
    )
}

ImagePreviewOnModal.propTypes = {}

export default ImagePreviewOnModal
