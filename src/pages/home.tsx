import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import AppStore from '../utils/store'

const styles = StyleSheet.create({
	info:{
		fontSize: 20,
		margin: 10,
		textAlign: 'center',
		height: '100%'
	}
})

export default ({ navigation  }) => {
	
	const isLogged = useSelector(state => state.logged)
	
	return (
		<View>
			{isLogged ? (
				<Text style={styles.info}>Logged as: {AppStore.getState().username}@{AppStore.getState().serverName}</Text>
			):(
				<Button title="login" onPress={() => navigation .navigate('login')}></Button>
			)}
		</View>
	)
}