import { combineReducers } from 'redux';
import questionReducer from './QuestionModules';    // 문의사항
import memberReducer from './MemberModule';         // 로그인, 회원가입

const rootReducer = combineReducers({
    questionReducer,       // 문의사항 
    memberReducer          // 로그인, 회원가입
});

export default rootReducer;
