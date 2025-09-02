
import React, { useState } from 'react';
import CalculatorButton from './components/CalculatorButton';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);

  const performCalculation = (val1: number, val2: number, op: string): number => {
    switch (op) {
      case '+':
        return val1 + val2;
      case '-':
        return val1 - val2;
      case '×':
        return val1 * val2;
      case '÷':
        return val1 / val2;
      default:
        return val2;
    }
  };
  
  const resetCalculator = () => {
      setDisplayValue('0');
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
  }

  const handleButtonClick = (label: string) => {
    if (/\d/.test(label)) { // Input Digit
      if (displayValue.length >= 10 && !waitingForOperand) return;
      if (waitingForOperand || displayValue === 'Error') {
        setDisplayValue(label);
        setWaitingForOperand(false);
        if (displayValue === 'Error') {
          setPreviousValue(null);
          setOperator(null);
        }
      } else {
        setDisplayValue(displayValue === '0' ? label : displayValue + label);
      }
    } else if (label === '.') { // Input Decimal
      if (displayValue === 'Error') return;
      if (!displayValue.includes('.')) {
        setDisplayValue(displayValue + '.');
        setWaitingForOperand(false);
      }
    } else if (label === 'AC') { // All Clear
      resetCalculator();
    } else if (['+/-', '%'].includes(label)) { // Unary operations
      if (displayValue === 'Error' || waitingForOperand) return;
      const currentValue = parseFloat(displayValue);
      let newValue: number;
      if (label === '+/-') {
        newValue = currentValue * -1;
      } else { // %
        newValue = currentValue / 100;
      }
      setDisplayValue(String(newValue));
    } else if (['+', '-', '×', '÷'].includes(label)) { // Operator
      if (displayValue === 'Error') return;
      const currentValue = parseFloat(displayValue);
      if (operator && previousValue !== null && !waitingForOperand) {
        const result = performCalculation(previousValue, currentValue, operator);
        const resultString = String(result);
        setDisplayValue(resultString);
        setPreviousValue(result);
      } else {
        setPreviousValue(currentValue);
      }
      setWaitingForOperand(true);
      setOperator(label);
    } else if (label === '=') { // Equals
      if (operator && previousValue !== null) {
        if (displayValue === 'Error') return;
        const currentValue = parseFloat(displayValue);
        
        if (operator === '÷' && currentValue === 0) {
          setDisplayValue('Error');
          setPreviousValue(null);
          setOperator(null);
          setWaitingForOperand(true);
          return;
        }

        const result = performCalculation(previousValue, currentValue, operator);
        const resultString = String(result);
        setDisplayValue(resultString);
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
      }
    }
  };

  const buttons = [
    { label: 'AC', className: 'bg-gray-400 text-black hover:bg-gray-300' },
    { label: '+/-', className: 'bg-gray-400 text-black hover:bg-gray-300' },
    { label: '%', className: 'bg-gray-400 text-black hover:bg-gray-300' },
    { label: '÷', className: 'bg-orange-500 text-white hover:bg-orange-400' },
    { label: '7', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '8', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '9', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '×', className: 'bg-orange-500 text-white hover:bg-orange-400' },
    { label: '4', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '5', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '6', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '-', className: 'bg-orange-500 text-white hover:bg-orange-400' },
    { label: '1', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '2', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '3', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '+', className: 'bg-orange-500 text-white hover:bg-orange-400' },
    { label: '0', className: 'bg-gray-700 text-white hover:bg-gray-600 col-span-2 !justify-start px-8' },
    { label: '.', className: 'bg-gray-700 text-white hover:bg-gray-600' },
    { label: '=', className: 'bg-orange-500 text-white hover:bg-orange-400' },
  ];
  
  const getDisplayFontSize = () => {
    const len = displayValue.length;
    if (len > 9) return 'text-5xl';
    if (len > 6) return 'text-6xl';
    return 'text-7xl';
  };
  
  const getFormattedDisplay = () => {
    if (displayValue === 'Error') return 'Error';
    try {
        const numberValue = parseFloat(displayValue);
        if (displayValue.endsWith('.') && !waitingForOperand) return displayValue;
        return numberValue.toLocaleString('en-US', { maximumFractionDigits: 8 });
    } catch {
        return 'Error';
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xs mx-auto bg-black rounded-3xl p-4 sm:p-5 space-y-5 shadow-2xl shadow-gray-800/50">
        <div className="h-28 flex items-end justify-end bg-black text-white px-4 rounded-lg overflow-hidden">
          <h1 className={`font-light break-all text-right w-full ${getDisplayFontSize()} transition-all duration-200`}>
             {getFormattedDisplay()}
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {buttons.map((btn) => (
             <CalculatorButton
               key={btn.label}
               label={btn.label}
               onClick={handleButtonClick}
               className={btn.className}
             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
