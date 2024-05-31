import { combineReducers } from 'redux'
import  UserSlice  from './AllSlices/userSlice';

const rootReducer = combineReducers({
    userReducer: UserSlice,
 
})

export  default rootReducer;