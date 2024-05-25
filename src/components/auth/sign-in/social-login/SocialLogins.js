import React, { memo, useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import GoogleLoginComp from './GoogleLoginComp'
import FbLoginComp from './FbLoginComp'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style"

const SocialLogins = (props) => {
    const { socialLogins, handleParentModalClose, setJwtToken, setUserInfo, handleSuccess, setModalFor, setMedium } = props
    const { global } = useSelector((state) => state.globalSettings)
    const [isSingle, setIsSingle] = useState(false);
    const { t } = useTranslation()
    useEffect(() => {
        if (socialLogins) {
            let length = 0;
            socialLogins.map(item => {
                if (item.status === true) {
                    length = length + 1;
                }
            })
            if (length > 1) {
                setIsSingle(false)
            } else {
                setIsSingle(true)
            }
        }
    }, [])
    return (
        <CustomStackFullWidth alignItems="center" justifyContent="center" columnGap="1.5rem" flexDirection="row">
            {socialLogins.map((item, index) => {
                if (item?.login_medium === 'facebook' && item?.status === true) {
                    return (
                        <FbLoginComp
                            key={index}
                            handleSuccess={handleSuccess}
                            handleParentModalClose={handleParentModalClose}
                            global={global}
                            setJwtToken={setJwtToken}
                            setUserInfo={setUserInfo}
                            setModalFor={setModalFor}
                            setMedium={setMedium}
                            isSingle={isSingle}
                        />
                    )
                } else if (item?.login_medium === 'google' && item.status === true) {
                    return (
                        <GoogleLoginComp
                            key={index}
                            handleSuccess={handleSuccess}
                            handleParentModalClose={handleParentModalClose}
                            global={global}
                            setJwtToken={setJwtToken}
                            setUserInfo={setUserInfo}
                            setModalFor={setModalFor}
                            setMedium={setMedium}
                            isSingle={isSingle}
                        />
                    )
                }
            })}
            {/*<AppleLoginComp/>*/}
        </CustomStackFullWidth>
    )
}

SocialLogins.propTypes = {}

export default memo(SocialLogins)
