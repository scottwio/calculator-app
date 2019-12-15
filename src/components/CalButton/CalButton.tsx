import React from "react";
import styled from "styled-components";
import { FontMedium } from "../../styles/fonts";
import { symbols as CalSymbols } from "../../services/calculatorManager";

export type CalButtonValue = number | CalSymbols;

export type CalButtonProps = {
  text: string;
  value: CalButtonValue;
  color?: string;
  backgroundColor?: string;
  onClick: (value: CalButtonValue) => void;
};

type ContainerProps = { backgroundColor?: string };
export const Container = styled.button<ContainerProps>`
  display: flex;
  width: 100%;
  margin: 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor || "transparent"};
`;

export const CalButton: React.FC<CalButtonProps> = ({
  text,
  color,
  onClick,
  value,
  backgroundColor
}) => {
  return (
    <Container backgroundColor={backgroundColor} onClick={() => onClick(value)}>
      <FontMedium color={color}>{text}</FontMedium>
    </Container>
  );
};
