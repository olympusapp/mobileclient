import axios from 'axios'
import AppStore from './store'

const getServerUri = () => AppStore.getState().serverURL

export const APILogin = ({ username, password }) => {
	
	return new Promise((res, rej) => {
		axios.post(`${getServerUri()}/api/login`,{},{
			headers:{
				username,
				password
			}
		}).then(({ data }) => {
			res(data)
		}).catch(err => {
			rej(err)
		})
	})
}


export const APIExplorer = (folder: string) => {
	const { token, logged } = AppStore.getState()
	if(!logged) return new Promise((res, rej)=> rej())
	return axios.post(`${getServerUri()}/api/explore`,{
		startFolder: folder
	},{
		headers:{
			authorization:`bearer ${token}`
		}
	})
}