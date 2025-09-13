import React from "react";
import styled from "styled-components";
import Subtitle from "../Subtitle";
import botellaDemo from "../../assets/images/botella demo.png";
import bottle from "../../assets/images/bg.png";
import { Link } from "react-router-dom";
import Button from "../Button";

const Card = ({ product }) => {


  return (
    <CardContainer>
      <Subtitle size="XS">{(product.name)}</Subtitle>
      <p>{product.info}</p>
      <ImagenContainer>
        <Image src={botellaDemo} alt={product.title} />
      </ImagenContainer>
      <p>Precio</p>
      <Price>${product.price} </Price>
      { product.compareAtPrice?.amount ? 
      (<ComparePrice>
          ${product?.compareAtPrice?.amount}
      </ComparePrice> 
      ) : null}
      
      <Link to="/tienda">
        <Button icon inverted>
          Ver más
        </Button>
      </Link>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  padding: 20px;
  text-align: center;
  border-left: 1px solid #e6ddd0;
  border-right: 1px solid #e6ddd0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & a {
    & button {
      color: #333;
    }
  }
`;

const Image = styled.img`
  height: 350px;
`;

const ImagenContainer = styled.div`
  background-image: url(${bottle});
  background-size: contain;
  background-position: center calc(50% + 60px);
  background-repeat: no-repeat;
  width: 100%;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
`;
const ComparePrice = styled.span`
  text-decoration: line-through;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;