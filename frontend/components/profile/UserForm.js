import React, { useState } from "react";
import {
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
	Grid,
	Container,
	Typography,
	Switch,
	Box,
	IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Image from "next/image";
import TrashIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
	const [formData, setFormData] = useState({});
	const { data: session } = useSession();
	const router = useRouter();

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (files) {
			setFormData((prev) => ({
				...prev,
				[name]: files[0],
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Handle form submission logic here

		// convert to FormData
		let data = new FormData();
		data.append("first_name", formData?.first_name);
		data.append("last_name", formData?.last_name);
		data.append("bio", formData?.description);
		data.append("private", !!formData?.private);
		data.append("image", formData?.poster);
		// send data to server
		await axios
			.patch(`/api/users/${session?.user?.id}`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				toast.success("User updated successfully");
				router.push(`/`);
			})
			.catch((error) => {
				console.log("Error updating user", error);
				toast.error("Error updating user");
			});
	};

	return (
		<Container
			id="faq"
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
			<Typography
				component="h2"
				variant="h4"
				color="text.primary"
				fontWeight={"bold"}
				sx={{
					width: { sm: "100%", md: "60%" },
					textAlign: { sm: "left", md: "center" },
				}}
			>
				My Profile
			</Typography>
			<Grid
				container
				spacing={2}
				component={"form"}
				onSubmit={handleSubmit}
			>
				<Grid
					item
					xs={12}
					display={"flex"}
					justifyContent={"center"}
					my={3}
				>
					{formData?.poster ? (
						<Box>
							<Image
								src={URL.createObjectURL(formData?.poster)}
								alt="club poster"
								width={400}
								height={400}
							/>
							{/* discard image  */}
							<IconButton
								onClick={() => {
									setFormData((prev) => ({
										...prev,
										poster: null,
									}));
								}}
								aria-label="delete"
								color="warning"
								sx={{
									m: 3,
								}}
							>
								<TrashIcon />
							</IconButton>
						</Box>
					) : (
						<Button
							component="label"
							role={undefined}
							variant="outlined"
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
						>
							Upload Image
							<input
								style={{
									clip: "rect(0 0 0 0)",
									clipPath: "inset(50%)",
									height: 1,
									overflow: "hidden",
									position: "absolute",
									bottom: 0,
									left: 0,
									whiteSpace: "nowrap",
									width: 1,
								}}
								type="file"
								name="poster"
								onChange={handleChange}
							/>
						</Button>
					)}
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="First Name"
						name="first_name"
						value={formData?.first_name || ""}
						onChange={handleChange}
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Last Name"
						name="last_name"
						value={formData?.last_name || ""}
						onChange={handleChange}
						fullWidth
						required
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						label="Description"
						value={formData?.description || ""}
						onChange={handleChange}
						name="description"
						fullWidth
						multiline
						rows={4}
						required
					/>
				</Grid>

				<Grid
					item
					xs={12}
					display={"flex"}
					justifyContent={"space-between"}
				>
					<Button type="submit" variant="outlined" color="success">
						Update User
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
