import React from 'react';
import styled, { keyframes } from 'styled-components';
import espadinimg from '../assets/images/espadin.jpg';
import mexicanoimg from '../assets/images/mexicano.jpg';
import ensambleimg from '../assets/images/ensamble.jpg';
import plata from '../assets/images/85point.png';
import oro from '../assets/images/92point.png';
import { Link } from 'react-router-dom';

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
    price: 1390,
    info:"Cristalino, suave percepción de hierbas de campo, aroma cítrico, predominante el té de limón y naranja, textura suave, sabores equilibrados herbáceos y frutales, cítricos, con notas de dulzura al final",
    stamp: oro
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
    price: 990,
    info: "El mezcal espadín tiene una textura dulce y herbácea, bien equilibrada con notas de manzana dulce, frutas maduras y una suave capa ahumada para finalizar.",
    stamp: plata
  },
  {
    id: 2,
    name: "MÉXICANO",
    clase: "Joven",
    cultivo: "Silvestre",
    agave: "Agave Rhodacantha",
    crecimiento: "8-10 años",
    destilacion: "Doble destilación en ollas de cobre",
    horno: "Cónico de piedra",
    molienda: "Tahoma de piedra jalada por un caballo",
    image: mexicanoimg,
    price: 1100,
    info: "Tiene aromas frutales, terrosas, dulces y sutiles el sabor al inicio presenta notas verbales y frutales dejando un bouquet a fruta fermentada ",
    stamp: plata
  },
];
const Products = () => {
  return (
    <PageContainer>
      {mezcales.map((product) => (
        <ProductContainer key={product.id}>
           <StampContainer>
            <Stamp>
              <StampImage src={product.stamp} alt='stamp'/> 
            </Stamp>
          </StampContainer>
          <TopProduct>
            <ProductImage src={product.image} alt="Product" />
            <ProductDescription>
              <ProductText>
                <strong>{product.name}</strong> <br />
                Clase: {product.clase}<br />
                Manejo de cultivo: {product.cultivo}<br />
                Agave: {product.agave} <br />
                Crecimiento del agave: {product.crecimiento} <br />
                Destilaciones: {product.destilacion}<br />
                Tipo de horno: {product.horno}<br />
                Tipo de molienda: {product.molienda}<br />
              </ProductText>
            </ProductDescription>
            <Notas>{product.info}</Notas>
          </TopProduct>
          <ProductButton> <Link to="/tienda">Compra ahora</Link></ProductButton>
        </ProductContainer>
      ))}
    </PageContainer>
  );
};

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

const PageContainer = styled.div`
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease-in-out;
  z-index: 0;
`;

const ProductContainer = styled.div`
  width: 100%;
  background: linear-gradient(145deg, #e8d8c3, #b1a492);
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  overflow: visible;
  transform: scale(1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const TopProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProductDescription = styled.div`
  width: 60%;
  padding: 1.5rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1.2s ease-in-out;

  @media (max-width: 768px) {
    width: 90%;
    font-size: 0.9rem;
  }
`;

const ProductImage = styled.img`
  width: 65%;
  margin-bottom: 1rem;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const ProductText = styled.p`
  color: white;
  letter-spacing: 1.5px;
  word-spacing: 3px;
  line-height: 1.8;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProductButton = styled.button`
  background-color: rgba(92,14,14);
  color: white;
  border: none;
  margin: 1rem 0 2rem;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #b68e1f;
    transform: translateY(-3px);
  }

  &:active {
    background-color: #9f7d1b;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const Notas = styled.p`
color: black;
font-size: 1.2rem;
padding: 3rem 3rem 0rem 3rem;
font-weight: bold;
`

const StampContainer = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  z-index: 1000;

  @media (max-width: 768px) {
    top: -15px;
    right: -15px;
  }

  @media (max-width: 480px) {
    top: -60px;
    right: -120px;
  }
`;

const Stamp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-15deg);

  &:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
  }
`;

const StampImage = styled.img`
  width: 50%;
  height: auto;
  object-fit: contain;
  
`;

export default Products;
