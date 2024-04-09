import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Skeleton } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useRouter } from "next/navigation";
import JoinDialog from "./JoinDialog";
import { useSession } from "next-auth/react";

export default function ClubCard({ club, onSuccess = () => {} }) {
	const router = useRouter();
	const { data: session } = useSession();

	const isMember = React.useMemo(() => {
		if (!session?.user) return false;
		return (
			club?.members?.find((member) => member.id === session.user.id) ||
			club?.owner?.username === session.user.username
		);
	}, [club, session]);

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
							{club?.members?.length}
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
							{club?.books?.length}
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
						router.push(`/book-clubs/${club?.id}`);
					}}
				>
					Check Out
				</Button>
				<JoinDialog
					name={club?.name}
					id={club?.id}
					onSuccess={onSuccess}
					isMember={isMember}
				/>
			</CardActions>
		</Card>
	);
}

export function ClubCard2({ club, handleAdd = () => {} }) {
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
							{club?.members?.length}
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
							{club?.books?.length}
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
						router.push(`/book-clubs/${club?.id}`);
					}}
				>
					Check Out
				</Button>
				<Button
					size="small"
					variant="contained"
					onClick={() => {
						handleAdd(club?.id);
					}}
				>
					Add Book
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
			<CardActions
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
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
