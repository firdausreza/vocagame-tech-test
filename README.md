
# VocaGame Tech Test

VocaGame clone application with responsive mobile view friendly

## Demo

Deployed with Vercel: https://vocagame-tech-test.vercel.app/

## Tech Requirements

1. React.js + Next.js
2. Redux toolkit
3. Tailwind CSS

## Feature Requirements

1. Login feature
2. Register feature
3. View and edit profile feature
4. Session management (cookies)
5. Light/dark theme

## Additional Library

1. [Swiper](https://swiperjs.com)
2. [Zod Validation](https://zod.dev)
3. [react-hot-toast](https://react-hot-toast.com)
4. [Tabler Icons](https://tabler.io/)

## App Flow

### Note

1. Visiting default route (`https://url.com/`) will be redirected to `/auth/login` (without session) or `/profile/ (with session) by default.
2. Cookies expiry are set to 1 minute. If the cookie is expired, user will be redirected to `/auth/login` upon refresh or url visit.
3. `localStorage` is used to store several data (`users` database, `currentUser`, `darkTheme`), please be careful when observing the `localStorage`.

### Toggling light or dark theme

Toggling light or dark theme is available simply by clicking the `moon` or `sun` button on the right bottom corner (element is fixed). `localStorage` is used to save the last theme state (`darkMode`).

### Route /auth/login

![Login page with light theme](https://res.cloudinary.com/dnangmip5/image/upload/v1708316976/vocatest/brwnasfziydjta9z4ycg.png)

![Login page with dark theme](https://res.cloudinary.com/dnangmip5/image/upload/v1708316977/vocatest/bynrdehrvvmfnimr1z4k.png)

If `users` database is empty or if `user` does not exist with inputted `username`, an error message will popped out below the username input indicating `User does not exist`.

Login form validation rules are:

1. Username cannot be empty (`""`) or has whitespaces (e.g `john doe 123`)
2. Username must be more than 6 characters long
3. Password must be more than 8 characters long

After a successful login, cookies will be set to 1 minute with containing `user` data. The `currentUser` data on both `locatStorage` and `redux` will be set to logged `user`. And user will be redirected to `/profile/` page.

### Route /auth/register

![Register page with light theme](https://res.cloudinary.com/dnangmip5/image/upload/v1708316976/vocatest/qx0umjxurn2qfzcvtsmc.png)

![Register page with dark theme](https://res.cloudinary.com/dnangmip5/image/upload/v1708316976/vocatest/ouxivsznzxbhkypimriz.png)

The concept is same as `/auth/login`, but with rule if `user` is already exist with inputted `username`, an error message will popped out below the username input indicating `User already exist`.

Register form validation rules are:

1. Username cannot be empty (`""`) or has whitespaces (e.g `john doe 123`)
2. Username must be more than 6 characters long
3. Password & Confirm Password must be more than 8 characters long
4. Password & Confirm Password must be identically same

After a successful registration, the registered `user` will be pushed on `users` database. Registered user will be automatically logged in and redirected to `/profile/` page.

### Route /profile

![Profile page with light theme](https://res.cloudinary.com/dnangmip5/image/upload/v1708316974/vocatest/sjthsr8rtef9zs68qaqs.png)

![Profile page with dark theme](https://res.cloudinary.com/dnangmip5/image/upload/v1708316975/vocatest/qncgrdkkonrgctqbwmuc.png)

In this page, user can `edit` their profile and `sign out` from the app. Light/dark theme also enabled and can be toggled.

When editing a profile, the form rules are:

1. If there's no data changed at all and the user tried to prompt the `Edit Profile` button, an error `toast` will popped out on the top right corner indicating `No change on user data`
2. Username cannot be changed since I want it to be a `unique` property.
3. A new password must be more than 8 characters long.
4. New password and Confirm Password field must be identically same.

After a successful edit prompt, a success `toast` will popped out on the top right corner indicating `Edit profile success`. And the page will be refreshed.