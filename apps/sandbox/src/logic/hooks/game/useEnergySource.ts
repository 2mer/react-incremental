import game from "../../game";
import { ACCESS_TOKEN } from "../../resources/consumable";
import { Energy } from "../../resources/energy";

export const energySource = new Energy(0, game.state$.get().batterySize);

game.events.on("tick", (delta) => {
	energySource._replenish(
		game.state$.get().energyPerSecond * delta,
		ACCESS_TOKEN,
	);
});

game.state$.sub((v) => {
	energySource._setSize(v.batterySize, ACCESS_TOKEN);
});

export default function useEnergySource() {
	return energySource;
}
