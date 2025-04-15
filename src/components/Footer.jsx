import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../assets/images/logo.png";
const Footer = () => {
  return (
    <FooterContainer>
      <Content>
        <Logo src={logo} alt="logo" />
        <SocialMediaIcons>
          <SocialMediaIcon
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </SocialMediaIcon>
          <SocialMediaIcon
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <FaInstagram />
          </SocialMediaIcon>
        </SocialMediaIcons>
        <ContactSection>
          <p>
            "Mezcal de Boca en Boca" es una <br /> marca registrada de GCC
            International©
          </p>
          <PoweredBy>Powered by Zuse Technologies 2025</PoweredBy>
        </ContactSection>
      </Content>

      <Content>
        <FooterLink href="">Links de interes</FooterLink>
        <FooterLink href="/contact">Facturación</FooterLink>
        <FooterLink href="/politicadeprivacidad">
          Política de Privacidad
        </FooterLink>
        <FooterLink href="/ESR">
          Construyendo Una Empresa Sustentable
        </FooterLink>
        <FooterLink href="/terms">Términos y condiciones</FooterLink>
      </Content>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #000000;
  color: #fff;
  padding: 100px 3rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 50px 1rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  color: #828282;

  &:nth-child(2) {
    justify-content: center;
    align-items: flex-end;
  }
  @media (max-width: 768px) {
    padding: 0 2rem;
    font-size: 0.6rem;
    &:nth-child(2) {
      align-items: center;
    }
  }
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const FooterLink = styled.a`
  display: block;
  color: #ddd;
  text-decoration: none;
  margin: 0.5rem 0;
  transition: color 0.3s;
  &:hover {
    color: #cc9f22;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialMediaIcon = styled.a`
  color: #ddd;
  font-size: 1rem;
  margin: 1rem 2rem;
  transition: color 0.3s;

  &:hover {
    color: #cc9f22;
  }
`;

const PoweredBy = styled.p`
  font-size: 0.7rem;
`;

const Logo = styled.img`
  height: 150px;
  object-fit: contain;
  margin-bottom: 1.5rem;
`;
