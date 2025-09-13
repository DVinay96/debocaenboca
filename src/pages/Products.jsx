import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import espadinimg from "../assets/images/espadin.jpg";
import mexicanoimg from "../assets/images/mexicano.jpg";
import ensambleimg from "../assets/images/ensamble.jpg";
import plata from "../assets/images/85point.png";
import oro from "../assets/images/92point.png";
import { Link } from "react-router-dom";
import bg from "../assets/images/mezcales.png";

import banner1 from "../assets/images/banner1.jpg";
import banner2 from "../assets/images/banner2.jpg"; 

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2,
        ...options,
      }
    );

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

const mezcales = [
  {
    id: 3,
    name: "ENSAMBLE",
    clase: "Joven",
    cultivo: "Siembra/Silvestre/Rhodacantha",
    agave: "Agave Angustifolia",
    crecimiento: "8-10 años",
    destilacion: "Doble destilación en ollas de cobre",
    horno: "Cónico de piedra",
    molienda: "Tahoma de piedra jalada por un caballo",
    image: ensambleimg,
    price: 1399,
    info: "Cristalino, suave percepción de hierbas de campo, aroma cítrico, predominante el té de limón y naranja, textura suave, sabores equilibrados herbáceos y frutales, cítricos, con notas de dulzura al final",
    stamp: oro,
    award: "Medalla de Oro: 92 puntos",
  },
  {
    id: 1,
    name: "ESPADÍN",
    clase: "Joven",
    cultivo: "Siembra",
    agave: "Agave Angustifolia",
    crecimiento: "7 años",
    destilacion: "Doble destilación en ollas de cobre",
    horno: "Cónico de piedra",
    molienda: "Tahoma de piedra jalada por un caballo",
    image: espadinimg,
    price: 1199,
    info: "El mezcal espadín tiene una textura dulce y herbácea, bien equilibrada con notas de manzana dulce, frutas maduras y una suave capa ahumada para finalizar.",
    stamp: plata,
    award: "Medalla de Plata: 85 puntos",
  },
  {
    id: 2,
    name: "MEXICANO",
    clase: "Joven",
    cultivo: "Silvestre",
    agave: "Agave Rhodacantha",
    crecimiento: "8-10 años",
    destilacion: "Doble destilación en ollas de cobre",
    horno: "Cónico de piedra",
    molienda: "Tahoma de piedra jalada por un caballo",
    image: mexicanoimg,
    price: 1299,
    info: "Tiene aromas frutales, terrosas, dulces y sutiles el sabor al inicio presenta notas herbales y frutales dejando un bouquet a fruta fermentada",
    stamp: plata,
    award: "Medalla de Plata: 85 puntos",
  },
];

const banners = [
  {
    id: 1,
    image: banner1,
    title: "Tradición Oaxaqueña",
    text: "Nuestros mezcales son elaborados con métodos tradicionales que han pasado de generación en generación.",
  },
  {
    id: 2,
    image: banner2,
    title: "Agaves Seleccionados",
    text: "Utilizamos únicamente agaves cultivados de manera sostenible, respetando los ciclos naturales de la planta.",
  },
];

const Products = () => {
  return (
    <PageContainer>
      <Header>
        <PageTitle>Nuestros Mezcales</PageTitle>
      </Header>
      <ProductsContainer>
        {mezcales.map((product, index) => (
          <React.Fragment key={product.id}>
            <ProductSection product={product} isReversed={index % 2 !== 0} />

            {index < mezcales.length - 1 && (
              <BannerSection banner={banners[index % banners.length]} />
            )}
          </React.Fragment>
        ))}
      </ProductsContainer>
    </PageContainer>
  );
};

