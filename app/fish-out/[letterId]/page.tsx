import LetterById from "./letter-by-id";
import Modal from "@/app/ui/modal";

interface PageProps {
	params: { [key: string]: string };
}

export default function Page({ params }: PageProps) {
	return (
		<Modal routerPath="/fish-out">
			<LetterById letterId={params.letterId} />
		</Modal>
	);
}
