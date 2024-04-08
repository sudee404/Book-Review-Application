import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

export default function ReviewForm({ bookId, onClose = () => {} }) {
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = React.useState({
		review: "",
		rating: 0,
		book: bookId,
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async () => {
		await axios
			.post("/api/reviews", formData)
			.then((response) => {
				toast.success("Review submitted successfully");
				handleClose();
			})
			.catch((errors) => {
				console.log(errors);
			});
	};

	return (
		<React.Fragment>
			<Button
				variant="contained"
				sx={{ color: "red", mt: 2 }}
				onClick={handleClickOpen}
			>
				Leave a Review
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: (event) => {
						event.preventDefault();
						handleSubmit();
					},
				}}
			>
				<DialogTitle>How was the book ?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Leave a rating and review below if you enjoyed or hated
						reading this book
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="review"
						name="review"
						label="Message"
						type="text"
						fullWidth
						variant="outlined"
						onChange={(e) => {
							setFormData((prev) => ({
								...prev,
								review: e.target.value,
							}));
						}}
						value={formData?.review}
						multiline
						rows={5}
					/>
					<Rating
						name="size-medium"
						value={formData?.rating}
						precision={0.5}
						onChange={(e) => {
							setFormData((prev) => ({
								...prev,
								rating: e.target.value,
							}));
						}}
					/>{" "}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Submit</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
