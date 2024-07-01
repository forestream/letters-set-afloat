"use client";

import { Reflection, SUN_RADIUS } from "@/lib/constants/background";
import { generateGlitterData } from "@/lib/utils/background";
import { useEffect, useRef } from "react";

const glitters = generateGlitterData(40);

function draw(ctx: CanvasRenderingContext2D) {
	const canvas = ctx.canvas;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// bg
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	const sunset = ctx.createLinearGradient(0, 0, 0, canvas.height);
	sunset.addColorStop(0, "#00447e");
	sunset.addColorStop(0.6, "#d05000");
	ctx.fillStyle = sunset;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// sun
	ctx.setTransform(1, 0, 0, 1, -SUN_RADIUS, -SUN_RADIUS);
	const sun = ctx.createRadialGradient(
		canvas.width / 2 + SUN_RADIUS,
		canvas.height / 2 + SUN_RADIUS,
		0,
		canvas.width / 2 + SUN_RADIUS,
		canvas.height / 2 + SUN_RADIUS,
		SUN_RADIUS
	);
	sun.addColorStop(0, "rgb(255 255 255 / 100%)");
	sun.addColorStop(0.15, "rgb(255 255 255 / 90%)");
	sun.addColorStop(0.17, "rgb(255 200 100 / 60%)");
	sun.addColorStop(1, "rgb(255 150 100 / 0%)");
	ctx.fillStyle = sun;
	ctx.roundRect(
		canvas.width / 2,
		canvas.height / 2,
		SUN_RADIUS * 2,
		SUN_RADIUS * 2,
		9999
	);
	ctx.fill();

	// sea
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.fillStyle = "#424d4c";
	ctx.beginPath();
	ctx.moveTo(0, canvas.height / 2 + 10);
	ctx.bezierCurveTo(
		canvas.width / 2,
		canvas.height / 2,
		canvas.width / 2,
		canvas.height / 2,
		canvas.width,
		canvas.height / 2 + 10
	);
	ctx.lineTo(canvas.width, canvas.height);
	ctx.lineTo(0, canvas.height);
	ctx.clip();
	ctx.fill();

	// reflection
	const reflection = new Reflection(ctx);
	const now = new Date();
	const movement = Math.sin(now.getTime() / 1000);
	const reflectionGradient = ctx.createLinearGradient(
		0,
		canvas.height / 2,
		0,
		canvas.height
	);
	reflectionGradient.addColorStop(0, "rgb(255 230 150 / 50%)");
	reflectionGradient.addColorStop(0.7, "rgb(255 230 150 / 0%)");
	ctx.fillStyle = reflectionGradient;
	ctx.beginPath();
	ctx.moveTo(reflection.fartherLeft, reflection.farther);
	ctx.bezierCurveTo(
		reflection.fartherLeft + 20,
		reflection.farther + movement * 10,
		reflection.fartherRight - 20,
		reflection.farther - movement * 10,
		reflection.fartherRight,
		reflection.farther
	);
	ctx.bezierCurveTo(
		reflection.fartherRight - movement * 15,
		reflection.farther + 100,
		reflection.nearerRight + movement * 15,
		reflection.nearer - 100,
		reflection.nearerRight,
		reflection.nearer
	);
	ctx.bezierCurveTo(
		reflection.nearerRight - 10,
		reflection.nearer - movement * 5,
		reflection.nearerLeft + 10,
		reflection.nearer + movement * 5,
		reflection.nearerLeft,
		reflection.nearer
	);
	ctx.bezierCurveTo(
		reflection.nearerLeft + movement * 15,
		reflection.nearer - 100,
		reflection.fartherLeft - movement * 15,
		reflection.farther + 100,
		reflection.fartherLeft,
		reflection.farther
	);
	ctx.shadowBlur = 14;
	ctx.shadowColor = "rgb(255 200 120 / 100%)";
	ctx.fill();

	// glitter
	glitters.forEach((glitter) => {
		const x = glitter.x * canvas.width;
		const y = glitter.y * canvas.height;
		const size = glitter.size * Math.max(movement, 0);

		ctx.fillStyle = "rgb(255 230 200 / 70%)";
		ctx.shadowBlur = 0;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.arcTo(x, y + size, x + size, y + size, size);
		ctx.arcTo(x, y + size, x, y + size * 2, size);
		ctx.arcTo(x, y + size, x - size, y + size, size);
		ctx.arcTo(x, y + size, x, y, size);
		ctx.fill();
	});

	requestAnimationFrame(() => draw(ctx));
}

export default function Background() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;
		const ctx = canvasRef.current.getContext("2d");

		const handleResize = () => {
			if (!ctx) return;
			ctx.canvas.width = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			draw(ctx);
		};

		handleResize();

		if (!ctx) return;

		draw(ctx);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return <canvas ref={canvasRef}>Background</canvas>;
}
