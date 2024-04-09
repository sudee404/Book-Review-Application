"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FAQ from "../../../../components/sections/FAQ";
import ClubBanner from "../../../../components/clubs/ClubsBanner";
import { useQuery } from "@tanstack/react-query";
import ClubBooks from "../../../../components/clubs/ClubBooks";
import { useSession } from "next-auth/react";

export default function Page({ params }) {
	const { data: session } = useSession();
	const slug = params?.slug;
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["club", slug],
		queryFn: async () => {
			const res = await fetch(`/api/clubs/${slug}`);
			const data = await res.json();
			return data;
		},
		enabled: !!slug,
	});
	const isMember = React.useMemo(() => {
		if (!session?.user) return false;
		return data?.members?.find((member) => member.id === session.user.id);
	}, [data, session]);

	const isOwner = React.useMemo(() => {
		if (!session?.user) return false;
		return data?.owner?.username === session.user.username;
	}, [data, session]);

	return (
		<Box>
			<ClubBanner
				loading={isLoading}
				club={data}
				isMember={isMember}
				isOwner={isOwner}
				onSuccess={() => refetch()}
			/>
			<ClubBooks
				loading={isLoading}
				books={data?.books}
				isMember={isMember}
				isOwner={isOwner}
			/>
			<Divider />
		</Box>
	);
}
