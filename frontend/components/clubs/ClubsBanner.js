import * as React from "react";
import { Card, CardContent, Grid, alpha, Box } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import JoinDialog from "./JoinDialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event"
import PersonIcon from "@mui/icons-material/Person";

export default function ClubBanner({
	club,
	isOwner,
	isMember,
	onSuccess = () => {},
}) {
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
							{club?.name}
						</Typography>
					</Typography>

					{!(isOwner || isMember) && (
						<Stack
							direction={{ xs: "column", sm: "row" }}
							alignSelf="center"
							spacing={1}
							useFlexGap
							sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
						>
							<JoinDialog
								name={club?.name}
								id={club?.id}
								onSuccess={onSuccess}
							/>
						</Stack>
					)}
				</Stack>
				<Box
					id="image"
					sx={(theme) => ({
						mt: { xs: 8, sm: 10 },
						alignSelf: "center",
						height: { xs: 200, sm: 700 },
						width: "100%",
						backgroundImage: `url(\'${club?.poster}\')`,
						backgroundSize: "cover",
						borderRadius: "10px",
						outline: "1px solid",
						outlineColor:
							theme.palette.mode === "light"
								? alpha("#BFCCD9", 0.5)
								: alpha("#9CCCFC", 0.1),
						boxShadow:
							theme.palette.mode === "light"
								? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
								: `0 0 24px 12px ${alpha("#033363", 0.2)}`,
					})}
				/>
				<Grid container spacing={2} mt={3}>
					<Grid item sm={12} md={6}>
						<Typography gutterBottom variant="h5" component="div">
							Description
						</Typography>
						<Card>
							<CardContent>
								<Typography
									color="text.secondary"
									sx={{
										alignSelf: "center",
										width: { sm: "100%", md: "80%" },
									}}
								>
									{club?.description}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={12} md={6}>
						<Typography gutterBottom variant="h5" component="div">
							Details
						</Typography>
						<Card>
							<CardContent>
								<Box
									display={"flex"}
									gap={2}
									mt={1}
									justifyContent={"space-between"}
								>
									<Box display={"flex"} gap={1}>
										<EventIcon fontSize="small" />{" "}
										<Typography
											variant="body2"
											color="text.blue"
										>
											{new Date(
												club?.created_at
											).toDateString()}
										</Typography>
									</Box>

									<Box display={"flex"} gap={1}>
										<PersonIcon fontSize="small" />{" "}
										<Typography
											variant="body2"
											color="text.blue"
										>
											{club?.members?.length}
										</Typography>
									</Box>
								</Box>

								<Box
									display={"flex"}
									gap={2}
									mt={1}
									justifyContent={"space-between"}
								>
									<Box display={"flex"} gap={1}>
										<AccountCircleIcon fontSize="small" />{" "}
										<Typography
											variant="body2"
											color="text.blue"
										>
											{club?.owner?.username}
										</Typography>
									</Box>

									<Box display={"flex"} gap={1}>
										<MenuBookIcon fontSize="small" />{" "}
										<Typography
											variant="body2"
											color="text.blue"
										>
											{club?.books?.length}
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
