import type { Consumable } from "../resources/consumable";
import { useConst } from "./util";

export default function useConsumable<T extends typeof Consumable>(
	ConsumableType: T,
	size?: number,
) {
	return useConst(() => {
		const consumable = new ConsumableType(0, size);

		return consumable;
	});
}
