"use client";

import styles from "./send-away-button.module.css";
import { PropsWithChildren } from "react";
import { loadLettersWithCursor } from "../actions";
import { Letter } from "../actions.type";

interface SendAwayButtonProps {
	onLoadLetters: (next: Letter[]) => void;
	lastLetterId: string;
}

export default function SendAwayButton({
	onLoadLetters,
	lastLetterId,
	children,
}: PropsWithChildren<SendAwayButtonProps>) {
	const handleLoadLetters = async () => {
		const res = await loadLettersWithCursor(lastLetterId);

		if (!res.success) return;

		onLoadLetters(res.data);
	};

	return (
		<button onClick={handleLoadLetters} className={styles.sendAway}>
			{children}
		</button>
	);
}
