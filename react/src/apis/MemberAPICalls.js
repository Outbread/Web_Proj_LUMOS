import { 
    POST_LOGIN
  , POST_REGISTER
} from '../modules/MemberModule';



/** =========================로그인================================= */
export const callLoginAPI = ({form}) => {
  const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/auth/login`;

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Access-Control-Allow-Origin": "*"      
          },
          body: JSON.stringify({
              memberId: form.memberId,
              memberPassword: form.memberPassword
          })
      })
      .then(response => response.json());

      console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
      if(result.status === 200){
          window.localStorage.setItem('accessToken', result.data.accessToken);            
      }
      dispatch({ type: POST_LOGIN,  payload: result });
      
  };
}
/** =========================로그아웃========================= */
export const callLogoutAPI = () => { 
    
  return async (dispatch, getState) => {            

      dispatch({ type: POST_LOGIN,  payload: '' });        
      console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
  };
}

/** =========================회원가입================================ */
export const callRegisterAPI = ({form}) => {
  const requestURL = `http://${process.env.REACT_APP_LUMOS_IP}:8080/auth/signup`;

  return async (dispatch, getState) => {

      const result = await fetch(requestURL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "*/*"
          },
          body: JSON.stringify({
              memberId: form.memberId,
              memberPassword: form.memberPassword,
              memberName: form.memberName,
              memberBirth: form.memberBirth,
              memberGen: form.memberGen,
              memberPhone: form.memberPhone,
              memberEmail: form.memberEmail,
              memberAdsNum: form.memberAdsNum,
              memberAds: form.memberAds,
              memberAdsDetail: form.memberAdsDetail                
          })
      })
      .then(response => response.json());

      console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);        
      
      if(result.status === 201){
          dispatch({ type: POST_REGISTER,  payload: result });
      }        
  };
}