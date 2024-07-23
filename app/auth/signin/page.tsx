"use client";

import Spinner from "@/app/ui/spinner";
import { auth } from "@/lib/firebase/firebase";
import getGoogleCredential from "@/lib/utils/get-google-credential";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	useEffect(() => {
		if (getGoogleCredential()) {
			signInWithCredential(
				auth,
				GoogleAuthProvider.credential(getGoogleCredential())
			);
			redirect("/");
		}
	}, []);

	return (
		<main className="h-full flex justify-center items-center">
			<div className="h-20 w-20 mx-auto">
				<Spinner />
			</div>
		</main>
	);
}
