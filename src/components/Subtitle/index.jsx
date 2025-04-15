import React from "react";
import styled from "styled-components";
const Title = ({ children, size, align = "center" }) => {
  return <StyledSubtitle size={size}> {children}</StyledSubtitle>;
};

export default Title;

const StyledSubtitle = styled.div`
  font-size: ${(props) =>
    props.size === "XL" ? "2.5rem" : props.size === "XS" ? ".9rem" : "1.2rem"};
  font-family: "Catamaran", sans-serif;
  text-align: ${(props) => props.align};
  letter-spacing: ${(props) => (props.size === "XL" ? "10px" : "5px")};
  text-transform: uppercase;
  margin: 0.1rem 0;
  color: ${(props) => props.theme.white};
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: ${(props) => (props.size === "XL" ? "2rem" : "1rem")};
  }
`;
