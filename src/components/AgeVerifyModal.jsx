import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowRightAlt } from "react-icons/md";

const AgeVerifyModal = ({ onVerify }) => {
  const [error, setError] = useState("");

  const handleYes = () => {
    onVerify(true);
  };

  const handleNo = () => {
    setError("Debes de ser mayor de edad para accesar al contenido");
    window.location.href = "https://www.google.com";
  };

  return (
    <ModalWrapper>
      <ModalContainer>
        <ModalContent>
          <Container>
            <Line />
            <Text>Verificación de edad</Text>
            <Line />
          </Container>
          <ModalHeader>¿Eres mayor de edad?</ModalHeader>
          <Text>
            Al ingresar a este sitio, acepta nuestra Política de privacidad.
          </Text>
          <Paragraph>
            Para acceder a este sitio web, debes tener 18 años o más. Verifica
            tu edad para ver el contenido.
          </Paragraph>
          <ButtonDiv>
            <ModalButton onClick={handleYes}>
              Si <MdArrowRightAlt />
            </ModalButton>
            <ModalButton onClick={handleNo}>
              No <MdArrowRightAlt />
            </ModalButton>
          </ButtonDiv>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ModalContent>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default AgeVerifyModal;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25vw;
  height: 25vh;

  @media (max-width: 768px) {
    width: 80vw;
    height: 60vh;
  }
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  display: flex;
  width: 50vw;
  height: 50vh;
  padding: 1rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }
`;

const ModalHeader = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1;
  text-align: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.primary};
  cursor: pointer;
  transition: background-color 0.3s ease;

  & svg {
    margin-left: 0.5rem;
  }

  &:nth-child(2) {
    background-color: #fff;
    color: #2d2d2d;

    &:hover {
      background-color: ${(props) => props.theme.primary};
      color: white;
    }
  }

  &:hover {
    background-color: #fff;
    color: #2d2d2d;
  }
`;

const ErrorMessage = styled.p`
  color: #ffffff;
  margin-top: 1rem;
`;

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

const Paragraph = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #2d2d2d;
  line-height: 1.5;
`;
