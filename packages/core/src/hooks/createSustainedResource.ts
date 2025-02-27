import { useRef } from "react";
import useConsumable from "./useConsumable";
import useTransfer from "./useTransfer";
import useDrain from "./useDrain";
import { signal } from "../signal";
import type { Consumable } from "../resources/consumable";
import useTicker from "./util/useTicker";

export function createSustainedResource() {
	const total$ = signal(0);

	return {
		total$: total$.readonly,

		useSustain<T extends Consumable>(consumable: T) {
			const prevProgressRef = useRef(0);

			useTicker(() => {
				const progress = consumable.progress;
				const prevProgress = prevProgressRef.current;
				const change = progress - prevProgress;

				total$.value += change;

				prevProgressRef.current = progress;
			});
		},
	};
}

type SustainedApi = ReturnType<typeof createSustainedResource>;
type SustanedDeviceSettings<T extends typeof Consumable> = {
	type: T;
	size: number;
	drain: number;
};

export function createSustainedDevice<T extends typeof Consumable>(
	api: SustainedApi,
	settings: SustanedDeviceSettings<T>,
) {
	return (consumable: InstanceType<T>) => {
		const buffer = useConsumable(
			settings.type,
			settings.size,
		) as InstanceType<T>;

		useTransfer(consumable, buffer);
		useDrain(buffer, settings.drain);
		api.useSustain(buffer);

		return buffer;
	};
}
