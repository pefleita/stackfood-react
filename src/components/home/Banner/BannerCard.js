import React from 'react'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from '../../CustomImageContainer'
import { useSelector } from 'react-redux'
import test_image from '../../../../public/static/testImage.svg'
import FoodDetailModal from '../../foodDetail-modal/FoodDetailModal'

const BannerCard = (props) => {
    const {
        banner,
        handleBannerClick,
        openModal,
        setOpenModal,
        handleModalClose,
        FoodBannerData,
    } = props
    const { global } = useSelector((state) => state.globalSettings)

    const globalImageUrl = banner?.available_date_ends
        ? global?.base_urls?.campaign_image_url
        : global?.base_urls?.banner_image_url
    const bannerImage = `${globalImageUrl}/${banner?.image}`

    return (
        <CustomStackFullWidth onClick={() => handleBannerClick(banner)}>
            <CustomImageContainer
                src={bannerImage}
                // maxWidth="390px"
                width="100%"
                objectFit="contain"
                borderRadius="16px"
                cursor="pointer"
                aspectRatio="2/1"
            />
        </CustomStackFullWidth>
    )
}

export default BannerCard
