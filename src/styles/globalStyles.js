import { createGlobalStyle } from "styled-components";
import backgroundImage from "../assets/images/background.jpg";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-family: 'Arial', sans-serif;
    color: #f5f5f5;
    background-size: cover;
    height: 100%;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${backgroundImage});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      z-index: -2; /* Keep it behind other content */
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(92, 14, 14, 0.5); /* Red tint with 50% opacity */
      z-index: -1; /* Place it over the image, but behind content */
    }
  }

  /* *, *::before, *::after {
    box-sizing: inherit;
  } */

  
  

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

`;

export default GlobalStyle;
