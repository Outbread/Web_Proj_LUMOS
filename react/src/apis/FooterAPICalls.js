import {
    GET_COMPANYINFO,
    GET_SHOPINFO,
} from '../modules/FooterModule';

/* 사업자 정보 */
export const callCompanyInfoAPI = () => {

    console.log("[callCompanyInfoAPI] START ◀ ");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/company`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            } 
        })
        .then(response => response.json());

        console.log("[callCompanyInfoAPI] RESULT : ▶ ", result);
        if(result.status === 200){
            console.log("[callCompanyInfoAPI] SUCCESS ◀ ");
            dispatch({type: GET_COMPANYINFO,  payload: result.data});
        }
    };
};

/* 쇼핑몰 정보 */
export const callShopInfolAPI = () => {

    console.log("[callShopInfolAPI] START ◀ ");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/shop`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            } 
        })
        .then(response => response.json());

        console.log("[callShopInfolAPI] RESULT : ▶ ", result);
        if(result.status === 200){
            console.log("[callShopInfolAPI] SUCCESS ◀ ");
            dispatch({type: GET_SHOPINFO,  payload: result.data});
        }
    };
};