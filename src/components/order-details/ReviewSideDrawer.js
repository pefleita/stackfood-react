import React from "react";
import { alpha, Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { t } from "i18next";
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style";
import RateAndReview from "@/components/rate-and-review/RateAndReview";


const ReviewSideDrawer = ({open,onClose,orderId,refetchTrackData,is_reviewed,is_dm_reviewed}) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            variant="temporary"
            sx={{ zIndex: '1200',
                '& .MuiDrawer-paper': {
                minWidth:'375px'
                } }}
        >

            <Stack maxWidth="511px" width="100%">

                <button className="closebtn" onClick={onClose}>
                    <CloseIcon sx={{ fontSize: '16px' }} />
                </button>

                <CustomStackFullWidth spacing={1} paddingTop="2rem" paddingX="2.5rem"
                                      justifyContent="center"
                                      alignItems="center">

                <Typography fontSize="16px" fontWeight="700" paddingTop="24px" >
                    {t('Give your valuable feedback!')}
                </Typography>
                    <RateAndReview is_dm_reviewed={is_dm_reviewed} is_reviewed={is_reviewed} id={orderId} onClose={onClose} refetchTrackData={refetchTrackData}  />
                </CustomStackFullWidth>

            </Stack>

        </Drawer>
    );
};

export default ReviewSideDrawer;
