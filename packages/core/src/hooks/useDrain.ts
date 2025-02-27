import { type Consumable, ACCESS_TOKEN } from "../resources";
import { useTicker } from "./util";

export default function useDrain<T extends Consumable>(
	consumable: T,
	drainPerSecond: number,
) {
	useTicker((delta) => {
		consumable._consume(drainPerSecond * delta, ACCESS_TOKEN);
	});
}
