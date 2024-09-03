import { combineReducers } from 'redux';
// import counterReducer from './counterReducer';
import userReducer from './userReducer';
import cartsliceReducer from './cartsliceReducer';
const rootReducer = combineReducers({
    // counter: counterReducer,
    user:userReducer,
    cart:cartsliceReducer
});

export default rootReducer;