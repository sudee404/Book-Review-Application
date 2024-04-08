import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function BookSearch() {
	const [keyword, setKeyword] = React.useState();
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery(
		{
			queryKey: ["books", { keyword }],
			queryFn: async () =>
				await axios.get(
					`http://openlibrary.org/search/lists.json?q=book&limit=20&offset=0`
				),
		},
		{ enabled: Boolean(keyword) }
	);

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
						<form>
							<TextField
								id="outlined-basic"
								hiddenLabel
								size="small"
								variant="outlined"
								aria-label="Enter book title"
								placeholder="Book title"
							/>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Search
							</Button>
						</form>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
