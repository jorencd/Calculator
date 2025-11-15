import React, { useState } from "react";
import './Calculator.css'; // We're using the updated CSS for styling

function Calculator() {
  const [display, setDisplay] = useState("0"); // Display of the current number
  const [operator, setOperator] = useState(null); // Store the current operator
  const [prevValue, setPrevValue] = useState(null); // Store the previous value for calculations
  const [waitingForNewValue, setWaitingForNewValue] = useState(false); // Check if we're waiting for the next number

  // Handle number click
  const handleNumberClick = (num) => {
    if (waitingForNewValue) {
      setDisplay(num); // Start a new number if waiting for new value
      setWaitingForNewValue(false);
    } else {
      setDisplay((prevDisplay) =>
        prevDisplay === "0" ? num : prevDisplay + num // Append number to display
      );
    }
  };

  // Handle operator click
  const handleOperatorClick = (op) => {
    if (waitingForNewValue) {
      setOperator(op); // If waiting for new value, just update the operator
      return;
    }

    if (prevValue == null) {
      setPrevValue(parseFloat(display)); // Save the current number as the previous value
    } else if (operator) {
      // If an operator exists, calculate the result using the previous and current value
      const currentValue = parseFloat(display);
      const newValue = operate(prevValue, currentValue, operator);
      setDisplay(String(newValue)); // Display the result
      setPrevValue(newValue); // Set the result as the previous value for further operations
    }

    setOperator(op); // Set the operator for future calculation
    setWaitingForNewValue(true); // Set the flag to wait for a new number
  };

  // Handle decimal click
  const handleDecimalClick = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Handle clear click
  const handleClearClick = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  // Handle equals click
  const handleEqualsClick = () => {
    if (operator) {
      const currentValue = parseFloat(display);
      const newValue = operate(prevValue, currentValue, operator); // Calculate the result
      setDisplay(String(newValue)); // Display the result
      setPrevValue(newValue); // Set the result as the previous value for future operations
      setOperator(null); // Clear the operator after the calculation
      setWaitingForNewValue(true); // Set the flag for waiting a new value
    }
  };

  // Perform calculation based on operator
  const operate = (prev, current, operator) => {
    switch (operator) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      default:
        return current;
    }
  };

  return (
    <div id="calculator">
      <div id="display">{display}</div>
      <div id="buttons">
        <button id="clear" onClick={handleClearClick}>AC</button>
        <button id="divide" onClick={() => handleOperatorClick("/")}>/</button>
        <button id="multiply" onClick={() => handleOperatorClick("*")}>*</button>
        <button id="subtract" onClick={() => handleOperatorClick("-")}>-</button>
        <button id="one" onClick={() => handleNumberClick("1")}>1</button>
        <button id="two" onClick={() => handleNumberClick("2")}>2</button>
        <button id="three" onClick={() => handleNumberClick("3")}>3</button>
        <button id="add" onClick={() => handleOperatorClick("+")}>+</button>
        <button id="four" onClick={() => handleNumberClick("4")}>4</button>
        <button id="five" onClick={() => handleNumberClick("5")}>5</button>
        <button id="six" onClick={() => handleNumberClick("6")}>6</button>
        <button id="equals" onClick={handleEqualsClick}>=</button>
        <button id="seven" onClick={() => handleNumberClick("7")}>7</button>
        <button id="eight" onClick={() => handleNumberClick("8")}>8</button>
        <button id="nine" onClick={() => handleNumberClick("9")}>9</button>
        <button id="decimal" onClick={handleDecimalClick}>.</button>
        <button id="zero" onClick={() => handleNumberClick("0")}>0</button>
        
      </div>
    </div>
  );
}

export default Calculator;
