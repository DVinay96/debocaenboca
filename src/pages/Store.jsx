import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import shopifyService from "../services/shopify";
import productImage from "../assets/images/product.png";
import storeBg from "../assets/images/store_hero.png";

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
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

const Store = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await shopifyService.getProducts();
        setProducts(productsData);
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

  // Simple implementation - expand with real categories from your products
  const filters = [
    { id: "all", name: "All Products" },
    { id: "espadín", name: "Espadín" },
    { id: "ensamble", name: "Ensamble" },
    { id: "tobalá", name: "Tobalá" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      activeFilter === "all" ||
      product.title.toLowerCase().includes(activeFilter.toLowerCase());

    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <PageContainer>
      <StoreHeader>
        <GradientOverlay />
        <StoreHeaderContainer>
          <Subtitle>Descubre nuestra selección artesanal</Subtitle>
        </StoreHeaderContainer>
      </StoreHeader>

      <FiltersContainer>
        <FilterButtons>
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </FilterButton>
          ))}
        </FilterButtons>
        <SearchInput
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FiltersContainer>
      <Container>
        {loading ? (
          <LoadingContainer>
            <Spinner />
            <LoadingText>Cargando productos...</LoadingText>
          </LoadingContainer>
        ) : error ? (
          <ErrorContainer>
            <ErrorMessage>{error}</ErrorMessage>
            <RetryButton onClick={() => window.location.reload()}>
              Intentar nuevamente
            </RetryButton>
          </ErrorContainer>
        ) : (
          <>
            <ResultCount>
              {filteredProducts.length} producto
              {filteredProducts.length !== 1 ? "s" : ""} encontrado
              {filteredProducts.length !== 1 ? "s" : ""}
            </ResultCount>

            <ProductsGrid>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  addToCart={addToCart}
                />
              ))}
            </ProductsGrid>

            {filteredProducts.length === 0 && (
              <NoResultsMessage>
                No se encontraron productos que coincidan con tu búsqueda.
              </NoResultsMessage>
            )}
          </>
        )}
      </Container>
    </PageContainer>
  );
};

const ProductCard = ({ product, index, addToCart }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [quantity, setQuantity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(0, prev + delta));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...product, quantity });
      setQuantity(0); // Reset quantity after adding to cart
    }
  };

  return (
    <CardContainer
      ref={ref}
      className={isVisible ? "visible" : ""}
      animationDelay={index * 0.1}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardImageContainer>
        <CardImage
          src={product.image?.url || productImage}
          alt={product.image?.altText || product.title}
        />
        {product.availableForSale ? (
          <ProductTag>Disponible</ProductTag>
        ) : (
          <ProductTag outOfStock>Agotado</ProductTag>
        )}
      </CardImageContainer>

      <CardContent>
        <ProductName>{product.title}</ProductName>
        <ProductDescription>
          {product.description ||
            "Mezcal artesanal de la más alta calidad, elaborado en Oaxaca."}
        </ProductDescription>
        <PriceRow>
          <ProductPrice>
            ${product.price?.amount} {product.price?.currencyCode || "MXN"}
          </ProductPrice>
        </PriceRow>

        <CardActions>
          <QuantityControl>
            <QuantityButton
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 0}
            >
              −
            </QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton
              onClick={() => handleQuantityChange(1)}
              disabled={!product.availableForSale}
            >
              +
            </QuantityButton>
          </QuantityControl>

          <AddButton
            onClick={handleAddToCart}
            disabled={!product.availableForSale || quantity === 0}
          >
            Agregar al carrito
          </AddButton>
        </CardActions>
      </CardContent>
    </CardContainer>
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

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(92, 14, 14, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(92, 14, 14, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(92, 14, 14, 0);
  }
`;

// Styled Components
const PageContainer = styled.div``;

const StoreHeader = styled.header`
  background-image: url(${storeBg});
  background-position: center calc(100% + 100px);
  background-size: cover;
  text-align: center;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoreHeaderContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #fff;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FiltersContainer = styled.div`
  margin-bottom: 2rem;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.active ? "#5c0e0e" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#5c0e0e")};
  border: 1px solid #5c0e0e;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? "#5c0e0e" : "rgba(92, 14, 14, 0.1)"};
  }
`;

const SearchInput = styled.input`
  width: 250px;
  padding: 0.7rem 1rem;
  margin-right: 1rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #5c0e0e;
    box-shadow: 0 0 0 3px rgba(92, 14, 14, 0.1);
  }
`;

const ResultCount = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CardContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;

  &.visible {
    animation: ${fadeIn} 0.8s forwards;
    animation-delay: ${(props) => props.animationDelay || 0}s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ProductTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${(props) => (props.outOfStock ? "#e74c3c" : "#5c0e0e")};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;

  /* Limit to 3 lines of text */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #5c0e0e;
`;

const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  flex: 0 0 40px;
  height: 40px;
  border: none;
  background-color: #5c0e0e;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #7c1a1a;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const AddButton = styled.button`
  background-color: #5c0e0e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #7c1a1a;
    animation: ${pulseAnimation} 1.5s infinite;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #5c0e0e;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 10px;
  margin: 2rem 0;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background-color: #5c0e0e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #7c1a1a;
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  );
  pointer-events: none;
  z-index: 1;
`;

const Container = styled.div`
  padding: 0 2rem;
`;

export default Store;
