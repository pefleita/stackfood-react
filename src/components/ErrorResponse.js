import { toast } from 'react-hot-toast'
import { logoutSuccessFull } from '../utils/ToasterMessages'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'

import { store } from '../redux/store'
import { removeToken } from '../redux/slices/userToken'
import { CustomToaster, CustomToasterTokenExpired } from './custom-toaster/CustomToaster'
import GooglePlay from '@/assets/images/icons/GooglePlay'
const handleTokenExpire = (status) => {
    if (status === 401) {
        if (window?.localStorage.getItem('token')) {
            CustomToasterTokenExpired('Session Time Out', 'Though it is a demo site, our system automatically reset after one hour and that’s why you logged out');
            window?.localStorage.removeItem('token')
            store.dispatch(removeToken())
            Router.push('/home')
        }
    }
}

const handle404 = () => {
    CustomToaster('error', '404 not found.');
    Router.push('/404')
}

export const onErrorResponse = (error) => {
    error?.response?.data?.errors?.forEach((item) => {
        CustomToaster('error', item?.message);
    })
    handleTokenExpire(error?.response?.status)
}
export const onSingleErrorResponse = (error) => {
    CustomToaster('error', error?.response?.data?.message);
    handleTokenExpire(error?.response?.status)
}
