import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function NotificationList() {
	const { data: session } = useSession();
	const router = useRouter();

	const { data: { results } = {}, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () =>
			await axios.get("/api/notifications").then((res) => res.data),
		enabled: !!session,
	});

	const readNotification = async (notification) => {
		if (notification?.read) {
			router.push(notification?.link);
		} else {
			await axios
				.patch(`/api/notifications/${notification?.id}`, {
					read: true,
				})
				.then((res) => {
					console.log(res);
					router.push(notification?.link);
				})
				.catch((err) => {
					toast.error(" Unable to open notification");
				});
		}
	};

	return isLoading ? (
		<Box>
			<CircularProgress />
		</Box>
	) : results?.length ? (
		<Timeline position="alternate">
			{results?.map((notification, idx) => (
				<TimelineItem>
					<TimelineOppositeContent
						sx={{ m: "auto 0" }}
						align="right"
						variant="body2"
						color="text.secondary"
					>
						{new Date(
							notification?.created_at
						).toLocaleDateString()}
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineConnector sx={{ bgcolor: "secondary.main" }} />
						<TimelineDot color="secondary" />
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent sx={{ py: "12px", px: 2 }}>
						<Typography
							variant="h6"
							component={Link}
							href="#"
							onClick={(e) => {
								e.preventDefault();
								readNotification(notification);
							}}
							fontWeight={notification?.read ? "normal" : "bold"}
						>
							{notification?.subject}
						</Typography>
						<Typography>{notification?.message}</Typography>
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	) : (
				<Box>
					<Typography>
						No Notifications yet
					</Typography>
		</Box>
	);
}
