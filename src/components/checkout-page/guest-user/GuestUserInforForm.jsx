import React from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import { t } from "i18next";

import { useDispatch, useSelector } from "react-redux";
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style";
import CustomTextFieldWithFormik from "@/components/form-fields/CustomTextFieldWithFormik";
import { setGuestUserInfo } from "@/redux/slices/guestUserInfo";
import CustomPhoneInput from "@/components/CustomPhoneInput";
import FormSubmitButton from "./FormSubmitButton";

const GuestUserInforForm = ({
  configData,
  editAddress,
  setEditAddress,
  handleClose,
}) => {
  const { guestUserInfo } = useSelector((state) => state.guestUserInfo);
  const dispatch = useDispatch();
  let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
  const addAddressFormik = useFormik({
    initialValues: {
      contact_person_name: guestUserInfo
        ? guestUserInfo?.contact_person_name
        : "",
      contact_person_number: guestUserInfo
        ? guestUserInfo?.contact_person_number
        : "",
      contact_person_email: guestUserInfo
        ? guestUserInfo?.contact_person_email
        : "",
    },
    onSubmit: async (values, helpers) => {
      try {
        dispatch(setGuestUserInfo(values));
        handleClose();
      } catch (err) {}
    },
  });

  const nameHandler = (value) => {
    addAddressFormik.setFieldValue("contact_person_name", value);
  };
  const numberHandler = (value) => {
    addAddressFormik.setFieldValue("contact_person_number", value);
  };
  const emailHandler = (value) => {
    addAddressFormik.setFieldValue("contact_person_email", value);
  };
  const handleReset = () => {
    addAddressFormik.setFieldValue("contact_person_name", "");
    addAddressFormik.setFieldValue("contact_person_number", "");
    addAddressFormik.setFieldValue("contact_person_email", "");
  };
  return (
    <CustomStackFullWidth
      p="2rem"
      minHeight="300px"
      alignItems="center"
      justifyContent="center"
    >
      <form noValidate onSubmit={addAddressFormik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <CustomTextFieldWithFormik
              required="true"
              type="text"
              label={t("Contact Person Name")}
              touched={addAddressFormik.touched.contact_person_name}
              errors={addAddressFormik.errors.contact_person_name}
              fieldProps={addAddressFormik.getFieldProps("contact_person_name")}
              onChangeHandler={nameHandler}
              value={addAddressFormik.values.contact_person_name}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomPhoneInput
              value={addAddressFormik.values.contact_person_number}
              onHandleChange={numberHandler}
              initCountry={configData?.country}
              touched={addAddressFormik.touched.contact_person_number}
              errors={addAddressFormik.errors.contact_person_number}
              rtlChange="true"
              lanDirection={languageDirection}
              height="45px"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomTextFieldWithFormik
              required="true"
              type="text"
              label={t("Contact Person Email")}
              value={addAddressFormik.values.contact_person_email}
              onChangeHandler={emailHandler}
              touched={addAddressFormik.touched.contact_person_email}
              errors={addAddressFormik.errors.contact_person_email}
            />
          </Grid>
          <Grid item xs={12} md={12} align="end">
            <FormSubmitButton
              handleReset={handleReset}
              //isLoading={editAddress ? isUpdateLoading : isLoading}
              reset={t("Reset")}
              submit={editAddress ? t("Save") : t("Save")}
            />
          </Grid>
        </Grid>
      </form>
    </CustomStackFullWidth>
  );
};

export default GuestUserInforForm;
