import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import drinkImage from '../assets/images/grid6.jpeg';
import recipeVideo from '../assets/videos/videoReceta.mp4';
import { FaCocktail, FaGlassMartini, FaGlassWhiskey, FaPlay, FaPause, FaArrowRight } from 'react-icons/fa';
import { GiAgave } from 'react-icons/gi';

// Custom hook for intersection observer
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

const Recipes = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const [headerRef, headerVisible] = useIntersectionObserver();
  
  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const drinks = [
    {
      id: 1,
      name: 'Mezcal Margarita',
      image: drinkImage,
      icon: <FaGlassMartini />,
      category: 'classic',
      difficulty: 'Fácil',
      prepTime: '5 minutos',
      description: 'Una variante ahumada del clásico cóctel mexicano, perfecta para cualquier ocasión. El mezcal aporta notas ahumadas que complementan el cítrico del limón.',
      ingredients: [
        '2 oz Mezcal De Boca en Boca Espadín',
        '1 oz jugo de limón fresco',
        '1 oz miel de agave',
        'Hielo',
        'Sal para el borde (opcional)',
        'Rodaja de limón para decorar'
      ],
      steps: [
        'Escarcha el borde de un vaso con sal (opcional).',
        'Vierte el mezcal en una coctelera.',
        'Agrega el jugo de limón y la miel de agave.',
        'Llena la coctelera con hielo y agita vigorosamente por 15 segundos.',
        'Cuela sobre hielo fresco en el vaso preparado.',
        'Decora con una rodaja de limón y ¡disfruta!'
      ]
    },
    {
      id: 2,
      name: 'Oaxacan Old-Fashioned',
      image: drinkImage,
      icon: <FaGlassWhiskey />,
      category: 'premium',
      difficulty: 'Intermedio',
      prepTime: '7 minutos',
      description: 'Una interpretación ahumada del clásico Old-Fashioned, que resalta las notas complejas de nuestro mezcal artesanal con un toque de agave y cítricos.',
      ingredients: [
        '2 oz Mezcal De Boca en Boca Ensamble',
        '1 cucharadita de miel de agave',
        '2 gotas de amargos de naranja',
        'Cáscara de naranja',
        'Hielo grande'
      ],
      steps: [
        'En un vaso mezclador, agrega la miel de agave y los amargos.',
        'Vierte el mezcal y mezcla bien hasta que se disuelva la miel.',
        'Agrega hielo y revuelve durante 30 segundos para diluir y enfriar.',
        'Cuela en un vaso bajo con un cubo de hielo grande.',
        'Exprime la cáscara de naranja sobre el cóctel para liberar los aceites esenciales.',
        'Usa la cáscara como guarnición y disfruta lentamente.'
      ]
    },
    {
      id: 3,
      name: 'Smoky Paloma',
      image: drinkImage,
      icon: <FaCocktail />,
      category: 'refreshing',
      difficulty: 'Fácil',
      prepTime: '5 minutos',
      description: 'Una versión ahumada del refrescante cóctel Paloma, que combina perfectamente los cítricos del toronja con las notas terrosas del mezcal.',
      ingredients: [
        '2 oz Mezcal De Boca en Boca Mexicano',
        '2 oz jugo de toronja fresco',
        '1/2 oz jugo de limón',
        'Agua mineral',
        'Pizca de sal',
        'Hielo',
        'Rodaja de toronja para decorar'
      ],
      steps: [
        'Llena un vaso alto con hielo.',
        'Vierte el mezcal, el jugo de toronja y el jugo de limón.',
        'Agrega una pizca de sal y mezcla suavemente.',
        'Completa con agua mineral.',
        'Decora con una rodaja de toronja.',
        'Sirve inmediatamente y disfruta frío.'
      ]
    },
  ];

  const filteredDrinks = activeTab === 'all' 
    ? drinks 
    : drinks.filter(drink => drink.category === activeTab);

  return (
    <PageContainer>
      <HeroHeader ref={headerRef} className={headerVisible ? 'visible' : ''}>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Cócteles con Mezcal</HeroTitle>
          <HeroSubtitle>Descubre deliciosas recetas con nuestro mezcal artesanal</HeroSubtitle>
        </HeroContent>
      </HeroHeader>

      <VideoSection>
        <SectionTitle>
          <SectionTitleIcon><FaGlassMartini /></SectionTitleIcon>
          <span>Aprende a preparar nuestros cócteles</span>
        </SectionTitle>
        
        <VideoContainer>
          <VideoWrapper>
            <Video 
              ref={videoRef}
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
            >
              <source src={recipeVideo} type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </Video>
            <VideoControls onClick={handleVideoToggle}>
              {videoPlaying ? <FaPause /> : <FaPlay />}
            </VideoControls>
          </VideoWrapper>
        </VideoContainer>
      </VideoSection>

      {/* Recipe Filter Tabs */}
      <FilterTabs>
        <FilterTab 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          Todos
        </FilterTab>
        <FilterTab 
          active={activeTab === 'classic'} 
          onClick={() => setActiveTab('classic')}
        >
          Clásicos
        </FilterTab>
        <FilterTab 
          active={activeTab === 'refreshing'} 
          onClick={() => setActiveTab('refreshing')}
        >
          Refrescantes
        </FilterTab>
        <FilterTab 
          active={activeTab === 'premium'} 
          onClick={() => setActiveTab('premium')}
        >
          Premium
        </FilterTab>
      </FilterTabs>

      {/* Recipe Cards */}
      <RecipesGrid>
        {filteredDrinks.map((drink, index) => (
          <RecipeCard key={drink.id} index={index}>
            <RecipeImageContainer>
              <RecipeImage src={drink.image} alt={drink.name} />
              <RecipeDifficulty>{drink.difficulty}</RecipeDifficulty>
              <RecipeTime>{drink.prepTime}</RecipeTime>
            </RecipeImageContainer>
            
            <RecipeContent>
              <RecipeIconContainer>
                {drink.icon}
              </RecipeIconContainer>
              
              <RecipeTitle>{drink.name}</RecipeTitle>
              
              <RecipeDescription>
                {drink.description}
              </RecipeDescription>
              
              <RecipeDetailsToggle>
                <IngredientsList>
                  <IngredientsTitle>Ingredientes:</IngredientsTitle>
                  <IngredientsGrid>
                    {drink.ingredients.map((ingredient, i) => (
                      <IngredientItem key={i}>
                        <IngredientIcon><GiAgave /></IngredientIcon>
                        <span>{ingredient}</span>
                      </IngredientItem>
                    ))}
                  </IngredientsGrid>
                </IngredientsList>
                
                <InstructionsList>
                  <InstructionsTitle>Preparación:</InstructionsTitle>
                  {drink.steps.map((step, i) => (
                    <InstructionStep key={i}>
                      <StepNumber>{i + 1}</StepNumber>
                      <StepText>{step}</StepText>
                    </InstructionStep>
                  ))}
                </InstructionsList>
              </RecipeDetailsToggle>
            </RecipeContent>
          </RecipeCard>
        ))}
      </RecipesGrid>
      
      {/* Call to Action */}
      <CTASection>
        <CTAContent>
          <CTATitle>¿Listo para preparar tus propios cócteles?</CTATitle>
          <CTAText>Consigue nuestro mezcal artesanal y comienza a crear estas deliciosas recetas.</CTAText>
          <CTAButton to="/tienda">
            <span>Comprar Ahora</span>
            <FaArrowRight />
          </CTAButton>
        </CTAContent>
      </CTASection>
    </PageContainer>
  );
};

