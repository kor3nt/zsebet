import React, {useState} from 'react'
import Video from '../../Img/video.mp4'
import { 
    HeroContainer, 
    HeroBg, 
    VideoBg, 
    HeroContent, 
    HeroH1, 
    HeroP, 
    HeroBtnWrapper, 
    ArrowForward, 
    ArrowRight,
    Button 
} from './HeroElements';

//https://www.pexels.com/pl-pl/szukaj/videos/bet%20website/

const HeroSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'></VideoBg>
            </HeroBg>
            <HeroContent>
                <HeroH1>Obstawianie nie było jeszcze takie proste</HeroH1>
                <HeroP>Utwórz nowe konto już teraz i odbierz 1000 ZSE COINSÓW.</HeroP>
                <HeroBtnWrapper>
                    <Button to="/signup" onMouseEnter={onHover} onMouseLeave={onHover}>Utwórz konto {hover ? <ArrowForward/> : <ArrowRight/>}</Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection;