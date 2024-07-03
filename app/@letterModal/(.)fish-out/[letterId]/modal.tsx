"use client";

import { MouseEventHandler, PropsWithChildren, useRef } from "react";
import styles from "./modal.module.css";
import { useRouter } from "next/navigation";

export default function Modal({ children }: PropsWithChildren) {
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);

	const handleMouseDown: MouseEventHandler = (e) => {
		if (!(e.target as HTMLElement).contains(ref.current)) return;
		router.back();
	};

	return (
		<div onMouseDown={handleMouseDown} ref={ref} className={styles.outer}>
			{children}
		</div>
	);
}
