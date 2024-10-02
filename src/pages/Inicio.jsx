import React from "react";
import styled from "styled-components";
import mainImage from '../assets/images/main.jpg'

const Homepage = () => {
  return (
    <PageContainer>
      <UpperContent>
        <UpperImage src={mainImage}/>
      </UpperContent>

      <LowerSection>
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
        </MainBox>
      </LowerSection>
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
  height: auto;  /* Maintain the aspect ratio */

  @media (max-width: 768px) {  /* For tablets and mobile */
    width: 80%;  /* Reduce the width for smaller screens */
  }

  @media (max-width: 480px) {  /* For smaller mobile screens */
    width: 100%;  /* Image takes full width on small devices */
  }
`;

const LowerSection = styled.section`
  display: flex;
  justify-content: center;
`;

const MainBox = styled.div`
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

export default Homepage;
