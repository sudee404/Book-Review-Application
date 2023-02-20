import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="header">
			<div className="row mx-0 h-100 text-center align-items-center  text-light">
				<div className="col-12 p-2 p-lg-5">
					<h1 className="fs-1 fw-bolder text-primary">
						{error.statusText || error.message}
					</h1>
					<div className="col-12 lead p-lg-5 pt-0 fw-bold">
						Sorry, an unexpected error has occurred
					</div>
					<Link type="button" className="btn btn-primary fw-bold" to={'/'}>Go Home</Link>
				</div>
			</div>
		</div>
	);
}
