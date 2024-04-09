import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ClubCard, { ClubCardPlaceHolder } from "./ClubCard";
import { useRouter } from "next/navigation";

export default function ClubsList() {
	const router = useRouter();
	const {
		data: { count, current, results, total } = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["book-clubs"],
		queryFn: async () =>
			await axios.get("/api/clubs").then((res) => res.data),
	});

	return (
		<Container
			id="clubs"
			sx={{
				pt: { xs: 4, sm: 12 },
				pb: { xs: 8, sm: 16 },
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
				<Typography
					component="h2"
					variant="h4"
					color="blue"
					fontWeight={"bold"}
				>
					Book Clubs
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Discover the Perfect Book Club for You. <br /> Join a
					community of book lovers and connect with fellow readers
					around the world. Explore book clubs based on your interests
					and discover new literary treasures together.
				</Typography>
			</Box>
			<Grid container justifyContent={"center"} spacing={2}>
				{isLoading ? (
					Array.from({ length: 10 }).map((_, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<ClubCardPlaceHolder />
						</Grid>
					))
				) : results?.length ? (
					results?.map((club, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<ClubCard club={club} onSuccess={() => refetch()} />
						</Grid>
					))
				) : (
					<Box>
						<Typography variant="h6">No clubs found</Typography>
					</Box>
				)}
			</Grid>
		</Container>
	);
}
