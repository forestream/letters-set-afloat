"use client";

import Modal from "@/app/ui/modal";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { reportLetter } from "@/app/actions";
import { useState } from "react";
import Spinner from "@/app/ui/spinner";

export default function Page() {
	const router = useRouter();
	const { letterId } = useParams();

	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState("");

	const handleClickReport = async () => {
		setIsPending(true);
		setError("");

		const res = await reportLetter(letterId as string);

		if (!res.success) {
			setError(res.error + "");
			setIsPending(false);
		} else {
			setIsPending(false);
			router.back();
		}
	};

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
						{isPending ? (
							<div className={styles.spinner}>
								<Spinner />
							</div>
						) : (
							"신고"
						)}
					</button>
					<button onClick={handleClickCancel} className={styles.button}>
						취소
					</button>
					{error && (
						<p className={styles.error}>신고 중 오류가 발생했습니다.</p>
					)}
				</div>
			</div>
		</Modal>
	);
}
