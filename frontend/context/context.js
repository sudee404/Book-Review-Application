import { createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export const User_data = createContext(null);

export default function UserContext({ children }) {
	const { data: session } = useSession();
	const router = useRouter();

	const fetchData = async () => {
		try {
			const response = await axios.get("/api/user");
			return response.data;
		} catch (error) {
			throw error;
		}
	};

	const {
		data: userData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["user"],
		queryFn: fetchData,
		enabled: !!session, // only fetch data if user is authenticated
	});

	// redirect user to profile if email is not verified
	useEffect(() => {
		if (userData?.user) {
			if (
				!userData.user.verified_email &&
				(!userData.user.role === 1 || !userData.user.role === 2)
			) {
				router.push("/profile");
			}
		}
	}, [userData]);

	return (
		<User_data.Provider
			value={{ userData, refetchData: refetch, isLoading }}
		>
			{children}
		</User_data.Provider>
	);
}


export const ColorModeContext = createContext({ toggleColorMode: () => {} });
