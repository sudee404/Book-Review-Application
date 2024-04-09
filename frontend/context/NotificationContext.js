import { useSession } from "next-auth/react";
import React, { createContext, useState } from "react";
import useWebSocket from "react-use-websocket";
import { WS_BASE_URL } from "../app/api/urls";


const DefaultProps = {
	connectionStatus: "Uninstantiated",
	notificationCount: 0,
};

export const NotificationContext = createContext(DefaultProps);

export const NotificationContextProvider = ({ children }) => {
	const { data: session } = useSession();
	const [notificationCount, setNotificationCount] = useState(0);

	const { readyState, sendJsonMessage } = useWebSocket(
		session ? `${WS_BASE_URL}/ws/notifications/` : null,
		{
			queryParams: {
				token: session ? session.accessToken : "",
			},
			onOpen: () => {
				console.log("Connected to Notifications!");
			},
			shouldReconnect: (closeEvent) => {
				// console.log(closeEvent);
				if (session?.error) {
					return false;
				}
				return true;
			},
			reconnectAttempts: 10,
			//attemptNumber will be 0 the first time it attempts to reconnect, so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
			reconnectInterval: (attemptNumber) =>
				Math.min(Math.pow(2, attemptNumber) * 1000, 10000),

			onMessage: (e) => {
				const data = JSON.parse(e.data);

				switch (data.type) {
					case "unread_notifications":
						setNotificationCount(data.count);
						break;
					default:
						console.log("Unknown message type!");
						break;
				}
			},
		}
	);

	return (
		<NotificationContext.Provider
			value={{
				notificationCount,
				sendJsonMessage
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};
