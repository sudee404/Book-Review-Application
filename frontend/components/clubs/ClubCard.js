import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Skeleton } from "@mui/material";
// calendar icon
import EventIcon from "@mui/icons-material/Event";
// person icon
import PersonIcon from "@mui/icons-material/Person";
// owner icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// book icon
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClubCard({ club }) {
	const router = useRouter();

	return (
		<Card>
			<CardMedia
				sx={{ height: 250 }}
				image={club?.poster}
				title="club poster"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{club?.name}
				</Typography>

				<Box
					display={"flex"}
					gap={2}
					mt={1}
					justifyContent={"space-between"}
				>
					<Box display={"flex"} gap={1}>
						<EventIcon fontSize="small" />{" "}
						<Typography variant="body2" color="text.blue">
							{new Date(club?.created_at).toDateString()}
						</Typography>
					</Box>

					<Box display={"flex"} gap={1}>
						<PersonIcon fontSize="small" />{" "}
						<Typography variant="body2" color="text.blue">
							10
						</Typography>
					</Box>
				</Box>

				<Box
					display={"flex"}
					gap={2}
					mt={1}
					justifyContent={"space-between"}
				>
					<Box display={"flex"} gap={1}>
						<AccountCircleIcon fontSize="small" />{" "}
						<Typography variant="body2" color="text.blue">
							{club?.owner?.username}
						</Typography>
					</Box>

					<Box display={"flex"} gap={1}>
						<MenuBookIcon fontSize="small" />{" "}
						<Typography variant="body2" color="text.blue">
							5
						</Typography>
					</Box>
				</Box>
			</CardContent>
			<CardActions
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				<Button
					size="small"
					variant="outlined"
					onClick={() => {
						router.push(`/books/${club?.id}`);
					}}
				>
					Check Out
				</Button>
				<Button
					size="small"
					variant="contained"
					color="success"
					onClick={() => {
						router.push(`/books/${club?.id}`);
					}}
				>
					Join Club
				</Button>
			</CardActions>
		</Card>
	);
}

export function ClubCardPlaceHolder() {
	return (
		<Card>
			<Skeleton variant="rectangular" height={250} />
			<CardContent>
				<Skeleton variant="text" height={50} />
				<Skeleton variant="text" />
				<Skeleton variant="text" />
			</CardContent>
			<CardActions sx={{ display: "flex" ,justifyContent:'space-between'}}>
				<Skeleton
					variant="text"
					width={90}
					height={40}
					sx={{ mx: 1 }}
				/>
				<Skeleton
					variant="text"
					width={90}
					height={40}
					sx={{ mx: 1 }}
				/>
			</CardActions>
		</Card>
	);
}
