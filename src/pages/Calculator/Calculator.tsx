import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import {
  CalButton,
  CalButtonValue
} from "../../components/CalButton/CalButton";
import { calculatorManager, symbols } from "../../services/calculatorManager";
import { CalScreen } from "../../components/CalScreen/CalScreen";

export const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>("0");

  useEffect(() => {
    calculatorManager.displayValue$.subscribe(x => {
      setDisplayValue(x);
    });
  }, []);

  function pressed(value: CalButtonValue) {
    calculatorManager.update(value);
  }

  return (
    <CalContainer>
      <CalScreen text={`${displayValue}`} />
      <CalRow>
        <CalButton onClick={pressed} text={"7"} value={7} />
        <CalButton onClick={pressed} text={"8"} value={8} />
        <CalButton onClick={pressed} text={"9"} value={9} />
        <CalButton
          onClick={pressed}
          text={"/"}
          value={symbols.divide}
          color={colors.grey}
        />
      </CalRow>

      <CalRow>
        <CalButton onClick={pressed} text={"4"} value={4} />
        <CalButton onClick={pressed} text={"5"} value={5} />
        <CalButton onClick={pressed} text={"6"} value={6} />
        <CalButton
          onClick={pressed}
          text={"-"}
          value={symbols.minus}
          color={colors.grey}
        />
      </CalRow>

      <CalRow>
        <CalButton onClick={pressed} text={"1"} value={1} />
        <CalButton onClick={pressed} text={"2"} value={2} />
        <CalButton onClick={pressed} text={"3"} value={3} />
        <CalButton
          onClick={pressed}
          text={"x"}
          value={symbols.times}
          color={colors.grey}
        />
      </CalRow>

      <CalRow>
        <CalButton onClick={pressed} text={"0"} value={0} />
        <CalButton onClick={pressed} text={"."} value={symbols.decimal} />
        <CalButton onClick={pressed} text={"DEL"} value={symbols.clear} />
        <CalButton
          onClick={pressed}
          text={"+"}
          value={symbols.plus}
          color={colors.grey}
        />
      </CalRow>

      <CalRow>
        <CalButton
          backgroundColor={colors.red}
          onClick={pressed}
          text={"="}
          value={symbols.equals}
          color={colors.white}
        />
      </CalRow>
    </CalContainer>
  );
};

const CalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.black};
  width: 500px;
  border-radius: 20px;
  box-shadow: 0px 17px 39px -10px rgba(0, 0, 0, 0.44);
`;

const CalRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
