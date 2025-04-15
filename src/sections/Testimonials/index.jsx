import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TopTitle from "../../components/TopTitle";
import Subtitle from "../../components/Subtitle";

const testimonials = [
  {
    name: "Carlos M.",
    message: "Una experiencia única, el mezcal más suave que he probado.",
  },
  {
    name: "Luisa F.",
    message: "Me enamoré del sabor ahumado, se nota el trabajo artesanal.",
  },
  {
    name: "Javier R.",
    message: "Perfecto para compartir. ¡Felicidades por este gran producto!",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <Container>
        <Texts>
          <TopTitle>Lo que dicen</TopTitle>
          <Subtitle size="XL">Reseñas</Subtitle>
        </Texts>

        <Carousel>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} active={index === current}>
              <Message>"{testimonial.message}"</Message>
              <Author>- {testimonial.name}</Author>
            </TestimonialCard>
          ))}
        </Carousel>

        <Dots>
          {testimonials.map((_, index) => (
            <Dot
              key={index}
              active={index === current}
              onClick={() => setCurrent(index)}
            />
          ))}
        </Dots>
      </Container>
    </Section>
  );
};

export default Testimonials;

const Section = styled.section`
  margin: 100px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  width: 75%;
`;

const Texts = styled.div`
  margin-bottom: 40px;
`;

const Carousel = styled.div`
  position: relative;
  height: 180px;
  width: 100%;
  overflow: hidden;
`;

const TestimonialCard = styled.div`
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.8s ease;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Message = styled.p`
  font-style: italic;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Author = styled.p`
  margin-top: 1rem;
  font-weight: bold;
  color: #cc9f22;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#cc9f22" : "#ccc")};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
