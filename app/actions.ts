"use server";

import { db } from "@/lib/firebase/firebase";
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	limitToLast,
	orderBy,
	query,
	startAfter,
} from "firebase/firestore";
import { Letter } from "./actions.type";

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

export async function loadLettersWithCursor(lastId: string) {
	const lastLetterSnapshot = await getDocs(
		query(collection(db, "letters"), orderBy("sentAt", "desc"), limitToLast(1))
	);

	const lastLetterId = lastLetterSnapshot.docs.map((doc) => doc.id)[0];

	if (lastLetterId === lastId) {
		return { success: false, error: "마지막 편지입니다.", data: [] };
	}

	const letterRef = doc(db, "letters", lastId);
	const letterSnap = await getDoc(letterRef);

	const next = query(
		collection(db, "letters"),
		orderBy("sentAt", "desc"),
		startAfter(letterSnap),
		limit(6)
	);

	const letterSnapshots = await getDocs(next);
	const letters: Letter[] = letterSnapshots.docs.map(
		(doc) =>
			({
				...doc.data(),
				sentAt: doc.data().sentAt.toDate(),
				id: doc.id,
			} as Letter)
	);

	return { success: true, error: null, data: letters };
}
