"use client";

/* Core */
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import VocaGame from "@/public/images/vocagame.webp";

/* Instruments */

export default function Nav() {
	const pathname = usePathname();

	return (
		<header className="dark:bg-gray-500">
			<nav className="max-w-5xl lg:max-w-6xl mx-auto px-4 lg:px-0 py-4">
				<Link href="/">
					<Image src={VocaGame} alt="VocaGame Logo" width={75} />
				</Link>
			</nav>
		</header>
	);
}
