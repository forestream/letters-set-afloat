"use client";

import { replyToLetter } from "@/app/actions";
import styles from "./form.module.css";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

interface FormProps {
	letterId: string;
}

const initialState = { success: false, error: null };

export default function Form({
	letterId,
	children,
}: PropsWithChildren<FormProps>) {
	const router = useRouter();
	const ref = useRef<HTMLFormElement>(null);

	const replyById = replyToLetter.bind(null, letterId);

	const [state, formAction] = useFormState(replyById, initialState);

	useEffect(() => {
		if (!ref.current) return;

		if (state.success) {
			ref.current.reset();
			router.back();
		}
	}, [state, router]);

	return (
		<form ref={ref} className={styles.form} action={formAction}>
			{children}
		</form>
	);
}
