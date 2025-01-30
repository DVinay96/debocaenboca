import React from 'react';
import styled, { keyframes } from 'styled-components';
import aboutImage from '../assets/images/aboutHeader.jpg';

const reviews = [
  {
    id: 1,
    name: "María González",
    date: "Marzo 2024",
    rating: 5,
    text: "Un mezcal excepcional con un sabor ahumado perfecto. La tradición y calidad se pueden saborear en cada gota."
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    date: "Febrero 2024",
    rating: 5,
    text: "Increíble descubrimiento. El mejor mezcal artesanal que he probado, con un equilibrio perfecto de sabores."
  },
  {
    id: 3,
    name: "Ana Valencia",
    date: "Enero 2024",
    rating: 4,
    text: "Me encantó la complejidad de sabores y el aroma distintivo. Una verdadera joya de Oaxaca."
  },
  {
    id: 4,
    name: "Ana Valencia",
    date: "Enero 2024",
    rating: 4,
    text: "Me encantó la complejidad de sabores y el aroma distintivo. Una verdadera joya de Oaxaca."
  }
];

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

        <ReviewSection>
          <SectionTitle>RESEÑAS</SectionTitle>
          <ReviewContainer>
            {reviews.map(review => (
            <ReviewCard key={review.id}>
              <ReviewerName>{review.name}</ReviewerName>
              <ReviewDate>{review.date}</ReviewDate>
              <Stars>{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</Stars>
              <ReviewText>{review.text}</ReviewText>
      </ReviewCard>
    ))}
  </ReviewContainer>
</ReviewSection>
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

const ReviewSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: calc(100% - 4rem);
  max-width: 1200px;
  text-align: center;
  animation: ${fadeIn} 1.6s ease-in-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: calc(100% - 2rem);
    margin-top: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: rgba(92,14,14);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-top: 1.5rem;
  }
`;

const ReviewCard = styled.div`
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 1.8s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const ReviewerName = styled.h3`
  color: rgba(92,14,14);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ReviewDate = styled.span`
  color: #666;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ReviewText = styled.p`
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0.75rem 0;
  }
`;

const Stars = styled.div`
  color: #FFD700;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;