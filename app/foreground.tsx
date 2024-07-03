"use client";

import {
	ChangeEventHandler,
	FormEvent,
	FormEventHandler,
	useState,
} from "react";
import styles from "./foreground.module.css";
import { postLetter } from "@/lib/apis/main";

export default function Foreground() {
	const [letter, setLetter] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState("");

	const longEnough = letter.trim().length > 4;

	const handleChange: ChangeEventHandler = (e) => {
		if (longEnough) setError("");
		setLetter((e.target as HTMLTextAreaElement).value);
	};

	const handleSubmit: FormEventHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (!longEnough) {
			setError("5 글자 이상 입력해주세요.");
			return;
		}

		const formData = new FormData(e.target as HTMLFormElement);
		const letter = formData.get("letter");
		console.log(letter);

		try {
			setIsPending(true);
			await postLetter({ letter });
			setLetter("");
		} catch (error: any) {
			setError(error);
			console.error("Error: " + error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className={styles.outer}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<textarea
					name="letter"
					onChange={handleChange}
					value={letter}
					className={styles.letter}
				/>
				<button className={styles.float} disabled={isPending}>
					띄우기
				</button>
				{error && <p className={styles.error}>{error}</p>}
			</form>
		</div>
	);
}
