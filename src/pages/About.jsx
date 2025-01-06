import React from 'react';
import styled, { keyframes } from 'styled-components';
import aboutImage from '../assets/images/grid9.jpeg';

const About = () => {
  return (
    <Wrapper>
      <AboutPageContainer>
        <HeaderImage src={aboutImage} alt="About Us" />
        
        <ContentContainer>
          <Title>Acerca de nuestro mezcal</Title>
          <Paragraph>
            En De Boca en Boca, nos apasiona producir mezcal de la más alta calidad, elaborado con métodos tradicionales transmitidos de generación en generación. Nuestro viaje comenzó en el corazón de Oaxaca, donde nuestros fundadores se inspiraron en la rica cultura y los sabores únicos de la región.
          </Paragraph>
          <Paragraph>
            Nuestro mezcal está elaborado con las mejores plantas de agave, cultivadas durante muchos años bajo el sol mexicano. Cada botella cuenta una historia de dedicación, artesanía y un profundo respeto por la tradición. Creemos en las prácticas sostenibles, el apoyo a las comunidades locales y la preservación del medio ambiente para las generaciones futuras.
          </Paragraph>
          <Paragraph>
            Acompáñanos en este viaje y experimenta el auténtico sabor de México en cada sorbo de nuestro mezcal. Ya sea que sea un aficionado desde hace mucho tiempo o sea nuevo en este exquisito licor, lo invitamos a explorar y disfrutar los distintos sabores que distinguen a nuestro mezcal.
          </Paragraph>
        </ContentContainer>

        <RestaurantSection>
          <SectionTitle>Encuéntranos en:</SectionTitle>
          <RestaurantList>
            {[
              { name: "La Cantina Paradise", location: "Oaxaca, Mexico" },
              { name: "El Agave Azul", location: "Mexico City, Mexico" },
              { name: "Tequila Sunrise", location: "Guadalajara, Mexico" },
              { name: "Mezcaleria El Corazón", location: "Monterrey, Mexico" },
            ].map((restaurant, index) => (
              <RestaurantItem key={index}>
                <RestaurantName>{restaurant.name}</RestaurantName>
                <RestaurantLocation>{restaurant.location}</RestaurantLocation>
              </RestaurantItem>
            ))}
          </RestaurantList>
        </RestaurantSection>
      </AboutPageContainer>
    </Wrapper>
  );
};

export default About;

// Animations
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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const AboutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(145deg, #e8d8c3, #b1a492);
  width: 70%;
  margin: 5%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: rgba(92,14,14);
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #fff;
  margin-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1.4s ease-in-out;
`;

const RestaurantSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: calc(100% - 4rem);
  max-width: 800px;
  text-align: center;
  animation: ${fadeIn} 1.6s ease-in-out;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: rgba(92,14,14);
  margin-bottom: 1.5rem;
`;

const RestaurantList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RestaurantItem = styled.li`
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const RestaurantName = styled.h3`
  font-size: 1.25rem;
  color: #333;
`;

const RestaurantLocation = styled.p`
  font-size: 1rem;
  color: #666;
`;
