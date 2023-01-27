import {GET_COMPANYINFO, PUT_COMPANYINFO} from '../modules/CompanyModule';
import {GET_SHOPINFO, PUT_SHOPINFO} from '../modules/ShopModule';

/* 사업자 정보 */
export const callCompanyInfoAPI = () => {

    console.log("[callCompanyInfoAPI] START ◀ ");

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/company-management`;

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

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/shop-management`;

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

/* 사업자 정보 저장 */
export const callCompanyInfoUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/company-management/update`;

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

        console.log("[callCompanyInfoUpdateAPI] RESULT : ▶ ", result);

        dispatch({ type: PUT_COMPANYINFO,  payload: result });
    };
}

/* 쇼핑몰 정보 저장 */
export const callShopInfoUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/shop-management/update`;

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

        console.log("[callShopInfoUpdateAPI] RESULT : ▶ ", result);

        dispatch({ type: PUT_SHOPINFO,  payload: result });
    };
}