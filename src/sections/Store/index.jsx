
import styled from "styled-components";
import Subtitle from "../../components/Subtitle";
import TopTitle from "../../components/TopTitle";
import Card from "../../components/Card";

const Store = () => {


  const products = [
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
    price: 1599,
    info: "Cristalino, suave percepción de hierbas de campo, aroma cítrico, predominante el té de limón y naranja, textura suave, sabores equilibrados herbáceos y frutales, cítricos, con notas de dulzura al final",
    award: "Medalla de Oro: 92 puntos",
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
    price: 1399,
    info: "El mezcal espadín tiene una textura dulce y herbácea, bien equilibrada con notas de manzana dulce, frutas maduras y una suave capa ahumada para finalizar.",
    award: "Medalla de Plata: 85 puntos",
  },
  {
    id: 2,
    name: "MEXICANO",
    clase: "Joven",
    cultivo: "Silvestre",
    agave: "Agave Rhodacantha",
    crecimiento: "8-10 años",
    destilacion: "Doble destilación en ollas de cobre",
    horno: "Cónico de piedra",
    molienda: "Tahoma de piedra jalada por un caballo",
    price: 1899,
    info: "Tiene aromas frutales, terrosas, dulces y sutiles el sabor al inicio presenta notas herbales y frutales dejando un bouquet a fruta fermentada",
    award: "Medalla de Plata: 85 puntos",
  },
];

  return (
    <Section>
      <Container>
        <Texts>
          <TopTitle>La selección</TopTitle>
          <Subtitle size="XL">El mezcal original</Subtitle>
        </Texts>
        <ProductContainer>
    
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
