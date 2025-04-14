import React from "react";
import styled from "styled-components";

const TopTitle = ({ children }) => {
  return (
    <Container>
      <Line />
      <Text>{children}</Text>
      <Line />
    </Container>
  );
};

export default TopTitle;

const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const Line = styled.div`
  width: 30px;
  height: 1px;
  background-color: ${(props) =>
    props.theme.primary}; // Un dorado suave como el de la imagen
`;

const Text = styled.span`
  padding: 0 1rem;
  font-style: italic;
  color: ${(props) => props.theme.primary};
  font-size: 0.9rem;
  text-align: center;
`;
