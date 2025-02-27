import useAsRef from "./useAsRef";
import useConst from "./useConst";

export default function useCallbackRef<T extends (...args: any) => any>(cb: T): T {
	const cbRef = useAsRef(cb);

	// @ts-ignore
	return useConst<T>(() => (...args) => cbRef.current(...args))
}