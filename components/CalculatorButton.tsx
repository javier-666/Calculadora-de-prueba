
import React from 'react';

interface CalculatorButtonProps {
  onClick: (label: string) => void;
  label: string;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, label, className }) => {
  const baseClasses = "flex items-center justify-center aspect-square text-2xl sm:text-3xl font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-orange-500 active:opacity-75 transition-all duration-150";
  
  const handleClick = () => {
    onClick(label);
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
