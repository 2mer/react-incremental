export function ticker(onTick: (delta: number) => void) {
	const t = {
		running: false,
		prevTime: undefined as undefined | DOMHighResTimeStamp,

		start() {
			this.running = true;
			requestAnimationFrame(this.handleFrame);
		},

		stop() {
			this.running = false;
		},

		handleFrame(time: DOMHighResTimeStamp) {
			// delta is in float seconds (will usually be less than 1)
			const delta = t.prevTime ? (time - t.prevTime) / 1000 : 0;
			this.prevTime = time;

			onTick(delta)

			if (this.running) {
				requestAnimationFrame(this.handleFrame)
			}
		},

	}

	t.handleFrame = t.handleFrame.bind(t)

	return t;
}