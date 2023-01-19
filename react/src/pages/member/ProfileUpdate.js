import ProfileUpdateCSS from './ProfileUpdate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import axios from 'axios';
import {
    callGetMemberAPI,
    callMemberUpdateAPI
} from '../../apis/MemberAPICalls'


function ProfileUpdate() {

    const dispatch = useDispatch();
    const params = useParams();
    const memberDetail = useSelector(state => state.memberReducer);  

    const [modifyMode, setModifyMode] = useState(false);
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    const [form, setForm] = useState({});

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }

    useEffect(
        () => {    
            console.log('token', token.sub);
            if(token !== null) {
                dispatch(callGetMemberAPI({	
                    memberId: token.sub
                }));            
            }
        }
        ,[]
    );

    useEffect(        
        () => {
            console.log('[ProfileUpdate] memberId : ', params.memberId);

            dispatch(callGetMemberAPI({	
                memberId: params.memberId
            }));                     
        }
    ,[]);

    // 프로필수정버튼
    const onClickModifyModeHandler = () => {    
        setModifyMode(true);
        setForm({
            memberCode: memberDetail.memberCode,
            memberId: memberDetail.memberId,
            memberName: memberDetail.memberName,
            memberPhone: memberDetail.memberPhone,
            memberEmail: memberDetail.memberEmail,
            memberAdsNum: memberDetail.memberAdsNum,
            memberAds: memberDetail.memberAds,
            memberAdsDetail: memberDetail.memberAdsDetail
        });
    }

    /* form 데이터 세팅 */  
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //업데이트 핸들러
    const onClickProfileUpdateHandler = () => {

        console.log('[ProfileUpdate] onClickProfileUpdateHandler');

        const formData = new FormData();
        formData.append("memberCode", form.memberCode);
        formData.append("memberId", form.memberId);
        formData.append("memberName", form.memberName);
        formData.append("memberPhone", form.memberPhone);
        formData.append("memberEmail", form.memberEmail);
        formData.append("memberAdsNum",form.memberAdsNum);
        formData.append("memberAds",form.memberAds);
        formData.append("memberAdsDetail",form.memberAdsDetail);

        dispatch(callMemberUpdateAPI({	// 상품 정보 업데이트
            form: formData
        }));         

        alert('프로필을 수정했습니다.');
        navigate('/', { replace: true});
    }

    //탈퇴하기 버튼
    // const handleDeleteProfile = (e) => {
    //     e.preventDefault();
    //     if (window.confirm('정말로 탈퇴하시겠습니까?')) {
    //       axios
    //         .delete(
    //           `http://${process.env.REACT_APP_LUMOS_IP}:8080/api/v1/profileUpdate/${form.memberId}`,
    //           {
    //             headers: {
    //               Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
    //             },
    //           }
    //         )
    //         .then(() => {
    //           localStorage.clear();
    //           alert('그동안 이용해주셔서 감사합니다.');
    //           navigate('/');
    //         })
    //         .catch((err) => alert(err.response.data.message));
    //     } else {
    //       return;
    //     }
    //   };

    return (
        
        <div className={ ProfileUpdateCSS.PUwrapper} style={ { backgroundColor: 'white' } }>
            <div className={ ProfileUpdateCSS.PUheader }>| 회원 정보</div>
            { memberDetail &&
                <div className={ ProfileUpdateCSS.PUcontent }>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 아이디 </div>
                        <input className={(!modifyMode == true ? ProfileUpdateCSS.PUinput : ProfileUpdateCSS.PUmodify)}
                            name="memberId"
                            placeholder="아이디" 
                            onChange={ onChangeHandler }
                            readOnly={true}
                            value={memberDetail.memberId || ''}
                        />
                    </div>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 이름 </div>
                        <input className={ ProfileUpdateCSS.PUinput}
                            name="memberName" 
                            placeholder="이름" 
                            onChange={ onChangeHandler }
                            readOnly={ modifyMode ? false : true}
                            value={ (!modifyMode ? memberDetail.memberName : form.memberName) || ''}
                        />
                    </div>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 휴대전화 </div>
                        <input className={ProfileUpdateCSS.PUinput }
                            type="text" 
                            placeholder="휴대전화" 
                            onChange={ onChangeHandler }
                            readOnly={modifyMode ? false : true}
                            value={(!modifyMode ? memberDetail.memberPhone : form.memberPhone ) || ''}
                        />
                    </div>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 이메일 </div>
                        <input className={ProfileUpdateCSS.PUinput}
                            name="memberEmail" 
                            placeholder="이메일" 
                            onChange={ onChangeHandler }
                            readOnly={ modifyMode ? false : true}
                            value={ (!modifyMode ? memberDetail.memberEmail : form.memberEmail) || ''}
                        />
                    </div>
                    <div className={ProfileUpdateCSS.adsWrapWrap}>
                        <div className={ProfileUpdateCSS.adsWrap}>
                            <div className={ProfileUpdateCSS.PUlabel}> 우편번호 </div>
                            <input className={ProfileUpdateCSS.inputadsNum}
                                name="memberAdsNum" 
                                placeholder="우편번호" 
                                onChange={ onChangeHandler }
                                readOnly={ modifyMode ? false : true}
                                value={ (!modifyMode ? memberDetail.memberAdsNum : form.memberAdsNum) || ''}
                            />
                        </div>
                        <div className={ProfileUpdateCSS.adsWrap}>
                            <div className={ProfileUpdateCSS.PUlabel}> 주소 </div>
                            <input className={ProfileUpdateCSS.inputads}
                                name="memberAds" 
                                placeholder="주소" 
                                onChange={ onChangeHandler }
                                readOnly={ modifyMode ? false : true}
                                value={ (!modifyMode ? memberDetail.memberAds : form.memberAds) || ''}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={ProfileUpdateCSS.PUlabel}> 상세주소 </div>
                        <input className={ProfileUpdateCSS.PUinput}
                            name="memberAdsDetail" 
                            placeholder="상세주소" 
                            onChange={ onChangeHandler }
                            readOnly={ modifyMode ? false : true}
                            value={ (!modifyMode ? memberDetail.memberAdsDetail : form.memberAdsDetail) || ''}
                        />
                    
                    </div>
                    <div className={ProfileUpdateCSS.PUbuttonWrap} >
                        {!modifyMode &&
                            <button  
                                className={ProfileUpdateCSS.PUbutton}     
                                onClick={ onClickModifyModeHandler }             
                            >
                                수정하기
                            </button>
                        }
                        {modifyMode &&
                            <button       
                                className={ProfileUpdateCSS.PUbutton}
                                onClick={ onClickProfileUpdateHandler }             
                            >
                            수정완료
                            </button>
                        }
                        <button
                            className={ProfileUpdateCSS.PUbutton}
                            // onClick = { handleDeleteProfile }
                            >
                        탈퇴하기
                        </button>
                    </div>
            </div>
            }
        </div>
    );
}
export default ProfileUpdate;