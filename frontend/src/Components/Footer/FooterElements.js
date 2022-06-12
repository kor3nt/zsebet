import styled from 'styled-components'
import {Link as LinkS} from 'react-scroll'

export const FooterContainer = styled.footer`
    background-color: #1f1f1f;
`;

export const FooterWrap = styled.div`
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`;

export const SocialMedia = styled.section`
    max-width: 1000px;
    width: 100%;

`;

export const SocialMediaWraper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 40px auto 0 auto;
    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`;

export const SocialMediaLogo = styled(LinkS)`
    color: #fff;
    justify-content: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`;

export const WebsiteRights = styled.small`
    color: #fff;
    margin-bottom: 16px;
`;

export const WebsiteCreators = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

export const WebsiteText = styled.p`
    color: #fff;
`;

export const FooterLinkOther = styled.a`
    color: #ffbf00;
    text-decoration: none;
    
    &:hover{
        color: #fff;
        text-decoration: underline;
    }
`;

export const SocialMediaSpan = styled.span`
    color: #ffbf00;
`