import * as React from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ReactHtmlParser from "react-html-parser";
import { CardMedia } from "@mui/material";
import BookAuthorcard from "./BookAuthorcard";

const items = [
	{
		icon: <PersonRoundedIcon />,
		title: "Author",
		imageLight:
			'url("/static/images/templates/templates-images/dash-light.png")',
		imageDark:
			'url("/static/images/templates/templates-images/dash-dark.png")',
	},
	{
		icon: <BusinessRoundedIcon />,
		title: "Publisher",
		imageLight:
			'url("/static/images/templates/templates-images/mobile-light.png")',
		imageDark:
			'url("/static/images/templates/templates-images/mobile-dark.png")',
	},
];

export default function BookDetails({ book }) {
	const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

	const handleItemClick = (index) => {
		setSelectedItemIndex(index);
	};

	const selectedFeature = items[selectedItemIndex];

	if (!book) {
		return <div>loading book data</div>;
	}

	const { description, covers, authors, title, subjects, revision } = book;

	return (
		<Container id="details" sx={{ py: { xs: 8, sm: 16 } }}>
			<Grid container spacing={6}>
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
					<Typography variant='div' fontWeight={'bold'} sx={{my:2,color:'blue'}}>About the author(s)</Typography>
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
