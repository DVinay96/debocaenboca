import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import aboutImage from '../assets/images/aboutHeader.jpg';
import { FaStar, FaStarHalfAlt, FaQuoteLeft, FaQuoteRight, FaGlassWhiskey } from 'react-icons/fa';
import { GiAgave } from 'react-icons/gi';
import MezcalStory from '../components/Story';

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      root: null, 
      threshold: 0.2,
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

const reviews = [
  {
    id: 1,
    name: "María González",
    location: "Puebla, Puebla",
    rating: 5,
    text: "Un mezcal excepcional con un sabor ahumado perfecto. La tradición y calidad se pueden saborear en cada gota."
  },
  {
    id: 2,
    name: "Octavio Bello",
    location: "CDMX, México",
    rating: 5,
    text: "No había tomado mezcal, sin embargo al probar este la suavidad y los aromas, los sabores cítricos y ahumados son increíbles."
  },
  {
    id: 3,
    name: "Ana Valencia",
    location: "Oaxaca, Oaxaca",
    rating: 4.7,
    text: "Me encantó la complejidad de sabores y el aroma distintivo. Una verdadera joya de Oaxaca."
  },
  {
    id: 4,
    name: "Carlos Ruiz",
    location: "Oaxaca, Oaxaca",
    rating: 5,
    text: "Me encantó la complejidad de sabores y el aroma distintivo. Una verdadera joya de Oaxaca."
  },
  {
    id: 5,
    name: "Erica Morales",
    location: "Celaya, Guanajuato",
    rating: 4.5,
    text: "Excelentes notas de cata, un increíble olor, sabor y textura del ensamble."
  },
  {
    id: 6,
    name: "Juan Carlos Morales",
    location: "Puebla, Puebla",
    rating: 5,
    text: "Increíbles notas cítricas que dejan ricos matices en la boca al probarlo."
  }
];

// Core values for the Values section
const values = [
  {
    id: 1,
    icon: <GiAgave />,
    title: "Tradición",
    description: "Honramos los métodos ancestrales de producción del mezcal transmitidos de generación en generación."
  },
  {
    id: 2,
    icon: <FaGlassWhiskey />,
    title: "Artesanía",
    description: "Cada botella es resultado de un meticuloso proceso artesanal que garantiza la más alta calidad."
  },
  {
    id: 3,
    icon: <GiAgave style={{ transform: 'rotate(45deg)' }} />,
    title: "Sostenibilidad",
    description: "Nos comprometemos con prácticas responsables que protegen el medio ambiente y apoyan a nuestras comunidades."
  }
];

