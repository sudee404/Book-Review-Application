import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";

const logoStyle = {
	width: "140px",
	height: "auto",
};

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" mt={1}>
			{"Copyright © "}
			<Link href="/">ReadUp &nbsp;</Link>
			{new Date().getFullYear()}
		</Typography>
	);
}

export default function Footer() {
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: { xs: 4, sm: 8 },
				py: { xs: 8, sm: 10 },
				textAlign: { sm: "center", md: "left" },
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					width: "100%",
					justifyContent: "space-between",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 4,
						minWidth: { xs: "100%", sm: "60%" },
					}}
				>
					<Box sx={{ width: { xs: "100%", sm: "60%" } }}>
						<Typography
							variant="body2"
							fontWeight={600}
							gutterBottom
						>
							Newsletter
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							mb={2}
						>
							Subscribe to our newsletter for weekly updates and
							promotions.
						</Typography>
						<Stack direction="row" spacing={1} useFlexGap>
							<TextField
								id="outlined-basic"
								hiddenLabel
								size="small"
								variant="outlined"
								fullWidth
								aria-label="Enter your email address"
								placeholder="Your email address"
								inputProps={{
									autoComplete: "off",
								}}
							/>
							<Button
								variant="contained"
								color="primary"
								sx={{ flexShrink: 0 }}
							>
								Subscribe
							</Button>
						</Stack>
					</Box>
				</Box>
				<Box
					sx={{
						display: { xs: "none", sm: "flex" },
						flexDirection: "column",
						gap: 1,
					}}
				>
					<Typography
						component={Link}
						href="/find-book"
						variant="body2"
						fontWeight={600}
					>
						Find a Book
					</Typography>
					<Link color="text.secondary" href="/find-book">
						By Title
					</Link>
					<Link color="text.secondary" href="/find-book">
						By Author
					</Link>
				</Box>
				<Box
					sx={{
						display: { xs: "none", sm: "flex" },
						flexDirection: "column",
						gap: 1,
					}}
				>
					<Typography
						component={Link}
						href="/book-clubs"
						variant="body2"
						fontWeight={600}
					>
						Book Clubs
					</Typography>
					<Link color="text.secondary" href="/book-clubs/about">
						About Book Clubs
					</Link>
					<Link color="text.secondary" href="/book-clubs/new">
						Start One
					</Link>
					<Link color="text.secondary" href="/book-clubs">
						Join One
					</Link>
				</Box>
				
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					pt: { xs: 4, sm: 8 },
					width: "100%",
					borderTop: "1px solid",
					borderColor: "divider",
				}}
			>
				<div>
					<Link color="text.secondary" href="#">
						Privacy Policy
					</Link>
					<Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
						&nbsp;•&nbsp;
					</Typography>
					<Link color="text.secondary" href="#">
						Terms of Service
					</Link>
					<Copyright />
				</div>
				<Stack
					direction="row"
					justifyContent="left"
					spacing={1}
					useFlexGap
					sx={{
						color: "text.secondary",
					}}
				>
					<IconButton
						color="inherit"
						href="https://github.com/mui"
						aria-label="GitHub"
						sx={{ alignSelf: "center" }}
					>
						<FacebookIcon />
					</IconButton>
					<IconButton
						color="inherit"
						href="https://twitter.com/MaterialUI"
						aria-label="X"
						sx={{ alignSelf: "center" }}
					>
						<TwitterIcon />
					</IconButton>
					<IconButton
						color="inherit"
						href="https://www.linkedin.com/company/mui/"
						aria-label="LinkedIn"
						sx={{ alignSelf: "center" }}
					>
						<LinkedInIcon />
					</IconButton>
				</Stack>
			</Box>
		</Container>
	);
}
