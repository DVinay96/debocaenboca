import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import logo from "../assets/images/logo.png";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({cart}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderContainer>
      <Nav>
        <StyledLogo>
          <Link to="/">
            <img style={{ height: "100%", margin: "1rem" }} src={logo} alt="logo" />
          </Link>
        </StyledLogo>
        <StyledList isOpen={isOpen}>
          <StyledElement>
            <Link to="/nosotros">Nosotros</Link>
          </StyledElement>
          <StyledElement>
            <Link to="/mezcales">Mezcales</Link>
          </StyledElement>
          <StyledElement>
            <Link to="/recetas">Recetas</Link>
          </StyledElement>
          <StyledElement>
            <Link to="/tienda">Tienda</Link>
          </StyledElement>
        </StyledList>
        <NavLink to="/carrito">
  <CartButtonContainer>
    <CartButton>
      <FaShoppingCart />
    </CartButton>
    {cart.length > 0 && (
      <CartBadge>
        {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
      </CartBadge>
    )}
  </CartButtonContainer>
</NavLink>
        <StyledIcon onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </StyledIcon>
      </Nav>
    </HeaderContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledIcon = styled.button`
  font-size: 2rem;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const StyledElement = styled.li`
  margin: 2rem;
  display: block;
  list-style: none;
  transition: color 0.3s, transform 0.3s;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #cc9f22;
      text-shadow: 0px 0px 10px #cc9f22;
    }
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledList = styled.ul`
  font-size: 1.5rem;
  padding: 0.7rem 1rem;
  display: flex;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    flex-direction: column;
    position: absolute;
    top: 180px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
    width: 100%;
    text-align: center;
    border-top: 2px solid #cc9f22;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.7);
    z-index: 50;
  }
`;

const StyledLogo = styled.div`
  height: 100%;
  z-index: 1002;

`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4d4d;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  min-width: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CartButtonContainer = styled.div`
  position: relative;
`;

const CartButton = styled.button`
  background-color: #cc9f22;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  z-index: 1001; // Add z-index

  &:hover {
    background-color: #a67c14;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    position: fixed; 
    bottom: 20px;
    right: 20px;
    display: flex;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }
`;

const HeaderContainer = styled.header`
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;  
  border-bottom: 2px solid #cc9f22;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    position: relative;
  }
`;

const Nav = styled.nav`
  max-width: 1440px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

export default Header;
