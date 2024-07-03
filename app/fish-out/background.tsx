"use client";

import { useEffect, useRef } from "react";
import styles from "./background.module.css";

function draw(ctx: CanvasRenderingContext2D) {
	const canvas = ctx.canvas;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const skyGradient = ctx.createLinearGradient(
		0,
		0,
		canvas.width / 2,
		canvas.height
	);
	skyGradient.addColorStop(0, "#1a54a8");
	skyGradient.addColorStop(1, "#5d9edd");
	ctx.fillStyle = skyGradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export default function Background() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		const ctx = ref.current.getContext("2d");

		if (!ctx) return;

		const handleResize = () => {
			ctx.canvas.width = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			draw(ctx);
		};

		handleResize();

		draw(ctx);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<canvas className={styles.canvas} ref={ref}>
			바다
		</canvas>
	);
}
