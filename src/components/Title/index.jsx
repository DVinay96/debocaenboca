import React from "react";
import styled from "styled-components";
const Title = ({ children, size }) => {
  return <StyledTitle size={size}> {children}</StyledTitle>;
};

export default Title;

const StyledTitle = styled.div`
  font-size: ${(props) => (props.size === "XL" ? "5rem" : "1.5rem")};
  font-family: "Rakkas", sans-serif;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 19px;
  margin: 1rem 0;
  color: ${(props) => props.theme.white};
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 3rem;
    letter-spacing: 10px;
  }
`;
