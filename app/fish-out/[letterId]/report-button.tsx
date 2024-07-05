"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./report-button.module.css";

export default function ReportButton() {
	const router = useRouter();
	const path = usePathname();

	const handleClickReport = () => router.push(path + "/report");

	return (
		<>
			<button onClick={handleClickReport} className={styles.reportButton}>
				신고
			</button>
		</>
	);
}
