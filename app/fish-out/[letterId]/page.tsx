import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import LetterById from "./letter-by-id";
import Modal from "@/app/fish-out/@letterModal/(.)[letterId]/modal";

export default function Page({ params }: Params) {
	return (
		<Modal>
			<LetterById letterId={params.letterId} />;
		</Modal>
	);
}
