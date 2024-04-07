import { ArrowUpIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import "./BackToTopButton.css";

const BackToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		// Clean up the event listener
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		const scrollHeight = window.pageYOffset;
		if (scrollHeight > 200) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<div className="back-to-top-container">
			{isVisible && (
				<div onClick={scrollToTop} className="back-to-top-button">
					<ArrowUpIcon />
				</div>
			)}
		</div>
	);
};

export default BackToTopButton;
