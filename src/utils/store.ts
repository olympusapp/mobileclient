import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const Reducer = (state, { type, payload }: any) => {
	switch(type){
		case 'INFO':
			return {
				...state,
				serverName: payload.serverName
			}
		case 'LOGIN':
			return {
				serverName: payload.serverName,
				serverURL: payload.serverURL,
				username: payload.username,
				token: payload.token,
				logged: true
			}
		case 'LOGOFF':
			return {
				username: 'Nobody',
				token: null,
				logged: false,
				serverName: null
			}
		case 'SET_SERVER_URL':
			return {
				...state,
				serverURL: payload.URL
			}
		default:
			return state
	}
}

const persistedReducer = persistReducer(persistConfig, Reducer)

const AppStore = createStore(persistedReducer,{
	username: 'Nobody',
	logged: false,
	serverName: null
})

persistStore(AppStore)

export default AppStore