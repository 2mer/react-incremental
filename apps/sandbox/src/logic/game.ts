import EventEmitter from "eventemitter3";
import { signal } from "./signal";
import { ticker } from "./ticker";

interface Events {
	tick: (delta: number) => void;
}

const SAVE_KEY = "react-incremental-save";

type GameState = {
	gold: number;
	batterySize: number;
	energyPerSecond: number;
};

const state$ = signal<GameState>({
	batterySize: 10,
	energyPerSecond: 1,
	gold: 0,
});

class Game {
	events = new EventEmitter<Events>();

	state$ = state$;

	ticker = ticker((delta) => {
		this.events.emit("tick", delta);
	});

	load() {
		const val = localStorage.getItem(SAVE_KEY);
		if (val) {
			state$.value = JSON.parse(val);
		}
	}

	save() {
		localStorage.setItem(SAVE_KEY, JSON.stringify(state$.get()));
	}
}

const game = new Game();

game.load();
game.ticker.start();

// @ts-ignore
window.game = game;

export default game;
