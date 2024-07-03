"use client";

import { useFormStatus } from "react-dom";
import styles from "./reply-button.module.css";

export default function ReplyButton() {
	const { pending } = useFormStatus();

	return (
		<button className={styles.button} disabled={pending}>
			{pending ? "보내는 중" : "글 추가"}
		</button>
	);
}
