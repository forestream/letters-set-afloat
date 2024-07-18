"use client";

import {
	ChangeEventHandler,
	FormEvent,
	FormEventHandler,
	useState,
} from "react";
import styles from "./foreground.module.css";
import { postLetter } from "@/lib/apis/main";
import Link from "next/link";
import Spinner from "./ui/spinner";
import useToast from "@/lib/hooks/useToast";

export default function Foreground() {
	const [letter, setLetter] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState("");
	const [Toast, showToast] = useToast(4000);

	const longEnough = letter.trim().length > 0;

	const handleChange: ChangeEventHandler = (e) => {
		if (longEnough) setError("");
		setLetter((e.target as HTMLTextAreaElement).value);
	};

	const handleSubmit: FormEventHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (!longEnough) {
			setError("내용을 입력해주세요.");
			return;
		}

		const formData = new FormData(e.target as HTMLFormElement);
		const letter = formData.get("letter");

		try {
			setIsPending(true);
			await postLetter({ letter });
			setLetter("");
			showToast();
		} catch (error: any) {
			setError(String(error));
			console.error(error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className={styles.outer}>
			<Link href="/fish-out" className={styles.fishOut}>
				떠밀려 온 편지
			</Link>
			<form onSubmit={handleSubmit} className={styles.form}>
				<textarea
					name="letter"
					onChange={handleChange}
					value={letter}
					className={styles.letter}
				/>
				{isPending ? (
					<div className={styles.spinner}>
						<Spinner />
					</div>
				) : (
					<button className={styles.float} disabled={isPending}>
						띄우기
					</button>
				)}
				{error && <p className={styles.error}>{error}</p>}
				<Toast className={styles.toast}>편지를 띄웠습니다.</Toast>
			</form>
		</div>
	);
}
