import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setId, setName } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { ArrowDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
const paths = [
	["Home", "/"],
	["Find Book", "books/"],
	["My Books", "my-books/"],
];
const Header = () => {
	const userId = useSelector((state) => state.user.id);
	const dispatch = useDispatch();
	const logOut = () => {
		dispatch(setId(""));
		dispatch(setName(""));
	};
	const OverlayOne = () => (
		<ModalOverlay
			bg="blackAlpha.300"
			backdropFilter="blur(10px) hue-rotate(90deg)"
		/>
	);

	const OverlayTwo = () => (
		<ModalOverlay
			bg="none"
			backdropFilter="auto"
			backdropInvert="80%"
			backdropBlur="2px"
		/>
	);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [overlay, setOverlay] = React.useState(<OverlayOne />);
	const [element, setElement] = React.useState(<LoginForm />);
	

	return (
		<div className="header">
			<nav className="navbar navbar-expand-lg navbar-dark fw-bolder">
				<div className="container-fluid p-lg-3 px-lg-5 d-flex justify-content-center-lg">
					<Link className="navbar-brand col" to="/">
						ReadUp
					</Link>
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
					<div
						className="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{paths.map((item, idx) => {
								return (
									<li className="nav-item" key={idx}>
										<Link
											className="nav-link mx-2"
											aria-current="page"
											to={item[1]}
										>
											{item[0]}
										</Link>
									</li>
								);
							})}
							{!userId && (
								<li className="nav-item">
									<Link
										className="nav-link mx-2"
										aria-current="page"
										to="#login"
										onClick={() => {
											setOverlay(<OverlayOne />);
											setElement(
												<LoginForm after={onClose} />
											);
											onOpen();
										}}
									>
										Sign In
									</Link>
								</li>
							)}
							{!userId && (
								<li className="nav-item">
									<Link
										type="button"
										to={"#register"}
										className="btn btn-primary fw-bolder"
										ml="4"
										onClick={() => {
											setOverlay(<OverlayTwo />);
											setElement(
												<RegisterForm after={onClose} />
											);
											onOpen();
										}}
									>
										Get Started
									</Link>
								</li>
							)}
						</ul>
						{userId && (
							<li className="nav-item ">
								<Menu>
									<MenuButton
										as={Button}
										rightIcon={<ChevronDownIcon />}
									>
										Profile
									</MenuButton>
									<MenuList>
										<MenuItem>View Profile</MenuItem>
										<MenuItem>Dashboard</MenuItem>
										<MenuItem onClick={logOut}>
											Logout
										</MenuItem>
									</MenuList>
								</Menu>
							</li>
						)}
					</div>
				</div>
			</nav>
			<div className="row mx-0 h-100 justify-content-center align-items-center  text-light">
				<div className="col-12 p-2 p-lg-5">
					<div className="p-5 mb-4  rounded-3">
						<div className="container-fluid py-5">
							<h1 className="display-4 fw-bold my-3 text-success">
								Welcome to ReadUp
							</h1>
							<p className="col-md-8 mx-auto pt-5">
								Whether you're seeking adventure, romance, or
								knowledge, our platform is here to help you find
								your next great read. So sit back, relax, and
								let us guide you on an unforgettable literary
								experience!
							</p>
						</div>
						<div className="col-12 lead p-lg-5 fw-bold">
							<button type="button" className="btn">
								<ArrowDownIcon boxSize={10} color="white" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{element}</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Header;
