import { API_BASE_URL } from "../urls";

export async function GET(request) {
	try {
		const bookId = request.nextUrl.searchParams.get("bookId");
		const response = await getReviews(bookId);
		return new Response(JSON.stringify(response), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error.response.data), {
			status: 400,
		});
	}
}

export async function POST(request) {
	try {
		const formData = await request.json()
		const response = await addReview(formData);
		return new Response(JSON.stringify(response.data), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify(error.response.data), {
			status: 400,
		});
	}
}

export const getReviews = async (bookId) => {
	const response = await fetch(`${API_BASE_URL}reviews/?book=${bookId}`);
	return response.json();
};

export const addReview = async (formData) => {
	return await axios.post(`${API_BASE_URL}reviews/`,formData);
};
