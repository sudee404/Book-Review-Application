import axios from "axios";
import { API_BASE_URL } from "../../urls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(request, { params }) {
	const session = await getServerSession(authOptions);
	const slug = params?.slug;

	const formData = await request.json();

	if (session) {
		try {
			const response = await updateNotification(
				formData,
				session?.accessToken,
				slug
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


export const updateNotification = async (formData, token,slug) => {
	return await axios.patch(`${API_BASE_URL}notifications/${slug}/`, formData, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
};
