import React from 'react'
import styled from 'styled-components'
import pImage from '../assets/images/product.png'


const Products = () => {
  return (
    <PageContainer>
      {[...Array(3)].map((_, index) => (
        <ProductContainer key={index}>
          <TopProduct>
            <ProductImage src={pImage} />
            <ProductDescription>
              <ProductText>
                ESPADÍN <br />
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
          <ProductButton>Compra ahora</ProductButton>
        </ProductContainer>
      ))}
    </PageContainer>
  )
}

const PageContainer = styled.div`
  padding: 2rem;
`;

const ProductContainer = styled.div`
  width: 100%;
  background-color: #b1a492;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const TopProduct = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProductDescription = styled.div`
  width: 60%;
  padding: 1rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const ProductImage = styled.img`
  width: 30%;
  border-radius: 10px;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductText = styled.p`
  color: white;
  letter-spacing: 2px;
  word-spacing: 5px;
  line-height: 170%;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProductButton = styled.button`
  background-color: #cc9f22;
  color: white;
  border: none;
  margin-bottom: 2%;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b68e1f;
  }

  &:active {
    background-color: #9f7d1b;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

export default Products;
