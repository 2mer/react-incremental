import { createContext } from "react";
import type { Energy } from "../logic/resources/energy";
import { energySource } from "../logic/hooks/game/useEnergySource";

const EnergyContext = createContext<Energy>(energySource);

export default EnergyContext;
