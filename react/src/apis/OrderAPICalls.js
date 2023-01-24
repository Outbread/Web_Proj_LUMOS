import {
    GET_ORDER,
    GET_ORDERDETAIL,
    PUT_DELEVERYCP,
    PUT_DELEVERYNUM,
    PUT_STORDER,
    PUT_STCLAIM,
    // 추가
    PUT_DATE
} from '../modules/OrderModule';

/* [관리자] 주문 내역 조회 */
export const callOrderListAPI = ({currentPage}) => {

    console.log("[callOrderListAPI] START ◀ ");

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management`;
    }

    console.log("[callOrderListAPI] requestURL ▶ ", requestURL);

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

        console.log("[callOrderListAPI] RESULT ▶ ", result);
        if(result.status === 200){
            console.log("[callOrderListAPI] SUCCESS ◀ ");
            dispatch({type: GET_ORDER,  payload: result.data});
        }
    };
};

/* [관리자] 주문 내역 검색 결과 조회 */
export const callOrderSearchAPI = ({searchDate, searchTitle, searchValue}) => {

    console.log("[callOrderSearchAPI] START ◀ ");
    console.log("searchDate", searchDate);
    console.log("searchTitle", searchTitle);
    console.log("searchValue", searchValue);

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management/search?s1=${searchDate}&s2=${searchTitle}&s3=${searchValue}`;

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

        // result.status === 200 구문 대신 화면단에서 삼 항 연산자를 사용하여 막을 수 있도록 함
        console.log("[callOrderSearchAPI] RESULT ▶ ", result);

        dispatch({type: GET_ORDER, payload: result.data});
    };
    
};

/* [관리자] 주문 내역 상세 조회 */
export const callOrderDetailAPI = ({orderCode}) => {

    console.log("[callOrderDetailAPI] START ◀ ");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management/${orderCode}`;

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

        console.log("[callOrderDetailAPI] RESULT : ▶ ", result);
        if(result.status === 200){
            console.log("[callOrderDetailAPI] SUCCESS ◀ ");
            dispatch({type: GET_ORDERDETAIL,  payload: result.data});
        }
    };
};

/* [관리자] 주문 내역 택배사 및 송장번호 입력 */
export const callDeliveryCpUpdateAPI = ({orderCode, form}) => {

    console.log("[callDeliveryCpUpdateAPI] START ◀ ");
    console.log("orderCode", orderCode);
    console.log("form", form);

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management/${orderCode}/delivery-update`;

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

        console.log("[callDeliveryCpUpdateAPI] RESULT : ▶ ", result);

        dispatch({ type: PUT_DELEVERYCP,  payload: result });
    };
};

/* [관리자] 발주확인, 배송완료처리, 주문취소처리, 반품접수, 반품완료처리 */
export const callHistoryUpdateAPI = ({orderCode, form}) => {

    console.log("[callHistoryUpdateAPI] START ◀ ");
    console.log("API orderCode", orderCode);
    console.log("API form.updateKind", form);

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/order-management/${orderCode}/history-update`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                // "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log("[callHistoryUpdateAPI] RESULT : ▶ ", result);

        dispatch({ type: PUT_DATE,  payload: result });
    };
};