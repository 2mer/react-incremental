import { type PropsWithChildren, useState } from "react";
import EnergyContext from "./EnergyContext";
import { Energy } from "../logic/resources/energy";

const ZERO = new Energy(0);

function EnergySwitch({
	children,
	in: inProp,
	else: elseProp = ZERO,
}: PropsWithChildren<{ in: Energy; else?: Energy }>) {
	const [enabled, setEnabled] = useState(false);

	return (
		<EnergyContext.Provider value={enabled ? inProp : elseProp}>
			<div style={{ border: '1px solid orange', padding: '4px' }}>
				<div>
					<span>Energy source: {enabled ? 'in' : 'else'}</span>
					<input type="checkbox" onChange={e => setEnabled(e.target.checked)} />
				</div>
				<div>
					{children}
				</div>
			</div>
		</EnergyContext.Provider>
	);
}

export default EnergySwitch;
