"use client";

import { useEffect, useState } from "react";

interface InputProps {
	id: string;
	type: "text" | "password" | "tel";
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	initValue?: string | number | boolean;
	customClass?: string;
	inputHandler: (value?: any) => void;
}

export default function Input({
	id,
	type,
	label,
	placeholder = "Type here...",
	required = false,
	disabled = false,
	initValue = "",
	customClass = "",
	inputHandler,
}: InputProps) {
	const [_value, setValue] = useState<any>("");

	const _changeHandler = (event: any) => {
		setValue(event.target.value);
		inputHandler(event.target.value);
	};

	useEffect(() => {
		setValue(initValue);
	}, [initValue]);

	return (
		<>
			<label htmlFor={id} className="text-sm dark:text-white">
				{label}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				onChange={_changeHandler}
				value={_value}
				className={`w-full mt-2 px-4 py-2 border border-gray-400 rounded-md ${customClass} disabled:bg-gray-200`}
			/>
		</>
	);
}
