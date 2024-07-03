import Background from "./background";
import styles from "./page.module.css";
import Letters from "./letters";

export default async function FishOut() {
	return (
		<main className={styles.main}>
			<Background />
			<Letters />
		</main>
	);
}
