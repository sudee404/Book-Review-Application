import axios from "axios";
import { API_BASE_URL } from "../../urls";

const DjangoProvider = {
	id: "django-provider",
	name: "Django",
	type: "credentials",
	credentials: {
		username: { label: "Username", type: "username" },
		password: { label: "Password", type: "password" },
	},
	authorize: async (credentials, req) => {
		return await axios
			.post(`${API_BASE_URL}login/`, {
				...credentials,
			})
			.then((res) => {
				return Promise.resolve(res.data);
			})
			.catch((err) => {
				const errorMessage = err.response.data.error || Object.values(err.response.data)[0] || "Invalid credentials";
				return Promise.reject({ message: errorMessage});
			});
	},
};

export default DjangoProvider;
