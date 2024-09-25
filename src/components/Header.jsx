import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderContainer>
      <Nav>
        <StyledLogo>
          <a href="/">
            <img style={{ height: "100%", margin: "1rem" }} src={logo} alt="" />
          </a>
        </StyledLogo>
        <StyledList isOpen={isOpen}>
          <StyledElement>
            <a href="/nosotros">Nosotros</a>{" "}
          </StyledElement>
          <StyledElement>
            <a href="/products">Mezcales</a>{" "}
          </StyledElement>
          <StyledElement>
            <a href="/recetas">Recetas</a>{" "}
          </StyledElement>
          <StyledElement>
            <a href="/tienda">Tienda</a>{" "}
          </StyledElement>
        </StyledList>
        <StyledIcon onClick={() => setIsOpen(!isOpen)}>
          <FaBars></FaBars>
        </StyledIcon>
      </Nav>
    </HeaderContainer>
  );
};

const StyledIcon = styled.button`
  font-size: 2rem;
  color: white;
  background-color: black;
  @media (min-width: 769px) {
    display: none;
  }
`;

const StyledElement = styled.li`
  margin: 2rem;
  display: block;
  :hover {
    color: #ced3ba;
  }
`;

const StyledList = styled.ul`
  font-size: 1.5rem;
  padding: 0.7rem 1rem;
  display: flex;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    flex-direction: column;
    position: absolute;
    top: 180px;
    right: 0;
    background-color: black;
    width: 100%;
    text-align: center;
  }
`;

const StyledLogo = styled.div`
  height: 100%;
`;

const HeaderContainer = styled.header`
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    position: relative;
  }
`;

const Nav = styled.nav`
  max-width: 1440px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

export default Header;
