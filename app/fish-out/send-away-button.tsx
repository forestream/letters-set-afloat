"use client";

import styles from "./send-away-button.module.css";
import { PropsWithChildren, useState } from "react";
import { loadLettersWithCursor } from "../actions";
import { Letter } from "../actions.type";
import Spinner from "../ui/spinner";

interface SendAwayButtonProps {
	initializePosition: () => Promise<void>;
	swipeIn: () => void;
	swipeOut: () => Promise<void>;
	onLoadLetters: (next: Letter[]) => void;
	lastLetterId: string;
}

export default function SendAwayButton({
	initializePosition,
	swipeIn,
	swipeOut,
	onLoadLetters,
	lastLetterId,
	children,
}: PropsWithChildren<SendAwayButtonProps>) {
	const [error, setError] = useState();
	const [isPending, setIsPending] = useState(false);

	const handleLoadLetters = async () => {
		try {
			setIsPending(true);

			const [res] = await Promise.all([
				loadLettersWithCursor(lastLetterId),
				swipeOut(),
			]);

			if (res.error) throw new Error(res.error);

			await initializePosition();

			onLoadLetters(res.data);
		} catch (error: any) {
			setError(error);
			swipeIn();
		} finally {
			setIsPending(false);
		}
	};

	if (isPending)
		return (
			<div className={styles.spinner}>
				<Spinner color="white" />
			</div>
		);

	return (
		<>
			<button onClick={handleLoadLetters} className={styles.sendAway}>
				{children}
			</button>
			{error && <p className={styles.error}>{"더 읽을 편지가 없습니다."}</p>}
		</>
	);
}
