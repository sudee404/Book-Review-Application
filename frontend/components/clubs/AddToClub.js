import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CardMedia, Skeleton } from "@mui/material";
import axios from "axios";
import { ClubCard2, ClubCardPlaceHolder } from "./ClubCard";
import { toast } from "react-toastify";

const lists = [
	{
		title: "Currently Reading",
		list: "currently_reading",
		buttonText: "Add here",
		buttonVariant: "outlined",
	},
	{
		title: "Planning to Read",
		list: "planning_to_read",
		buttonText: "Add here",
		buttonVariant: "contained",
	},
	{
		title: "Already Read",
		list: "already_read",
		buttonText: "Add here",
		buttonVariant: "outlined",
	},
];

export default function AddToClub({ bookId }) {
	const { data: session } = useSession();

	const {
		data: { count, current, results, total } = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["book-clubs", session?.user?.id],
		queryFn: async () =>
			await axios
				.get("/api/clubs", {
					params: {
						user: session?.user?.id,
					},
				})
				.then((res) => res.data),
		enabled: !!session?.user?.id,
	});

	const handleAdd = async (clubId) => {
		await axios
			.get(`/api/clubs/${clubId}/add`, {
				params: {
					book: bookId,
				},
			})
			.then((res) => {
				toast.success(res?.data?.message);
				refetch();
			})
			.catch((err) => {
				console.log(err);
				toast.error(
					err?.response?.data?.message || "Error adding book to club"
				);
			});
	};

	return (
		<Container
			id="lists"
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
				<Typography component="h2" variant="h4" color="text.primary">
					Add to Club
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Quickly add this book to any of your clubs below.
				</Typography>
			</Box>
			<Grid
				container
				spacing={3}
				alignItems="center"
				justifyContent="center"
			>
				{isLoading ? (
					Array.from({ length: 3 }).map((_,club) => (
						<Grid item key={club} xs={12} md={4}>
							<ClubCardPlaceHolder />
						</Grid>
					))
				) : results?.length ? (
					results?.map((club) => (
						<Grid
							item
							key={club?.id}
							xs={12}
							sm={club?.books?.length ? 12 : 6}
							md={4}
						>
							<ClubCard2
								club={club}
								handleAdd={(id) => handleAdd(id)}
							/>
						</Grid>
					))
				) : (
					<Box sx={{ width: "100%" }}>
						<Typography
							variant="body1"
							color="text.secondary"
							textAlign="center"
						>
							You are not a member of any clubs yet.
						</Typography>
					</Box>
				)}
			</Grid>
		</Container>
	);
}
