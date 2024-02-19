"use client";
/* Components */
import { Providers } from "@/lib/providers";
import { Nav } from "./components/components";

/* Instruments */
import { usePathname } from "next/navigation";
import "./styles/globals.css";

export default function RootLayout(props: React.PropsWithChildren) {
	const pathname = usePathname();

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
				<body>
					{!pathname.includes("/auth") && <Nav />}
					<main>{props.children}</main>
				</body>
			</html>
		</Providers>
	);
}
