"use client";

import styles from "./send-away-button.module.css";
import { PropsWithChildren, Suspense, useState } from "react";
import { loadLettersWithCursor } from "../actions";
import { Letter } from "../actions.type";
import Spinner from "../ui/spinner";

interface SendAwayButtonProps {
	onLoadLetters: (next: Letter[]) => void;
	lastLetterId: string;
}

export default function SendAwayButton({
	onLoadLetters,
	lastLetterId,
	children,
}: PropsWithChildren<SendAwayButtonProps>) {
	const [error, setError] = useState();
	const [isPending, setIsPending] = useState(false);

	const handleLoadLetters = async () => {
		try {
			setIsPending(true);
			const res = await loadLettersWithCursor(lastLetterId);

			if (res.error) throw new Error(res.error);

			onLoadLetters(res.data);
		} catch (error: any) {
			setError(error);
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
			{error && <p className={styles.error}>{"더 볼 편지가 없습니다."}</p>}
		</>
	);
}
