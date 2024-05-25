import React from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '@mui/material/Dialog'
import { Button, Drawer, Stack } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'

import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style"
import { WrapperForCustomDialogConfirm } from '../custom-dialog/confirm/CustomDialogConfirm.style'
import CustomSelectWithFormik from '../custom-select/CustomSelectWithFormik'
import DialogContent from '@mui/material/DialogContent'
import { useFormik } from 'formik'
import ValidationSchemaForRestaurant from '../join-restaurant/ValidationSchemaForRestaurant'
import MultiFileUploader from '../multi-file-uploader/MultiFileUploader'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import LoadingButton from '@mui/lab/LoadingButton'
import * as Yup from 'yup'
import CloseIcon from '@mui/icons-material/Close'
import RefundSvg from "./RefundSvg";
import { useTheme } from "@mui/styles";


const acceptedFileInputFormat =
    'application/pdf,image/*,text/plain,.doc, .docx,.txt'
const supportedFormatMultiImages = [
    'jpg',
    'jpeg',
    'gif',
    'png',
    'pdf',
    'doc',
    'docx',
    'deb',
]
const RefundModal = (props) => {
    const theme=useTheme()
    const {
        open,
        onClick,
        onClose,
        onSuccess,
        dialogTexts,
        reasons,
        formSubmit,
        refundIsLoading,
    } = props

    const { t } = useTranslation()
    const RefundRequestFormik = useFormik({
        initialValues: {
            customer_reason: '',
            customer_note: '',
            identity_image: '',
        },
        validationSchema: Yup.object({
            customer_reason: Yup.string().required(t('Please select a reason')),
        }),
        // validationSchema: ValidationSchemaForRestaurant(),
        onSubmit: async (values, helpers) => {
            try {
                formSubmitOnSuccess(values)
            } catch (err) {}
        },
    })

    let reasonsOption = []
    reasons?.forEach((reason) => {
        let obj = {
            label: reason.reason,
            value: reason.reason,
        }
        reasonsOption.push(obj)
    })
    const noteHandler = (value) => {
        RefundRequestFormik.setFieldValue('customer_note', value)
    }
    const reasonsHandler = (value) => {
        RefundRequestFormik.setFieldValue('customer_reason', value)
    }
    const fileImagesHandler = (files) => {
        RefundRequestFormik.setFieldValue('identity_image', files)
    }
    const formSubmitOnSuccess = (values) => {
        formSubmit(values)
    }
    // const imageUrl = `${productImageUrl}/${review.food_image}`
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            variant="temporary"
            sx={{ zIndex: '1200', minWidth: "375px" }}
        >
            <Stack maxWidth="511px" width="100%"  >
                <button className="closebtn" onClick={onClose}>
                    <CloseIcon sx={{ fontSize: '16px' }} />
                </button>
                <CustomStackFullWidth spacing={1} paddingTop="3rem" paddingX="1rem">
                    <Stack alignItems="center" justifyContent="center" paddingX="50px">
                        <RefundSvg/>
                        <Typography fontSize="16px" fontWeight="700" paddingTop="24px" >
                            {t('Tell us what’s wrong with the order ?')}
                        </Typography>
                        <Typography fontSize="14px" fontWeight="400" color={theme.palette.neutral[500]} paddingTop="12px" paddingBottom=".5rem" textAlign="center">
                            {t('Please describe your problem to make you future experience more better')}
                        </Typography>
                    </Stack>
                    <DialogContent sx={{ padding: '10px 24px' }}>
                        <CustomStackFullWidth>
                            <form
                                noValidate
                                onSubmit={RefundRequestFormik.handleSubmit}
                            >
                                <Stack spacing={2}>
                                    <CustomStackFullWidth>
                                        <CustomSelectWithFormik
                                            selectFieldData={reasonsOption}
                                            inputLabel={t('Select an option')}
                                            passSelectedValue={reasonsHandler}
                                            touched={
                                                RefundRequestFormik.touched
                                                    .customer_reason
                                            }
                                            errors={
                                                RefundRequestFormik.errors
                                                    .customer_reason
                                            }
                                            fieldProps={RefundRequestFormik.getFieldProps(
                                                'customer_reason'
                                            )}
                                            height="47px"
                                        />
                                    </CustomStackFullWidth>
                                    <CustomStackFullWidth>
                                        <CustomTextFieldWithFormik
                                            type="text"
                                            label={t('Note')}
                                            touched={
                                                RefundRequestFormik.touched
                                                    .customer_note
                                            }
                                            errors={
                                                RefundRequestFormik.errors
                                                    .customer_note
                                            }
                                            fieldProps={RefundRequestFormik.getFieldProps(
                                                'customer_note'
                                            )}
                                            onChangeHandler={noteHandler}
                                            value={
                                                RefundRequestFormik.values
                                                    .customer_note
                                            }
                                            multiline="true"
                                            rows="2"
                                            placeholder="Enter note"
                                            height="70"
                                        />
                                    </CustomStackFullWidth>
                                    <CustomStackFullWidth sx={{paddingTop:".5rem"}} >
                                        <MultiFileUploader
                                            fileImagesHandler={
                                                fileImagesHandler
                                            }
                                            totalFiles={
                                                RefundRequestFormik.values
                                                    .identity_image
                                            }
                                            maxFileSize={20000000}
                                            supportedFileFormats={
                                                supportedFormatMultiImages
                                            }
                                            acceptedFileInputFormat={
                                                acceptedFileInputFormat
                                            }
                                            labelText={t('browse your file')}
                                            width="100%"
                                            gridControl="true"
                                            fullWidth={true}

                                        />
                                    </CustomStackFullWidth>
                                    <Stack
                                        alignItems="center"
                                        justifyContent="center"
                                        width="100%"
                                    >
                                        <LoadingButton
                                            type="submit"
                                            variant="contained"

                                            loading={refundIsLoading}
                                        >
                                            {t('Submit Request')}
                                        </LoadingButton>
                                    </Stack>
                                </Stack>
                            </form>
                        </CustomStackFullWidth>
                    </DialogContent>
                </CustomStackFullWidth>
            </Stack>
        </Drawer>
    )
}

RefundModal.propTypes = {}

export default RefundModal
