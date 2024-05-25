import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomImageContainer from "../CustomImageContainer";
import Link from "next/link";
import ContactItem from "./ContactItem";
import callIcon from './assets/callIcon.svg'
import mailIcon from './assets/mailIcon.svg'
import addressIcon from './assets/addressIcon.svg'
import ContactAddressMap from "./ContactAddressMap";
import NeedHelpSvg from './assets/NeedHelp.svg'

const HelpPage = ({ configData }) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const handleOpenCloseMap = () => {
        setOpen(!open)
    }

    const handlePhoneClick = () => {
        router.push(`tel:${configData?.phone}`);
    };

    const handleEmailClick = () => {
        router.push(`mailto:${configData?.email}`);
    };

    return (
        <Box mt={{ xs: '100px', md: '190px' }} mb="50px">
            <Grid
                container
                item
                md={12}
                xs={12}
                spacing={3}
                justifyContent="center"
            >
                <Grid item md={12} xs={12} sx={{ paddingBottom: '50px' }}>
                    <Stack alignItems="center" gap="30px">
                        <CustomImageContainer
                            src={NeedHelpSvg.src}
                            alt='logo'
                            width="300px"
                            objectFit='contained'
                        />
                        <Stack alignItems="center">
                            <Typography textAlign="center" fontSize="26px" fontWeight={600} color={theme.palette.neutral[1000]}>
                                {t('Need any help ?')}
                            </Typography>
                            <Typography textAlign="center" fontSize="16px" fontWeight={400} color={theme.palette.neutral[400]}>
                                {t('Communicate with our support team to get proper guidance to your questionaries')}
                            </Typography>
                        </Stack>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Link href={`tel:${configData?.phone}`}>
                                    <ContactItem
                                        icon={callIcon.src}
                                        title={"Call Us"}
                                        subTitle={configData?.phone}
                                        onClick={handlePhoneClick}
                                    />
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <ContactItem
                                    icon={addressIcon.src}
                                    title={"Address"}
                                    subTitle={configData?.address}
                                    onClick={handleOpenCloseMap}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <ContactItem
                                    icon={mailIcon.src}
                                    title={"Mail Us"}
                                    subTitle={configData?.email}
                                    onClick={handleEmailClick}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
            <ContactAddressMap global={configData} open={open} setOpen={setOpen} />
        </Box>
    )
}

export default HelpPage
