import styles from "./page.module.css";
import Letters from "./letters";
import Link from "next/link";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { Letter } from "../actions.type";

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

	return (
		<>
			<Link href="/" className={styles.backToMain}>
				띄워 보낸 편지
			</Link>
			<Letters letters={letters} />
		</>
	);
}

export const revalidate = false;
// false | 0 | number
