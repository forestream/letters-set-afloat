"use client";

import { leaveContact } from "@/app/actions";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { useFormState } from "react-dom";

interface FormProps {
	className: string;
}

const initialState = {
	success: false,
	error: null,
};

export default function Form({
	children,
	className,
}: PropsWithChildren<FormProps>) {
	const [state, formAction] = useFormState(leaveContact, initialState);
	const router = useRouter();

	if (state.success) router.back();

	return (
		<form action={formAction} className={className}>
			{children}
		</form>
	);
}
