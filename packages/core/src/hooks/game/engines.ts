import { Energy } from "../../resources/energy";
import {
	createSustainedDevice,
	createSustainedResource,
} from "../createSustainedResource";

export const ENGINES = createSustainedResource();

export const useEngine = createSustainedDevice(ENGINES, {
	type: Energy,
	drain: 0.2,
	size: 5,
});
