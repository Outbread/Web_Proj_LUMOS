import {
    POST_QUESTION,
    GET_QUESTION,
    GET_QUESTIONS,
    PUT_QUESTION
} from '../modules/QuestionModules'

export const callQuestionRegistAPI = ({ form }) => {
    console.log('[QuestionAPICalls] callQuestionRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question`;

    return async (dispatch, getState) => {
        // console.log(form.data.memberId);
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*"   
            },
            body: form
        })
        .then();

        console.log('[QuestionAPICalls] callQuestionRegistAPI RESULT : ', result);

        dispatch({ type: POST_QUESTION,  payload: result });
        
    };       
}

  export const callQuestionListAPI = ({memberId, currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/${memberId}?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/${memberId}`;
    }
    console.log(currentPage);
    console.log(memberId);
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
            console.log('[QuestionAPICalls] callQuestionListAPI RESULT : ', result);
            dispatch({ type: GET_QUESTIONS,  payload: result.data });
        }
        
    };
}

/* 문의 사항 상세 조회 */ 
export const callQuestionDetailAPI = ({questionCode}) => {
    
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/detail/${questionCode}`;
    
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
        console.log(result.data.questionTitle)
        if(result.status === 200){
            console.log('[QuestionAPICalls] callQuestionDetailAPI RESULT : ', result);
            dispatch({ type: GET_QUESTION,  payload: result.data });
        }
        
    };
}

export const callQuestionUpdateAPI = ({ questionCode, form }) => {
    console.log('[QuestionAPICalls] callQuestionUpdateAPI Call');
       
    const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/question/detail/${questionCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Access-Control-Allow-Origin": "*" 
            },
            body: JSON.stringify({
                questionCode: form.questionCode,
                questionTitle: form.questionTitle,
                questionContent: form.questionContent
            })
        })
        .then(response => response.json());

        console.log('[QuestionAPICalls] callQuestionUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_QUESTION,  payload: result });
        
    };    
}