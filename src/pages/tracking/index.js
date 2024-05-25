import React from 'react'
//import WithAuth from '../../components/authentication/auth-guard'


import { useRouter } from 'next/router'
import { Container, Stack } from '@mui/material'

import Meta from "../../components/Meta";
import { CustomPaperBigCard } from "../../styled-components/CustomStyles.style";
import { CustomHeader } from "../../api/Headers";
import TrackOrderInput from "../../components/Track-order/TrackOrderInput";
import HomeGuard from "../../components/home-guard/HomeGuard";
const index = ({ configData }) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="div">
    <HomeGuard>
      <Meta title={`Order Tracking - ${configData?.business_name}`} />
      <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
        <Stack mt={{ xs: '20px', md: '80px' }} minHeight="500px">
            <TrackOrderInput configData={configData} />
        </Stack>
      </Container>
    </HomeGuard>
    </div>
  )
}

export default index
export const getServerSideProps = async () => {
  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
    {
      method: 'GET',
      headers: CustomHeader,
    }
  )
  const config = await configRes.json()
  return {
    props: {
      configData: config,
    },
  }
}
