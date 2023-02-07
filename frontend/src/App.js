import "./App.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import ErrorPage from "./sections/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Outlet } from "react-router-dom";
import Services from "./sections/Services";
import Products from "./sections/Products";
import About from "./sections/About";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className="App">
				<Header />
				<Services />
				<Products />
				<About/>
				<Outlet />
				<Footer />
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
