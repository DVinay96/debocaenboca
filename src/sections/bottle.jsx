import React from "react";
import styled from "styled-components";
import TopTitle from "../components/TopTitle";
import Subtitle from "../components/Subtitle";
import bottle from "../assets/images/botella.png";
import bg from "../assets/images/bg.png";
import iconBottle1 from "../assets/images/icon_bottle_1.png";
import iconBottle2 from "../assets/images/icon_bottle_2.png";
import iconBottle3 from "../assets/images/icon_bottle_3.png";
import iconBottle4 from "../assets/images/icon_bottle_4.png";

const Buttle = () => {
  const data = [
    {
      id: 1,
      logo: bottle,
      title: "Origen Artesanal",
      description:
        "Proveniente de comunidades oaxaqueñas donde el mezcal se produce de forma tradicional, con técnicas heredadas por generaciones y respeto por la tierra.",
      icon: iconBottle1,
    },
    {
      id: 2,
      title: "Cocción en Horno Cónico",
      description:
        "Nuestro agave se cuece en hornos de piedra bajo tierra, lo que aporta ese sabor ahumado distintivo que nos diferencia.",
      icon: iconBottle2,
    },
    {
      id: 3,
      title: "Molienda con Tahona",
      description:
        "Molienda lenta con tahona jalada por bestia, que conserva los sabores naturales y respeta el agave.",
      icon: iconBottle3,
    },
    {
      id: 4,
      title: "Maduración y Reposo",
      description:
        "Cada lote descansa el tiempo necesario para lograr un equilibrio entre la intensidad del agave y la suavidad en boca.",
      icon: iconBottle4,
    },
  ];

  return (
    <Section>
      <Container>
        <Texts>
          <TopTitle>Receta Original</TopTitle>
          <Subtitle size="XL">Mezcal Refinado</Subtitle>
        </Texts>
        <Bg>
          <ImgContainer>
            <Img src={bottle} alt="" />
          </ImgContainer>
          {data.map((item) => (
            <Card key={item.id}>
              <img src={item.icon} alt="" />
              <Subtitle>{item.title}</Subtitle>
              <p>{item.description}</p>
            </Card>
          ))}
        </Bg>
      </Container>
    </Section>
  );
};

export default Buttle;

const Bg = styled.div`
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center calc(50% + 60px);
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 350px 1fr 350px;
  grid-template-areas:
    "text1 bg text2"
    "text3 bg text4";

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "text1"
      "text2"
      "text3"
      "text4";

    background-image: none;
  }
`;

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

const ImgContainer = styled.div`
  grid-area: bg;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    width: 250px;
  }

  p {
    font-size: 0.9rem;
    margin: 10px 0;
    line-height: 1.5;
  }
`;
