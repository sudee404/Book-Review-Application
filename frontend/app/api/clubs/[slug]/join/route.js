import axios from "axios";
import { API_BASE_URL } from "../../../urls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
	const session = await getServerSession(authOptions);
	const slug = params.slug;

	if (session) {
		try {
			const response = await joinClub(slug, session?.accessToken);
			return new Response(JSON.stringify(response.data), { status: 200 });
		} catch (error) {
			return new Response(JSON.stringify(error.response.data), {
				status: 400,
			});
		}
	} else {
		return new Response(
			JSON.stringify({
				error: "You need to be logged in to join a club",
			}),
			{ status: 401 }
		);
	}
}

export const joinClub = async (slug, token) => {
	return await axios.get(`${API_BASE_URL}clubs/${slug}/join/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
};
