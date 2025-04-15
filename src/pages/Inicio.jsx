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

const fadeInAndZoom = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Homepage = () => {
  const [isVerified, setIsVerified] = useState(true);

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
      // Bloquear scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";

      // Evitar scroll táctil
      const preventScroll = (e) => e.preventDefault();
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        // Habilitar scroll de nuevo
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.removeEventListener("touchmove", preventScroll);
      };
    } else {
      // Asegura que esté habilitado si se desactiva isVerified
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
          <Title size="XL">special release</Title>
          <Link to="mezcales">
            <Button icon inverted>
              Explorar
            </Button>
          </Link>
        </UpperContain>
      </UpperContent>

      <Bottle />

      <Hero>
        <a href="/nosotros">
          <img src={hero2} alt="" />
          <HeroText>
            <TopTitle>Nosotros</TopTitle>
            <Subtitle color="white" align="left">
              Maestros del mezcal artesanal
            </Subtitle>
          </HeroText>
        </a>
        <a href="/recetas">
          <img src={hero1} alt="" />
          <HeroText>
            <TopTitle>Recetas</TopTitle>
            <Subtitle color="white" align="left">
              Sabor que inspira rituales
            </Subtitle>
          </HeroText>
        </a>
      </Hero>
      <Store />
      <Hero2>
        <img src={hero3} alt="" />
      </Hero2>
      <Testimonials />

      {/*  <MidSection>
        <MainBox>
          <BoxText>
            Fundada en 2021 en el corazón de Oaxaca, De Boca en Boca es una
            marca de mezcal mexicano de creación artesanal. Nos dedicamos a
            producir mezcal de la más alta calidad, utilizando métodos
            ancestrales y seleccionando meticulosamente agaves silvestres y
            cultivados. Cada botella refleja la pasión y dedicación de nuestros
            maestros mezcaleros, combinando tradición e innovación.
            Comprometidos con la sostenibilidad y la comunidad local, trabajamos
            con agricultores y artesanos para promover prácticas responsables.
            Descubre De Boca en Boca y celebra el auténtico espíritu del mezcal
            mexicano.
          </BoxText>
          <CTAButton>
            <a href="/tienda">COMPRAR DE BOCA EN BOCA</a>
          </CTAButton>
        </MainBox>
      </MidSection>

      <StoryMezcal>
        <ImageStory src={maestroMezcalero} alt="Maestro Mezcalero" />
        <StoryText>
          <h1>Espiridion Gaspar Rodríguez</h1>
          <p>
            Hijo de la Sra. Mardona Rodríguez Monjaraz y del Sr. Teodoro Gaspar
            Martínez, nació el 8 de Diciembre de 1970, en la comunidad de Santo
            Tomás Quieri, Distrito de San Carlos Yautepec, Oaxaca. Pertenece a
            la tercera generación de una familia de maestros mezcaleros. Su
            padre fue el que le mostró el arte de hacer mezcal y así le está
            enseñando a su hijo Elmer Gaspar para que no se pierda la tradición.{" "}
            <br />
            <br />
            '»Hoy en día me siento orgulloso de ser parte de una familia
            mezcalera y llevar 15 años de experiencia en hacer el elíxir
            artesanal que me inspira a llevarlo para Ustedes DE BOCA EN BOCA.«'
          </p>
        </StoryText>
      </StoryMezcal> */}
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

const CTAButton = styled.button`
  background-color: #ffdd57;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1rem;
  margin-top: 2%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #ffcc32;
    transform: scale(1.1);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.7rem;
  }
`;

const MidSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5vw;
  flex-wrap: wrap;
  background-color: #00000092;
  border-radius: 5px;
  width: 75%;
  margin-bottom: 2rem;
  padding: 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 80%;
    padding: 2%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 2%;
  }
`;

const BoxText = styled.p`
  color: white;
  letter-spacing: 2px;
  word-spacing: 5px;
  line-height: 1.6;
  text-align: justify;
`;

const StoryMezcal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.3);
`;

const StoryText = styled.div`
  margin: 3rem;
  padding: 2rem;
  font-size: 1.5vw;
  line-height: 2;
  font-weight: 600;
`;

const ImageStory = styled.img`
  width: 100%;
  height: 80vh;
  margin: 3rem;
  border-radius: 10px;
  animation: ${fadeInAndZoom} 1s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(148, 148, 149, 0.4);
  }
`;

const Hero = styled.div`
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  a {
    width: 50%;
    height: 50vh;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    a {
      width: 100%;
      height: 50vh;
    }
  }
`;

const HeroText = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;

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
