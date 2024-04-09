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

export default function Page() {
	const [formData, setFormData] = useState({});
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

		console.log("Form data:", formData);
		// convert to FormData
		let data = new FormData();
		data.append("name", formData?.name);
		data.append("description", formData?.description);
		data.append("private", !!formData?.private);
		data.append("poster", formData?.poster);
		// send data to server
		await axios
			.post("/api/book-clubs", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				toast.success("Club created successfully");
				router.push(`/clubs/${res?.data?.id}`);
			})
			.catch((error) => {
				console.log("Error creating club", error);
				toast.error("Error creating book club");
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
				Start a Book Club
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
							Upload Poster
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
						label="Name"
						name="name"
						value={formData?.name || ""}
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
					<FormControlLabel
						control={
							<Switch
								value={!!formData?.private}
								onChange={handleChange}
								name="private"
								color="primary"
								sx={{ mx: 2 }}
							/>
						}
						label=" Private"
					/>
					<Button type="submit" variant="outlined" color="success">
						Create Club
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
