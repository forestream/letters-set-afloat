"use client";

import Image from "next/image";
import { MouseEventHandler, useState } from "react";

export default function Like() {
	const [liked, setLiked] = useState(false);

	const handleLike: MouseEventHandler = (e) => {
		e.preventDefault();
		setLiked((prev) => !prev);
	};

	return (
		<div className="w-6 h-6 relative cursor-pointer" onClick={handleLike}>
			<Image
				src={liked ? "/heart-on.svg" : "/heart-off.svg"}
				alt="좋아요"
				fill
				className={`hover:opacity-50 ${liked ? "opacity-100" : "opacity-20"}`}
			/>
		</div>
	);
}
