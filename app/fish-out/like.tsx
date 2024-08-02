"use client";

import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { postLike } from "../actions";
import { auth } from "@/lib/firebase/firebase";
import Toast from "../ui/toast";
import { createPortal } from "react-dom";

export default function Like() {
	const [liked, setLiked] = useState(false);
	const [toast, setToast] = useState(false);

	const handleLike: MouseEventHandler = (e) => {
		e.preventDefault();

		if (auth.currentUser) {
			console.log(auth.currentUser);
			setLiked((prev) => !prev);
			postLike();
		} else if (!toast) {
			console.log(auth.currentUser);
			setToast(true);
			setTimeout(() => {
				setToast(false);
			}, 4000);
		}
	};

	return (
		<>
			<div className="w-6 h-6 relative cursor-pointer" onClick={handleLike}>
				<Image
					src={liked ? "/heart-on.svg" : "/heart-off.svg"}
					alt="좋아요"
					fill
					className={`hover:opacity-50 ${liked ? "opacity-100" : "opacity-20"}`}
				/>
			</div>
			{toast && createPortal(<Toast />, document.body)}
		</>
	);
}
