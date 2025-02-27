import { type Signal, signal } from "../signal";

export const ACCESS_TOKEN = Symbol("CONSUME_TOKEN");

export class Consumable {
	private _value$: Signal<number>;

	constructor(
		value: number,
		protected _size: number = Number.MAX_VALUE,
	) {
		this._value$ = signal(value);
	}

	_consume(amount: number, token: typeof ACCESS_TOKEN): number {
		if (token !== ACCESS_TOKEN) throw new Error("unauthorized");

		const consumeAmount = Math.min(amount, this._value$.value);
		this._value$.value -= consumeAmount;

		return consumeAmount;
	}

	_replenish(amount: number, token: typeof ACCESS_TOKEN): number {
		if (token !== ACCESS_TOKEN) throw new Error("unauthorized");

		const replenishAmount = Math.min(amount, this.availableSpace);

		this._value$.value += replenishAmount;

		return replenishAmount;
	}

	_setSize(size: number, token: typeof ACCESS_TOKEN) {
		if (token !== ACCESS_TOKEN) throw new Error("unauthorized");
		if (this._size === size) return;

		this._size = size;
		this._value$.value = Math.min(this._value$.value, this._size);
	}

	giveTo(consumable: typeof this, amount: number) {
		return consumable._replenish(
			this._consume(Math.min(amount, consumable.availableSpace), ACCESS_TOKEN),
			ACCESS_TOKEN,
		);
	}

	takeFrom(consumable: typeof this, amount: number) {
		return consumable.giveTo(this, amount);
	}

	get availableSpace() {
		return this._size - this._value$.value;
	}

	get value() {
		return this._value$.value;
	}

	get size() {
		return this._size;
	}

	get progress() {
		return this._value$.value / this._size;
	}

	get $() {
		return this._value$.readonly;
	}
}
