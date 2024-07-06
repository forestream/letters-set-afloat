export const SUN_RADIUS = 500;

export class Reflection {
	farther: number;
	nearer: number;
	fartherLeft: number;
	fartherRight: number;
	nearerLeft: number;
	nearerRight: number;

	constructor(ctx: CanvasRenderingContext2D) {
		const { width, height } = ctx.canvas;

		this.farther = height / 2 - 10;
		this.nearer = height - 30;
		this.fartherLeft = width / 2 - SUN_RADIUS * 0.15;
		this.fartherRight = width / 2 + SUN_RADIUS * 0.15;
		this.nearerLeft = width / 2 - SUN_RADIUS * 0.01;
		this.nearerRight = width / 2 + SUN_RADIUS * 0.01;
	}
}

export class Glitter {
	constructor() {}

	generate(ctx: CanvasRenderingContext2D, movement: number) {
		const { width, height } = ctx.canvas;

		const [x, y] = [Math.random() * width, Math.random() * height];
		const size = Math.random() * 10;
		ctx.fillStyle = "rgb(255 230 150 / 70%)";
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.arcTo(x, y + size, x + size, y + size, size);
		ctx.arcTo(x, y + size, x, y + size * 2, size);
		ctx.arcTo(x, y + size, x - size, y + size, size);
		ctx.arcTo(x, y + size, x, y, size);
		ctx.fill();
		ctx.scale(movement, movement);
	}
}
