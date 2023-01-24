import {
    POST_ITEM,
    GET_ORDER,
    PUT_ITEM,
    DELETE_ITEM,
    PUT_ADDRESS,
    PUT_DELEVERYMT,
    PUT_PAYMENTMT,
    PUT_PATMENT
} from '../modules/CartModule';

/* 장바구니 상품 추가 및 신규 생성 */
export const callPostItemAPI = ({memberId, form}) => {

    console.log("[callPostItemAPI] START ◀ ");
    console.log("memberId", memberId);

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log("[callPostItemAPI] RESULT : ▶ ", result);

        dispatch({ type: POST_ITEM,  payload: result });
    };    
};

/* 장바구니 조회 */
export const callCartDetailAPI = ({memberId}) => {

    console.log("[callCartDetailAPI] START ◀ ");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${memberId}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            } 
        })
        .then(response => response.json());

        console.log("[callCartDetailAPI] RESULT : ▶ ", result);
        if(result.status === 200) {
            console.log("[callCartDetailAPI] SUCCESS ◀ ");
            dispatch({type: GET_ORDER,  payload: result.data});
        }
    };
};

/* 장바구니 제품 수량 수정 */
export const callAmountUpdateAPI = ({memberId, form}) => {

    console.log("[callAmountUpdateAPI] START ◀ ");
    console.log("API memberId", memberId);
    console.log("API form", form);

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${memberId}/amount-update`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log("[callHistoryUpdateAPI] RESULT : ▶ ", result);

        dispatch({ type: PUT_ITEM,  payload: result });
    };
};

/* 장바구니 상품 삭제 */
export const callItemDeleteAPI = ({memberId, orderPdNum}) => {

    console.log("[callItemDeleteAPI] START ◀ ");
    console.log("API memberId", memberId);
    console.log("API orderPdNum", orderPdNum);

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/cart/${memberId}/item-delete/${orderPdNum}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                // "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            } 
        })
        .then(response => response.json());

        console.log("[callItemDeleteAPI] RESULT : ▶ ", result);
        if(result.status === 200) {
            console.log("[callItemDeleteAPI] SUCCESS ◀ ");
            dispatch({type: DELETE_ITEM,  payload: result.data});
        }
    };
};