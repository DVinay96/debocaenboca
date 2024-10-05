import React, { useState } from 'react';
import styled from 'styled-components';

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
        <ModalHeader>¿Eres mayor de edad?</ModalHeader>
        <ButtonDiv>
          <ModalButton onClick={handleYes}>Si</ModalButton>
          <ModalButton onClick={handleNo}>No</ModalButton>
        </ButtonDiv>
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #00000092;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const ModalHeader = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  background-color: #bcbcbc;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgba(92,14,14);
  }
`;

const ErrorMessage = styled.p`
  color: #ffffff;
  margin-top: 1rem;
`;