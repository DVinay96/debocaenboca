import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/images/logo.png";
import Cart from "../../pages/Cart";

const SideBar = ({ isOpen, setIsOpen, color = "dark" }) => {
  const isCart = color !== "dark";
  
  return (
    <Container color={color} isOpen={isOpen} isCart={isCart}>
      <CloseIcon onClick={() => setIsOpen(false)} color={color} />
      {color === "dark" ? (
        <DarkContainer>
          <Logo src={logo} alt="logo" />
          <a href="tel:5535061263" className="sc-khdDuB cTxoZG">
            Tel: 55 35 06 12 63
          </a>
          <a href="mailto:info@mezcaldebocaenboca.com" className="sc-khdDuB cTxoZG">
            info@mezcaldebocaenboca.com
          </a>
          <p>
            Prolongación 15 SUR A-3 Club de Gold La Huerta San Pedro Cholula,
            Puebla 72760
          </p>
          <Footer>
            © 2025 Mezcal de Boca en Boca. <br />
            Todos los derechos reservados.
          </Footer>
        </DarkContainer>
      ) : (
        <CartWrapper>
          <Cart />
        </CartWrapper>
      )}
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${props => props.isCart ? "100vw" : "25vw"};
  background-color: ${props => props.color === "dark" ? "#000" : "#fff"};
  padding: 2rem;
  box-sizing: border-box;
  z-index: 1;
  transform: ${props => props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.isCart ? "flex-start" : "center"};
  overflow-y: ${props => props.isCart ? "auto" : "initial"};
  
  @media (max-width: 768px) {
    width: ${props => props.isCart ? "100vw" : "90vw"};
  }
`;

const CartWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  overflow-y: auto;
  padding-top: 4rem;
`;

const CloseIcon = styled(IoMdClose)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  fill: ${props => props.color === "dark" ? "#FFF" : "#000"};
  stroke: ${props => props.color === "dark" ? "#FFF" : "#000"};
  z-index: 10;

  &:hover {
    color: ${props => props.theme.primary};
    transition: color 0.3s ease;
  }
`;

const Logo = styled.img`
  height: 150px;
  object-fit: contain;
  margin-bottom: 1.5rem;
`;

const DarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  font-size: 0.9rem;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: #ccc;
  text-align: center;
  width: 100%;
`;