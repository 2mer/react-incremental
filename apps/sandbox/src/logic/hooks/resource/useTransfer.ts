import type { Consumable } from "../../resources/consumable";
import useTicker from "../useTicker";

export default function useTransfer<T extends Consumable>(
	a: T,
	b: T,
	ratePerSecond?: number,
) {
	useTicker((delta) => {
		const amountToTransfer =
			ratePerSecond === undefined ? Number.MAX_VALUE : ratePerSecond * delta;

		a.giveTo(b, amountToTransfer);
	});
}
