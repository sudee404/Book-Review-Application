import "./App.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import ErrorPage from "./sections/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Outlet } from "react-router-dom";
import Products from "./sections/Products";
import About from "./sections/About";
import BackToTopButton from "./components/BackToTopButton";
import Services from "./sections/Services";
import Reviews from "./sections/Reviews";
import NavComp from "./components/NavComp";
import MyBooks from "./sections/MyBooks";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className="App">
				<NavComp />
				<Outlet />
				<BackToTopButton />
			</div>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: (
					<div>
						<Header />
						<About />
						<Services />
						<Footer />
					</div>
				),
			},
			{
				path: "signin/",
				element: <LoginForm />,
			},
			{
				path: "register/",
				element: <RegisterForm />,
			},
			{
				path: "books/",
				element: (
					<div>
						<Products />
						<Footer />
						<BackToTopButton />
					</div>
				),
			},
			{
				path: "clubs/",
				element: (
					<div>
						<Products />
						<Footer />
						<BackToTopButton />
					</div>
				),
			},
			{
				path: "my-books/",
				element: (
					<div>
						<MyBooks />
						<BackToTopButton />
					</div>
				),
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
