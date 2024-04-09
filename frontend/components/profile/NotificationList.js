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

export default function NotificationList() {
	const { data: session } = useSession();

	const { data } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () =>
			await axios.get("/api/notifications").then((res) => res.data),
		enabled: !!session,
	});

	console.log(data)
	return (
		<Timeline position="alternate">
			<TimelineItem>
				<TimelineOppositeContent
					sx={{ m: "auto 0" }}
					align="right"
					variant="body2"
					color="text.secondary"
				>
					9:30 am
				</TimelineOppositeContent>
				<TimelineSeparator>
					<TimelineConnector />
					<TimelineDot />
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent sx={{ py: "12px", px: 2 }}>
					<Typography variant="h6" component="span">
						Eat
					</Typography>
					<Typography>Because you need strength</Typography>
				</TimelineContent>
			</TimelineItem>
			<TimelineItem>
				<TimelineOppositeContent
					sx={{ m: "auto 0" }}
					variant="body2"
					color="text.secondary"
				>
					10:00 am
				</TimelineOppositeContent>
				<TimelineSeparator>
					<TimelineConnector />
					<TimelineDot color="primary" />
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent sx={{ py: "12px", px: 2 }}>
					<Typography variant="h6" component="span">
						Code
					</Typography>
					<Typography>Because it&apos;s awesome!</Typography>
				</TimelineContent>
			</TimelineItem>
			<TimelineItem>
				<TimelineSeparator>
					<TimelineConnector />
					<TimelineDot color="primary" variant="outlined" />
					<TimelineConnector sx={{ bgcolor: "secondary.main" }} />
				</TimelineSeparator>
				<TimelineContent sx={{ py: "12px", px: 2 }}>
					<Typography variant="h6" component="span">
						Sleep
					</Typography>
					<Typography>Because you need rest</Typography>
				</TimelineContent>
			</TimelineItem>
			<TimelineItem>
				<TimelineSeparator>
					<TimelineConnector sx={{ bgcolor: "secondary.main" }} />
					<TimelineDot color="secondary" />
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent sx={{ py: "12px", px: 2 }}>
					<Typography variant="h6" component="span">
						Repeat
					</Typography>
					<Typography>Because this is the life you love!</Typography>
				</TimelineContent>
			</TimelineItem>
		</Timeline>
	);
}
