import Link from "next/link";

export default function Footer() {
	return (
		<footer className="fixed bottom-0 left-0 right-0 h-[24px] text-right z-10">
			<div className="absolute right-[12px] bottom-[12px]">
				<Link
					className="text-white text-sm font-semibold cursor-pointer p-[8px] no-underline hover:underline"
					href="https://www.instagram.com/letterssetafloat_/"
				>
					인스타그램
				</Link>
				<Link
					className="text-white text-sm font-semibold cursor-pointer p-[8px] no-underline hover:underline"
					href="/contact"
				>
					문의
				</Link>
			</div>
		</footer>
	);
}
