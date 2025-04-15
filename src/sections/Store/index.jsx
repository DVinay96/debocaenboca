import React, { useState, useEffect } from "react";
import shopifyService from "../../services/shopify";
import styled from "styled-components";
import Subtitle from "../../components/Subtitle";
import TopTitle from "../../components/TopTitle";
import Card from "../../components/Card";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await shopifyService.getProducts();
        setProducts(
          productsData.map((product) => {
            let newDescription = "";

            switch (true) {
              case product.title.includes("Espadín Joven"):
                newDescription = "Un clásico para paladares tradicionales";
                break;
              case product.title.includes("Ensamble Espadín/Mexicano"):
                newDescription = "Elixir artesanal con sabores únicos";
                break;
              case product.title.includes("Mexicano Joven"):
                newDescription = "Destilado a ser referente de los conocedores";
                break;
              default:
                newDescription = product.description;
            }

            return {
              ...product,
              newDescription,
            };
          })
        );
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Section>
      <Container>
        <Texts>
          <TopTitle>La selección</TopTitle>
          <Subtitle size="XL">El mezcal original</Subtitle>
        </Texts>
        <ProductContainer>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </ProductContainer>
      </Container>
    </Section>
  );
};

export default Store;

const Section = styled.section`
  margin: 100px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  width: 75%;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
