import { combineReducers } from 'redux';
import questionReducer from './QuestionModules';    // 문의사항
import memberReducer from './MemberModule';         // 로그인, 회원가입
import orderReducer from './OrderModule';           // 주문내역
import cartReducer from './CartModule';             // 주문내역
import footerReducer from './FooterModule';
import productReducer from './ProductModule'        // 상품

const rootReducer = combineReducers({
    questionReducer,       // 문의사항 
    memberReducer,          // 로그인, 회원가입
    orderReducer,
    cartReducer,
    footerReducer,
    productReducer          // 상품

});

export default rootReducer;