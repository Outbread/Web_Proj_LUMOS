import {
    POST_QUESTION,
    GET_QUESTION
} from '../modules/QuestionModules'

export const callQuestionRegistAPI = ({ form }) => {
    console.log('[QuestionAPICalls] callQuestionRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/question`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"   
            },
            body: form
        })
        .then(response => response.json());

        console.log('[QuestionAPICalls] callQuestionRegistAPI RESULT : ', result);

        dispatch({ type: POST_QUESTION,  payload: result });
        
    };       
}

export const callQuestionListAPI = ({currentPage}) => {
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/question/{memberCode}?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/question/{memberCode}`;
    }
    
    console.log('[QuestionAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[QuestionAPICalls] callProductAPI RESULT : ', result);
            dispatch({ type: GET_QUESTION,  payload: result.data });
        }
        
    };
}

export const callQuestionListAdminAPI = ({currentPage}) => {
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/question/list?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/question/list`;
    }
    
    console.log('[QuestionAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"                
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[QuestionAPICalls] callProductAPI RESULT : ', result);
            dispatch({ type: GET_QUESTION,  payload: result.data });
        }
        
    };
}