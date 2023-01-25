import {createActions, handleActions} from 'redux-actions';

const initialState = [];

/* 주문 목록 조회 */
export const GET_ORDER = 'order/GET_ORDER';

/* 주문 상세 조회 */
export const GET_ORDERDETAIL = 'order/GET_ORDERDETAIL';

/* [관리자] 택배사 선택 */
export const PUT_DELEVERYCP = 'order/PUT_DELEVERYCP';

/* [관리자] 송장번호 입력 */
export const PUT_DELEVERYNUM = 'order/PUT_DELEVERYNUM';

/* [관리자, 회원] 주문 상태 변경 */
export const PUT_STORDER = 'order/PUT_STORDER';

/* [관리자] 클레임 상태 변경 */
export const PUT_STCLAIM = 'order/PUT_STCLAIM';

// 추가
export const PUT_DATE = 'order/PUT_DATE';

const actions = createActions({
    [GET_ORDER] : () => {},
    [GET_ORDERDETAIL] : () => {},
    [PUT_DELEVERYCP] : () => {},
    [PUT_DELEVERYNUM] : () => {},
    [PUT_STORDER] : () => {},
    [PUT_STCLAIM] : () => {},
    // 추가
    [PUT_DATE] : () => {}
});

const orderReducer = handleActions(
    {
        [GET_ORDER] : (state, { payload }) => {
            return payload;
        },
        [GET_ORDERDETAIL] : (state, { payload }) => {
            return payload;
        },
        [PUT_DELEVERYCP] : (state, { payload }) => {
            return payload;
        },
        [PUT_DELEVERYNUM] : (state, { payload }) => {
            return payload;
        },
        [PUT_STORDER] : (state, { payload }) => {
            return payload;
        },
        [PUT_STCLAIM] : (state, { payload }) => {
            return payload;
        },
        // 추가
        [PUT_DATE] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default orderReducer;