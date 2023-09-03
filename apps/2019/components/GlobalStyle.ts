import { createGlobalStyle } from "styled-components";
import _reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${_reset}
  * {
    box-sizing: border-box;
  };
  a {
    text-decoration-line: none;
    color: rgb(0,0,0);
  }
  html{
    font-size: 16px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: 'Nanum Gothic', sans-serif;
  }
`;

export default GlobalStyle as any;
