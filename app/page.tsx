import Background from "./background";
import Foreground from "./foreground";
import styles from "./page.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<Background />
			<Foreground />
		</main>
	);
}
