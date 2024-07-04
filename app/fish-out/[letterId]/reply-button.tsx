"use client";

import { useFormStatus } from "react-dom";
import styles from "./reply-button.module.css";
import Spinner from "@/app/ui/spinner";

export default function ReplyButton() {
	const { pending } = useFormStatus();

	if (pending)
		return (
			<div className={styles.spinner}>
				<Spinner />;
			</div>
		);

	return (
		<button className={styles.button} disabled={pending}>
			{pending ? "보내는 중" : "글 적기"}
		</button>
	);
}
