import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
const [counter, setCounter] = useState(initialValue);

const handleAdd = () => {
    setCounter(counter + 1);
}

const handleSustract = () => {
    setCounter((prevState) => prevState - 1);
}

const handleReset = () => {
    setCounter(initialValue);
}
  return {
    // Values
    counter,
    // Methods
    handleAdd,
    handleSustract,
    handleReset
  }
}
