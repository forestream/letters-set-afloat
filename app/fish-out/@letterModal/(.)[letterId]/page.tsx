import Modal from "../../../ui/modal";
import LetterById from "@/app/fish-out/[letterId]/letter-by-id";

interface PageProps {
	params: { [key: string]: string };
}

export default async function Page({ params }: PageProps) {
	return (
		<Modal>
			<LetterById letterId={params.letterId} />
		</Modal>
	);
}
