"use client";
/* Components */
import { Providers } from "@/lib/providers";
import { Nav } from "./components/components";

/* Instruments */
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

import "./styles/globals.css";

export default function RootLayout(props: React.PropsWithChildren) {
	const pathname = usePathname();
	const [darkMode, setDarkMode] = useState<boolean>();

	const toggleDarkMode = () => {
		const _darkMode = !darkMode;
		setDarkMode(_darkMode);
		localStorage.setItem("darkMode", JSON.stringify(_darkMode));
	};

	useEffect(() => {
		if (localStorage.getItem("darkMode")) {
			setDarkMode(
				JSON.parse(
					localStorage.getItem("darkMode") || JSON.stringify(darkMode)
				)
			);
		} else {
			localStorage.setItem("darkMode", JSON.stringify(darkMode));
		}
	}, []);

	return (
		<Providers>
			<html lang="en">
				<head>
					<title>VocaGame</title>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
				</head>
				<body className={`${darkMode ? "dark" : "light"} relative`}>
					{!pathname.includes("/auth") && <Nav />}
					<main>{props.children}</main>
					<button
						className={`${
							darkMode ? "bg-white" : "bg-slate-900"
						} rounded-full p-4 fixed bottom-5 right-5`}
						onClick={toggleDarkMode}
					>
						{darkMode ? (
							<IconSunFilled size={16} className="text-black" />
						) : (
							<IconMoonFilled size={16} className="text-white" />
						)}
					</button>
				</body>
			</html>
		</Providers>
	);
}
