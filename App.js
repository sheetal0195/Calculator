import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [inputNum, setInputNum] = useState(0);
  const [calculatedNum, setCalculatedNum] = useState(0);
  const [operator, setOperator] = useState("");
  const [monitor, setMonitor] = useState("");
  const [isDecimal, setIsDecimal] = useState(false);
  const [decimalCount, setDecimalCount] = useState(1);

  useEffect(()=>{
    setMonitor(inputNum);
  },[inputNum]);

  useEffect(()=>{
    setMonitor(calculatedNum);
  },[calculatedNum]);

  // Take input number from keyboard
  const takeInputNum = (num) =>{
    if(isDecimal){
      num = num/Math.pow(10,decimalCount);
      setDecimalCount(decimalCount+1);
      setInputNum(parseFloat((inputNum+num).toFixed(decimalCount)));
    }else{
      setInputNum(inputNum*10+num);
    }
  }

  // Take operator from keyboard
  const takeOperator = (operator) =>{
    setOperator(operator);
    calculate();
    setInputNum(0);
  }

  // do the calculations
  const calculate = () =>{
    setIsDecimal(false);
    setDecimalCount(1);
    if(operator === '/' && inputNum === 0){
      setCalculatedNum(NaN);
      setInputNum(0);
      return;
    }
    if(calculatedNum === 0 && inputNum === 0){
      return;
    }
    switch(operator){
      case "+":
        setCalculatedNum(calculatedNum + inputNum);
        break;
      case "-":
        setCalculatedNum(calculatedNum - inputNum);
        break;
      case "*":
        setCalculatedNum(calculatedNum * inputNum);
        break;
      case "/":
        setCalculatedNum(calculatedNum / inputNum);
        break;
    }
    if(operator === ""){
      setCalculatedNum(inputNum);
    }else{
      setInputNum(0);
    }
    return;
  }

  //get the equation
  const getEqual = () =>{
    calculate();
    setOperator("");
  }

  //clear all
  const clear = () =>{
    setInputNum(0);
    setCalculatedNum(0);
    setMonitor('');
    setOperator('');
  }
  return (
    <div className="calculator">
      <section className="monitor">
        <p className="out-put">{monitor}</p>
      </section>
      <section className="keyboard">
        <div className="keyboard-row">
          <button onClick={()=>{clear()}} className="one-block blue">AC</button>
          <button className="one-block blue">-/+</button>
          <button className="one-block blue">%</button>
          <button onClick={()=>{takeOperator("/")}} className="one-block red">/</button>
        </div>
        <div className="keyboard-row">
          <button onClick={()=>{takeInputNum(7)}} className="one-block">7</button>
          <button onClick={()=>{takeInputNum(8)}} className="one-block">8</button>
          <button onClick={()=>{takeInputNum(9)}} className="one-block">9</button>
          <button onClick={()=>{takeOperator("*")}} className="one-block red">*</button>
        </div>
        <div className="keyboard-row">
          <button onClick={()=>{takeInputNum(4)}} className="one-block">4</button>
          <button onClick={()=>{takeInputNum(5)}} className="one-block">5</button>
          <button onClick={()=>{takeInputNum(6)}} className="one-block">6</button>
          <button onClick={()=>{takeOperator("-")}} className="one-block red">-</button>
        </div>
        <div className="keyboard-row">
          <button onClick={()=>{takeInputNum(1)}} className="one-block">1</button>
          <button onClick={()=>{takeInputNum(2)}} className="one-block">2</button>
          <button onClick={()=>{takeInputNum(3)}} className="one-block">3</button>
          <button onClick={()=>{takeOperator("+")}} className="one-block red">+</button>
        </div>
        <div className="keyboard-row">
          <button onClick={()=>{takeInputNum(0)}} className="two-block">0</button>
          <button onClick={()=>{setIsDecimal(true)}} className="one-block">.</button>
          <button onClick={()=>{getEqual()}} className="one-block red">=</button>
        </div>
      </section>
    </div>
  );
};

export default App;
