import React from 'react';
import styled from 'styled-components';
import aboutImage from '../assets/images/grid9.jpeg';

const About = () => {
  return (
    <Wrapper>
      <AboutPageContainer>
        <HeaderImage src={aboutImage} alt="About Us" />
        
        <ContentContainer>
          <Title>Acerca de nuestro mezcal</Title>
          <Paragraph>

          En De Boca en Boca, nos apasiona producir mezcal de la más alta calidad, elaborado con métodos tradicionales transmitidos de generación en generación. Nuestro viaje comenzó en el corazón de Oaxaca, donde nuestros fundadores se inspiraron en la rica cultura y los sabores únicos de la región.          </Paragraph>
          <Paragraph>
          Nuestro mezcal está elaborado con las mejores plantas de agave, cultivadas durante muchos años bajo el sol mexicano. Cada botella cuenta una historia de dedicación, artesanía y un profundo respeto por la tradición. Creemos en las prácticas sostenibles, el apoyo a las comunidades locales y la preservación del medio ambiente para las generaciones futuras.          </Paragraph>
          <Paragraph>
          Acompáñanos en este viaje y experimenta el auténtico sabor de México en cada sorbo de nuestro mezcal. Ya sea que sea un aficionado desde hace mucho tiempo o sea nuevo en este exquisito licor, lo invitamos a explorar y disfrutar los distintos sabores que distinguen a nuestro mezcal.
          </Paragraph>
        </ContentContainer>

        <RestaurantSection>
          <SectionTitle>Encuentranos en:</SectionTitle>
          <RestaurantList>
            <RestaurantItem>
              <RestaurantName>La Cantina Paradise</RestaurantName>
              <RestaurantLocation>Oaxaca, Mexico</RestaurantLocation>
            </RestaurantItem>
            <RestaurantItem>
              <RestaurantName>El Agave Azul</RestaurantName>
              <RestaurantLocation>Mexico City, Mexico</RestaurantLocation>
            </RestaurantItem>
            <RestaurantItem>
              <RestaurantName>Tequila Sunrise</RestaurantName>
              <RestaurantLocation>Guadalajara, Mexico</RestaurantLocation>
            </RestaurantItem>
            <RestaurantItem>
              <RestaurantName>Mezcaleria El Corazón</RestaurantName>
              <RestaurantLocation>Monterrey, Mexico</RestaurantLocation>
            </RestaurantItem>
          </RestaurantList>
        </RestaurantSection>
      </AboutPageContainer>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AboutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #b1a492; 
  width: 70%;
  margin: 5%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  border-radius: 10px; 
`;

const HeaderImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
  border-radius: 10px; 
`;

const ContentContainer = styled.div`
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #000000; 
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: white;
  margin-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 5px; 
`;

const RestaurantSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(100% - 4rem);
  max-width: 800px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #cc9f22;
  margin-bottom: 1.5rem;
`;

const RestaurantList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RestaurantItem = styled.li`
  margin-bottom: 1.5rem;
`;

const RestaurantName = styled.h3`
  font-size: 1.25rem;
  color: #333;
`;

const RestaurantLocation = styled.p`
  font-size: 1rem;
  color: #666;
`;
