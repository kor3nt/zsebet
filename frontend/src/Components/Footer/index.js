import React from 'react'
import { 
    FooterContainer, 
    FooterWrap,
    SocialMedia,
    SocialMediaWraper,
    SocialMediaLogo,
    WebsiteRights,
    WebsiteCreators,
    FooterLinkOther,
    WebsiteText,
    SocialMediaSpan
} from './FooterElements'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>

                <SocialMedia>
                    <SocialMediaWraper>
                        <SocialMediaLogo to='home'>ZSE<SocialMediaSpan>BET</SocialMediaSpan></SocialMediaLogo>
                        <WebsiteRights>ZSEBET &copy; {new Date().getFullYear()} Wszelkie prawa zastrzeżone.</WebsiteRights>
                        <WebsiteCreators>
                            <WebsiteText>Created by: <FooterLinkOther href="https://www.facebook.com/DuolyStudio" target="_blank">Duoly</FooterLinkOther></WebsiteText>
                        </WebsiteCreators>
                    </SocialMediaWraper>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer