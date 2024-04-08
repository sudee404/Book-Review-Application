"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "../themes/getLPTheme";
import { ColorModeContext } from "../context/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Providers from "./providers";

export default function RootLayout({ children }) {
	const [mode, setMode] = React.useState("light");


	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const themeMode = localStorage.getItem("themeMode");
			if (themeMode) {
				setMode(themeMode);
			}
		}
	}, []);

	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				const newMode = mode === "light" ? "dark" : "light";
				setMode(newMode);
				localStorage.setItem("themeMode", newMode);
			},
		}),
		[mode]
	);

	const theme = React.useMemo(() => createTheme(getLPTheme(mode)), [mode]);

	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ColorModeContext.Provider value={colorMode}>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<SessionProvider>
								<Providers>{children}</Providers>
							</SessionProvider>
						</ThemeProvider>
					</ColorModeContext.Provider>
					<ToastContainer
						position="bottom-center"
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable
						pauseOnHover
						theme="colored"
					/>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
