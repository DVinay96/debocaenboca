import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import mainImage from "../assets/images/main.jpg";
import AgeVerifyModal from "../components/AgeVerifyModal";
import Button from "../components/Button";
import TopTitle from "../components/TopTitle";
import Title from "../components/Title";
import Bottle from "../sections/bottle";
import hero1 from "../assets/images/hero1.png";
import hero2 from "../assets/images/hero2.png";
import hero3 from "../assets/images/hero3.png";
import Subtitle from "../components/Subtitle";
import Store from "../sections/Store";
import Testimonials from "../sections/Testimonials";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// New animation for dropdown
const slideDown = keyframes`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: auto;
  }
`;

const Homepage = () => {
  const [isVerified, setIsVerified] = useState(true);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const nosotrosText = "Fundada en 2021 en el corazón de Oaxaca, De Boca en Boca es una marca de mezcal mexicano de creación artesanal. Nos dedicamos a producir mezcal de la más alta calidad, utilizando métodos ancestrales y seleccionando meticulosamente agaves silvestres y cultivados. Cada botella refleja la pasión y dedicación de nuestros maestros mezcaleros, combinando tradición e innovación. Comprometidos con la sostenibilidad y la comunidad local, trabajamos con agricultores y artesanos para promover prácticas responsables. Descubre De Boca en Boca y celebra el auténtico espíritu del mezcal mexicano.";
  
  const recetasText = "Espiridon Gaspar Rodriguez, hijo de la Sra. Mardona Rodríguez Monjaraz y del Sr. Teodoro Gaspar Martínez, nació el 8 de Diciembre de 1970, en la comunidad de Santo Tomás Quieri, Distrito de San Carlos Yautepec, Oaxaca. Pertenece a la tercera generación de una familia de maestros mezcaleros. Su padre fue el que le mostró el arte de hacer mezcal y así le está enseñando a su hijo Elmer Gaspar para que no se pierda la tradición. 'Hoy en día me siento orgulloso de ser parte de una familia mezcalera y llevar 15 años de experiencia en hacer el elíxir artesanal que me inspira a llevarlo para Ustedes DE BOCA EN BOCA.';";

  useEffect(() => {
    const verified = localStorage.getItem("isVerified");
    if (verified === "true") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  useEffect(() => {
    if (!isVerified) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";

      const preventScroll = (e) => e.preventDefault();
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.removeEventListener("touchmove", preventScroll);
      };
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [isVerified]);

  return (
    <PageContainer>
      {!isVerified && (
        <AgeVerifyModal
          onVerify={(verified) => {
            setIsVerified(verified);
            localStorage.setItem("isVerified", verified);
          }}
        />
      )}
      <UpperContent>
        <GradientOverlay />
        <UpperContain>
          <TopTitle>Timeless flavor</TopTitle>
          <Title size="XL">No lo bebas... Bésalo</Title>
          <Link to="mezcales">
            <Button icon inverted>
              Explorar
            </Button>
          </Link>
          <ButtomTittleText>Porque los secretos siempre van DE BOCA EN BOCA...todos quieren saberlo pero no todos pueden tenerlo...</ButtomTittleText>
        </UpperContain>
      </UpperContent>

      <Bottle />

      <Hero>
        <HeroItem onClick={() => setActiveDropdown(activeDropdown === 'nosotros' ? null : 'nosotros')}>
          <img src={hero2} alt="Nosotros" />
          <HeroText>
            <TopTitle>Nosotros</TopTitle>
            <Subtitle color="white" align="left">
              Maestros del mezcal artesanal
            </Subtitle>
          </HeroText>
          {activeDropdown === 'nosotros' && (
            <DropdownContent>
              <p>{nosotrosText}</p>
            </DropdownContent>
          )}
        </HeroItem>
        <HeroItem onClick={() => setActiveDropdown(activeDropdown === 'recetas' ? null : 'recetas')}>
          <img src={hero1} alt="Recetas" />
          <HeroText>
            <TopTitle>Recetas</TopTitle>
            <Subtitle color="white" align="left">
              Sabor que inspira rituales
            </Subtitle>
          </HeroText>
          {activeDropdown === 'recetas' && (
            <DropdownContent>
              <p>{recetasText}</p>
            </DropdownContent>
          )}
        </HeroItem>
      </Hero>
      <Store />
      <Hero2>
        <img src={hero3} alt="" />
      </Hero2>
      <Testimonials />
    </PageContainer>
  );
};

export default Homepage;

// Styled Components
const PageContainer = styled.div`
  color: #333;
  animation: ${fadeIn} 1s ease-in-out;
  width: 100vw;
`;

const UpperContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
  background-image: url(${mainImage});
  background-size: cover;
  background-position: center;
`;

const UpperContain = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  );
  pointer-events: none;
  z-index: 1;
`;

const Hero = styled.div`
  display: flex;
  width: 100vw;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeroItem = styled.div`
  width: 50%;
  height: 50vh;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeroText = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  font-size: 2rem;
  animation: ${fadeIn} 1s ease-in-out;
  text-align: left !important;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Dropdown styled component
const DropdownContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  animation: ${slideDown} 0.3s ease-in-out;
  z-index: 5;
  
  p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    color: white;
    max-width: 90%;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    height: 15px;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
  }
`;

const Hero2 = styled.div`
  width: 100vw;
  height: 40vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const ButtomTittleText = styled.div`
margin-top: 3rem;
font-size: 1.5rem
`
