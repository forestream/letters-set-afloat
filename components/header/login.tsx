"use client";

import { FrontUser } from "@/app/actions.type";
import { useEffect, useState } from "react";
import Profile from "./profile";
import { auth } from "@/lib/firebase/firebase";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
} from "firebase/auth";

declare global {
	var google: any;
	var gapi: any;
}

interface LoginProps {
	className: string;
}

export default function Login({ className }: LoginProps) {
	const [user, setUser] = useState<FrontUser | null>(null);

	const handleCredentialResponse = (result: any) => {
		signInWithCredential(
			auth,
			GoogleAuthProvider.credential(result.credential)
		);
	};

	useEffect(() => {
		google.accounts.id.initialize({
			client_id:
				"713412924199-gprgb7jbbojjct6jjka8ah2hmu648kv4.apps.googleusercontent.com",
			callback: handleCredentialResponse,
			ux_mode: "redirect",
			login_uri: process.env.NEXT_PUBLIC_BASE_URL + "/auth",
		});

		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(() => ({
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
					uid: user.uid,
				}));
			} else {
				setUser(null);
				google.accounts.id.prompt();
			}
		});
	}, []);

	useEffect(() => {
		if (!user) {
			google.accounts.id.renderButton(document.getElementById("gsi-button"), {
				type: "icon",
				shape: "circle",
			});
		}
	}, [user]);

	return (
		<>
			{user ? (
				<Profile user={user} className={className} />
			) : (
				<button id="gsi-button" className={className}></button>
			)}
		</>
	);
}
