import React from 'react';
import styled from 'styled-components';
import drinkImage from '../assets/images/grid6.jpeg'; 
import recipeVideo from '../assets/videos/videoReceta.mp4';

const Recipes = () => {
  const drinks = [
    {
      name: 'Mezcal Margarita',
      image: drinkImage,
      recipe: 'Ingredients: 2 oz Mezcal, 1 oz lime juice, 1 oz agave syrup, ice. Shake and serve with a lime wedge.',
      steps: [
        'Step 1: Pour 2 oz Mezcal into a shaker.',
        'Step 2: Add 1 oz lime juice and 1 oz agave syrup.',
        'Step 3: Fill the shaker with ice.',
        'Step 4: Shake well and strain into a glass.',
        'Step 5: Garnish with a lime wedge.'
      ]
    },
    {
      name: 'Oaxacan Old-Fashioned',
      image: drinkImage,
      recipe: 'Ingredients: 2 oz Mezcal, 1 tsp agave syrup, 2 dashes bitters, orange peel. Stir with ice and strain into a glass.',
      steps: [
        'Step 1: Pour 2 oz Mezcal into a mixing glass.',
        'Step 2: Add 1 tsp agave syrup and 2 dashes of bitters.',
        'Step 3: Fill the glass with ice and stir.',
        'Step 4: Strain into a glass and garnish with an orange peel.'
      ]
    },
    {
      name: 'Smoky Paloma',
      image: drinkImage,
      recipe: 'Ingredients: 2 oz Mezcal, 2 oz grapefruit juice, 1/2 oz lime juice, soda water, pinch of salt. Serve over ice.',
      steps: [
        'Step 1: Pour 2 oz Mezcal into a glass filled with ice.',
        'Step 2: Add 2 oz grapefruit juice and 1/2 oz lime juice.',
        'Step 3: Top with soda water and a pinch of salt.',
        'Step 4: Stir gently and serve over ice.'
      ]
    },
  ];

  return (
    <RecipesPageContainer>
      <VideoContainer>
        <Video controls>
          <source src={recipeVideo} type="video/mp4" />
        </Video>
      </VideoContainer>

      <RecipeCards>
        {drinks.map((drink, index) => (
          <RecipeCard key={index}>
            <DrinkImage src={drink.image} alt={drink.name} />
            <RecipeInfo>
              <DrinkName>{drink.name}</DrinkName>
              <RecipeText>{drink.recipe}</RecipeText>
              <StepsList>
                {drink.steps.map((step, stepIndex) => (
                  <StepItem key={stepIndex}>{step}</StepItem>
                ))}
              </StepsList>
            </RecipeInfo>
          </RecipeCard>
        ))}
      </RecipeCards>
    </RecipesPageContainer>
  );
};

export default Recipes;

const RecipesPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecipeCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const RecipeCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  background-color: #b1a492; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DrinkImage = styled.img`
  width: 100%;
  height: auto;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const RecipeInfo = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const DrinkName = styled.h3`
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 0.5rem;
`;

const RecipeText = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
`;

const StepsList = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem;
`;

const StepItem = styled.li`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;
