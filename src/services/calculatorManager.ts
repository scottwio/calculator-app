import { BehaviorSubject, merge } from "rxjs";
import { CalButtonValue } from "../components/CalButton/CalButton";

export enum symbols {
  none = "NONE",
  plus = "PLUS",
  minus = "MINUS",
  times = "TIMES",
  divide = "DIVIDE",
  equals = "EQUALS",
  clear = "CLEAR",
  decimal = "DECIMAL"
}

export enum editingValue {
  first = "FIRST",
  second = "SECOND"
}

function CalculatorManager() {
  let secondValue = "";
  let firstValue = "";
  let total = 0;
  let symbol = symbols.equals;
  let editing = editingValue.first;
  const displayTotal$ = new BehaviorSubject<string>("0");
  const displayNumber$ = new BehaviorSubject<string>("0");
  const display$ = merge(displayTotal$, displayNumber$);

  function update(value: CalButtonValue) {
    const clearPressed = value === symbols.clear;

    if (clearPressed) {
      clear();
      return;
    }

    if (typeof value === "number") {
      numberPress(value);
    } else {
      symbolPressed(value);
    }
  }

  function numberPress(value: number) {
    const equalsDirectlyPressAfterNumber = symbol === symbols.equals;

    if (equalsDirectlyPressAfterNumber) {
      clear();
    }

    if (editing === editingValue.first) {
      firstValue = `${firstValue}${value}`;
      displayNumber$.next(firstValue);
    } else {
      secondValue = `${secondValue}${value}`;
      displayNumber$.next(secondValue);
    }
  }

  function symbolPressed(value: symbols) {
    const equalsPressed = value === symbols.equals;
    const decimalPressed = value === symbols.decimal;
    const completedAddingFirstValue = editing === editingValue.first;
    const enteringFirstSymbol = symbol === symbols.equals;
    const inputsComplete = firstValue && secondValue;

    if (equalsPressed) {
      total = calculator(Number(firstValue), symbol, Number(secondValue));
      firstValue = `${total}`;
      secondValue = ``;
      symbol = value;
      editing = editingValue.second;
      displayTotal$.next(`${total}`);
      return;
    }

    if (decimalPressed) {
      editing === editingValue.first
        ? (firstValue = `${firstValue}.`)
        : (secondValue = `${secondValue}.`);
      return;
    }

    if (completedAddingFirstValue) {
      symbol = value;
      editing = editingValue.second;
      return;
    }

    if (enteringFirstSymbol) {
      symbol = value;
      return;
    }

    if (inputsComplete) {
      total = calculator(Number(firstValue), symbol, Number(secondValue));
      firstValue = `${total}`;
      secondValue = "";
      editing = editingValue.second;
      displayTotal$.next(`${total}`);
      return;
    }
  }

  function clear() {
    secondValue = "";
    firstValue = "";
    editing = editingValue.first;
    total = 0;
    symbol = symbols.none;
    displayTotal$.next(`${0}`);
  }

  function calculator(
    firstValue: number,
    symbol: symbols,
    secondValue: number
  ) {
    switch (symbol) {
      case symbols.plus:
        return firstValue + secondValue;
      case symbols.minus:
        return firstValue - secondValue;
      case symbols.divide:
        return firstValue / secondValue;
      case symbols.times:
        return firstValue * secondValue;
      default:
        return 0;
    }
  }

  return {
    update,
    total$: displayTotal$,
    displayValue$: display$
  };
}

export const calculatorManager = CalculatorManager();
