"use client";

import { MouseEventHandler, PropsWithChildren, useRef } from "react";
import styles from "./modal.module.css";
import { useRouter } from "next/navigation";

interface ModalProps {
	zIndex?: number;
}

export default function Modal({
	children,
	zIndex = 2,
}: PropsWithChildren<ModalProps>) {
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);

	const handleMouseDown: MouseEventHandler = (e) => {
		if (!(e.target as HTMLElement).contains(ref.current)) return;
		router.back();
	};

	return (
		<div
			onMouseDown={handleMouseDown}
			ref={ref}
			className={styles.outer}
			style={{ zIndex }}
		>
			{children}
		</div>
	);
}
