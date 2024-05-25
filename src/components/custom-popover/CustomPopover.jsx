import { Popover, useTheme } from '@mui/material';
import React from 'react'
import { CustomPopoverWrapper } from './CustomPopover.style';

const CustomPopover = ({
    anchorEl,
    setAnchorEl,
    children,
    maxWidth,
    padding,
    width,
    handleClose,
    bgColor
}) => {
    const open = Boolean(anchorEl);
    const theme = useTheme()
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose || handleClosePopover}
            disableScrollLock={true}
            disableRestoreFocus
            sx={{zIndex: theme.zIndex.appBar + 100}}
            // anchorOrigin={{
            //     vertical: 'bottom',
            //     horizontal: 'left',
            // }}
            // transformOrigin={{
            //     vertical: 'top',
            //     horizontal: 'center',
            // }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <CustomPopoverWrapper
                maxWidth={maxWidth}
                padding={padding}
                width={width}
                bgColor={bgColor}
            >
                {children}
            </CustomPopoverWrapper>
        </Popover>
    )
}
CustomPopover.propTypes = {}

export default CustomPopover
