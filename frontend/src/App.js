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

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className="App">
				<Header />
				<Products />
				<About/>
				<Outlet />
				<Footer />
				<BackToTopButton/>
			</div>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: "signin/",
				element: <LoginForm />,
			},
			{
				path: "register/",
				element: <RegisterForm />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
