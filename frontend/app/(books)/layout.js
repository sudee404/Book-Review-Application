"use client";
import * as React from "react";
import AppAppBar from "../../components/AppAppBar";
import { ColorModeContext } from "../../context/context";
import { useTheme } from "@mui/material";
import Footer from "../../components/Footer";

export default function HomeLayout({ children }) {
	const theme = useTheme();
	const colorMode = React.useContext(ColorModeContext);

	return (
		<div>
			<AppAppBar
				mode={theme.palette.mode}
				toggleColorMode={colorMode.toggleColorMode}
			/>
			{children}
			<Footer/>
		</div>
	);
}
