import React from 'react'
import styled from 'styled-components'
import pImage from '../assets/images/product.png'


const Products = () => {
  return (
    <PageContainer>
        <ProductContainer>
            <TopProduct>
            <ProductDescription>
                <ProductText>ESPADÍN <br/>

Clase: Joven<br/>

Manejo de cultivo: Siembra<br/>

Agave: Agave Angustifolia <br/>

Crecimiento del agave: 7 años<br/>

Destilaciones: Doble destilación en ollas de cobre<br/>

Tipo de horno: Cónico de piedra<br/>

Tipo de molienda: Tahoma de piedra jalada por un caballo</ProductText>
            </ProductDescription>
            <ProductImage src={pImage}/>
            </TopProduct>
            <ProductButton> Compra ahora</ProductButton>
        </ProductContainer>
        <ProductContainer>
            <TopProduct>
            <ProductDescription>
                <ProductText>ESPADÍN <br/>

Clase: Joven<br/>

Manejo de cultivo: Siembra<br/>

Agave: Agave Angustifolia <br/>

Crecimiento del agave: 7 años<br/>

Destilaciones: Doble destilación en ollas de cobre<br/>

Tipo de horno: Cónico de piedra<br/>

Tipo de molienda: Tahoma de piedra jalada por un caballo</ProductText>
            </ProductDescription>
            <ProductImage src={pImage}/>
            </TopProduct>
            <ProductButton> Compra ahora</ProductButton>
        </ProductContainer>
        <ProductContainer>
            <TopProduct>
            <ProductDescription>
                <ProductText>ESPADÍN <br/>

Clase: Joven<br/>

Manejo de cultivo: Siembra<br/>

Agave: Agave Angustifolia <br/>

Crecimiento del agave: 7 años<br/>

Destilaciones: Doble destilación en ollas de cobre<br/>

Tipo de horno: Cónico de piedra<br/>

Tipo de molienda: Tahoma de piedra jalada por un caballo</ProductText>
            </ProductDescription>
            <ProductImage src={pImage}/>
            </TopProduct>
            <ProductButton> Compra ahora</ProductButton>
        </ProductContainer>
        
        
    </PageContainer>
  )
}

export default Products


const PageContainer = styled.div`

`
const ProductContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 5%;
margin-bottom: ${(props) => props.marginB || '0'};
align-items: center;
`

const TopProduct = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`



const ProductDescription = styled.div`
margin-right: 5%;
width: 30%;
padding: 1rem;
font-size: 1.7vw;
flex-wrap: wrap;
background-color: #00000092;
border-radius: 5px;
`
const ProductText = styled.p`
color: white;
letter-spacing: 2px;
word-spacing: 5px;
line-height:170%;
`

const ProductImage = styled.img`
height: 80%;

`


const ProductButton = styled.button`
background-color: #cc9f22;
margin: 3rem;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b68e1f;  /* Darken on hover */
  }

  &:active {
    background-color: #9f7d1b;  /* Even darker when active */
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }

`
