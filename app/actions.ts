"use server";

import { db } from "@/lib/firebase/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";

export async function replyToLetter(
	letterId: string,
	state: any,
	formData: FormData
) {
	const reply = formData.get("reply");

	try {
		await addDoc(collection(db, "letters", letterId, "replies"), {
			reply,
			repliedAt: Timestamp.now(),
		});

		return { ...state, success: true, error: null };
	} catch (error) {
		return { ...state, success: false, error: String(error) };
	}
}
