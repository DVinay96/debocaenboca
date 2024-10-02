import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

p{
  font-family: "Nanum Myeongjo", serif;
}
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: "Nanum Myeongjo", serif;
    color: #f5f5f5;
    background-color: rgba(92,14,14);
    }


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
