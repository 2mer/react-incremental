import { useEffect } from "react";
import useCallbackRef from "./useCallbackRef";
import game from "../../game";

export default function useTicker(cb: (delta: number) => void) {
	const staticCb = useCallbackRef(cb);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		game.events.addListener("tick", staticCb);

		return () => {
			game.events.removeListener("tick", staticCb);
		};
	}, []);
}
