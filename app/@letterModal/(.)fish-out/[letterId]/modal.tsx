"use client";

import { MouseEventHandler, PropsWithChildren } from "react";
import styles from "./modal.module.css";
import { useRouter } from "next/navigation";

export default function Modal({ children }: PropsWithChildren) {
	const router = useRouter();

	const handleClick: MouseEventHandler = (e) => {
		e.stopPropagation();
		router.back();
	};

	return (
		<div onClick={handleClick} className={styles.outer}>
			{children}
		</div>
	);
}
