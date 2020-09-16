import React from 'react'
import { View, Text, Button, ScrollView, StyleSheet, AppRegistry, TouchableHighlight, Animated, Dimensions  } from 'react-native'
import { NativeRouter, Route, Link, useLocation, useHistory } from "react-router-native";
import { Card, Button as MaterialButton, Appbar } from 'react-native-paper';

import { APIExplorer } from '../utils/api'

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: "transparent",
		padding: 10,
		margin: 5
	},
	card:{
		width: 'auto',
		height: 45,
		margin: 5,
		padding: 10
	}
});

const getPathInfo = (path) => {
	const splittedPath = path.split('/')
	const pastPath = `/${splittedPath.slice(1,splittedPath.length-1).join('/')}`
	const currentFolder = splittedPath[splittedPath.length-1]
	return {
		pastPath,
		currentFolder
	}
}

const ExplorerPanel = ({ path }) => {
	
	const windowWidth = Dimensions.get('window').width
	const HorizontalAnimation = React.useRef(new Animated.Value(0-windowWidth/3)).current
	const OpacityAnimation = React.useRef(new Animated.Value(-0.5)).current
	
	const history = useHistory();
	const [useList, setList] = React.useState([])
	
	const HorizontalTransition = () => {
		Animated.timing(HorizontalAnimation, {
			toValue: 0,
			duration: 150,
			useNativeDriver: false
		}).start();
	}
	
	const OpacityTransition = () => {
		Animated.timing(OpacityAnimation, {
			toValue: 1,
			duration: 150,
			useNativeDriver: false
		}).start();
	}
	
	React.useEffect(() => {
		APIExplorer(path).then((res: any) => {
			setList(res.data.folderPaths)
			
			HorizontalTransition()
			OpacityTransition()
		}).catch((err) => {
			console.log(err)
		})
		
	},[])
	
	const { pastPath, currentFolder } = getPathInfo(useLocation().pathname)


	return (
		<View>
			<Route exact path={path} component={() => {
					
					return (
						<View>
							<Appbar.Header>
								{path !== '/' ? (
									<React.Fragment>
										<Appbar.BackAction color="white" onPress={() => history.push(pastPath)} />
										<Appbar.Content title={currentFolder}/>
									</React.Fragment>
								) : (
									<Appbar.Content title="Explorer"/>
								)}
								
								<Appbar.Action icon="upload" />
								<Appbar.Action icon="dots-vertical" />
							</Appbar.Header>
							<Animated.View style={{
									left: HorizontalAnimation,
										opacity: OpacityAnimation
								}}>
								<CardsList path={path} list={useList}/>
							</Animated.View>
						</View>
					)
				}}/>
			<Route path={`${path}/:path`} component={() => <ExplorerPanel path={useLocation().pathname}/>}/>
		</View>
	)
}

const CardsList = ({ path, list }) => {
	return (
		<ScrollView>
			{list.map(item => {
				return (
					<Link key={item.fileName} to={`${path}/${item.fileName}`}>
						<Card  style={styles.card}>
							<Text>{item.fileName}</Text>
						</Card>
					</Link>
				)
			})}
		</ScrollView>
	)
}

export default () => {
	return (
		<NativeRouter>
			<ExplorerPanel path="/"/>
		</NativeRouter>
	)
}