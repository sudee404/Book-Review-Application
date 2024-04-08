"use client";
import * as React from "react";
import AppAppBar from "../../components/utils/AppAppBar";
import { ColorModeContext } from "../../context/context";
import { Divider, useTheme } from "@mui/material";
import Footer from "../../components/sections/Footer";

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
			<Divider />
			<Footer />
		</div>
	);
}
