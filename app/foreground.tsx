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

	const handleChange: ChangeEventHandler = (e) =>
		setLetter((e.target as HTMLTextAreaElement).value);

	const handleSubmit: FormEventHandler = async (e: FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const letter = formData.get("letter");

		try {
			await postLetter({ letter });
			setLetter("");
		} catch (e) {
			console.error("Error: " + e);
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
				<button className={styles.float}>띄우기</button>
			</form>
		</div>
	);
}
