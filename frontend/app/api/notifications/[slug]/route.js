import axios from "axios";
import { API_BASE_URL } from "../../urls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(request, response) {
	const session = await getServerSession(authOptions);

	const formData = await request.formData();
	if (session) {
		try {
			const response = await updateNotification(
				formData,
				session?.accessToken
			);
			return new Response(JSON.stringify(response.data), { status: 200 });
		} catch (error) {
			return new Response(JSON.stringify(error.response.data), {
				status: 400,
			});
		}
	} else {
		return new Response(
			JSON.stringify({
				error: "You need to be logged in to create a club",
			}),
			{ status: 401 }
		);
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

export const updateNotification = async (formData, token) => {
	return await axios.post(`${API_BASE_URL}clubs/`, formData, {
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "multipart/form-data",
		},
	});
};