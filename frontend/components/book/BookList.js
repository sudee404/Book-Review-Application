"use client";
import { Grid, Pagination, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BookCard, { BookCardPlaceHolder, BookIdCard } from "./BookCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Masonry from "@mui/lab/Masonry";

export default function BookList({author}) {
	const [keyword, setKeyword] = useState();
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(12);

	const { data, isLoading } = useQuery({
		queryKey: ["books", keyword, page],
		queryFn: async () =>
			await axios
				.get(
					`https://openlibrary.org/authors/${author}/works.json?limit=12`
				)
				.then((res) => res.data),
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
							<Typography
								component="span"
								variant="h5"
								sx={{
									fontSize: "clamp(3rem, 10vw, 4rem)",
									color: (theme) =>
										theme.palette.mode === "light"
											? "primary.main"
											: "primary.light",
								}}
							>
								Recommendations
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
							Find books suited to your crowd here . It is the
							culmination of the books you read and the company
							you keep
						</Typography>
					</Stack>
				</Container>{" "}
			</form>
			{isLoading ? (
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
			) : data ? (
				<Container sx={{ my: 3 }}>
					<Masonry
						columns={{ xs: 1, md: 2, lg: 3, xl: 4 }}
						spacing={2}
					>
						{data?.entries.map((doc) => (
							<BookIdCard
								key={doc?.key}
								bookId={doc?.key?.split("/").pop()}
							/>
						))}
					</Masonry>
					<Pagination
						variant="outlined"
						shape="rounded"
						count={Math.ceil(data?.numFound / perPage)}
						page={page}
						onChange={(e, page) => setPage(page)}
						sx={{ mt: 3, mx: "auto" }}
					/>
				</Container>
			) : (
				<Container>
					<Typography alignSelf={"center"}>No books found</Typography>
				</Container>
			)}
		</Box>
	);
}
