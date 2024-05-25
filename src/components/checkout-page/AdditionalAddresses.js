import React, { useState } from "react";
import PropTypes from 'prop-types'
import {
    CustomAccordion,
    CustomStackFullWidth,
    CustomTextField
} from "@/styled-components/CustomStyles.style";
import { DeliveryCaption } from './CheckOut.style'
import { AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import { ACTIONS } from './states/additionalInformationStates'
import { Stack } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useTheme } from "@mui/styles";
const AdditionalAddresses = (props) => {
    const {
        t,
        additionalInformationStates,
        additionalInformationDispatch,
        orderType,
    } = props
    const theme=useTheme()
    const note_text =
        orderType === 'take_away' ? 'Additional Note' : 'Additional Information'
    const [expanded, setExpanded] = useState(false);
    const handleChange=()=>{
        setExpanded(!expanded)
    }
    return (
        <CustomStackFullWidth>
            <CustomAccordion onChange={handleChange} background={theme.palette.background.paper}>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                   <Stack direction="row" justifyContent="space-between" alignItems="center">
                       <Typography  fontSize='16px'
                                    fontWeight='700' no_margin_top="true">
                           {t(note_text)}
                       </Typography>
                       {expanded ? <ArrowDropUpIcon/>:<ArrowDropDownIcon/>}
                   </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <CustomStackFullWidth mt=".5rem">
                        <Grid container spacing={3}>
                            {orderType !== 'take_away' && (
                                <>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            label={t('Street number')}
                                            value={
                                                additionalInformationStates.streetNumber
                                            }
                                            fullWidth
                                            onChange={(e) =>
                                                additionalInformationDispatch({
                                                    type: ACTIONS.setStreetNumber,
                                                    payload: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            label={t('House number')}
                                            value={
                                                additionalInformationStates.houseNumber
                                            }
                                            fullWidth
                                            onChange={(e) =>
                                                additionalInformationDispatch({
                                                    type: ACTIONS.setHouseNumber,
                                                    payload: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            label={t('Floor')}
                                            value={additionalInformationStates.floor}
                                            fullWidth
                                            onChange={(e) =>
                                                additionalInformationDispatch({
                                                    type: ACTIONS.setFloor,
                                                    payload: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>
                                <CustomTextField
                                    multiline
                                    rows={4}
                                    placeholder={t(
                                        'Ex: Please provide an extra napkin'
                                    )}
                                    label={t('Note')}
                                    value={additionalInformationStates.note}
                                    fullWidth
                                    onChange={(e) =>
                                        additionalInformationDispatch({
                                            type: ACTIONS.setNote,
                                            payload: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </CustomStackFullWidth>
                </AccordionDetails>
            </CustomAccordion>


        </CustomStackFullWidth>
    )
}

AdditionalAddresses.propTypes = {}

export default AdditionalAddresses
