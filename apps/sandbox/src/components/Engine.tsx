import { type PropsWithChildren, useContext } from "react";
import EnergyContext from "./EnergyContext";
import { useEngine } from "../logic/hooks/game/engines";

function Engine({ children }: PropsWithChildren<{}>) {
	const energy = useContext(EnergyContext);

	const engine = useEngine(energy);

	return (
		<div style={{ border: '2px solid black' }}>
			<div>
				Engine: {engine.$.display(v => v.toFixed(2))} / {engine.size} RF
			</div>
			{children}
		</div>
	);
}

export default Engine;
