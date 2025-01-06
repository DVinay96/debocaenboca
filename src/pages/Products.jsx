import React from 'react';
import styled, { keyframes } from 'styled-components';
import pImage from '../assets/images/product.png';

const Products = () => {
  return (
    <PageContainer>
      {[...Array(3)].map((_, index) => (
        <ProductContainer key={index}>
          <TopProduct>
            <ProductImage src={pImage} alt="Product" />
            <ProductDescription>
              <ProductText>
                <strong>ESPADÍN</strong> <br />
                Clase: Joven<br />
                Manejo de cultivo: Siembra<br />
                Agave: Agave Angustifolia <br />
                Crecimiento del agave: 7 años<br />
                Destilaciones: Doble destilación en ollas de cobre<br />
                Tipo de horno: Cónico de piedra<br />
                Tipo de molienda: Tahoma de piedra jalada por un caballo
              </ProductText>
            </ProductDescription>
          </TopProduct>
          <ProductButton> <a href="/tienda">Compra ahora</a></ProductButton>
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
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease-in-out;
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
  overflow: hidden;
  transform: scale(1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const TopProduct = styled.div`
  display: flex;
  flex-direction: row;
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
    width: 100%;
    font-size: 0.9rem;
  }
`;

const ProductImage = styled.img`
  width: 30%;
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

export default Products;
