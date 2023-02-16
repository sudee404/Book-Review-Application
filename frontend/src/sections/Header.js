import React from "react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const Header = () => {
	

	return (
		<div className="header">
			
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
			
		</div>
	);
};

export default Header;
