"use client";

import styles from "./letters.module.css";
import Link from "next/link";
import SendAwayButton from "./send-away-button";
import { useState } from "react";
import { Letter } from "../actions.type";

interface LettersProps {
	letters: Letter[];
}

export default function Letters({ letters: initLetters }: LettersProps) {
	const [letters, setLetters] = useState(initLetters);

	const handleLoadLetters = (next: Letter[]) => setLetters(() => next);

	return (
		<section className={styles.outer}>
			<div className={styles.lettersContainer}>
				<div className={styles.letters}>
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
			</div>
			<div className={styles.buttonContainer}>
				<SendAwayButton
					onLoadLetters={handleLoadLetters}
					lastLetterId={letters[letters.length - 1].id}
				>
					흘려 보내기
				</SendAwayButton>
			</div>
		</section>
	);
}
