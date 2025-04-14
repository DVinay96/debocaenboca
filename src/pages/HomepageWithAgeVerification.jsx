import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from '../assets/images/logo.png';
import mainImage from '../assets/images/mainbanner.jpeg';
import maestroMezcalero from '../assets/images/maestromezcalero.jpeg';
import cavaLogo from '../assets/images/cavaLogo.png';
import section1bg from '../assets/images/section1bg.jpg';
import section1bg2 from '../assets/images/section1bg2.jpg'; 
import section1bg3 from '../assets/images/section1bg3.jpg'; 
import botella from '../assets/images/botellasinfondo.png'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';


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

// Carousel background images
const carouselImages = [
  section1bg,
  section1bg2,
  section1bg3
];

// Animation keyframes

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

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


const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const HomepageWithAgeVerification = ({ onVerify }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleVerification = (verified) => {
    setIsVerified(verified);
    if (verified && onVerify) {
      onVerify(verified);
    }
  };

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer>
      <HomeContent isBlurred={!isVerified}>
        {carouselImages.map((image, index) => (
          <UpperContent 
            key={index} 
            imageUrl={image}
            isActive={index === currentImageIndex}
          >
            <h2> - sabor tradicional -</h2>
            <h1> No lo bebas... besalo</h1>
            <CTAButton> Explora de Boca en Boca</CTAButton>
            <CarouselIndicators>
              {carouselImages.map((_, dotIndex) => (
                <CarouselDot 
                  key={dotIndex} 
                  isActive={dotIndex === currentImageIndex}
                  onClick={() => setCurrentImageIndex(dotIndex)}
                />
              ))}
            </CarouselIndicators>
          </UpperContent>
        ))}

<MidSection>
  <MainBox>
    <AnimatedBoxText>
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
    </AnimatedBoxText>
    
    <BottleSection>
      <BottleDetails>
        <AnimatedDetailLeft delay="0.3s">
          <h3>Origen</h3>
          <p>Santiago Matatlán, Oaxaca. La capital mundial del mezcal.</p>
        </AnimatedDetailLeft>
        
        <AnimatedDetailLeft delay="0.6s">
          <h3>Tipo de Agave</h3>
          <p>Espadín (Angustifolia Haw) y Mexicano, cultivados de manera sostenible.</p>
        </AnimatedDetailLeft>
        
        <AnimatedDetailLeft delay="0.9s">
          <h3>Proceso</h3>
          <p>Cocción tradicional en horno cónico de piedra, fermentación natural en tinas de madera.</p>
        </AnimatedDetailLeft>
      </BottleDetails>
      
      <AnimatedBottleContainer>
        <AnimatedBottleImage src={botella} alt="Botella De Boca en Boca" />
      </AnimatedBottleContainer>
      
      <BottleDetails>
        <AnimatedDetailRight delay="0.3s">
          <h3>Sabor</h3>
          <p>Notas de caramelo, vainilla y frutos secos con un final ahumado.</p>
        </AnimatedDetailRight>
        
        <AnimatedDetailRight delay="0.6s">
          <h3>Graduación</h3>
          <p>45% Alc. Vol. Destilado dos veces para mayor pureza.</p>
        </AnimatedDetailRight>
        
        <AnimatedDetailRight delay="0.9s">
          <h3>Recomendación</h3>
          <p>Disfrutar puro a temperatura ambiente para apreciar sus complejos matices.</p>
        </AnimatedDetailRight>
      </BottleDetails>
    </BottleSection>
  </MainBox>
</MidSection>
        
        <RewardContainer>
          <CavaLogo src={cavaLogo}/>
          <RewardText>
            <h1> Mezcal de Boca en Boca, Top 99 Mezcales de 2025</h1>
            En el 9° concurso de puntuacion de cata a ciegas organizado por Revista CAVA, "De Boca en Boca" se posicionó en el Top 99 Mezcales del 2025 <br/>
            <ul>
              <br/>
              <li>Ensamble Espadin/Mexicano Medalla de Oro: 92 puntos.</li>
              <br/>
              <li>Espadin Medalla de Plata: 85 puntos.</li>
              <br/>
              <li>Mexicano Medalla de Plata: 85 puntos.</li>
            </ul>
          </RewardText>
        </RewardContainer>
        
        <AnimatedStoryMezcal />

      </HomeContent>

      {!isVerified && (
        <AgeVerifyModal onVerify={handleVerification} />
      )}
    </PageContainer>
  );
};

