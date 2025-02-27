import { Energy } from "../../resources";
import useConsumable from "../useConsumable";

export function useBattery() {
	return useConsumable(Energy, 20);
}
