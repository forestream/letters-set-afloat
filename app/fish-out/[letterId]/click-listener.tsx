"use client";

import { MouseEventHandler, PropsWithChildren } from "react";
import styles from "./click-listener.module.css";
import { useRouter } from "next/navigation";

export default function ClickListener({ children }: PropsWithChildren) {
	const router = useRouter();

	const handleClick: MouseEventHandler = (e) => {
		e.stopPropagation();
		console.log("click");
	};

	return (
		<div onMouseDown={handleClick} className={styles.clickListener}>
			{children}
		</div>
	);
}
