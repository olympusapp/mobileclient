import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { LogOFFAction } from '../utils/actions'
import AppStore from '../utils/store'

export default ({ navigation  }) => {
	
	const dispatch = useDispatch()
	const isLogged = useSelector(state => state.logged)
	
	return (
		<View>
			<Text>Configuration</Text>
			{isLogged && <Button title="Log off" onPress={() => dispatch(LogOFFAction())}/>}
		</View>
	)
}