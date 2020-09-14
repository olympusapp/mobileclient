import React from 'react'
import { View, Text, Button, ScrollView, StyleSheet, AppRegistry, TouchableHighlight } from 'react-native'
import { NativeRouter, Route, Link, useLocation } from "react-router-native";
import CardView from 'react-native-cardview'

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
	const pastFolder = `/${splittedPath[splittedPath.length-2]}`
	const pastPath = `/${splittedPath.slice(1,splittedPath.length-1).join('/')}`
	return {
		pastFolder,
		pastPath
	}
}

const ExplorerPanel = ({ path }) => {
	
	const [useList, setList] = React.useState([])
	
	React.useEffect(() => {
		APIExplorer(path).then((res: any) => {
			setList(res.data.folderPaths)
		}).catch((err) => {
			console.log(err)
		})
	},[])
	
	const { pastPath, pastFolder } = getPathInfo(useLocation().pathname)

	return (
		<ScrollView>
			<Route exact path={path} component={() => {
					return (
						<View>
							{path !== '/' && (
								<TouchableHighlight>
									<Link to={pastPath} style={styles.button}>
										<Text> Go back to {pastFolder}</Text>
									</Link>
								</TouchableHighlight>
							)}
							<CardsList path={path} list={useList}/>
						</View>
					)
				}}/>
			<Route path={`${path}/:path`} component={() => <ExplorerPanel path={useLocation().pathname}/>}/>
		</ScrollView>
	)
}

const CardsList = ({ path, list }) => {
	return list.map(item => {
		return (
			<Link key={item.fileName} to={`${path}/${item.fileName}`}>
				<CardView  style={styles.card}>
					<Text>{item.fileName}</Text>
				</CardView>
			</Link>
		)
	})
}

export default () => {
	return (
		<NativeRouter>
			<ExplorerPanel path="/"/>
		</NativeRouter>
	)
}