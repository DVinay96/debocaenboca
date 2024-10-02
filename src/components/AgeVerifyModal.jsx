import React, {useState} from 'react'
import styled from 'styled-components';

const AgeVerifyModal = ({onVerify}) => {

const [error, setError] = useState('')


const handleYes = () => {
    onVerify(true);
  };

  const handleNo = () => {
    setError('Sorry, you must be 18 years or older to enter.');
  };

  return (
    <ModalWrapper>
        <h1>¿Eres mayor de edad?</h1>
        <ButtonDiv>
            <ModalButton onClick={handleYes}>Si</ModalButton>
            <ModalButton onClick={handleNo}>No</ModalButton>
        </ButtonDiv>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </ModalWrapper>
  )
}

export default AgeVerifyModal


const ModalWrapper = styled.div`

`
const ButtonDiv = styled.div`

`
const ModalButton = styled.button`

`