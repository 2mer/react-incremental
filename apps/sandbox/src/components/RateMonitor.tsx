import { type Consumable, useChangeRate } from "@sgty/hooked";

function RateMonitor<T extends Consumable>({ consumable }: { consumable: T }) {
	const change$ = useChangeRate(consumable);

	return change$.display((v) => {
		return `${v < 0 ? "-" : "+"} ${Math.abs(v).toFixed(2)}/s`;
	});
}

export default RateMonitor;
