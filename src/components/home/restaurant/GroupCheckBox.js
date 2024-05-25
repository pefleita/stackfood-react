import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { CustomTypographyLabel } from '../../../styled-components/CustomTypographies.style'
import { Skeleton, Stack } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import { t } from 'i18next'
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/styles";

const CustomFormGroup=styled(FormGroup)(({theme,rowWise,isSmall})=>({
    display:"flex",
    flexDirection:rowWise?"row":"column",
    maxWidth: isSmall ? '170px' : '350px',
    width: '100%',
    justifyContent: 'space-between',

}))

const GroupCheckBox = ({
    checkboxData,
    handleFilterData,
    setCheckedFilterKey,
                           rowWise,handleDropClose
}) => {
    const theme=useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const handleChange = (event, id) => {
        let newArr = checkboxData.map((item) =>
            item?.id === id ? { ...item, isActive: event.target.checked } : item
        )
        setCheckedFilterKey(newArr)
        handleDropClose()
        //
    }

    return (
        <div>
            <CustomFormGroup  rowWise={rowWise} isSmall={isSmall}>
                {checkboxData?.map((item) => {
                    return (
                        <FormControlLabel
                            sx={{
                                maxWidth: isSmall ? '150px' : '170px',
                                width: '100%',
                                textAlign: 'left',
                            }}
                            key={item?.id}
                            value={item?.value}
                            name={item?.value}
                            control={
                                <Checkbox
                                    onChange={(event) =>
                                        handleChange(event, item.id)
                                    }
                                    checked={item?.isActive}
                                />
                            }
                            label={
                                <CustomTypographyLabel>
                                    {t(item?.name)}
                                </CustomTypographyLabel>
                            }
                        />
                    )
                })}
            </CustomFormGroup>
        </div>
    )
}

export default GroupCheckBox
