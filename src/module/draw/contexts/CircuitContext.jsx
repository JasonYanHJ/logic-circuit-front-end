import React, { createContext, useContext, useState } from "react";

const CircuitContext = createContext(null);

export const CircuitProvider = ({ children }) => {
  const [circuitModel, setCircuitModel] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [diagram, setDiagram] = useState(null);
  const [palette, setPalette] = useState(null);
  const [isModified, setIsModified] = useState(false);

  const value = {
    circuitModel,
    setCircuitModel,
    isSimulating,
    setIsSimulating,
    diagram,
    setDiagram,
    palette,
    setPalette,
    isModified,
    setIsModified,
  };

  return (
    <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>
  );
};

export const useCircuit = () => {
  const context = useContext(CircuitContext);
  if (!context) {
    throw new Error("useCircuit must be used within CircuitProvider");
  }
  return context;
};

export default CircuitContext;
