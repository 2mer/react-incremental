import { ACCESS_TOKEN, type Consumable } from "../../resources/consumable";
import useTicker from "../useTicker";

export default function useDrain<T extends Consumable>(
	consumable: T,
	drainPerSecond: number,
) {
	useTicker((delta) => {
		consumable._consume(drainPerSecond * delta, ACCESS_TOKEN);
	});
}
