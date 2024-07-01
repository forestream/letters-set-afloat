export function generateGlitterData(amount: number) {
	return Array(amount)
		.fill(null)
		.map(() => ({
			x: Math.random(),
			y: Math.random(),
			size: Math.random() * 10,
		}));
}
