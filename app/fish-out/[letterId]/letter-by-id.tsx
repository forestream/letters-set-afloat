import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import styles from "./letter-by-id.module.css";
import { db } from "@/lib/firebase/firebase";
import Form from "./form";
import ReplyButton from "./reply-button";

interface LetterByIdProps {
	letterId: string;
}

export default async function LetterById({ letterId }: LetterByIdProps) {
	const letterRef = doc(db, "letters", letterId);
	const repliesRef = collection(db, "letters", letterId, "replies");

	const letterSnap = await getDoc(letterRef);
	const repliesSnap = await getDocs(repliesRef);

	const letter: { letter: string; replies: { id: string; reply: string }[] } = {
		letter: "",
		replies: [],
	};

	if (letterSnap.exists()) {
		letter.letter = letterSnap.data().letter;
	}
	repliesSnap.forEach((reply) =>
		letter.replies.push({ reply: reply.get("reply"), id: reply.id })
	);

	console.log(letter.replies);

	return (
		<div className={styles.outer}>
			<p className={styles.letter}>{letter.letter}</p>
			<div className={styles.replies}>
				{letter.replies.map((reply) => (
					<p key={reply.id} className={styles.reply}>
						{reply.reply}
					</p>
				))}
			</div>
			<Form letterId={letterId}>
				<textarea className={styles.replyInput} name="reply" />
				<ReplyButton />
			</Form>
		</div>
	);
}
