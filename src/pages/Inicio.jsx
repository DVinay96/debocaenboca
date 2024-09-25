import React from "react";
import styled from "styled-components";
import mainLogo from "../assets/images/mainlogo.png";

const Homepage = () => {
  return (
    <PageContainer>
      <UpperContent>
        <UpperTitle>'El mezcal se toma </UpperTitle>
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
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const UpperTitle = styled.h1``;

const LowerSection = styled.section`
  padding: 0 2rem;
`;

const MainBox = styled.div`
  font-size: 1.5vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10% 20% 5% 20%;
  padding: 2rem;
  background-color: #00000092;
  border-radius: 5px;
`;

const BoxText = styled.p`
  color: white;
`;

export default Homepage;
