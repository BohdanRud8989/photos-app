"use client";

import styled from "styled-components";

const Container = styled.article`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: auto;
`;
const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacings.mobile};
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;
const Description = styled.p`
  text-align: center;
`;

/**
 * Error view - Used as Fallback component in ErrorBoundary
 * @returns {JSX.Element}
 */
const ErrorView = () => (
  <Container>
    <Title>Warning!</Title>
    <Description>
      An error has occurred! <br />
      Please refresh the page and try again.
    </Description>
  </Container>
);

export default ErrorView;
