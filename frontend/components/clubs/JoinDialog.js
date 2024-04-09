import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";

export default function JoinDialog({
	name,
	id,
	onSuccess = () => {},
	isMember = false,
}) {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleJoinOrLeave = async () => {
		if (isMember) {
			await axios
				.get(`/api/clubs/${id}/leave`)
				.then((res) => {
					toast.success(res?.data?.message);
					onSuccess();
					handleClose();
				})
				.catch((err) => {
					console.log(err);
					toast.error(
						err?.response?.data?.message || "Error leaving club"
					);
				});
		}else{await axios
			.get(`/api/clubs/${id}/join`)
			.then((res) => {
				toast.success(res?.data?.message);
				onSuccess();
				handleClose();
			})
			.catch((err) => {
				console.log(err);
				toast.error(
					err?.response?.data?.message || "Error joining club"
				);
			});}
	};

	return (
		<React.Fragment>
			<Button
				variant="contained"
				color={isMember ? "warning" : "primary"}
				onClick={handleClickOpen}
			>
				{isMember ? "Leave Club" : "Join Club"}
			</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title" fontWeight={"bold"}>
					{isMember ? "Leave Book Club" : "Join Book Club"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{isMember ? (
							`Are you sure you want to leave ${name}?`
						) : (
							<div>
								If you'd like to join the book club "
								<span style={{ color: "red" }}>{name}</span>"
								for fun times kindly click below to confirm.
							</div>
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button autoFocus onClick={handleJoinOrLeave}>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
