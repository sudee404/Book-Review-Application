"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ClubForm from "../../../components/clubs/ClubForm";
import NotificationList from "../../../components/profile/NotificationList";
import { Container, Typography } from "@mui/material";

export default function Page() {
	return (
		<Box
			id="highlights"
			sx={{
				pt: { xs: 4, sm: 12 },
				pb: { xs: 8, sm: 16 },
				
			}}
		>
			<Container
				sx={{
					position: "relative",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: { xs: 3, sm: 6 },
				}}
			>
				<Box
					sx={{
						width: { sm: "100%", md: "60%" },
						textAlign: { sm: "left", md: "center" },
					}}
				>
					<Typography component="h2" variant="h4">
						Notifications
					</Typography>
					<Typography variant="body1" sx={{ color: "grey.400" }}>
						Check out your notifications below
					</Typography>
				</Box>
				<NotificationList />
				<Divider />
			</Container>
		</Box>
	);
}
