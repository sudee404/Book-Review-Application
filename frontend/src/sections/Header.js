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
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
const paths = [
	["Home", "/"],
	["About", "about/"],
	["Books", "books/"],
	["Authors", "authors/"],
];
const Header = () => {
	const userId = useSelector((state) => state.user.id);
	const userName = useSelector((state) => state.user.username);
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
						col
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{paths.map((item) => {
								return (
									<li className="nav-item">
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
											setElement(<RegisterForm after={onClose} />);
											onOpen();
										}}
									>
										Get Started
									</Link>
								</li>
							)}
						</ul>
						{userId && (
							<li className="nav-item">
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
					<h1 className="fs-1 fw-bolder text-primary">
						Welcome to ReadUp
					</h1>
					<div className="col-12 lead p-lg-5 fw-bold">
						The ultimate destination for book lovers. Join a
						community of avid readers who share their thoughts,
						opinions, and insights on their favorite books.
					</div>
					<div className="col-12 lead p-lg-5 fw-bold">
						<button type="button" className="btn">
							<ArrowDownIcon boxSize={10} />
						</button>
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
