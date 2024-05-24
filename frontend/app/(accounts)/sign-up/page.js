"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="/">
				read-up.com
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function SignUp() {
	const [formErrors, setFormErrors] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const data = new FormData(event.currentTarget);
		// post data
		await axios
			.post("/api/signup", {
				username: data.get("username"),
				email: data.get("email"),
				password: data.get("password"),
			})
			.then((res) => {
				// show success message
				toast.success("Sign up successful. Signing in.");
				const result = signIn("django-provider", {
					username: data.get("username"),
					password: data.get("password"),
					redirect: false,
				});
				if (!result.error) {
					router.push("/");
				} else {
					toast.error("Error signing in. Please try again.");
					router.push("/sign-in");
				}
			})
			.catch((error) => {
				setFormErrors(error.response.data);
				toast.error("Error signing up. Please try again.");
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Box
			sx={{
				height: "80vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="userName"
									label="Username"
									name="username"
									autoComplete="family-name"
									error={!!formErrors?.username}
									helperText={formErrors?.username}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									error={!!formErrors?.email}
									helperText={formErrors?.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									error={!!formErrors?.password}
									helperText={formErrors?.password}
								/>
							</Grid>
							
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={loading}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/sign-in" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</Box>
	);
}
