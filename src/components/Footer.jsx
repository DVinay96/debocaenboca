import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSectionLeft>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink href="/contact">Facturación</FooterLink>
          <FooterLink href="/privacy">Política de Privacidad</FooterLink>
          <FooterLink href="/terms">Aviso Legal</FooterLink>
        </FooterSectionLeft>

        <FooterSectionRight>
          <FooterTitle>Contáctanos</FooterTitle>
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
            <FooterLink href="tel:5535061263"> Tel: 55 35 06 12 63</FooterLink>
            <FooterLink href="mailto:info@mezcaldebocaenboca.com">
              info@mezcaldebocaenboca.com
            </FooterLink>
            <FooterLink>
              PROLONGACION 15 SUR A-3 CLUB DE GOLF LA HUERTA SAN PEDRO CHOLULA,
              PUEBLA 72760
            </FooterLink>
          </ContactSection>
        </FooterSectionRight>
      </FooterContent>

      <FooterBottom>Zuse Technologies 2024</FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #000000;
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const ContactSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const FooterSectionLeft = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 1rem;
`;

const FooterSectionRight = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 1rem;
`;

const FooterTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  border-bottom: 2px solid #fff;
  padding-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  display: block;
  color: #ddd;
  text-decoration: none;
  margin: 0.5rem 0;
  transition: color 0.3s;
  &:hover {
    color: #f39c12;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialMediaIcon = styled.a`
  color: #ddd;
  font-size: 1.5rem;
  margin: 1rem 2rem;
  transition: color 0.3s;

  &:hover {
    color: #f39c12;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #444;
  padding-top: 1rem;
  color: white;
`;

export default Footer;