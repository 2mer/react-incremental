import { type Energy, energySource } from "@sgty/hooked";
import { createContext } from "react";

const EnergyContext = createContext<Energy>(energySource);

export default EnergyContext;
