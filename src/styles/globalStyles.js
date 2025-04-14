import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`


  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: #f5f5f5;
    background-color: rgba(242, 240, 233, 0.8);
    }
    body {
  font-family: 'Montserrat', sans-serif;
}

h1, h2, h3 {
  font-family: 'Catamaran', serif;
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

export const lightTheme = {
  body: "#EFF2F5",
  text: "#000",
  colorButtonCircle: "#404C77",
  boxShadow: "0px 2px 3px rgba(4, 4, 7, 0.1)",
  backgroundButton: "#FFF",
  border: "1px solid #eaedf1",
  colorSublink: "#6A788E",
  primary: "#B79E78",
  primary_scale1: "rgba(19, 129, 230, 0.6)",
  primary_scale2: "rgba(18, 139, 230, 0.2)",
  menu_category: "rgb(138, 152, 172)",
  menu_link_active: "#FFF",
  hover_color: "#eaedf1",
  success: "#5eba00",
  info: "#DBF1FF",
  warning: "#f1c40f",
  danger: "#cd201f",
  secondary: "#EA7634",
  purple: "#615BC6",
  Perdido: "#cd201f",
  Ganado: "#5eba00",
  Entregado: "#1D48D9",
  Terminado: "#5eba00",
  Creado: "#f1c40f",
  Facturado: "#615BC6",
  Pagado: "#5eba00",
  "Avance de obra": "#5eba00",
  Facturar: "#EA7634",
  Cancelado: "#cd201f",
  "En Ejecución": "#5eba00",
};
