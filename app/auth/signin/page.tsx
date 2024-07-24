"use client";

import { removeCredentialCookie } from "@/app/actions";
import Modal from "@/app/ui/modal";
import Spinner from "@/app/ui/spinner";
import { auth } from "@/lib/firebase/firebase";
import getGoogleCredential from "@/lib/utils/get-google-credential";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const waitRemoval = async () => await removeCredentialCookie();

		if (getGoogleCredential()) {
			signInWithCredential(
				auth,
				GoogleAuthProvider.credential(getGoogleCredential())
			)
				.catch((error) => console.log(error))
				.finally(() => {
					waitRemoval();
					router.push("/");
				});
		} else {
			setOpen(true);
		}
	}, []);

	const handleReturn = () => router.push("/");

	return (
		<main className="h-full flex justify-center items-center">
			<div className="h-20 w-20 mx-auto">
				<Spinner />
			</div>
			{open && (
				<Modal routerPath="/">
					<div className="rounded-lg bg-white w-full max-w-[400px] p-8 text-center">
						<p className="mb-8">구글 인증 토큰이 없습니다.</p>
						<button
							className="hover:bg-neutral-100 px-4 py-2 rounded"
							onClick={handleReturn}
						>
							홈으로
						</button>
					</div>
				</Modal>
			)}
		</main>
	);
}
