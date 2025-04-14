import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import logo from "../assets/images/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { GiAgave } from "react-icons/gi";

const Header = ({ cart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const cartItemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <HeaderContainer scrolled={isScrolled}>
      <HeaderInner>
        <LogoContainer>
          <Link to="/" onClick={closeMenu}>
            <LogoImage src={logo} alt="De Boca en Boca" />
          </Link>
        </LogoContainer>

        <NavContainer isOpen={isMenuOpen}>
          <NavLinks>
            <NavItem isActive={activeLink === "/nosotros"}>
              <NavItemLink to="/nosotros" onClick={closeMenu}>
                Nosotros
                <NavItemHighlight />
              </NavItemLink>
            </NavItem>

            <NavItem isActive={activeLink === "/mezcales"}>
              <NavItemLink to="/mezcales" onClick={closeMenu}>
                Mezcales
                <NavItemHighlight />
              </NavItemLink>
            </NavItem>

            <NavItem isActive={activeLink === "/recetas"}>
              <NavItemLink to="/recetas" onClick={closeMenu}>
                Recetas
                <NavItemHighlight />
              </NavItemLink>
            </NavItem>

            <NavItem isActive={activeLink === "/tienda"}>
              <NavItemLink to="/tienda" onClick={closeMenu}>
                Tienda
                <NavItemHighlight />
              </NavItemLink>
            </NavItem>
          </NavLinks>
          
          <MobileCloseButton onClick={() => setIsMenuOpen(false)}>
            <FaTimes />
          </MobileCloseButton>
          
          <MobileBottomInfo>
            <AgaveIconWrapper>
              <GiAgave />
            </AgaveIconWrapper>
            <MobileInfoText>Mezcal Artesanal de Oaxaca</MobileInfoText>
          </MobileBottomInfo>
        </NavContainer>

        <HeaderActions>

          <CartButton to="/carrito" onClick={closeMenu}>
            <FaShoppingCart />
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartButton>

          <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars />
          </MenuToggle>
        </HeaderActions>
      </HeaderInner>
    </HeaderContainer>
  );
};

// Animations


const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${props => props.scrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  box-shadow: ${props => props.scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'};
  height: ${props => props.scrolled ? '70px' : '90px'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(204, 159, 34, 0), 
      rgba(204, 159, 34, 0.8), 
      rgba(204, 159, 34, 0));
  }
`;

const HeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1001;
`;

const LogoImage = styled.img`
  height: 80%;
  max-height: 70px;
  transition: all 0.3s ease;
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    justify-content: center;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    z-index: 1000;
    box-shadow: ${({ isOpen }) => isOpen ? '-5px 0 25px rgba(0, 0, 0, 0.5)' : 'none'};
    padding: 2rem;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const NavItem = styled.li`
  margin: 0 1.2rem;
  position: relative;
  
  ${props => props.isActive && css`
    & > a {
      color: #cc9f22;
      
      &::after {
        width: 100%;
      }
    }
  `}
  
  @media (max-width: 992px) {
    margin: 1.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const NavItemHighlight = styled.span`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #cc9f22;
  transition: width 0.3s ease;
`;

const NavItemLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
  display: inline-block;
  
  &:hover {
    color: #cc9f22;
    
    ${NavItemHighlight} {
      width: 100%;
    }
  }
  
  @media (max-width: 992px) {
    font-size: 1.2rem;
    padding: 0.5rem;
    display: block;
    
    &:hover ${NavItemHighlight} {
      width: 30%;
      left: 35%;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  z-index: 1001;
`;

const ActionButton = css`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    color: #cc9f22;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    margin-left: 1rem;
  }
`;

const SearchButton = styled.button`
  ${ActionButton}
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CartButton = styled(NavLink)`
  ${ActionButton}
  position: relative;
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #5c0e0e;
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  animation: ${pulse} 2s infinite;
`;

const MenuToggle = styled.button`
  ${ActionButton}
  display: none;
  font-size: 1.4rem;
  
  @media (max-width: 992px) {
    display: flex;
  }
`;

const MobileCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.4rem;
  display: none;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #cc9f22;
  }
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const MobileBottomInfo = styled.div`
  display: none;
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #777;
  font-size: 0.9rem;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const AgaveIconWrapper = styled.div`
  color: #cc9f22;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const MobileInfoText = styled.p`
  margin: 0;
  font-style: italic;
`;

export default Header;