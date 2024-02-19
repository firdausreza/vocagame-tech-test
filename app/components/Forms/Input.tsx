"use client";

interface InputProps {
	id: string;
	type: "text" | "password" | "tel";
	label: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	value?: any;
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
	value,
	customClass = "",
	inputHandler,
}: InputProps) {
	const _changeHandler = (event: any) => {
		inputHandler(event.target.value);
	};
	return (
		<>
			<label htmlFor={id} className="text-sm">
				{label}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				onInput={_changeHandler}
				value={value}
				className={`w-full mt-2 px-4 py-2 border border-gray-400 rounded-md ${customClass} disabled:bg-gray-200`}
			/>
		</>
	);
}
