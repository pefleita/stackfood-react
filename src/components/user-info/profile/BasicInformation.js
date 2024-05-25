import React from 'react'
import { Stack } from '@mui/material'
import { ProfileApi } from "@/hooks/react-query/config/profileApi"
import { useMutation } from 'react-query'
import { toast } from 'react-hot-toast'
import AccountInformation from './AccountInformation'
import BasicInformationForm from './BasicInformationForm'
import CustomAlert from '../../alert/CustomAlert'
import { useTranslation } from 'react-i18next'
import { onErrorResponse } from "@/components/ErrorResponse";
import { useDispatch } from "react-redux";
import { setEditProfile } from "@/redux/slices/editProfile";
const BasicInformation = ({ data, refetch, deleteUserHandler }) => {
    const dispatch=useDispatch()
    const {
        mutate: profileUpdateByMutate,
        isLoading,
        error,
    } = useMutation('profileUpdate', ProfileApi.profileUpdate)
    const { t } = useTranslation()
    const formSubmitHandler = (values) => {
        const { f_name, l_name, phone, email, image } = values
        let formData = new FormData()
        formData.append('f_name', f_name)
        formData.append('l_name', l_name)
        formData.append('phone', phone)
        formData.append('email', email)
        formData.append('image', image)

        const onSuccessHandler = (response) => {
            if (response) {
                toast.success(response.data.message)
                //InfoSetByApi()
                refetch().then()
                dispatch(setEditProfile(false))

            }
        }
        profileUpdateByMutate(formData, {
            onSuccess: onSuccessHandler,
            onError: onErrorResponse
        })
    }

    return (
        <Stack
            gap="20px"
            sx={{
                borderRadius: '10px'
            }}
        >
            <BasicInformationForm
                data={data}
                formSubmit={formSubmitHandler}
                deleteUserHandler={deleteUserHandler}
            />
            {data?.social_id!==null ? (
                <Stack ml="20px" mr="30px" mb="20px">
                    <CustomAlert
                        type="info"
                        text={t(
                            'Password can not be updated while you are logged in by using social logins.'
                        )}
                    />
                </Stack>
            ) : (
                <AccountInformation
                    data={data}
                    formSubmit={formSubmitHandler}
                />
            )}
        </Stack>
    )
}

export default BasicInformation
