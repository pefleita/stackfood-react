import React from 'react'
import OrderDetail from '../../../components/order-details/OrderDetail'
import { useSelector } from 'react-redux'
import Meta from '../../../components/Meta'
import CustomContainer from '../../../components/container'
import { Stack } from '@mui/material'
import { useRouter } from "next/router";

const index = ({ configData }) => {
    const router = useRouter()
    const { orderId } = router.query
    return (
        <div className="div">
            <Meta title={`Order details - ${configData?.business_name}`} />
            <CustomContainer>
                <Stack pt="60px">
                    <OrderDetail orderId={orderId} />
                </Stack>
            </CustomContainer>
        </div>
    )
}

export default index
export const getServerSideProps = async (context) => {
    const { req } = context
    const language = req.cookies.languageSetting
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: {
                'X-software-id': 33571750,
                'X-server': 'server',
                'X-localization': language,
                origin: process.env.NEXT_CLIENT_HOST_URL,
            },
        }
    )
    const config = await configRes.json()
    return {
        props: {
            configData: config,
        },
    }
}
