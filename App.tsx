import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomNavigation, Text } from 'react-native-paper';
import { Provider } from 'react-redux' 

//Pages
import HomeScreen from './src/pages/home.tsx'
import ExplorerScreen from './src/pages/explorer.tsx'
import ConfigScreen from './src/pages/configuration.tsx'
import LoginScreen from './src/pages/login.tsx'

//Redux store
import AppStore from './src/utils/store'

const Stack = createStackNavigator();

const Main = ({ navigation  }) => {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'home', title: 'Home', icon: 'home' },
		{ key: 'explorer', title: 'Explorer', icon: 'folder' },
		{ key: 'configuration', title: 'Configuration', icon: 'account-settings' }
	]);

	const renderScene = ({ route, jumpTo }) => {
		switch (route.key) {
			case 'home':
				return <HomeScreen navigation={navigation}/>;
			case 'explorer':
				return <ExplorerScreen navigation={navigation}/>;
			case 'configuration':
				return <ConfigScreen navigation={navigation}/>;
		}
	}

	return ( 
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
			shifting
			/>
	)
}

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<Provider store={AppStore}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="Olympus"
							component={Main}
							/>
						<Stack.Screen
							name="login"
							component={LoginScreen}
							/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	);
};

export default App;