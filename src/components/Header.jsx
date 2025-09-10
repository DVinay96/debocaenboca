import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import logoblanco from "../assets/images/logoblanco.png";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RiMenu5Fill } from "react-icons/ri";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSidebarCar, setIsOpenSidebarCar] = useState(false);
  const [isOpenSidebarContact, setIsOpenSidebarContact] = useState(false);
  const { cart } = useCart();


  return (
    <HeaderContainer>
      <Sidebar
        isOpen={isOpenSidebarCar}
        setIsOpen={setIsOpenSidebarCar}
        color={"white"}
      />
      <Sidebar
        isOpen={isOpenSidebarContact}
        setIsOpen={setIsOpenSidebarContact}
        color={"dark"}
      />
      <StyledLogo>
        <Link to="/">
          <img src={logoblanco} alt="logo" />
        </Link>
      </StyledLogo>
      <Nav>
        <StyledLogoMobile>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </StyledLogoMobile>
        <StyledList isOpen={isOpen}>
          <StyledElement>
            <Link to="/">Inicio</Link>
          </StyledElement>
          <StyledElement>
            <Link to="/nosotros">Nosotros</Link>
          </StyledElement>
          <StyledElement>
            <Link to="/mezcales">Mezcales</Link>
          </StyledElement>
          <StyledElement>
            <Link to="/beers">Cervezas</Link>
          </StyledElement>
          <StyledElement>
            <Link to="/recetas">Recetas</Link>
          </StyledElement>
          <StyledElement>
            <Link to="/tienda">Tienda</Link>
          </StyledElement>
        </StyledList>

        <IconsContainer>
          <div onClick={() => setIsOpenSidebarCar(true)}>
            <CartButtonContainer>
              <CartButton>
                <FaShoppingCart />
              </CartButton>
              {cart.length > 0 && (
                <CartBadge>
                  {cart.reduce(
                    (total, item) => total + (item.quantity || 1),
                    0
                  )}
                </CartBadge>
              )}
            </CartButtonContainer>
          </div>
          <ContactIcon onClick={() => setIsOpenSidebarContact(true)}>
            <RiMenu5Fill />
          </ContactIcon>
          <StyledIcon onClick={() => setIsOpen(!isOpen)}>
            <RiMenu5Fill />
          </StyledIcon>
        </IconsContainer>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

const StyledIcon = styled.button`
  font-size: 1rem;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;

  @media (min-width: 769px) {
    display: none;
  }
`;

const StyledElement = styled.li`
  padding: 0 1.5rem;
  display: block;
  list-style: none;
  transition: transform 0.3s;
  border-left: 1px solid #393837;

  &:first-child {
    border-left: none;
  }

  a {
    position: relative;
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: color 0.3s;
    font-size: 0.9rem;
    width: 100%;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -3px;
      height: 2px;
      width: 0%;
      background: ${(props) => props.theme.primary};
      transition: width 0.4s ease-in-out;
      opacity: 0;
    }

    &:hover {
      color: ${(props) => props.theme.primary};

      &::after {
        width: 100%;
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    border: none;
    text-transform: uppercase;
    padding: 1rem 0.5rem 0 0.5rem;
    a {
      color: black;
    }
  }
`;

const StyledList = styled.ul`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 0;
    background-color: white;
    width: 100vw;
    text-align: left;
    color: black;
    padding: 1rem;
    box-sizing: border-box;
    z-index: 2;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
    transform: ${(props) =>
      props.isOpen ? "translateY(0)" : "translateY(-10px)"};
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
  }
`;

const StyledLogo = styled.div`
  margin-top: 2rem;
  height: 85px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  
  img {
    height: 85px;
    width: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: 0;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border-radius: 50%;
  padding: 0.2rem;
  font-size: 0.8rem;
  min-width: 20px;
  text-align: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartButtonContainer = styled.div`
  position: relative;
`;

const CartButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    svg {
      color: ${(props) => props.theme.primary};
    }
  }

  @media (max-width: 768px) {
    svg {
      color: black;
    }
  }
`;

const HeaderContainer = styled.header`
  position: absolute;
  width: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  z-index: 10;
  @media (max-width: 768px) {
    background-color: white;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    font-size: 2rem;
    svg {
      color: black;
      height: 1rem;
      width: 1rem;
    }
  }
`;

const ContactIcon = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 2rem;

  &:hover {
    color: ${(props) => props.theme.primary};
    transform: scale(1.1);
    transition: transform 0.3s;
  }

  @media (max-width: 769px) {
    display: none;
  }
`;

const StyledLogoMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    
    img {
      height: 50px;
      width: auto;
      object-fit: contain;
      margin: 0 auto;
      display: block;
    }
  }
`;