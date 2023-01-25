// import { useEffect, useState } from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {phoneFomatter} from '../../modules/Fommater';

// import {decodeJwt} from '../../utils/tokenUtils';
// import {callGetMemberAPI} from '../../apis/MemberAPICalls';
// import PostcodePopup from '../../modules/PostcodePopup';

// export default function Consignee({order}) {
    
//     const token = decodeJwt(window.localStorage.getItem("accessToken"));  
//     const roleAdmin = token.auth.filter(role => {return role == "ROLE_ADMIN"}).length;

//     const dispatch = useDispatch();
//     const userInfo = useSelector(state => state.memberReducer);
//     // console.log("userInfo", userInfo);

//     /* 주문자 정보와 동일 */
//     // 동일한 cartReducer 사용 시 에러 발생
//     useEffect(
//         () => {
//             dispatch(callGetMemberAPI({
//                 memberId: token.sub
//             }))
//         },
//         []
//     )

//     const [userAds, setUserAds] = useState({
//         cgNm: '',
//         cgPh: '',
//         cgAdsNum: '',
//         cgAds: '',
//         cgAdsDetail: ''
//     })

//     const callUserAdsHandler = (e) => {
//         if(e.target.checked == true) {
//             setUserAds({
//                 cgNm: userInfo.memberName,
//                 cgPh: userInfo.memberPhone,
//                 cgAdsNum: userInfo.memberAdsNum,
//                 cgAds: userInfo.memberAds,
//                 cgAdsDetail: userInfo.memberAdsDetail
//             })
//         } else {
//             setUserAds({
//                 cgNm: '',
//                 cgPh: '',
//                 cgAdsNum: '',
//                 cgAds: '',
//                 cgAdsDetail: ''
//             })
//         }
//     };

//     const adsInfoChangeHandler = (e) => {
//         setUserAds({
//             ...userAds,
//             [e.target.name]: e.target.value
//         })
//     };
//     console.log("수동입력", userAds);

//     // readOnly 일 경우 이벤트
//     const adsClickHandler = () => {
//         alert("검색 버튼을 눌러 주소를 검색해 주세요")
//     }

//     const [popup, setPopup] = useState(false);
//     const addressAPI = () => {
//         setPopup(!popup);
//     }

//     const completeAPI = (data) => {
//         setUserAds({
//             ...userAds,
//             cgAdsNum: data.zoncode,
//             cgAdsDetail: data.address
//         })
//     }

//     return (
//         <>
//             <table>
//                 <thead>
//                     {
//                         roleAdmin == 1
//                         ?
//                         <tr>
//                             <th colSpan={2}>
//                                 배송지 정보
//                             </th>
//                         </tr>
//                         :
//                         <tr>
//                             <th>배송지 정보</th>
//                             <td style={{textAlign: "right"}}>
//                                 <input 
//                                     type="checkbox"
//                                     style={{width: "30px"}}
//                                     onChange={callUserAdsHandler}
//                                 />
//                                 주문자 정보와 동일
//                             </td>
//                         </tr>
//                     }
//                 </thead>
//                 {
//                     roleAdmin == 1
//                     ?
//                     <tbody>
//                     <tr>
//                         <th>수하인명</th>
//                         <td>{order.cgNm}</td>
//                     </tr>
//                     <tr>
//                         <th>연락처</th>
//                         <td>{phoneFomatter(order.cgPh)}</td>
//                     </tr>
//                     <tr>
//                         <th>주소</th>
//                         <td>({order.cgAdsNum}) {order.cgAds} {order.cgAdsDetail}</td>
//                     </tr>
//                     </tbody>
//                     :
//                     <tbody>
//                     <tr>
//                         <th>수하인명</th>
//                         <td>
//                             <input 
//                                 name="cgNm" 
//                                 onChange={adsInfoChangeHandler}
//                                 value={userAds.cgNm ?? ''}
//                             ></input>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th>연락처</th>
//                         <td>
//                             <input 
//                                 type={'tel'}
//                                 name="cgPh" 
//                                 onChange={adsInfoChangeHandler}
//                                 value={phoneFomatter(userAds.cgPh) ?? ''}
//                                 placeholder="'-' 없이 숫자만 입력해 주세요"
//                             ></input>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th>주소</th>
//                         <td>
//                             <input 
//                                 name="cgAdsNum" 
//                                 id="cgAdsNum"
//                                 onChange={adsInfoChangeHandler}
//                                 onClick={adsClickHandler}
//                                 style={{width: "130px"}}
//                                 value={userAds.cgAdsNum ?? ''}
//                                 placeholder="우편번호"
//                                 // readOnly
//                                 disabled
//                             ></input>&nbsp;&nbsp;&nbsp;
//                             <button onClick={addressAPI}>검색</button>
//                             {
//                                 popup &&
//                                 <PostcodePopup
//                                     onComplete={completeAPI}
//                                 ></PostcodePopup>
//                             }
//                             <br/>
//                             <input 
//                                 name="cgAds" 
//                                 id="cgAds"
//                                 onChange={adsInfoChangeHandler} 
//                                 onClick={adsClickHandler}
//                                 style={{width: "350px"}}
//                                 value={userAds.cgAds ?? ''}
//                                 placeholder="주소"
//                                 // readOnly
//                                 disabled
//                             ></input>&nbsp;&nbsp;&nbsp;
//                             <input 
//                                 name="cgAdsDetail" 
//                                 id="cgAdsDetail"
//                                 onChange={adsInfoChangeHandler}
//                                 value={userAds.cgAdsDetail ?? ''}
//                                 placeholder="상세주소"
//                             ></input>
//                         </td>
//                     </tr>
//                     </tbody>
//                 }
//             </table>
//         </>
//     )
// };