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

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className="App">
				<Header />
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
						<About />
						<Services />
						<Reviews />
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
					<div className="App">
						<Products />
						<Footer />
						<BackToTopButton />
					</div>
				),
			},
			{
				path: "my-books/",
				element: (
					<div className="App">
						<Products />
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
