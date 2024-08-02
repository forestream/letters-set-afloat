"use client";

import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { postLike } from "../actions";
import { auth } from "@/lib/firebase/firebase";
import Toast from "../ui/toast";
import { createPortal } from "react-dom";

interface LikeParams {
	letterId: string;
}

export default function Like({ letterId }: LikeParams) {
	const [liked, setLiked] = useState(false);
	const [toast, setToast] = useState(false);

	const handleLike: MouseEventHandler = (e) => {
		e.preventDefault();

		if (auth.currentUser) {
			postLike(letterId, auth.currentUser.uid);
			setLiked((prev) => !prev);
		} else if (!toast) {
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
