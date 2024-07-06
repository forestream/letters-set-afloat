"use client";

import Modal from "@/app/ui/modal";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { reportLetter } from "@/app/actions";

export default function Page() {
	const router = useRouter();
	const { letterId } = useParams();
	console.log(letterId);

	const handleClickReport = () => reportLetter(letterId as string);
	const handleClickCancel = () => router.back();

	return (
		<Modal zIndex={3}>
			<div className={styles.outer}>
				<p>신고하시겠습니까?</p>
				<p className={styles.notice}>
					신고된 편지는 검토 후 삭제될 수 있습니다.
				</p>
				<div className={styles.buttons}>
					<button onClick={handleClickReport} className={styles.button}>
						신고
					</button>
					<button onClick={handleClickCancel} className={styles.button}>
						취소
					</button>
				</div>
			</div>
		</Modal>
	);
}
