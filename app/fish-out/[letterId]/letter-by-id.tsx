import styles from "./letter-by-id.module.css";

interface LetterByIdProps {
	letterId: string;
}

export default function LetterById({ letterId }: LetterByIdProps) {
	return <div className={styles.outer}>{letterId}</div>;
}
