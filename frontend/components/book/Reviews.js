import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pagination, Rating, Skeleton } from "@mui/material";
import ReviewForm from "./ReviewForm";
import Masonry from "@mui/lab/Masonry";
import { useState } from "react";

export default function BookReviews({ bookId }) {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(8);

	const {
		data: { count, total, current, page_size, results } = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["reviews", bookId, page, perPage],
		queryFn: async () =>
			await axios
				.get(`/api/reviews`, {
					params: {
						book: bookId,
						page: page,
						page_size: perPage,
					},
				})
				.then((res) => res.data)
				.catch((err) => {
					console.log(err);
					return {
						count: 0,
						total: 0,
						current: 0,
						page_size: 0,
						results: [],
					};
				}),
		enabled: !!bookId,
	});

	return (
		<Container
			id="reviews"
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
					Reviews
				</Typography>
				<Typography variant="body1" color="text.secondary">
					See what other readers have to say about this book. You can
					leave a review of your own while you're at it
				</Typography>
			</Box>
			{isLoading ? (
				<Grid container spacing={2}>
					{Array.from({ length: perPage })?.map((_, index) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							key={index}
							sx={{ display: "flex" }}
						>
							<Card
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									flexGrow: 1,
									p: 1,
								}}
							>
								<CardContent>
									<Typography
										variant="body2"
										color="text.secondary"
										mb={2}
									>
										<Skeleton variant="text" />
										<Skeleton variant="text" />
										<Skeleton variant="text" />
										<Skeleton
											variant="text"
											width={"50%"}
										/>
									</Typography>
									<Rating
										value={0}
										precision={0.5}
										size="small"
										readOnly
									/>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			) : results?.length ? (
				<Box>
					<Box
						display={"flex"}
						justifyContent={"space-between"}
						m={2}
					>
						<Typography alignSelf={"center"}>
							{count} reviews found
						</Typography>
						<Pagination
							variant="outlined"
							count={total}
							page={current}
							onChange={(_, page) => setPage(page)}
						/>
					</Box>
					<Masonry
						container
						columns={{ xs: 1, md: 2, lg: 3 }}
						sx={{ mx: "auto" }}
						spacing={2}
					>
						{results?.map((review, index) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								key={index}
								sx={{ display: "flex" }}
							>
								<Card
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										flexGrow: 1,
										p: 1,
									}}
								>
									<CardContent>
										<Typography
											variant="body2"
											color="text.secondary"
											mb={2}
										>
											{review?.review}
										</Typography>
										<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
											<Rating
												value={review?.rating}
												precision={0.5}
												size="small"
												readOnly
											/>
											<Typography
												variant="body2"
												color="blue"
												
											>
												{review?.user?.username}
											</Typography>
										</Box>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Masonry>
				</Box>
			) : (
				<Box textAlign={"center"}>
					<Typography variant="h5">
						No Reviews in the system Yet
					</Typography>
					<Typography>Be the first to review this book</Typography>
				</Box>
			)}
			<ReviewForm bookId={bookId} onClose={() => refetch()} />
		</Container>
	);
}
