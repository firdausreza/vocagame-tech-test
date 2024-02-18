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
				<body>
					{!pathname.includes("/auth") && <Nav />}
					<main>{props.children}</main>
				</body>
			</html>
		</Providers>
	);
}
