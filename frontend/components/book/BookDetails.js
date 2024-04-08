import * as React from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ReactHtmlParser from "react-html-parser";
import { Box, CardMedia, Skeleton } from "@mui/material";
import BookAuthorcard from "./BookAuthorcard";

export default function BookDetails({ book, loading }) {

	if (loading && !book) {
		return (
			<div>
				<Container id="details" sx={{ py: { xs: 8, sm: 16 } }}>
					<Grid container alignItems={"center"} spacing={6}>
						<Grid item xs={12} md={6}>
							<div>
								<Typography
									component="h2"
									variant="h4"
									fontWeight={"bold"}
									color="text.primary"
								>
									<Skeleton
										variant="text"
										height={70}
										width={"80%"}
									/>
								</Typography>
							</div>
							<Card sx={{ my: 3 }}>
								<Skeleton
									variant="rectangular"
									width={"100%"}
									height={400}
								/>
							</Card>
							<Typography
								variant="div"
								fontWeight={"bold"}
								sx={{ my: 2, color: "blue" }}
							>
								<Skeleton variant="text" width={200} />
							</Typography>
							<Stack
								direction="column"
								justifyContent="center"
								alignItems="flex-start"
								spacing={2}
								useFlexGap
								sx={{
									width: "100%",
									display: { xs: "none", sm: "flex" },
								}}
							>
								<Card
									variant="outlined"
									sx={{
										p: 3,
										height: "fit-content",
										width: "100%",
										background: "none",
									}}
								>
									<Box sx={{ textTransform: "none" }}>
										<Typography
											color="text.primary"
											variant="body2"
											fontWeight="bold"
										>
											<Skeleton
												variant="text"
												width={150}
											/>
										</Typography>
										<Skeleton
											variant="text"
											width={"100%"}
										/>
										<Skeleton
											variant="text"
											width={"100%"}
										/>
										<Skeleton
											variant="text"
											width={"50%"}
										/>
										<Typography
											color="red"
											variant="small"
											sx={{ my: 1 }}
										>
											<Skeleton
												variant="text"
												width={180}
											/>
										</Typography>
									</Box>
								</Card>
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography
								variant="h4"
								color="text.secondary"
								sx={{ mb: { xs: 2, sm: 4 } }}
							>
								<Skeleton variant="text" />
							</Typography>
							<Card sx={{ p: 2 }}>
								<Typography
									variant="body1"
									color="text.secondary"
								>
									<Skeleton variant="text" />
									<Skeleton variant="text" />
									<Skeleton variant="text" />
									<Skeleton variant="text" />
									<Skeleton variant="text" />
									<Skeleton variant="text" />
									<Skeleton variant="text" />
									<Skeleton variant="text" width={"50%"} />
								</Typography>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	}

	if (!book) {
		return;
	}

	const { description, covers, authors, title, subjects, revision } = book;

	return (
		<Container id="details" sx={{ py: { xs: 8, sm: 16 } }}>
			<Grid container alignItems={"center"} spacing={6}>
				<Grid item xs={12} md={6}>
					<div>
						<Typography
							component="h2"
							variant="h4"
							fontWeight={"bold"}
							color="text.primary"
						>
							{title}
						</Typography>
					</div>
					<Card sx={{ my: 3 }}>
						<CardMedia
							image={
								covers && covers.length > 0
									? `http://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
									: "https://dummyimage.com/180x120/dbdbdb/787878.png&text=No+cover"
							}
							sx={{ objectFit: "contain", height: 400 }}
							alt="..."
						/>
					</Card>
					<Typography
						variant="div"
						fontWeight={"bold"}
						sx={{ my: 2, color: "blue" }}
					>
						About the author(s)
					</Typography>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="flex-start"
						spacing={2}
						useFlexGap
						sx={{
							width: "100%",
							display: { xs: "none", sm: "flex" },
						}}
					>
						{authors && authors.length > 0
							? authors.map((author, idx) => (
									<BookAuthorcard
										authorId={author.author.key
											.split("/")
											.pop()}
										key={idx}
									/>
							  ))
							: "No author mentioned"}
					</Stack>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography
						variant="h4"
						color="text.secondary"
						sx={{ mb: { xs: 2, sm: 4 } }}
					>
						Description
					</Typography>
					<Card sx={{ p: 2 }}>
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{ mb: { xs: 2, sm: 4 } }}
						>
							{typeof description === "object"
								? ReactHtmlParser(description.value) ||
								  "No description provided"
								: description || "No description provided"}
						</Typography>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}
