import styles from "./contact.module.css";
import Modal from "@/app/ui/modal";
import Form from "./form";

export default function Contact() {
	return (
		<Modal>
			<Form className={styles.form}>
				<p className={styles.description}>문의나 건의 사항을 보내주세요.</p>
				<textarea className={styles.message} name="message" />
				<button className={styles.send}>보내기</button>
			</Form>
		</Modal>
	);
}
