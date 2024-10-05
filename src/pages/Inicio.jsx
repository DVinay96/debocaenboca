import React from "react";
import styled from "styled-components";
import mainImage from '../assets/images/main.jpg'
import grid1 from '../assets/images/grid1.jpg'
import grid2 from '../assets/images/grid2.jpg'
import grid3 from '../assets/images/grid3.jpeg'
import grid4 from '../assets/images/grid4.jpg'
import grid5 from '../assets/images/grid5.jpg'
import grid6 from '../assets/images/grid6.jpeg'
import grid7 from '../assets/images/grid7.jpeg'
import grid8 from '../assets/images/grid8.jpg'
import grid9 from '../assets/images/grid9.jpeg'
import grid10 from '../assets/images/grid10.jpeg'
import grid11 from '../assets/images/grid11.jpg'
import grid12 from '../assets/images/grid12.jpg'



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

const Homepage = () => {
  return (
    <PageContainer>
      <UpperContent>
        <UpperImage src={mainImage}/>
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
          <CTAButton> <a href="/tienda">COMPRAR DE BOCA EN BOCA</a>{" "}</CTAButton>
        </MainBox>
      </MidSection>
      <GridContainer>
      {images.map((src, index) => (
        <ImageItem key={index}>
          <Image src={src} alt={`Image ${index + 1}`} />
        </ImageItem>
      ))}
    </GridContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
`;

const UpperContent = styled.div`
display: flex;
justify-content: space-around;
`;

const UpperImage = styled.img`
  margin-top: 2rem;
  width: 75%;
  height: auto;
  border-radius: 10px; /* Rounding the corners of the image */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* Add shadow to the image */

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;


const CTAButton = styled.button`
  background-color: #ffdd57; /* Highlight color for the button */
  color: black;
  border: none;
  border-radius: 5px;
  padding: 1rem; /* Default padding */
  font-size: 1rem; /* Default font size */
  margin-top: 2%;
  margin-bottom: 2%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Added transform for hover effect */

  &:hover {
    background-color: #ffcc32; /* Darker shade on hover */
    transform: scale(1.05); /* Slightly scale up on hover for effect */
  }

  @media (max-width: 768px) { /* For tablets and smaller screens */
    padding: 12px 25px; /* Adjust padding */
    font-size: 1rem; /* Smaller font size */
  }

  @media (max-width: 480px) { /* For mobile screens */
    padding: 10px 20px; /* Further adjusted padding */
    font-size: .7rem;
  }
`;



const MidSection = styled.section`
  display: flex;
  justify-content: center;
`;

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5vw;
  flex-wrap: wrap;
  background-color: #00000092;
  border-radius: 5px;
  width: 75%;
  margin-top: 3rem;
  margin-bottom: 2rem;
  padding: 0 3rem;
  @media (max-width: 768px) {  /* For tablets and mobile */
    width: 80%;  /* Reduce the width for smaller screens */
  padding: 2%;

  }

  @media (max-width: 480px) {  /* For smaller mobile screens */
    width: 100%;
    padding: 2%;  /* Image takes full width on small devices */
  }
`;

const BoxText = styled.p`
  color: white;
  letter-spacing: 2px;
  word-spacing: 5px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsive grid */
  gap: 15px; /* Gap between grid items */
  padding: 20px;
  margin-left: 2%;
  margin-right: 2%;
`;

const ImageItem = styled.div`
  overflow: hidden; /* Prevent image overflow */
  border-radius: 10px; /* Rounded corners */
  transition: transform 0.3s ease; /* Animation for scaling */
  &:hover {
    transform: scale(1.05); /* Scale up on hover */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px; /* Set a fixed height */
  object-fit: cover; /* Adjust to cover */
  display: block;
  border-radius: 10px;
  transition: opacity 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.5s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;


export default Homepage;
