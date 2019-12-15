import React from "react";
import styled from "styled-components";
import { FontLarge } from "../../styles/fonts";

export const Container = styled.span`
  display: block;
  width: 100%;
  margin-right: 80px;
  padding-top: 10px;
`;

type CalScreenProps = {
  text: string;
};

export const CalScreen: React.FC<CalScreenProps> = ({ text }) => {
  return (
    <Container>
      <FontLarge align={"right"}>{text}</FontLarge>
    </Container>
  );
};
