"use client";
import { Divider, Grid, Pagination, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BookCard, { BookCardPlaceHolder } from "../../../components/BookCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Masonry from "@mui/lab/Masonry";

export default function Page() {
	const [keyword, setKeyword] = useState();
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(12);

	const { data: { numFound, start, docs } = {}, isLoading } = useQuery({
		queryKey: ["books", keyword, page],
		queryFn: async () =>
			await axios
				.get(
					`https://openlibrary.org/search.json?q=${keyword}&page=${page}&limit=${perPage}`
				)
				.then((res) => res.data),
		enabled: Boolean(keyword),
	});

	return (
		<Box
			id="hero"
			sx={(theme) => ({
				width: "100%",
				backgroundImage:
					theme.palette.mode === "light"
						? "linear-gradient(180deg, #CEE5FD, #FFF)"
						: `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
				backgroundSize: "100% 20%",
				backgroundRepeat: "no-repeat",
			})}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setKeyword(e.target.keyword.value);
				}}
			>
				<Container
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						pt: { xs: 14, sm: 20 },
						pb: { xs: 8, sm: 12 },
					}}
				>
					<Stack
						spacing={2}
						useFlexGap
						sx={{ width: { xs: "100%", sm: "70%" } }}
					>
						<Typography
							variant="h1"
							sx={{
								display: "flex",
								flexDirection: { xs: "column", md: "row" },
								alignSelf: "center",
								textAlign: "center",
								fontSize: "clamp(3.5rem, 10vw, 4rem)",
							}}
						>
							Find your next &nbsp;
							<Typography
								component="span"
								variant="h1"
								sx={{
									fontSize: "clamp(3rem, 10vw, 4rem)",
									color: (theme) =>
										theme.palette.mode === "light"
											? "primary.main"
											: "primary.light",
								}}
							>
								read
							</Typography>
						</Typography>
						<Typography
							textAlign="center"
							color="text.secondary"
							sx={{
								alignSelf: "center",
								width: { sm: "100%", md: "80%" },
							}}
						>
							Explore our library of books tailored to your needs.
							Elevate your experience with top-tier features and
							services.
						</Typography>

						<Stack
							direction={{ xs: "column", sm: "row" }}
							alignSelf="center"
							spacing={1}
							useFlexGap
							sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
						>
							<TextField
								id="outlined-basic"
								size="small"
								variant="outlined"
								placeholder="Book title"
								name="keyword"
							/>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Search
							</Button>
						</Stack>
					</Stack>
				</Container>{" "}
			</form>
			{!keyword ? (
				<></>
			) : isLoading ? (
				<Container sx={{ my: 3 }}>
					<Grid container spacing={3}>
						{Array.from({ length: perPage }).map((_, doc) => (
							<BookCardPlaceHolder key={doc} />
						))}
					</Grid>
					<Pagination
						variant="outlined"
						shape="rounded"
						page={page}
						onChange={(e, page) => setPage(page)}
						sx={{ mt: 3, mx: "auto" }}
					/>
				</Container>
			) : numFound ? (
				<Container sx={{ my: 3 }}>
					<Masonry
						columns={{ xs: 1, md: 2, lg: 3, xl: 4 }}
						spacing={2}
					>
						{docs.map((doc) => (
							<BookCard key={doc?.key} book={doc} />
						))}
					</Masonry>
					<Pagination
						variant="outlined"
						shape="rounded"
						count={Math.ceil(numFound / perPage)}
						page={page}
						onChange={(e, page) => setPage(page)}
						sx={{ mt: 3, mx: "auto" }}
					/>
				</Container>
			) : (
				<Typography>No books found</Typography>
			)}
		</Box>
	);
}
