import { Timestamp, collection, getDocs, query } from "firebase/firestore";
import styles from "./letters.module.css";
import { db } from "@/lib/firebase/firebase";

interface Letter {
	id: string;
	letter: string;
	sentAt: Timestamp;
}

export default async function Letters() {
	const q = query(collection(db, "letters"));

	const querySnapshot = await getDocs(q);
	const letters: Letter[] = [];
	querySnapshot.forEach((doc) => {
		const { letter, sentAt } = doc.data();
		letters.push({ id: doc.id, letter, sentAt: sentAt.toDate() });
	});
	console.log(letters);

	return (
		<section className={styles.outer}>
			<div className={styles.inner}>
				{letters.map((letter) => (
					<article key={letter.id} className={styles.letter}>
						{letter.letter}
					</article>
				))}
			</div>
		</section>
	);
}
