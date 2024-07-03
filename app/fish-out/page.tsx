import styles from "./page.module.css";
import Letters from "./letters";
import Link from "next/link";

export default async function FishOut() {
	return (
		<>
			<Link href="/" className={styles.backToMain}>
				띄워 보낸 편지
			</Link>
			<Letters />
		</>
	);
}
