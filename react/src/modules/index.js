import { combineReducers } from 'redux';
import questionReducer from './QuestionModules';

const rootReducer = combineReducers({
    questionReducer
});

export default rootReducer;
