import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { CircularProgress, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useTheme } from "@mui/material/styles";
import Link from 'next/link';
import CustomModal from '../custom-modal/CustomModal';
import ContactAddressMap from '../help-page/ContactAddressMap';

const ContactInfo = ({ global }) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [open, setOpen] = useState(false)
    const [hovered, setHovered] = useState(null);

    const handleHover = (value) => {
        setHovered(value);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };
    const handleOpenCloseMap = () => {
        setOpen(!open)
    }
    return (
        <CustomStackFullWidth spacing={1.5} alignItems={{ xs: "center", sm: "center", md: "flex-start" }} >
            <Stack
                onMouseEnter={() => handleHover('address')}
                onMouseLeave={handleMouseLeave}
                onClick={handleOpenCloseMap}
                direction="row" spacing={1}
                alignItems="flex-start"
                color={theme.palette.text.footerText}
                sx={{ cursor: "pointer" }}
            >
                <ApartmentIcon sx={{ color: hovered === 'address' && 'primary.main' }} />
                <Typography sx={{ color: hovered === 'address' && 'primary.main' }}>{global?.address}</Typography>
            </Stack>
            <Link href={`mailto:${global?.email}`}>
                <Stack
                    onMouseEnter={() => handleHover('mail')}
                    onMouseLeave={handleMouseLeave}
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    color={theme.palette.text.footerText}
                    sx={{ cursor: "pointer" }}
                >
                    <MailIcon sx={{ color: hovered === 'mail' && 'primary.main' }} />
                    <Typography sx={{ color: hovered === 'mail' && 'primary.main' }}>{global?.email}</Typography>
                </Stack>
            </Link>
            <Link href={`tel:${global?.phone}`}>
                <Stack
                    onMouseEnter={() => handleHover('phone')}
                    onMouseLeave={handleMouseLeave}
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    color={theme.palette.text.footerText}
                    sx={{ cursor: "pointer" }}
                >
                    <LocalPhoneIcon sx={{ color: hovered === 'phone' && 'primary.main' }} />
                    <Typography sx={{ color: hovered === 'phone' && 'primary.main' }}>{global?.phone}</Typography>
                </Stack>
            </Link>
            <ContactAddressMap global={global} open={open} setOpen={setOpen} />
        </CustomStackFullWidth>
    );
};

export default ContactInfo;