// Styled Components
// Age Verification Modal Styles
const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: rgba(26, 26, 26, 0.9);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 50%;
  color: #fff;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const LogoImage = styled.img`
  width: 30vh;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    width: 20vh;
  }
`;

const ModalHeader = styled.p`
  font-size: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ModalText = styled.p`
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ModalButton = styled.button`
  background-color: rgba(92, 14, 14);
  margin: 2rem;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a01010;
  }

  @media (max-width: 480px) {
    margin: 1rem;
    font-size: 0.9rem;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-weight: bold;
`;

// Homepage Styles
const PageContainer = styled.div`
  color: #333;
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const HomeContent = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  filter: ${props => props.isBlurred ? 'blur(5px)' : 'none'};
  transition: filter 0.5s ease;
  pointer-events: ${props => props.isBlurred ? 'none' : 'auto'};
`;

const UpperContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  background-image: url('${props => props.imageUrl}');
  background-size: cover;
  background-position: center;
  position: ${props => props.isActive ? 'relative' : 'absolute'};
  top: 0;
  left: 0;
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity 1s ease-in-out;
  z-index: ${props => props.isActive ? 1 : 0};

  h1 {
    color:white;
    font-size: 400%;
    text-align: center;
    margin-bottom: 2rem;
  }

  h2 {
    color: white;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 300%;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 200%;
    }
    h2 {
      font-size: 100%;
    }
  }
`;

const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CarouselDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? '#5c0e0e' : 'rgba(255, 255, 255, 0.5)'};
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.isActive ? '#5c0e0e' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const CavaLogo = styled.img`
  width: 15vw;
  object-fit: contain;
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
  background-color: transparent;
  color: #ffdd57;
  border: 2px solid #ffdd57;
  border-radius: 5px;
  padding: 1rem 2rem;
  font-size: 1rem;
  margin-top: 2%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #ffcc32;
    color: white;
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
  padding: 4rem 0;
  background: rgb(244,243,238);
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 90%;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 95%;
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
`

const BottleSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const BottleDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  
  @media (max-width: 992px) {
    width: 80%;
    order: 2;
    margin-top: 2rem;
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
`

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

const RewardContainer = styled.section`
  border-top: 1px black solid;
  padding-top: 2rem;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0rem 4rem 4rem 4rem;
`;

const RewardText = styled.p`
  color: rgba(92, 14, 14);
  letter-spacing: 2px;
  word-spacing: 5px;
  line-height: 2;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;

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

  h1{
    font-weight: 500;
    color: rgba(92, 14, 14);
  }
`;

// Animations with observer

const AnimatedBoxText = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <BoxTextContainer ref={ref} className={isVisible ? 'visible' : ''}>
      {children}
    </BoxTextContainer>
  );
};

const BoxTextContainer = styled.p`
  color: black;
  letter-spacing: 2px;
  word-spacing: 5px;
  line-height: 1.6;
  text-align: justify;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  opacity: 0;
  transition: opacity 0.5s, transform 0.7s;
  
  &.visible {
    opacity: 1;
    animation: ${fadeInUp} 1s ease forwards;
  }

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

// For BottleDetailLeft
const AnimatedDetailLeft = ({ children, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <DetailLeftContainer 
      ref={ref} 
      className={isVisible ? 'visible' : ''}
      delay={delay}
    >
      {children}
    </DetailLeftContainer>
  );
};

const DetailLeftContainer = styled.div`
  text-align: right;
  padding: 1rem;
  margin: 0.5rem 0;
  opacity: 0;
  transition: opacity 0.3s, transform 0.5s;
  
  &.visible {
    animation: ${fadeInLeft} 0.8s ease forwards;
    animation-delay: ${props => props.delay || '0s'};
  }
  
  h3 {
    color: #5c0e0e;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  @media (max-width: 992px) {
    text-align: center;
    
    h3 {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

// For BottleDetailsRight
const AnimatedDetailRight = ({ children, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <DetailRightContainer 
      ref={ref} 
      className={isVisible ? 'visible' : ''}
      delay={delay}
    >
      {children}
    </DetailRightContainer>
  );
};

const DetailRightContainer = styled.div`
  text-align: left;
  padding: 1rem;
  margin: 0.5rem 0;
  opacity: 0;
  transition: opacity 0.3s, transform 0.5s;
  
  &.visible {
    animation: ${fadeInRight} 0.8s ease forwards;
    animation-delay: ${props => props.delay || '0s'};
  }
  
  h3 {
    color: #5c0e0e;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  @media (max-width: 992px) {
    text-align: center;
    
    h3 {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

// For BottleImageContainer
const AnimatedBottleContainer = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <BottleContainer 
      ref={ref} 
      className={isVisible ? 'visible' : ''}
    >
      {children}
    </BottleContainer>
  );
};

const BottleContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,221,87,0.2) 0%, rgba(255,255,255,0) 70%);
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.5s, transform 0.8s;
  }
  
  &.visible::before {
    opacity: 1;
    transform: scale(1);
    animation: ${pulse} 4s infinite ease-in-out;
    animation-delay: 0.5s;
  }
  
  @media (max-width: 992px) {
    width: 60%;
    order: 1;
    margin-bottom: 1rem;
    
    &::before {
      width: 150px;
      height: 150px;
    }
  }
  
  @media (max-width: 480px) {
    width: 80%;
    
    &::before {
      width: 120px;
      height: 120px;
    }
  }
`;

// For BottleImage
const AnimatedBottleImage = ({ src, alt }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <BottleImg 
      ref={ref} 
      className={isVisible ? 'visible' : ''}
      src={src}
      alt={alt}
    />
  );
};

const BottleImg = styled.img`
  height: 70vh;
  object-fit: contain;
  transform-origin: bottom center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s, transform 0.8s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &.visible:hover {
    animation: ${pulse} 2s infinite ease-in-out;
  }
  
  @media (max-width: 992px) {
    height: 50vh;
  }
  
  @media (max-width: 480px) {
    height: 40vh;
  }
