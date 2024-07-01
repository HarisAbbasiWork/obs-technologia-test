import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { SET_USER, RESET_USER } from './constant';

const initialState = {
  _id: '',
  email: '',
  accesstoken: '',
  auth: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      };
    case RESET_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  user: userReducer
});

export default reducer;
