import { doc, getDoc } from "firebase/firestore";
import styles from "./letter-by-id.module.css";
import { db } from "@/lib/firebase/firebase";

interface LetterByIdProps {
	letterId: string;
}

export default async function LetterById({ letterId }: LetterByIdProps) {
	const letterRef = doc(db, "letters", letterId);
	const letterSnap = await getDoc(letterRef);
	const letter = { letter: "" };

	if (letterSnap.exists()) {
		letter.letter = letterSnap.data().letter;
	}

	return <div className={styles.outer}>{letter.letter}</div>;
}
