import axios from "axios";
import { API_BASE_URL } from "../../urls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
	try {
		const slug = params.slug;
		const response = await getClub(slug);
		return new Response(JSON.stringify(response.data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error.response.data), {
			status: 400,
		});
	}
}

export async function PATCH(request, { params }) {
	const session = await getServerSession(authOptions);
	const slug = params.slug;

	const formData = await request.json();
	if (session) {
		try {
			const response = await addReview(
				formData,
				slug,
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
				error: "You need to be logged in to leave a review",
			}),
			{ status: 401 }
		);
	}
}

export const getClub = async (slug) => {
	return await axios.get(`${API_BASE_URL}clubs/${slug}/`);
};

export const updateClub = async (formData, slug, token) => {
	return await axios.post(`${API_BASE_URL}clubs/${slug}/`, formData, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
};
