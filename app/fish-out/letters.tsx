"use client";

import styles from "./letters.module.css";
import Link from "next/link";
import SendAwayButton from "./send-away-button";
import { useEffect, useRef, useState } from "react";
import { Letter } from "../actions.type";
import { SWIPE_DUR } from "@/lib/constants/fish-out";
import Like from "./like";

interface LettersProps {
	letters: Letter[];
}

export default function Letters({ letters: initLetters }: LettersProps) {
	const [letters, setLetters] = useState(initLetters);

	const letterGroupRef = useRef<HTMLDivElement>(null);

	const swipeOut = async () =>
		new Promise<void>((resolve) => {
			if (!letterGroupRef.current) return;
			letterGroupRef.current.classList.remove(styles.mount);
			letterGroupRef.current.classList.add(styles.unmount);
			setTimeout(() => {
				resolve();
			}, SWIPE_DUR);
		});

	const swipeIn = () => {
		if (!letterGroupRef.current) return;
		letterGroupRef.current.classList.remove(styles.unmount);
		letterGroupRef.current.classList.add(styles.mount);
	};

	const initializePosition = async () =>
		new Promise<void>((resolve) => {
			if (!letterGroupRef.current) return;
			letterGroupRef.current.style.transition = "none";
			letterGroupRef.current.classList.remove(styles.unmount);
			letterGroupRef.current.classList.remove(styles.mount);
			letterGroupRef.current.style.transition = "";
			setTimeout(() => {
				resolve();
			}, SWIPE_DUR);
		});

	useEffect(() => {
		if (!letterGroupRef.current) return;
		swipeIn();
	}, [letters]);

	const handleLoadLetters = (next: Letter[]) => {
		setLetters(() => next);
	};

	return (
		<section className={styles.outer}>
			<div className={styles.lettersContainer}>
				<div ref={letterGroupRef} className={styles.letters}>
					{letters.map((letter) => (
						<Link
							key={letter.id}
							href={`/fish-out/${letter.id}`}
							className={styles.letterLink}
						>
							<article className={styles.letter}>
								<p className={styles.letterText}>{letter.letter}</p>
								<Like />
							</article>
						</Link>
					))}
				</div>
			</div>
			<div className={styles.buttonContainer}>
				{letters.length ? (
					<SendAwayButton
						initializePosition={initializePosition}
						swipeIn={swipeIn}
						swipeOut={swipeOut}
						onLoadLetters={handleLoadLetters}
						lastLetterId={letters[letters.length - 1].id}
					>
						흘려 보내기
					</SendAwayButton>
				) : (
					<p className={styles.noLetters}>떠밀려 온 편지가 없습니다.</p>
				)}
			</div>
		</section>
	);
}