const ProductSection = ({ product, isReversed }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <ProductRow
      ref={ref}
      className={isVisible ? "visible" : ""}
      isReversed={isReversed}
    >
      <ProductImageColumn isReversed={isReversed}>
        <ProductImageWrapper>
          <MedalImage src={product.stamp} alt="Award" />
          <ProductImage src={product.image} alt={product.name} />
        </ProductImageWrapper>
      </ProductImageColumn>

      <ProductInfoColumn isReversed={isReversed}>
        <ProductHeader>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>
            ${product.price} <span>MXN</span>
          </ProductPrice>
       
        </ProductHeader>

        <SpecsSection>
          <SpecsTitle>Especificaciones</SpecsTitle>
          <SpecsGrid>
            <SpecItem>
              <SpecLabel>Clase</SpecLabel>
              <SpecValue>{product.clase}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Agave</SpecLabel>
              <SpecValue>{product.agave}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Crecimiento</SpecLabel>
              <SpecValue>{product.crecimiento}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Cultivo</SpecLabel>
              <SpecValue>{product.cultivo}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Destilación</SpecLabel>
              <SpecValue>{product.destilacion}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Horno</SpecLabel>
              <SpecValue>{product.horno}</SpecValue>
            </SpecItem>
            <SpecItem>
              <SpecLabel>Molienda</SpecLabel>
              <SpecValue>{product.molienda}</SpecValue>
            </SpecItem>
          </SpecsGrid>
        </SpecsSection>

        <NotesSection>
          <NotesTitle>Notas de Cata</NotesTitle>
          <NotesText>{product.info}</NotesText>
        </NotesSection>

        <PurchaseButton>
          <Link to="/tienda">Comprar ahora</Link>
        </PurchaseButton>
      </ProductInfoColumn>
    </ProductRow>
  );
};

const BannerSection = ({ banner }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <BannerContainer ref={ref} className={isVisible ? "visible" : ""}>
      <BannerImage src={banner.image} alt={banner.title} />
      <BannerOverlay>
        <BannerTitle>{banner.title}</BannerTitle>
        <BannerText>{banner.text}</BannerText>
      </BannerOverlay>
    </BannerContainer>
  );
};

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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
const PageContainer = styled.div`
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #ffff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 1rem 5rem;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const ProductRow = styled.section`
  display: flex;
  flex-direction: ${(props) => (props.isReversed ? "row-reverse" : "row")};
  align-items: center;
  gap: 4rem;
  opacity: 0;
  transform: translateY(30px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
    animation: ${fadeIn} 0.8s ease forwards;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ProductImageColumn = styled.div`
  flex: 1;
  opacity: 0;
  animation: ${(props) => (props.isReversed ? slideInRight : slideInLeft)} 0.8s
    ease forwards 0.2s;

  ${ProductRow}.visible & {
    opacity: 1;
  }

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;

  ${ProductImageWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const MedalImage = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: auto;
  z-index: 10;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3));
  transform: rotate(-10deg);

  @media (max-width: 768px) {
    width: 80px;
  }

  @media (max-width: 480px) {
    width: 60px;
  }
`;

const ProductInfoColumn = styled.div`
  flex: 1;
  opacity: 0;
  animation: ${(props) => (props.isReversed ? slideInLeft : slideInRight)} 0.8s
    ease forwards 0.2s;

  ${ProductRow}.visible & {
    opacity: 1;
  }
`;

const ProductHeader = styled.div`
  margin-bottom: 2rem;
`;

const ProductName = styled.h2`
  font-size: 2.2rem;
  color: #5c0e0e;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;

  span {
    font-size: 1.1rem;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;

    span {
      font-size: 0.9rem;
    }
  }
`;

const ComparePrice = styled.span`
  text-decoration: line-through;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const SpecsSection = styled.div`
  margin-bottom: 2rem;
`;

const SpecsTitle = styled.h3`
  font-size: 1.3rem;
  color: #5c0e0e;
  margin-bottom: 1rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecLabel = styled.span`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.2rem;
`;

const SpecValue = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const NotesSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f8f5;
  border-left: 3px solid #5c0e0e;
  border-radius: 0 8px 8px 0;
`;

const NotesTitle = styled.h3`
  font-size: 1.2rem;
  color: #5c0e0e;
  margin-bottom: 0.8rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NotesText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  font-style: italic;
`;

const PurchaseButton = styled.button`
  background-color: #5c0e0e;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #7c1a1a;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  a {
    color: white;
    text-decoration: none;
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.9rem 1.5rem;
  }
`;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem 0;
  opacity: 0;
  transform: translateY(30px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
    animation: ${fadeIn} 0.8s ease forwards;
  }

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 6s ease;

  ${BannerContainer}:hover & {
    transform: scale(1.1);
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4rem;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const BannerTitle = styled.h3`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const BannerText = styled.p`
  color: white;
  font-size: 1.2rem;
  max-width: 60%;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 80%;
  }
`;

const Header = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  width: 100vw;
  max-width: 100vw;
  box-sizing: border-box;
  padding: 6rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export default Products;
