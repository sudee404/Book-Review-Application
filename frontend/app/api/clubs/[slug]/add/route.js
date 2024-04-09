import axios from "axios";
import { API_BASE_URL } from "../../../urls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
	const session = await getServerSession(authOptions);
	const slug = params?.slug;

	if (session) {
		try {
			const query = request.nextUrl.searchParams;
			console.log(query);
			const response = await addBook(slug, session?.accessToken, query);
			return new Response(JSON.stringify(response.data), { status: 200 });
		} catch (error) {
			return new Response(JSON.stringify(error.response.data), {
				status: 400,
			});
		}
	} else {
		return new Response(
			JSON.stringify({
				error: "You need to be logged in to add book to club",
			}),
			{ status: 401 }
		);
	}
}

export const addBook = async (slug, token, query) => {
	return await axios.get(`${API_BASE_URL}clubs/${slug}/add/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
		params: query,
	});
};
