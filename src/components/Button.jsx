import React from "react";
import styled from "styled-components";
import { MdArrowRightAlt } from "react-icons/md";

const Button = ({ children, icon = false, inverted }) => {
  return (
    <StyledButton inverted={inverted}>
      {children}
      {icon && <MdArrowRightAlt />}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.inverted ? "transparent" : props.theme.primary};

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

  &:hover {
    background-color: ${(props) =>
      props.inverted ? props.theme.primary : "#fff"};
    color: ${(props) => (props.inverted ? "#fff" : props.theme.primary)};
  }
`;
