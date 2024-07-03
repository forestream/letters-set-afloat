import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Modal from "./modal";
import LetterById from "@/app/fish-out/[letterId]/letter-by-id";

export default function Page({ params }: Params) {
	return (
		<Modal>
			<LetterById letterId={params.letterId} />
		</Modal>
	);
}
