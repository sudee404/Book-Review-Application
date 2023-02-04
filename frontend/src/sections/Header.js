import React from "react";
import UserForm from "../components/UserForm";
import { UserProfile } from "../components/UserProfile";
import { useSelector ,useDispatch} from "react-redux";
import { setId, setName } from "../redux/userSlice";

const Header = () => {
	const userId = useSelector((state) => state.user.id);
	// const userName = useSelector((state) => state.user.username);
	const dispatch = useDispatch()
	const logOut = () => {
		dispatch(setId(''))
		dispatch(setName(''))
	}
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
				<div className="container-fluid px-5 py-2 d-flex justify-content-between">
					<a className="navbar-brand fw-bold fs-3 ms-5" href="#">
						Read<span className="text-danger">Up</span>
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<ul className="navbar-nav fw-bold text-dark">
						<li className="nav-item mx-3">
							<a className="nav-link" href="#">
								Books
							</a>
						</li>
						<li className="nav-item mx-3">
							<a className="nav-link" href="#">
								Authors
							</a>
						</li>

						<li className="nav-item mx-3">
							<a
								className="nav-link"
								href="#profile"
								data-bs-toggle="offcanvas"
								data-bs-target="#profileTab"
								aria-controls="profileTab"
							>
								Profile
							</a>
						</li>
						{userId && (
							<li className="nav-item mx-3">
								<a
									className="nav-link"
									href="#"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal"
								>
									Logout
								</a>
							</li>
						)}
					</ul>
				</div>
			</nav>

			<div
				className="offcanvas offcanvas-end"
				data-bs-scroll="true"
				tabIndex="-1"
				id="profileTab"
				aria-labelledby="profId"
			>
				<div className="offcanvas-header">
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				{!userId ? (
					<div className="offcanvas-body">
						<p className="lead">
							Sign In or Sign Up below to proceed.
						</p>
						<UserForm />
					</div>
				) : (
					<UserProfile />
				)}
			</div>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog        ">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Sign Out
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							You are about to log out on this device. Do you wish
							to proceed with this action ?
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								No
							</button>
							<button
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
								onClick={logOut}
							>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
