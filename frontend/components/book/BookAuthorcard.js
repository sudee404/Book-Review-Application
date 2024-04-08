import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import { useQuery } from "@tanstack/react-query";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

function BookAuthorcard({ authorId }) {
	const { data: author } = useQuery({
		queryKey: ["author", authorId],
		queryFn: async () => {
			const res = await fetch(
				`https://openlibrary.org/authors/${authorId}.json`
			);
			return res.json();
		},
		enabled: !!authorId,
		staleTime: 1000 * 60 * 60 * 24,
		cacheTime: 1000 * 60 * 60 * 24,
	});

	return (
		<Card
			variant="outlined"
			component={Button}
			sx={{
				p: 3,
				height: "fit-content",
				width: "100%",
				background: "none",
			}}
		>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					textAlign: "left",
					flexDirection: {
						xs: "column",
						md: "row",
					},
					alignItems: { md: "center" },
					gap: 2.5,
				}}
			>
				
				<Box sx={{ textTransform: "none" }}>
					<Typography
						color="text.primary"
						variant="body2"
						fontWeight="bold"
					>
						{author?.name || "Not Specified"}
					</Typography>
					<Typography
						color="text.secondary"
						variant="body2"
						sx={{ my: 0.5 }}
					>
						{`${typeof author?.bio === "object"
							? author?.bio.value || "Not Specified"
							: author?.bio || "Not Specified"}`.split('.').slice(0,1)}
					</Typography>
					<Typography
						color="red"
						variant="small"
						sx={{ my: 1}}
					>
						Born on {author?.birth_date
							? new Date(author?.birth_date).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
							  )
							: "Not Specified"}
					</Typography>
				</Box>
			</Box>
		</Card>
	);
}

export default BookAuthorcard;
