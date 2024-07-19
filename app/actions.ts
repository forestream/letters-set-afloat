"use server";

import { auth, db } from "@/lib/firebase/firebase";
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
import { Letter, State } from "./actions.type";
import { revalidatePath } from "next/cache";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
} from "firebase/auth";

export async function replyToLetter(
	letterId: string,
	state: State,
	formData: FormData
) {
	const reply = formData.get("reply");

	try {
		await addDoc(collection(db, "letters", letterId, "replies"), {
			reply,
			repliedAt: Timestamp.now(),
		});
		revalidatePath("/fish-out");

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

export async function reportLetter(letterId: string) {
	try {
		await addDoc(collection(db, "reports"), {
			letterId,
			sentAt: Timestamp.now(),
		});
		return { success: true, error: null };
	} catch (error) {
		return { success: false, error: String(error) };
	}
}

export async function leaveContact(state: State, formData: FormData) {
	try {
		await addDoc(collection(db, "contacts"), {
			message: formData.get("message"),
			sentAt: Timestamp.now(),
		});
		return { ...state, success: true, error: null };
	} catch (error) {
		return { ...state, success: false, error: String(error) };
	}
}

export async function loginOnServer(idToken: string) {
	const credential = GoogleAuthProvider.credential(idToken);

	// Sign in with credential from the Google user.
	signInWithCredential(auth, credential)
		.then(() => {
			revalidatePath("/");
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The credential that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.log("Error: " + errorCode, errorMessage, email, credential);
		});
}

export async function getUser() {
	// onAuthStateChanged(auth, (user) => {
	// 	if (user) {
	// 		console.log(user);
	// 	} else {
	// 	}
	// });
	if (auth.currentUser) {
		revalidatePath("/");

		return {
			email: auth.currentUser.email,
			uid: auth.currentUser.uid,
			displayName: auth.currentUser.displayName,
			profileImage: auth.currentUser.photoURL,
		};
	} else {
		return null;
	}
}
