import React from "react";
import styled, { keyframes } from "styled-components";
import mainImage from '../assets/images/main.jpg';
import grid1 from '../assets/images/grid1.jpg';
import grid2 from '../assets/images/grid2.jpg';
import grid3 from '../assets/images/grid3.jpeg';
import grid4 from '../assets/images/grid4.jpg';
import grid5 from '../assets/images/grid5.jpg';
import grid6 from '../assets/images/grid6.jpeg';
import grid7 from '../assets/images/grid7.jpeg';
import grid8 from '../assets/images/grid8.jpg';
import grid9 from '../assets/images/grid9.jpeg';
import grid10 from '../assets/images/grid10.jpeg';
import grid11 from '../assets/images/grid11.jpg';
import grid12 from '../assets/images/grid12.jpg';
import maestroMezcalero from '../assets/images/maestromezcalero.jpeg';

const images = [
  grid1,
  grid2,
  grid3,
  grid4,
  grid5,
  grid6,
  grid7,
  grid8,
  grid9,
  grid10,
  grid11,
  grid12,
];

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
  return (
    <PageContainer>
      <UpperContent>
        <UpperImage src={mainImage} />
      </UpperContent>

      <MidSection>
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
      <GridContainer>
        {images.map((src, index) => (
          <ImageItem key={index}>
            <Image src={src} alt={`Image ${index + 1}`} />
          </ImageItem>
        ))}
      </GridContainer>
      <StoryMezcal>
        <ImageStory src={maestroMezcalero} alt="Maestro Mezcalero"/>
        <StoryText>
          <h1>Espiridion Gaspar Rodríguez</h1>
            <p>Hijo de la Sra. Mardona Rodríguez Monjaraz y del Sr. Teodoro Gaspar Martínez, nació el 8 de Diciembre de 1970, en la comunidad de Santo Tomás Quieri, Distrito de San Carlos Yautepec, Oaxaca. Pertenece a la tercera generación de una familia de maestros mezcaleros. Su padre fue el que le mostró el arte de hacer mezcal y así le está enseñando a su hijo Elmer Gaspar para que no se pierda la tradición. <br/><br/>
              '»Hoy en día me siento orgulloso de ser parte de una familia mezcalera y llevar 15 años de experiencia en hacer el elíxir artesanal que me inspira a llevarlo para Ustedes DE BOCA EN BOCA.«'
            </p>
        </StoryText>
      </StoryMezcal>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  animation: ${fadeIn} 1s ease-in-out;
  width: 100%;
  overflow-x: hidden;
`;

const UpperContent = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
  }
`;

const UpperImage = styled.img`
  
  margin-top: 2rem;
  width: 75%;
  object-fit: cover;
  height: 40vh;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-top: 1rem;
    height: 30vh;
  }

  @media (max-width: 480px) {
    width: 80%;
    height: 25vh;
  }
`;

const CTAButton = styled.button`
  background-color: #ffdd57;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 1rem 2rem;
  font-size: 16px;
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
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 12px;
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
  flex-wrap: wrap;
  background-color: #00000092;
  border-radius: 5px;
  width: 75%;
  margin-bottom: 2rem;
  padding: 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1rem;
  }
`;

const BoxText = styled.p`
  color: white;
  letter-spacing: 2px;
  word-spacing: 5px;
  line-height: 1.6;
  text-align: justify;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 1px;
    word-spacing: 3px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    letter-spacing: 0.5px;
    word-spacing: 2px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  padding: 20px;
  margin: 0 2%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 8px;
    padding: 8px;
  }
`;

const ImageItem = styled.div`
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  border-radius: 10px;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.5s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const StoryMezcal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
`;

const StoryText = styled.div`
  margin: 3rem;
  padding: 2rem;
  font-size: 16px;
  line-height: 2;
  font-weight: 600;

  h1 {
    font-size: 24px;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    margin: 1.5rem;
    padding: 1rem;
    font-size: 14px;
    
    h1 {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    margin: 1rem;
    padding: 0.5rem;
    font-size: 12px;
    
    h1 {
      font-size: 18px;
    }
  }
`;

const ImageStory = styled.img`
  width: 45%;
  height: auto;
  margin: 3rem;
  border-radius: 10px;
  animation: ${fadeInAndZoom} 1s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(148, 148, 149, 0.4);
  }

  @media (max-width: 768px) {
    width: 80%;
    margin: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 90%;
    margin: 1rem;
  }
`;
export default Homepage;
