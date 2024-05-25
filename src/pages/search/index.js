import React from 'react'
import { CustomHeader } from '../../api/Headers'
import HeroSectionWithSearch from '../../components/home/hero-section-with-search'
import { useRouter } from 'next/router'
import ProductSearchPage from '../../components/products-page/ProductSearchPage'
import CustomContainer from '../../components/container'
import ScrollToTop from '../../components/scroll-top/ScrollToTop'
import HomeGuard from "../../components/home-guard/HomeGuard";

const SearchPage = ({ configData }) => {
    const router = useRouter()
    const { query } = router.query
    return (
        <>
        <HomeGuard>
            <ScrollToTop />
            <HeroSectionWithSearch query={query} />
            <CustomContainer>
                <ProductSearchPage query={query} configData={configData} />
            </CustomContainer>
        </HomeGuard>
        </>
    )
}

export default SearchPage
export const getServerSideProps = async () => {
    const configRes = await fetch(
        `${process.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
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
