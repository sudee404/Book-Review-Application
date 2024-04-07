import React from 'react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setId, setName, setToken } from "../redux/userSlice";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
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
	Avatar,
	AvatarBadge,
} from "@chakra-ui/react";


export default function NavComp() {
	const userId = useSelector((state) => state.user.id);
	const userName = useSelector((state) => state.user.username);
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const logOut = (e) => {
		dispatch(setId(""));
		dispatch(setName(""));
		dispatch(setToken(""));
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

	const paths = [
		["Home", "/"],
		["Find Book", "books/"],
		["Join Club", "clubs/"],
	];

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [overlay, setOverlay] = React.useState(<OverlayOne />);
	const [element, setElement] = React.useState(<LoginForm />);
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light sticky-top fw-bolder">
				<div className="container-fluid p-3 px-lg-5 d-flex justify-content-center-lg">
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
						<ul className="navbar-nav me-auto">
							{paths.map((item, idx) => {
								return (
									<li className="nav-item" key={idx}>
										<Link
											className={`nav-link mx-2 ${item[1] === pathname ? 'active' : ''}`}
											aria-current="page"
											to={item[1]}
										>
											{item[0]}
										</Link>
									</li>
								);
							})}
							{!userId ? (
								<><li className="nav-item">
									<Link
										className={`nav-link mx-2`}
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
									</li></>
							) : <li className="nav-item">
								<Link
									className={`nav-link mx-2 ${"my-books/" === pathname ? 'active' : ''}`}
									aria-current="page"
									to="my-books/"

								>
									My Books
								</Link>
							</li>}
						</ul>
						{userId && (
							<>
								<div className="nav-item me-2">
									<Menu>
										<MenuButton
											as={Avatar}
											icon={<BellIcon fontSize='1.9rem' />}
											bg="orange.200"
											className='p-2'
										>
											<AvatarBadge boxSize='1.25em' bg='green.500' />
										</MenuButton>

										<MenuList>
											<MenuItem onClick={logOut}>
												{userName}
											</MenuItem>
											<MenuItem onClick={logOut}>
												Profile
											</MenuItem>
											<MenuItem onClick={logOut}>
												Logout
											</MenuItem>
										</MenuList>
									</Menu>
								</div>
								<div className="nav-item ">

									<Menu>
										<MenuButton
											as={Avatar}
											// icon={<ChevronDownIcon />}
											bg={'teal.200'}
										>
										</MenuButton>

										<MenuList>
											<MenuItem>
												<span className="text-success">
													{userName}
												</span>
											</MenuItem>
											<MenuItem as={Link} to="/profile/">
												My Profile
											</MenuItem><MenuItem as={Link} to="/books/">
												My Books
											</MenuItem>
											<MenuItem onClick={logOut}>
												<span className="text-danger">
													Logout
												</span>
											</MenuItem>
										</MenuList>
									</Menu>
								</div></>
						)}
					</div>
				</div>
			</nav>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>Accounts</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{element}</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	)
}