export default Recipes;

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


const fadeInStaggered = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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

const HeroHeader = styled.header`
  height: 40vh;
  background-image: url(${drinkImage});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  
  &.visible {
    opacity: 1;
    animation: ${fadeIn} 1s ease forwards;
  }
  
  @media (max-width: 768px) {
    height: 30vh;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 0 2rem;
`;


const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const VideoSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 2rem;
  color: #5c0e0e;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    gap: 0.5rem;
  }
`;

const SectionTitleIcon = styled.span`
  color: #5c0e0e;
  font-size: 1.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const VideoWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const Video = styled.video`
  width: 100%;
  display: block;
  cursor: pointer;
`;

const VideoControls = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: rgba(92, 14, 14, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto 3rem;
  max-width: 1200px;
  padding: 0 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const FilterTab = styled.button`
  background-color: ${props => props.active ? '#5c0e0e' : 'transparent'};
  color: ${props => props.active ? 'white' : '#5c0e0e'};
  border: 2px solid #5c0e0e;
  border-radius: 30px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#5c0e0e' : 'rgba(92, 14, 14, 0.1)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1.5rem 3rem;
  }
`;

const RecipeCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  opacity: 0;
  animation: ${fadeInStaggered} 0.8s ease forwards;
  animation-delay: ${props => props.index * 0.15}s;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const RecipeImageContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${RecipeCard}:hover & {
    transform: scale(1.05);
  }
`;

const RecipeDifficulty = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #5c0e0e;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
`;

const RecipeTime = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
`;

const RecipeContent = styled.div`
  padding: 1.5rem;
  position: relative;
`;

const RecipeIconContainer = styled.div`
  position: absolute;
  top: -30px;
  right: 20px;
  background-color: #5c0e0e;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const RecipeTitle = styled.h3`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 1rem;
`;

const RecipeDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const RecipeDetailsToggle = styled.div``;

const IngredientsList = styled.div`
  margin-bottom: 2rem;
`;

const IngredientsTitle = styled.h4`
  font-size: 1.2rem;
  color: #5c0e0e;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.8rem;
`;

const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #444;
`;

const IngredientIcon = styled.span`
  color: #5c0e0e;
  font-size: 1rem;
`;

const InstructionsList = styled.div``;

const InstructionsTitle = styled.h4`
  font-size: 1.2rem;
  color: #5c0e0e;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const InstructionStep = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  background-color: #5c0e0e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepText = styled.p`
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
`;

// CTA Section Styles
const CTASection = styled.section`
  background-color: #5c0e0e;
  color: white;
  padding: 5rem 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background-color: white;
  color: #5c0e0e;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;