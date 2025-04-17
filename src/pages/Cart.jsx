import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import shopifyService from '../services/shopify';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaShoppingBag, FaSpinner } from 'react-icons/fa';
import { useCart } from "../contexts/CartContext";


const Cart = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);  
  const { cart, removeFromCart } = useCart();


  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      setCheckoutError(null);
      
      const checkoutUrl = await shopifyService.createCheckout(groupedCart);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError('Hubo un error al procesar tu compra. Por favor intenta de nuevo.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const groupedCart = cart?.reduce((acc, product) => {
    const existingProduct = acc.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      acc.push({ ...product });
    }
    return acc;
  }, []) || [];

  const subtotal = groupedCart.reduce(
    (total, product) => total + (parseFloat(product.price?.amount || 0) * product.quantity),
    0
  );
  
  // Estimated values for display purposes
  const shipping = subtotal > 0 ? 150 : 0;
  const tax = subtotal * 0.16; // 16% IVA
  const total = subtotal + shipping + tax;

  return (
    <CartPageContainer>
      <CartHeader>
        <CartTitle>
          <FaShoppingCart size={24} />
          Tu Carrito
        </CartTitle>
        {cart && cart.length > 0 && (
          <CartSummary>
            {groupedCart.length} {groupedCart.length === 1 ? 'producto' : 'productos'}
          </CartSummary>
        )}
      </CartHeader>

      {cart && cart.length > 0 ? (
        <CartContent>
          <CartItemsSection>
            {groupedCart.map((product) => (
              <CartItemCard key={product.id}>
                <ItemImageContainer>
                  <ItemImage 
                    src={product.image?.url || '/api/placeholder/150/150'} 
                    alt={product.title || 'Producto'}
                  />
                </ItemImageContainer>
                
                <ItemDetails>
                  <ItemName>{product.title}</ItemName>
                  <ItemPrice>
                    ${parseFloat(product.price?.amount || 0).toFixed(2)} {product.price?.currencyCode || 'MXN'}
                  </ItemPrice>
                  <ItemQuantity>
                    <QuantityLabel>Cantidad:</QuantityLabel>
                    <QuantityValue>{product.quantity}</QuantityValue>
                  </ItemQuantity>
                </ItemDetails>
                
                <ItemActions>
                  <ItemSubtotal>
                    ${(parseFloat(product.price?.amount || 0) * product.quantity).toFixed(2)}
                  </ItemSubtotal>
                  <RemoveButton onClick={() => removeFromCart(product.id)}>
                    <FaTrash size={14} />
                    <span>Eliminar</span>
                  </RemoveButton>
                </ItemActions>
              </CartItemCard>
            ))}
            
            <ContinueShoppingLink to="/tienda">
              <FaArrowLeft size={14} />
              <span>Continuar comprando</span>
            </ContinueShoppingLink>
          </CartItemsSection>
          
          <OrderSummarySection>
            <SummaryCard>
              <SummaryTitle>Resumen del Pedido</SummaryTitle>
              
              <SummaryRow>
                <SummaryLabel>Subtotal</SummaryLabel>
                <SummaryValue>${subtotal.toFixed(2)}</SummaryValue>
              </SummaryRow>
              
              <SummaryRow>
                <SummaryLabel>Envío (estimado)</SummaryLabel>
                <SummaryValue>${shipping.toFixed(2)}</SummaryValue>
              </SummaryRow>
              
              <SummaryRow>
                <SummaryLabel>Impuestos (16% IVA)</SummaryLabel>
                <SummaryValue>${tax.toFixed(2)}</SummaryValue>
              </SummaryRow>
              
              <SummaryDivider />
              
              <TotalRow>
                <TotalLabel>Total</TotalLabel>
                <TotalValue>${total.toFixed(2)} MXN</TotalValue>
              </TotalRow>
              
              <CheckoutButton 
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <FaSpinner size={16} className="spinner" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <FaShoppingBag size={16} />
                    <span>Finalizar Compra</span>
                  </>
                )}
              </CheckoutButton>
              
              {checkoutError && (
                <ErrorMessage>{checkoutError}</ErrorMessage>
              )}
              
              <PaymentSecurityNote>
                Pago 100% seguro. Todos los datos están protegidos.
              </PaymentSecurityNote>
            </SummaryCard>
          </OrderSummarySection>
        </CartContent>
      ) : (
        <EmptyCartContainer>
          <EmptyCartIcon>
            <FaShoppingCart size={60} />
          </EmptyCartIcon>
          <EmptyCartTitle>Tu carrito está vacío</EmptyCartTitle>
          <EmptyCartMessage>
            Parece que aún no has agregado productos a tu carrito.
          </EmptyCartMessage>
        </EmptyCartContainer>
      )}
    </CartPageContainer>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      price: PropTypes.shape({
        amount: PropTypes.string,
        currencyCode: PropTypes.string,
      }),
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
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


const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Styled Components
const CartPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  animation: ${fadeIn} 0.5s ease;
  min-height: 70vh;
  height: 100%;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const CartHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const CartTitle = styled.h1`
  font-size: 2.2rem;
  color: #5c0e0e;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CartSummary = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
  }
`;

const CartItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItemCard = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${slideIn} 0.4s ease forwards;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;
    padding: 1rem;
  }
`;

const ItemImageContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    grid-row: span 2;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
  
  ${CartItemCard}:hover & {
    transform: scale(1.05);
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    grid-column: 2;
  }
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityLabel = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const QuantityValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    grid-column: 2;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const ItemSubtotal = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #5c0e0e;
  margin: 0;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #e74c3c;
  }
`;

const ContinueShoppingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #5c0e0e;
  font-size: 1rem;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.2s ease;
  align-self: flex-start;
  margin-top: 1rem;
  
  &:hover {
    color: #7c1a1a;
    text-decoration: underline;
  }
`;

const OrderSummarySection = styled.div``;

const SummaryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SummaryLabel = styled.span`
  color: #666;
`;

const SummaryValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const SummaryDivider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 1.5rem 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const TotalLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const TotalValue = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: #5c0e0e;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: #5c0e0e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  transition: background-color 0.2s ease, transform 0.2s ease;
  margin-bottom: 1rem;
  
  &:hover:not(:disabled) {
    background-color: #7c1a1a;
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .spinner {
    animation: ${spin} 1s linear infinite;
  }
`;

const PaymentSecurityNote = styled.p`
  text-align: center;
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
`;

const EmptyCartIcon = styled.div`
  color: #ddd;
  margin-bottom: 1.5rem;
`;

const EmptyCartTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
`;

const EmptyCartMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
`;


export default Cart;