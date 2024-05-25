import React from 'react'
import { IconButton } from '@mui/material'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import facebookIcon from '../../../public/static/footer/socialicons/fbColor.png'
import instraIcon from '../../../public/static/footer/socialicons/instraColor.png'
import pinterestIcon from '../../../public/static/footer/socialicons/pinterest.png'
import linkedin from '../../../public/static/footer/socialicons/linkedIn.png'
import twitterIcon from '../../../public/static/footer/socialicons/twitter.png'
import youtube from '../../../public/static/footer/socialicons/youtubeColor.png'
import errorImage from '../../../public/static/no-image-found.png'
import CustomImageContainer from '../CustomImageContainer'
import { RTL } from '../RTL/RTL'
import InstagramIcon from '@/assets/images/icons/socials/InstagramIcon'
import FacebookIcon from '@/assets/images/icons/socials/FacebookIcon'
import TwitterIcon from '@/assets/images/icons/socials/TwitterIcon'
import LinkedinIcon from '@/assets/images/icons/socials/LinkedinIcon'
import YoutubeIcon from '@/assets/images/icons/socials/YoutubeIcon'
import PinterestIcon from '@/assets/images/icons/socials/PinterestIcon'

const SocialLinks = (props) => {
    const { global } = props
    const { t } = useTranslation()
    const clickHandler = (link) => {
        window.open(link)
    }
    const iconHandler = (name) => {
        switch (name) {
            case 'facebook':
                return <FacebookIcon />
            case 'instagram':
                return <InstagramIcon />
            case 'twitter':
                return <TwitterIcon />
            case 'linkedin':
                return <LinkedinIcon />
            case 'pinterest':
                return <PinterestIcon />
            // case 'youtube':
            //     return <YoutubeIcon />
            default:
                return (
                    <CustomImageContainer
                        src={errorImage.src}
                        alt="default"
                        height="25px"
                        width="25px"
                        objectFit="contain"
                    />
                )
        }
    }
    let languageDirection = undefined

    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <RTL direction={languageDirection}>
            <CustomStackFullWidth
                direction="row"
                spacing={3}
                alignItems="center"
                justifyContent={{ xs: 'center' }}
            >
                {global &&
                    global?.social_media?.length > 0 &&
                    global?.social_media?.map((item, index) => {
                        const { name, link } = item
                        return (
                            <IconButton
                                sx={{
                                    padding: '0px',
                                    transition: `all ease 0.5s`,
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    },
                                }}
                                key={index}
                                color="primary"
                                onClick={() => clickHandler(link)}
                            >
                                {iconHandler(name)}
                            </IconButton>
                        )
                    })}
            </CustomStackFullWidth>
        </RTL>
    )
}

SocialLinks.propTypes = {}

export default SocialLinks
