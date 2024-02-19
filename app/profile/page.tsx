"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import {
	currentUserSlice,
	useDispatch,
	selectCurrentUser,
	useSelector,
} from "@/lib/redux";
import { logout } from "../../session";
import { useRouter } from "next/navigation";

import { IconUserCog, IconArrowBarRight } from "@tabler/icons-react";
import { Button, Input } from "../components/components";
import toast, { Toaster } from "react-hot-toast";

const zodSchema = z
	.object({
		fullname: z.string(),
		username: z.string().min(6, {
			message: "Username must have more than 6 characters long",
		}),
		password: z.string().min(8, {
			message: "Password must have more than 8 characters long",
		}),
		confirmPassword: z.string(),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				path: ["confirmPassword"],
				message: "Password does not match",
			});
		}
	});

export default function ProfilePage() {
	const router = useRouter();
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const [user, setUser] = useState<UserRegisterAndEdit>({
		fullname: "",
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<any>(null);

	const handleFullname = (value?: string) => {
		if (value) {
			const tempUser = user;
			tempUser.fullname = value;
			setUser(tempUser);
		}
	};

	const handleUsername = (value?: string) => {
		if (value) {
			const tempUser = user;
			tempUser.username = value;
			setUser(tempUser);
		}
	};

	const handlePassword = (value?: string) => {
		if (value) {
			const tempUser = user;
			tempUser.password = value;
			setUser(tempUser);
		}
	};

	const handleConfirmPassword = (value?: string) => {
		if (value) {
			const tempUser = user;
			tempUser.confirmPassword = value;
			setUser(tempUser);
		}
	};

	const signOut = async () => {
		await logout().then(() => {
			localStorage.removeItem("currentUser");
			dispatch(currentUserSlice.actions.flushCurrentUser());
			router.push("/auth/login");
		});
	};

	const onSubmit = (e: any) => {
		e.preventDefault();

		const editedUser = {
			fullname: user.fullname,
			username: user.username,
			password: user.password,
		};

		if (JSON.stringify(editedUser) === JSON.stringify(currentUser)) {
			toast.error("Please change one of the user data");
			return;
		}

		const result = zodSchema.safeParse(user);

		if (!result.success) {
			setErrors(result.error.format());
			return;
		} else {
			const usersDb: Array<User> = JSON.parse(
				localStorage.getItem("users") || "[]"
			);

			const newUsersDb = usersDb.map((_user) => {
				if (_user.username === editedUser.username) {
					return editedUser;
				}
				return _user;
			});

			localStorage.setItem("users", JSON.stringify(newUsersDb));
			localStorage.setItem("currentUser", JSON.stringify(editedUser));
			toast.success("Edit profile success");
		}
	};

	useEffect(() => {
		if (localStorage.getItem("currentUser"))
			dispatch(
				currentUserSlice.actions.setCurrentUser(
					JSON.parse(
						localStorage.getItem("currentUser") ||
							JSON.stringify({
								fullname: "",
								username: "",
								password: "",
							})
					)
				)
			);

		// Set user state based from current logged user (redux state)
		const tempUser = {
			fullname: currentUser.fullname,
			username: currentUser.username,
			password: currentUser.password,
			confirmPassword: "",
		};
		setUser(tempUser);
	}, [currentUser]);

	return (
		<section className="max-w-5xl lg:max-w-6xl mx-auto px-4 lg:px-0 py-8">
			<article id="profile-header" className="w-full flex flex-col">
				<section
					id="profile-header__banner"
					className="w-full h-[200px] bg-black/65 rounded-md"
				></section>
				<section
					id="profile-header__content"
					className="w-full flex items-center"
				>
					<div id="profile-header__image" className="ms-4 -mt-12">
						<Image
							src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Profile Picture"
							className="rounded-full border-4 border-white"
							width={150}
							height={150}
						/>
					</div>
					<div id="profile-header__data" className="ms-4">
						<h2 className="text-2xl font-bold">John Doe</h2>
						<p className="text-sm">Normal Member</p>
					</div>
				</section>
			</article>
			<article id="profile-dashboard" className="w-full flex mt-8">
				<aside
					id="profile-dashboard__sidebar"
					className="hidden lg:flex flex-col w-[20%] px-4"
				>
					<div id="profile-button" className="flex items-center">
						<IconUserCog size={24} />
						<p className="ms-4 text-md font-medium">Profile</p>
					</div>
					<div
						id="logout-button"
						className="flex items-center cursor-pointer mt-4 text-red-500"
						onClick={signOut}
					>
						<IconArrowBarRight size={24} />
						<p className="ms-4 text-md font-medium">Sign out</p>
					</div>
				</aside>
				<section
					id="profile-dashboard__content"
					className="flex-1 lg:px-4 lg:pl-8 lg:border-l border-gray-400"
				>
					<div className="w-full flex flex-col border border-gray-200 rounded-md shadow-md p-4">
						<h5 className="text-xl pb-2 border-b border-gray-400">
							Edit Profile
						</h5>
						<form onSubmit={onSubmit} className="mt-4">
							<div id="fullname-field">
								<Input
									id="fullname"
									type="text"
									label="Nama Lengkap"
									inputHandler={handleFullname}
									placeholder="e.g John Doe"
									customClass="text-sm"
									initValue={user.fullname}
								/>
								{errors &&
									errors.fullname &&
									errors.fullname._errors && (
										<p className="text-red-500 text-sm">
											{errors.fullname._errors[0]}
										</p>
									)}
							</div>
							<div id="username-field" className="mt-2">
								<Input
									id="username"
									type="text"
									label="Username"
									inputHandler={handleUsername}
									placeholder="e.g johndoe123"
									customClass="text-sm"
									initValue={user.username}
									disabled
								/>
							</div>
							<div id="password-field" className="mt-2">
								<Input
									id="password"
									type="password"
									label="Password"
									inputHandler={handlePassword}
									placeholder="Min 8 characters long"
									customClass="text-sm"
									initValue={user.password}
								/>
								{errors &&
									errors.password &&
									errors.password._errors && (
										<p className="text-red-500 text-sm">
											{errors.password._errors[0]}
										</p>
									)}
							</div>
							<div id="confirm-password-field" className="mt-2">
								<Input
									id="confirm-password"
									type="password"
									label="Konfirmasi Password"
									inputHandler={handleConfirmPassword}
									placeholder="Must be same as password"
									customClass="text-sm"
									initValue={user.confirmPassword}
								/>
								{errors &&
									errors.confirmPassword &&
									errors.confirmPassword._errors && (
										<p className="text-red-500 text-sm">
											{errors.confirmPassword._errors[0]}
										</p>
									)}
							</div>
							<Button
								type="submit"
								text="Edit Profil"
								customClass="px-4 py-2 rounded-md bg-green-500 hover:bg-green-700 transition-colors text-white text-sm mt-4"
							/>
						</form>
					</div>
				</section>
			</article>
			<Toaster position="top-right" />
		</section>
	);
}
