export const LoginAction = ({ username, token, serverName, serverURL }) => ({
	type: 'LOGIN',
	payload: {
		username,
		token,
		serverName,
		serverURL
	}
})

export const ServerURLAction = (URL: string) => ({
	type: 'SET_SERVER_URL',
	payload: {
		URL
	}
})


