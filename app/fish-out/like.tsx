"use client";

import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { postLike } from "../actions";
import { auth } from "@/lib/firebase/firebase";
import Toast from "../ui/toast";
import { createPortal } from "react-dom";

interface LikeParams {
	letterId: string;
	count: number;
}

export default function Like({ letterId, count }: LikeParams) {
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
			<div className="flex gap-1.5 items-center">
				<div className="w-5 h-5 relative cursor-pointer" onClick={handleLike}>
					<Image
						src={liked ? "/heart-on.svg" : "/heart-off.svg"}
						alt="좋아요"
						fill
						className={`hover:opacity-50 ${
							liked ? "opacity-100" : "opacity-20"
						}`}
					/>
				</div>
				<p className="text-neutral-500 text-sm font-medium">{count}</p>
			</div>
			{toast && createPortal(<Toast />, document.body)}
		</>
	);
}
