/* Components */
import { Providers } from "@/lib/providers";

/* Instruments */
import "../styles/globals.css";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Providers>{children}</Providers>;
}