const About = () => {
  const [activeReviewsIndex, setActiveReviewsIndex] = useState(0);
  const reviewsPerPage = window.innerWidth > 768 ? 3 : 1;
  const pagesCount = Math.ceil(reviews.length / reviewsPerPage);

  const [heroRef, heroVisible] = useIntersectionObserver();
  const [storyRef, storyVisible] = useIntersectionObserver();
  const [valuesRef, valuesVisible] = useIntersectionObserver();
  const [reviewsRef, reviewsVisible] = useIntersectionObserver();

  const handleReviewPagination = (index) => {
    setActiveReviewsIndex(index);
  };

  const getCurrentReviews = () => {
    const start = activeReviewsIndex * reviewsPerPage;
    const end = start + reviewsPerPage;
    return reviews.slice(start, end);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} style={{ opacity: 0.3 }} />);
    }
    
    return stars;
  };

  return (
    <PageContainer>
      <HeroSection ref={heroRef} className={heroVisible ? 'visible' : ''}>
        <HeroImageWrapper>
          <HeroImage src={aboutImage} alt="De Boca en Boca Mezcal" />
          <HeroOverlay />
          <HeroContent>
            <HeroTitle>Nuestra Historia</HeroTitle>
            <HeroSubtitle>
              Tradición, pasión y la esencia de Oaxaca en cada gota
            </HeroSubtitle>
          </HeroContent>
        </HeroImageWrapper>
      </HeroSection>

      <StorySection ref={storyRef} className={storyVisible ? 'visible' : ''}>
        <SectionTitleWrapper>
          <SectionIcon><GiAgave /></SectionIcon>
          <SectionTitle>Acerca de Nuestro Mezcal</SectionTitle>
          <SectionDivider />
        </SectionTitleWrapper>
        
        <StoryContent>
          <StoryParagraph>
            En <StoryHighlight>De Boca en Boca</StoryHighlight>, nos apasiona producir mezcal de la más alta calidad, elaborado con métodos tradicionales transmitidos de generación en generación. Nuestro viaje comenzó en el corazón de Oaxaca, donde nuestros fundadores se inspiraron en la rica cultura y los sabores únicos de la región.
          </StoryParagraph>
          
          <StoryParagraph>
            Nuestro mezcal está elaborado con las mejores plantas de agave, cultivadas durante muchos años bajo el sol mexicano. Cada botella cuenta una historia de dedicación, artesanía y un profundo respeto por la tradición. Creemos en las prácticas sostenibles, el apoyo a las comunidades locales y la preservación del medio ambiente para las generaciones futuras.
          </StoryParagraph>
          
          <StoryParagraph>
            Acompáñanos en este viaje y experimenta el auténtico sabor de México en cada sorbo de nuestro mezcal. Seas un aficionado desde hace mucho tiempo o seas nuevo en este exquisito destilado, te invitamos invitamos a explorar y disfrutar los distintos sabores que distinguen a nuestro mezcal.
          </StoryParagraph>        
        </StoryContent>
      </StorySection>
      

      <ValuesSection ref={valuesRef} className={valuesVisible ? 'visible' : ''}>
        <SectionTitleWrapper>
          <SectionIcon style={{ transform: 'rotate(45deg)' }}><GiAgave /></SectionIcon>
          <SectionTitle>Nuestros Valores</SectionTitle>
          <SectionDivider />
        </SectionTitleWrapper>
        
        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard key={value.id} delay={index * 0.2}>
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
        <MezcalStory/>

      </ValuesSection>

      <ReviewsSection ref={reviewsRef} className={reviewsVisible ? 'visible' : ''}>
        <SectionTitleWrapper>
          <SectionIcon><FaGlassWhiskey /></SectionIcon>
          <SectionTitle>Opiniones de Nuestros Clientes</SectionTitle>
          <SectionDivider />
        </SectionTitleWrapper>
        
        <ReviewsGrid>
          {getCurrentReviews().map((review, index) => (
            <ReviewCard key={review.id} delay={index * 0.2}>
              <QuoteIconLeft>
                <FaQuoteLeft />
              </QuoteIconLeft>
              
              <ReviewText>{review.text}</ReviewText>
              
              <QuoteIconRight>
                <FaQuoteRight />
              </QuoteIconRight>
              
              <ReviewerInfo>
                <StarsContainer>
                  {renderStars(review.rating)}
                </StarsContainer>
                <ReviewerName>{review.name}</ReviewerName>
                <ReviewerLocation>{review.location}</ReviewerLocation>
              </ReviewerInfo>
            </ReviewCard>
          ))}
        </ReviewsGrid>
        
        <PaginationContainer>
          {Array.from({ length: pagesCount }, (_, i) => (
            <PaginationDot 
              key={i} 
              active={i === activeReviewsIndex}
              onClick={() => handleReviewPagination(i)}
            />
          ))}
        </PaginationContainer>
      </ReviewsSection>
    </PageContainer>
  );
};

export default About;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const PageContainer = styled.div`

  width: 100%;
  background-color: #f8f8f5;
`;

// Hero Section
const HeroSection = styled.section`
  width: 100%;
  height: 80vh;
  position: relative;
  overflow: hidden;
  opacity: 0;
  
  &.visible {
    opacity: 1;
    animation: ${fadeIn} 1s ease forwards;
  }
  
  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const HeroImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%;
  max-width: 800px;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Story Section
const StorySection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  
  &.visible {
    opacity: 1;
    animation: ${fadeIn} 1s ease forwards;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const SectionTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionIcon = styled.div`
  color: #5c0e0e;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #5c0e0e;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionDivider = styled.div`
  width: 80px;
  height: 3px;
  background: #5c0e0e;
  margin: 0 auto;
`;

const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StoryParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  text-align: justify;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const StoryHighlight = styled.span`
  color: #5c0e0e;
  font-weight: 600;
`;

const ValuesSection = styled.section`
  padding: 6rem 2rem;
  background-color: #f2efe8;
  position: relative;
  opacity: 0;
  
  &.visible {
    opacity: 1;
    animation: ${fadeIn} 1s ease forwards;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const ValuesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  
  ${ValuesSection}.visible & {
    opacity: 1;
    animation: ${scaleIn} 0.8s ease forwards;
    animation-delay: ${props => props.delay || 0}s;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ValueIcon = styled.div`
  color: #5c0e0e;
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
`;

// Reviews Section
const ReviewsSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  
  &.visible {
    opacity: 1;
    animation: ${fadeIn} 1s ease forwards;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  
  ${ReviewsSection}.visible & {
    opacity: 1;
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: ${props => props.delay || 0}s;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const QuoteIconLeft = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: rgba(92, 14, 14, 0.1);
  font-size: 1.5rem;
`;

const QuoteIconRight = styled.div`
  position: absolute;
  bottom: 4rem;
  right: 1rem;
  color: rgba(92, 14, 14, 0.1);
  font-size: 1.5rem;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 2rem;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ReviewerInfo = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

const StarsContainer = styled.div`
  color: #f8b500;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  display: flex;
  gap: 0.2rem;
  justify-content: center;
`;

const ReviewerName = styled.h4`
  font-size: 1.1rem;
  color: #5c0e0e;
  margin-bottom: 0.3rem;
`;

const ReviewerLocation = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PaginationDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#5c0e0e' : '#ddd'};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#5c0e0e' : '#ccc'};
    transform: scale(1.2);
  }
`;