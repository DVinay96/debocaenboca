import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shopifyService from '../services/shopify';
import { Link } from 'react-router-dom';

const Cart = ({ cart, removeFromCart }) => {

  const handleCheckout = async () => {
    try {
      // Add loading state if you want to show a spinner
      const checkoutUrl = await shopifyService.createCheckout(groupedCart);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error creating your checkout. Please try again.');
    }
  };

  const groupedCart = cart.reduce((acc, product) => {
    const existingProduct = acc.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      acc.push({ ...product });
    }
    return acc;
  }, []);


  const totalPrice = groupedCart.reduce(
    (total, product) => total + (parseFloat(product.price?.amount || 0) * product.quantity),
    0
  );

  return (
    <CartContainer>
      <h1>Gracias por tu compra!</h1>
      {cart.length > 0 ? (
        <CartItems>
          {groupedCart.map((product) => (
  <CartItem key={product.id}>
    <ProductImage 
      src={product.image?.url || '/api/placeholder/150/150'} 
      alt={product.title}
    />
    <ProductDetails>
      <ProductName>{product.title}</ProductName>
      <ProductPrice>
        ${parseFloat(product.price?.amount || 0).toFixed(2)}{' '}
        {product.price?.currencyCode}
      </ProductPrice>
      <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
      <ProductSubtotal>
        Subtotal: ${(parseFloat(product.price?.amount || 0) * product.quantity).toFixed(2)}
      </ProductSubtotal>
    </ProductDetails>
    <ButtonsContainer>
      <RemoveButton onClick={() => removeFromCart(product.id)}>
        Remover
      </RemoveButton>
    </ButtonsContainer>
  </CartItem>
))}
          <TotalPrice>SubTotal: ${totalPrice.toFixed(2)}</TotalPrice>
          <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
        </CartItems>
      ) : (
        <EmptyCart>Tu Carrito está vacio.
          <StoreButton> <Link href="/tienda">Volver a la tienda</Link></StoreButton>
        </EmptyCart>
        
      )}
    </CartContainer>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        currencyCode: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;

const CartContainer = styled.div`
  padding: 2rem;
  text-align: center;
  
  h1{
    color: black;
  }
`;

const CartItems = styled.div`
  margin-top: 2rem;
`;

const CartItem = styled.div`
  margin: 0 5rem;
  display: grid;
  grid-template-columns: 150px 1fr auto auto;
  gap: 1.5rem;
  align-items: center;
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


const CheckoutButton = styled.button`
background-color: #4CAF50;
color: white;
border: none;
padding: 1rem 2rem;
border-radius: 4px;
cursor: pointer;
font-size: 1.1rem;
margin-top: 2rem;
width: 100%;
max-width: 300px;
transition: background-color 0.3s, transform 0.2s;

&:hover {
  background-color: #45a049;
  transform: scale(1.02);
}

&:active {
  background-color: #3d8b40;
}

&:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
}
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: black
`;

const ProductPrice = styled.p`
  color: #888;
  margin: 0.5rem 0;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e04343;
  }

  &:active {
    background-color: #c93636;
  }
`;

const TotalPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  color: black;
`;

const EmptyCart = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  color: #888;
  align-items: center;
`;


const ProductQuantity = styled.p`
  color: #666;
  margin: 0.25rem 0;
`;

const ProductSubtotal = styled.p`
  font-weight: bold;
  color: #444;
  margin: 0.25rem 0;
`;

const StoreButton = styled.button`
  background-color: #cc9f22;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 300px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #a8831c;
    transform: scale(1.02);
  }

  &:active {
    background-color: #584510;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;