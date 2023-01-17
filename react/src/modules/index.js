import { combineReducers } from 'redux';
import memberReducer from './MemberModule'; //로그인, 회원가입

const rootReducer = combineReducers({
    memberReducer //로그인, 회원가입
});

export default rootReducer;
