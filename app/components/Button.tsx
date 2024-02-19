"use client";

interface ButtonProps {
	customClass: string;
	text: string;
	type: "submit" | "reset" | "button";
	clickFunction?: () => any;
}

export default function Button({
	customClass,
	text,
	type,
	clickFunction = () => {},
}: ButtonProps) {
	return (
		<button className={customClass} type={type} onClick={clickFunction}>
			{text}
		</button>
	);
}
