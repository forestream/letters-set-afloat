"use client";

import { useEffect, useRef } from "react";

export default function Toast() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const toast = ref.current;
		setTimeout(() => {
			toast.classList.add("-translate-y-full");
			toast.classList.remove("opacity-0");
		}, 0);

		const timer = setTimeout(() => {
			toast.classList.remove("-translate-y-full");
			toast.classList.add("opacity-0");
		}, 3000);

		return () => {
			clearTimeout(timer);
			toast.classList.remove("-translate-y-full");
			toast.classList.add("opacity-0");
		};
	}, []);

	return (
		<div
			ref={ref}
			className="p-4 bg-white rounded fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] opacity-0 transition duration-500"
		>
			<p className="font-medium text-sm">
				로그인 후 좋아요를 남길 수 있습니다.
			</p>
		</div>
	);
}
