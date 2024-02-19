"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { Pagination, Autoplay } from "swiper/modules";
import { currentUserSlice, useDispatch } from "@/lib/redux";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../../session";

import { Button, Input } from "../../components/components";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "../../styles/custom-swiper.css";
import VocaGame from "@/public/images/vocagame.webp";
import Slide1 from "@/public/images/swiper1.webp";
import Slide2 from "@/public/images/swiper2.webp";
import Slide3 from "@/public/images/swiper3.webp";

const zodSchema = z
	.object({
		username: z.string().min(6, {
			message: "Username must be more than 6 characters long",
		}),
		password: z.string().min(8, {
			message: "Password must be more than 8 characters long",
		}),
	})
	.superRefine(({ username, password }, ctx) => {
		const usersDb: Array<User> = JSON.parse(
			localStorage.getItem("users") || "[]"
		);

		if (
			usersDb.length < 1 ||
			(usersDb.length > 0 &&
				usersDb.findIndex((user) => user.username === username) < 0)
		) {
			ctx.addIssue({
				code: "custom",
				path: ["username"],
				message: "User does not exist",
			});
		}

		const findUser = usersDb.filter(
			(user) => user.username === username
		)[0];

		if (findUser.password !== password) {
			ctx.addIssue({
				code: "custom",
				path: ["password"],
				message: "Wrong password!",
			});
		}
	});

export default function LoginPage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errors, setErrors] = useState<any>(null);
	const slidesData = [
		{
			title: "Track Pembelianmu!",
			image: Slide1,
		},
		{
			title: "Membership Area",
			image: Slide2,
		},
		{
			title: "Gabung jadi Reseller",
			image: Slide3,
		},
	];

	const handleUsername = (value?: string) => {
		if (value) {
			setUsername(value);
		}
	};

	const handlePassword = (value?: string) => {
		if (value) {
			setPassword(value);
		}
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();

		const result = zodSchema.safeParse({
			username: username,
			password: password,
		});
		const usersDb: Array<User> = JSON.parse(
			localStorage.getItem("users") || "[]"
		);

		if (!result.success) {
			setErrors(result.error.format());
		} else {
			if (
				usersDb.length < 1 ||
				(usersDb.length > 0 &&
					usersDb.findIndex((user) => user.username === username) < 0)
			) {
				toast.error("User does not exist");
				return;
			}
			const user = usersDb.filter(
				(user) => user.username === username
			)[0];

			localStorage.setItem("currentUser", JSON.stringify(user));
			dispatch(currentUserSlice.actions.setCurrentUser(user));
			await login(user).then(() => {
				router.push("/profile");
			});
		}
	};

	const swiperSlides = slidesData.map((slide, index) => {
		return (
			<SwiperSlide key={index}>
				<div>
					<Image
						src={slide.image}
						alt={`Slide ${index}`}
						width={400}
						className="m-auto"
					/>
					<h4 className="text-2xl text-center font-bold text-white mt-2">
						{slide.title}
					</h4>
				</div>
			</SwiperSlide>
		);
	});

	useEffect(() => {
		if (localStorage.getItem("currentUser"))
			localStorage.removeItem("currentUser");
		dispatch(currentUserSlice.actions.flushCurrentUser());
	}, []);

	return (
		<section className="w-full flex min-h-[100vh]">
			<section
				id="main-content__container"
				className="w-full lg:w-[40%] px-4 py-12 md:px-24 md:py-24 dark:bg-gray-600"
			>
				<article
					id="main-content"
					className="flex flex-1 flex-col justify-center h-full"
				>
					<Image src={VocaGame} alt="VocaGame Logo" width={250} />
					<h3 className="text-lg sm:text-xl text-green-500 dark:text-white font-medium mt-4">
						Masuk Akun VocaGame
					</h3>
					<h1 className="text-4xl md:text-6xl font-bold mt-2">
						Login Disini
					</h1>
					<p className="text-gray-600 dark:text-white mt-4">
						Masukkan username dan password anda untuk mengakses
						platform VocaGame.
					</p>
					<form onSubmit={onSubmit} className="mt-4">
						<div id="username-input">
							<Input
								id="username"
								type="text"
								label="Username"
								inputHandler={handleUsername}
								placeholder="e.g johndoe123"
							/>
							{errors &&
								errors.username &&
								errors.username._errors && (
									<p className="text-red-500 text-sm">
										{errors.username._errors[0]}
									</p>
								)}
						</div>
						<div id="password-input" className="mt-2">
							<Input
								id="password"
								type="password"
								label="Password"
								inputHandler={handlePassword}
								placeholder="Min 8 characters"
							/>
							{errors &&
								errors.password &&
								errors.password._errors && (
									<p className="text-red-500 text-sm">
										{errors.password._errors[0]}
									</p>
								)}
						</div>
						<Button
							type="submit"
							text="Masuk"
							customClass={`w-full px-4 py-2 rounded-md bg-green-500 dark:bg-gray-800 hover:bg-green-700 dark:hover:bg-gray-700 transition-colors text-white text-sm mt-4`}
						/>
					</form>
					<p className="text-gray-600 dark:text-white mt-2">
						Belum punya akun?{" "}
						<span>
							<Link
								href={`/auth/register`}
								className="text-green-500 hover:underline underline-offset-1"
							>
								Daftar disini
							</Link>
						</span>
					</p>
				</article>
			</section>
			<section
				id="banner-content__container"
				className="w-[60%] hidden lg:flex min-h-[100vh] px-4 py-12 lg:px-12 lg:py-24 bg-green-500 dark:bg-gray-800"
			>
				<article
					id="banner-content"
					className="w-full flex justify-center items-center m-auto h-full"
				>
					<Swiper
						pagination={true}
						modules={[Pagination, Autoplay]}
						slidesPerView={1}
						autoplay={{
							delay: 1500,
						}}
						className="w-full max-w-full"
					>
						{swiperSlides}
					</Swiper>
				</article>
			</section>
			<Toaster position="top-right" />
		</section>
	);
}
