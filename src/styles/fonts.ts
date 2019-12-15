import styled from "styled-components";
import { colors } from "./colors";

export const fontFamilies = {
  mono: "'Space Mono', monospace"
};

const fontSizes = {
  sizeMed: "44px",
  sizeLarge: "70px"
};

type FontProps = { color?: string; align?: string };

export const FontMedium = styled.span<FontProps>`
  font-family: ${fontFamilies.mono};
  font-weight: 200;
  color: ${props => props.color || colors.white};
  text-align: ${props => props.align || "left"};
  font-size: ${fontSizes.sizeMed};
`;

export const FontLarge = styled.span<FontProps>`
  font-family: ${fontFamilies.mono};
  font-weight: 600;
  text-align: right;
  display: block;
  text-align: ${props => props.align || "left"};
  color: ${props => props.color || colors.white};
  font-size: ${fontSizes.sizeLarge};
`;
