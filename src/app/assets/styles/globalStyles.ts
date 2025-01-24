import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  font-family: Helvetica, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors["base-font-color"]};
  background-color: ${({ theme }) => theme.colors["bg-color"]};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;

  @media (min-width: ${({ theme }) => theme.mediaQueries.tabletPortrait}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  #content {
    max-width: 1280px;
    height: calc(100vh - 48px);
    margin: 0 ${({ theme }) => theme.spacings.tablet};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: ${({ theme }) => theme.mediaQueries.tabletPortrait}) {
      margin: 0 auto;
    }
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: calc(${({ theme }) => theme.fontSizes.xl} / 1.5);
  margin: 0;

  @media (min-width: ${({ theme }) => theme.mediaQueries.tabletPortrait}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
}

button {
  width: 300px;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors["border-color"]};
  background-color: ${({ theme }) => theme.colors["accent-color"]};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.mediaQueries.tabletPortrait}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  &:hover,
  :focus {
    background-color: ${({ theme }) => theme.colors["accent-color-lighter"]};
  }
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

`;

export default GlobalStyle;
