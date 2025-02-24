import { useRef } from "react";
import useSignal from "../useSignal";
import useTicker from "../useTicker";
import type { Consumable } from "../../resources/consumable";

export default function useChangeRate<T extends Consumable>(consumable: T) {
	const prevRef = useRef(0);
	const change$ = useSignal(0);

	useTicker((delta) => {
		const prev = prevRef.current;
		const d = consumable.value - prev;
		prevRef.current = consumable.value;

		change$.value = d / delta;
	});

	return change$;
}
