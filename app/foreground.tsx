import styles from "./foreground.module.css";

export default function Foreground() {
	return (
		<div className={styles.outer}>
			<form className={styles.form}>
				<textarea name="letter" className={styles.letter} />
				<button className={styles.float}>띄우기</button>
			</form>
		</div>
	);
}