`;


const AgeVerifyModal = ({ onVerify }) => {
  const [error, setError] = useState('');

  const handleYes = () => {
    onVerify(true);
  };

  const handleNo = () => {
    setError('Debes de ser mayor de edad para accesar al contenido');
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <LogoImage src={Logo} alt="Site Logo" />
        <ModalHeader>¿Eres mayor de edad?</ModalHeader>
        <ModalText> Debes de ser mayor de edad para acceder al sitio </ModalText>
        <ModalText> Al ingresar aceptas nuestra politica de privacidad</ModalText>
        <ButtonDiv>
          <ModalButton onClick={handleYes}>Sí</ModalButton>
          <ModalButton onClick={handleNo}>No</ModalButton>
        </ButtonDiv>
        {error && (
          <ErrorContainer>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorContainer>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default HomepageWithAgeVerification;

const AnimatedStoryMezcal = () => {
  return (
    <StoryMezcalWrapper>
      <StoryMezcalContainer>
        <AnimatedStoryImage src={maestroMezcalero} alt="Maestro Mezcalero" />
        <AnimatedStoryContent>
          <StoryTitleContainer>
            <StoryTitle>Espiridion Gaspar Rodríguez</StoryTitle>
            <StorySubtitle>Maestro Mezcalero</StorySubtitle>
            <Divider />
          </StoryTitleContainer>
          
          <StoryDescription>
            Hijo de la Sra. Mardona Rodríguez Monjaraz y del Sr. Teodoro Gaspar Martínez, nació el 8 de Diciembre de 1970, en la comunidad de Santo Tomás Quieri, Distrito de San Carlos Yautepec, Oaxaca. Pertenece a la tercera generación de una familia de maestros mezcaleros. Su padre fue el que le mostró el arte de hacer mezcal y así le está enseñando a su hijo Elmer Gaspar para que no se pierda la tradición.
          </StoryDescription>
          
          <QuoteContainer>
            <QuoteIconLeft><FaQuoteLeft /></QuoteIconLeft>
            <QuoteText>
              Hoy en día me siento orgulloso de ser parte de una familia mezcalera y llevar 15 años de experiencia en hacer el elíxir artesanal que me inspira a llevarlo para Ustedes DE BOCA EN BOCA.
            </QuoteText>
            <QuoteIconRight><FaQuoteRight /></QuoteIconRight>
          </QuoteContainer>
        </AnimatedStoryContent>
      </StoryMezcalContainer>
    </StoryMezcalWrapper>
  );
};

const StoryMezcalWrapper = styled.section`
  background-color: rgb(244,243,238);
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at bottom right, rgba(92, 14, 14, 0.05), transparent 70%);
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

const StoryMezcalContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const AnimatedStoryImage = ({ src, alt }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <StoryImageContainer 
      ref={ref} 
      className={isVisible ? 'visible' : ''}
    >
      <StoryImageFrame>
        <StoryImg src={src} alt={alt} />
      </StoryImageFrame>
    </StoryImageContainer>
  );
};

const StoryImageContainer = styled.div`
  flex: 0 0 45%;
  position: relative;
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.8s, transform 1s;
  
  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
  
  @media (max-width: 992px) {
    margin-bottom: 3rem;
    flex: 0 0 100%;
    max-width: 500px;
  }
`;

const StoryImageFrame = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transform: rotate(-2deg);
  transition: transform 0.5s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(92, 14, 14, 0.3), transparent);
    z-index: 1;
  }
  
  &:hover {
    transform: rotate(0deg) scale(1.02);
  }
`;

const StoryImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const AnimatedStoryContent = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <StoryContentContainer 
      ref={ref} 
      className={isVisible ? 'visible' : ''}
    >
      {children}
    </StoryContentContainer>
  );
};

const StoryContentContainer = styled.div`
  flex: 0 0 55%;
  padding-left: 5%;
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.8s, transform 1s;
  
  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
  
  @media (max-width: 992px) {
    flex: 0 0 100%;
    padding-left: 0;
    text-align: center;
  }
`;

const StoryTitleContainer = styled.div`
  margin-bottom: 2rem;
`;

const StoryTitle = styled.h2`
  font-size: 2.5rem;
  color: #5c0e0e;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const StorySubtitle = styled.h3`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 1rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Divider = styled.div`
  width: 80px;
  height: 3px;
  background: linear-gradient(to right, #5c0e0e, transparent);
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    margin: 0 auto 2rem;
    background: linear-gradient(to right, #5c0e0e 30%, transparent);
  }
`;

const StoryDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const QuoteContainer = styled.div`
  position: relative;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const QuoteText = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const QuoteIconLeft = styled.span`
  position: absolute;
  top: -15px;
  left: 20px;
  color: #5c0e0e;
  font-size: 1.5rem;
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${floatAnimation} 3s ease-in-out infinite;
`;

const QuoteIconRight = styled.span`
  position: absolute;
  bottom: -15px;
  right: 20px;
  color: #5c0e0e;
  font-size: 1.5rem;
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${floatAnimation} 3s ease-in-out infinite 1.5s;
`;
