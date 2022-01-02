import {createStore, combineReducers} from 'redux'
import { authReducer } from '../reducer/authReducer';

const reducers = combineReducers({
    auth: authReducer
})

export const store = createStore(reducers); //? Solo recibe un reducer
