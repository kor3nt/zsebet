import React, {useEffect, useState} from 'react';
import { FaBars } from 'react-icons/fa'
import {
    Nav, 
    NavbarContainer, 
    NavLogo, 
    LogoColor, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks,
    NavBtn,
    NavBtnLink
} from './NavbarElements';


const Navbar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if(window.scrollY >= 80){
            setScrollNav(true)
        }
        else{
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    return (
        <>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                    <NavLogo to="/">ZSE <LogoColor>BET</LogoColor></NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="home">Home</NavLinks>
                        </NavItem>

                        <NavItem>
                            <NavLinks to="about">O Nas</NavLinks>
                        </NavItem>
                        
                        <NavItem>
                            <NavLinks to="joinus">Dołącz do nas</NavLinks>
                        </NavItem>

                        <NavItem>
                            <NavLinks to="access">Dostęp</NavLinks>
                        </NavItem>
                    </NavMenu>

                    <NavBtn>
                        <NavBtnLink to="/signin">Zaloguj</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;