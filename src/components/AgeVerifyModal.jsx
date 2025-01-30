import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/images/logo.png'; // Adjust path accordingly

const AgeVerifyModal = ({ onVerify }) => {
  const [error, setError] = useState('');

  const handleYes = () => {
    onVerify(true);
  };

  const handleNo = () => {
    setError('Debes de ser mayor de edad para accesar al contenido');
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <LogoImage src={Logo} alt="Site Logo" />
        <ModalHeader>¿Eres mayor de edad?</ModalHeader>
        <ButtonDiv>
          <ModalButton onClick={handleYes}>Sí</ModalButton>
          <ModalButton onClick={handleNo}>No</ModalButton>
        </ButtonDiv>
        {error && (
          <ErrorContainer>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorContainer>
        )}
      </ModalContent>
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
  background: rgba(0, 0, 0, 0.75);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 100%;
  max-width: 400px;
  color: #fff;
`;

const LogoImage = styled.img`
  width: 30vh;
  margin-bottom: 1rem;
`;

const ModalHeader = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  background-color: rgba(92,14,14);
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a01010;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;


const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-weight: bold;
`;
