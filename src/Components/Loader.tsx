import React from "react";
import styled from "styled-components";
import { useT } from "../Translation/context";

const Container = styled.div`
  height: calc(100vh-50px);
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 32px;
  margin-top: 30px;
`;

export default () => (
  <Container>
    <span>{useT()("Loading...")}</span>
  </Container>
);
