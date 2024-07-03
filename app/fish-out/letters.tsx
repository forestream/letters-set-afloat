import { Timestamp, collection, getDocs, query } from "firebase/firestore";
import styles from "./letters.module.css";
import { db } from "@/lib/firebase/firebase";
import { redirect } from "next/navigation";
import Link from "next/link";

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

	return (
		<section className={styles.outer}>
			<div className={styles.inner}>
				{letters.map((letter) => (
					<Link
						key={letter.id}
						href={`/fish-out/${letter.id}`}
						className={styles.letterLink}
					>
						<article className={styles.letter}>{letter.letter}</article>
					</Link>
				))}
			</div>
		</section>
	);
}
