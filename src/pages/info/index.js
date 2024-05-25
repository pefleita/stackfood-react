import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Meta from '../../components/Meta'
import CustomContainer from '../../components/container'
import UserInfo from '../../components/user-info'
import { useRouter } from 'next/router'
import AuthGuard from '../../components/authentication/AuthGuard'
import jwt from "base-64";
import HomeGuard from "../../components/home-guard/HomeGuard";
const index = () => {
    const router = useRouter()
    const { page, orderId, token } = router.query
    const [attributeId, setAttributeId] = useState('')

    useEffect(() => {
        if (token) {
            try {
                // Attempt to decode the Base64 token
                const decodedToken = jwt.decode(token)

                // Check if decodedToken is a valid string
                if (typeof decodedToken === 'string') {
                    // Assuming decodedToken is in the format: "key1=value1&&key2=value2&&..."
                    const keyValuePairs = decodedToken.split('&&')

                    // Loop through the key-value pairs to find the one with attribute_id
                    for (const pair of keyValuePairs) {
                        const [key, value] = pair.split('=')
                        if (key === 'attribute_id') {
                            setAttributeId(value)
                            return // Exit the loop when attribute_id is found
                        }
                    }
                } else {
                    console.error(
                        'Decoded token is not a string:',
                        decodedToken
                    )
                }
            } catch (error) {
                console.error('Error decoding token:', error)
            }
        } else {
            console.error('Token is missing.')
        }
    }, [token])

    return (
        <div>
        {/* <HomeGuard> */}
            <CssBaseline />
            <CustomContainer>
                <AuthGuard from={router.pathname.replace('/', '')}>
                    {page && <UserInfo page={page} orderId={orderId ?? attributeId} setAttributeId={setAttributeId}/>}
                </AuthGuard>
            </CustomContainer>
        {/* </HomeGuard> */}
        </div>
    )
}

export default index