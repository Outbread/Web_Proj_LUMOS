import {createActions, handleActions} from 'redux-actions';

const initialState = [];

/* 주문 상품 추가 (장바구니 조회 및 생성) */
export const POST_ITEM      = 'cart/POST_ITEM';

/* 주문 상품 조회 (장바구니 조회 및 생성) */
export const GET_ORDER      = 'cart/GET_ORDER';

/* 주문 수량 수정 */
export const PUT_ITEM       = 'cart/PUT_ITEM';

/* 주문 제품 삭제 */
export const DELETE_ITEM    = 'cart/DELETE_ITEM';

/* 주문 주소 입력 (카카오 주소 API | https://postcode.map.daum.net/guide) */
export const PUT_ADDRESS    = 'cart/PUT_ADDRESS';

/* 배송 정보 선택 */
export const PUT_DELEVERYMT = 'cart/PUT_DELEVERYMT';

/* 결제 방법 선택 */
export const PUT_PAYMENTMT  = 'cart/PUT_PAYMENTMT';

/* 결제 결제 상태 변경 (카카오페이 API | https://developers.kakao.com/docs/latest/ko/kakaopay/common) */
export const PUT_PATMENT    = 'cart/PUT_PATMENT';

/* 주문자 정보 동일 */
export const GET_USERINFO   = 'cart/GET_USERINFO';

/* 결제 버튼 클릭 */
export const PUT_ORDER      = 'cart/PUT_ORDER';

const actions = createActions({
    [POST_ITEM] : () => {},
    [GET_ORDER] : () => {},
    [PUT_ITEM] : () => {},
    [DELETE_ITEM] : () => {},
    [PUT_ADDRESS] : () => {},
    [PUT_DELEVERYMT] : () => {},
    [PUT_PAYMENTMT] : () => {},
    [PUT_PATMENT] : () => {},
    [GET_USERINFO] : () => {},
    [PUT_ORDER] : () => {}
});

const cartReducer = handleActions(
    {
        [POST_ITEM] : (state, { payload }) => {
            return payload;
        },
        [GET_ORDER] : (state, { payload }) => {
            return payload;
        },
        [PUT_ITEM] : (state, { payload }) => {
            return payload;
        },
        [DELETE_ITEM] : (state, { payload }) => {
            return payload;
        },
        [PUT_ADDRESS] : (state, { payload }) => {
            return payload;
        },
        [PUT_DELEVERYMT] : (state, { payload }) => {
            return payload;
        },
        [PUT_PAYMENTMT] : (state, { payload }) => {
            return payload;
        },
        [PUT_PATMENT] : (state, { payload }) => {
            return payload;
        },
        [GET_USERINFO] : (state, { payload }) => {
            return payload;
        },
        [PUT_ORDER] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default cartReducer;