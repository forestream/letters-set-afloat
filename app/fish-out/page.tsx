import Letters from "./letters";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { Letter } from "../actions.type";

async function getLetters(letterId: string) {
	const snapshot = await getDocs(collection(db, "letters", letterId, "likes"));

	return snapshot.size;
}

async function getLikeState(letterId: string) {}

export default async function FishOut() {
	const first = query(
		collection(db, "letters"),
		orderBy("sentAt", "desc"),
		limit(6)
	);

	const letterSnapshots = await getDocs(first);

	const letters = letterSnapshots.docs.map(
		(doc) =>
			({
				...doc.data(),
				sentAt: doc.get("sentAt").toDate(),
				id: doc.id,
			} as Letter)
	);

	const counts = await Promise.all(
		letters.map((letter) => getLetters(letter.id))
	);

	const lettersWithLikeCount = letters.map((letter, index) => ({
		...letter,
		likeCount: counts[index],
	}));

	return <Letters letters={lettersWithLikeCount} />;
}
