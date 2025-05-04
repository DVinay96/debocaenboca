import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import mezcalStoryImage from "../assets/images/maestromezcalero.jpeg";


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

const MezcalStory = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const storyElements = document.querySelectorAll(".story-animate");
    storyElements.forEach((el) => observer.observe(el));

    return () => {
      storyElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <StoryContainer>
      <StoryWrapper>
        <ImageColumn className="story-animate">
          <StoryImage src={mezcalStoryImage} alt="De Boca en Boca Mezcal" />
          <ImageOverlay />
        </ImageColumn>
        <TextColumn className="story-animate">
          <TextWrapper>
            <StoryTitle>El Mezcal se toma a besos</StoryTitle>
            <Divider />
            <StoryText>
              <FirstParagraph>
                El Mezcal se toma a besos "para irle tomando cariño". Lleva el vaso hasta tus labios y sorbe un poco: el primer beso es para preparar los sentidos, pásalo por la boca, sin tragar, para activar las papilas gustativas; suelta aire por la nariz para dejar salir los aromas.
              </FirstParagraph>
              
              <Paragraph>
                De la voz de los sabios ancianos, guardianes del mezcal, descubrí que este elixir es sin duda alguna el espíritu del maguey. De esta poderosa planta, hija del sol y la tierra, al ser horneada en el momento de maduración justo, fermentada naturalmente y destilada de la manera correcta se obtiene un delicioso y puro mezcal. Sabores y aromas propios del maguey y de la tierra de dónde este nace, que al degustarlo se va descubriendo.
              </Paragraph>
              
              <Paragraph>
                Un anciano me dijo, mientras orgulloso me ofrecía una jícara llena de lo que él consideraba su mas preciado tesoro: "Bebe este mezcal a besos, es bebida de dioses. Este translucido trago es otro hijo de la madre tierra al igual que tú y que yo; guarda como en todos nosotros los verdaderos sabores y aromas de la tierra donde vivimos".
              </Paragraph>
              
              <Paragraph>
                Yo lo escuchaba estupefacto mientras el proseguía; "es parte de nuestra alma y por eso debemos de beberla con amor y apreciar cada sorbo tratando de descubrir los verdaderos sabores y aromas del maguey". Cómo olvidar la sabiduría de sus palabras.
                Al degustarlo, obediente seguía al pie de la letra las instrucciones del buen hombre y mi percepción respecto del mezcal cambió ipso facto. El vendaje cayó de inmediato, papilas gustativas y olfato estaban ya listas a recibir lo que en realidad era el mezcal. La historia que por delante vendría sabía yo que estaba ya escrita.
              </Paragraph>
              
              <LastParagraph>
                En ese momento decidí que el mezcal se convertiría en mi pequeña trinchera para mostrarle a México y al mundo las bellas personalidades que esta bebida tiene a todos que mostrar. Enseñarles que el mezcal al probarlo, no se bebe, se besa.
              </LastParagraph>
            </StoryText>
          </TextWrapper>
        </TextColumn>
      </StoryWrapper>
    </StoryContainer>
  );
};

export default MezcalStory;

// Styled Components
const StoryContainer = styled.section`
  width: 100%;
  padding: 6rem 0;
  background: #fcfcfc;
  overflow: hidden;
  margin-top: 2rem;
`;

const StoryWrapper = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  position: relative;
  opacity: 0;
  animation: ${fadeInLeft} 1.2s ease-out forwards;
  
  &.visible {
    opacity: 1;
  }
  
  @media (max-width: 1024px) {
    height: 60vh;
  }
  
  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  
  @media (max-width: 1024px) {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  }
`;

const TextColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 4rem;
  opacity: 0;
  animation: ${fadeInRight} 1.2s ease-out 0.3s forwards;
  
  &.visible {
    opacity: 1;
  }
  
  @media (max-width: 1024px) {
    padding: 4rem 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const TextWrapper = styled.div`
  max-width: 600px;
`;

const StoryTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
  letter-spacing: 2px;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Divider = styled.div`
  width: 80px;
  height: 2px;
  background-color: #a87c4f;
  margin-bottom: 2rem;
`;

const StoryText = styled.div`
  color: #333;
  font-weight: 300;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  letter-spacing: 1px;
  text-align: justify;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const FirstParagraph = styled(Paragraph)`
  font-style: italic;
  color: #a87c4f;
  font-weight: 400;
`;

const LastParagraph = styled(Paragraph)`
  font-weight: 400;
  margin-bottom: 0;
`;

// Usage in your application:
// Import and add this component to your Homepage.js or another page
// <MezcalStory />