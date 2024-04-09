import axios from "axios";
import { API_BASE_URL } from "../urls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
	const session = await getServerSession(authOptions);

	try {
		const query = request.nextUrl.searchParams;
		const response = await getNotifications(query, session?.accessToken);
		return new Response(JSON.stringify(response.data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error.response.data), {
			status: 400,
		});
	}
}

export const getNotifications = async (query, token) => {
	return await axios.get(`${API_BASE_URL}notifications/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
		params: query,
	});
};
