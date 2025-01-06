import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import shopifyService from '../services/shopify';
import productImage from '../assets/images/product.png';

const Store = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await shopifyService.getProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, delta) => {
    setProductQuantities((prevQuantities) => {
      const newQuantity = Math.max(0, (prevQuantities[productId] || 0) + delta);
      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = productQuantities[product.id] || 0;
    if (quantity > 0) {
      addToCart({ ...product, quantity });
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: 0, // Reset quantity after adding to cart
      }));
    }
  };

  if (loading) return <LoadingMessage>Loading products...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <PageContainer>
      <Title>Nuestros Mezcales</Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage
              src={product.image?.url || productImage}
              alt={product.image?.altText || product.title}
            />
            <ProductDetails>
              <ProductName>{product.title}</ProductName>
              <ProductPrice>
                {product.price?.amount} {product.price?.currencyCode}
              </ProductPrice>
              <CartControls>
                <QuantityButton onClick={() => handleQuantityChange(product.id, -1)}>
                  -
                </QuantityButton>
                <CartCounter>{productQuantities[product.id] || 0}</CartCounter>
                <QuantityButton onClick={() => handleQuantityChange(product.id, 1)}>
                  +
                </QuantityButton>
              </CartControls>
              <AddToCartButton
                onClick={() => handleAddToCart(product)}
                disabled={!product.availableForSale || (productQuantities[product.id] || 0) === 0}
              >
                {product.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </AddToCartButton>
            </ProductDetails>
          </ProductCard>
        ))}
      </ProductGrid>
    </PageContainer>
  );
};

export default Store;



const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
  font-size: 1.2rem;
`;



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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const PageContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 3rem;
  color:  rgba(92,14,14);
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  padding: 2rem;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #e8d8c3, #b1a492);
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  animation: ${slideIn} 1s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 10px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductDetails = styled.div`
  text-align: center;
`;

const ProductName = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color:  black;
  font-weight: bold;
`;

const CartControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
`;

const QuantityButton = styled.button`
  background-color: rgba(92,14,14);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(92,14,14);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CartCounter = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  width: 40px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  background-color: #ffdd57;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffc800;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;


