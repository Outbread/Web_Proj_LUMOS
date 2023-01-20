import { combineReducers } from 'redux';
import questionReducer from './QuestionModules';    // 문의사항
import memberReducer from './MemberModule';         // 로그인, 회원가입
import orderReducer from './OrderModule';           // 주문내역
import footerReducer from './FooterModule';

const rootReducer = combineReducers({
    questionReducer,       // 문의사항 
    memberReducer,          // 로그인, 회원가입
    orderReducer,
    footerReducer

});

export default rootReducer;
