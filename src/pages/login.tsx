import React from 'react'
import { View, Text, Button, TextInput  } from 'react-native'
import { useDispatch } from 'react-redux'

import { ServerURLAction, LoginAction } from '../utils/actions'
import { APILogin } from '../utils/api'

export default () => {
	
	const dispatch = useDispatch()
	const [username, setUsername] = React.useState(null);
	const [password, setPassword] = React.useState(null);
	const [server, setServer] = React.useState(null);
	
	const [status, setStatus] = React.useState('waiting');
	
	function goLogin(){
		
		dispatch(ServerURLAction(server))
		
		APILogin({
			username,
			password
		}).then(({ errorCode, username, token, serverName }) => {
			if(errorCode === 2){
				setStatus(`User doesn't exist`)
			} else if(errorCode === 3){
				setStatus(`Wrong password.`)
			} else{
				dispatch(LoginAction({
					username: username,
					token: token,
					serverName,
					serverURL: server
				}))
				setStatus(`Welcome!`)
			}
		})
	}
	
	return (
		<View>
			<Text>Login</Text>
			<TextInput placeholder="username" onChangeText={text => setUsername(text)}></TextInput>
			<TextInput placeholder="password" onChangeText={text => setPassword(text)}></TextInput>
			<TextInput placeholder="server url" onChangeText={text => setServer(text)}></TextInput>
			<Button onPress={goLogin} title="login"/>
			<Text>{status}</Text>
		</View>
	)
}