import RegisterCSS from './Register.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

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
            memberPassword: memberDetail.memberPassword,
            memberName: memberDetail.memberName,
            memberEmail: memberDetail.memberEmail,
            memberBirth: memberDetail.memberBirth
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
        formData.append("memberPassword", form.memberPassword);
        formData.append("memberName", form.memberName);
        formData.append("memberEmail", form.memberEmail);
        formData.append("memberBirth", form.memberBirth);

        dispatch(callMemberUpdateAPI({	// 상품 정보 업데이트
            form: formData
        }));         

        alert('프로필을 수정했습니다.');
        navigate('/', { replace: true});
    }


    return (
        <div>
            <div className={ RegisterCSS.backgroundDiv} style={ { backgroundColor: 'white' } } >
                <button        
                    onClick={ () => navigate(-1) }            
                >
                        돌아가기
                </button>
                {!modifyMode &&
                    <button       
                        onClick={ onClickModifyModeHandler }             
                    >
                        수정하기
                    </button>
                }
                    {modifyMode &&
                        <button       
                            onClick={ onClickProfileUpdateHandler }             
                    >
                        수정완료
                    </button>
                }
            </div>
            { memberDetail &&

            <div className={ RegisterCSS.registerDiv }>
                
                    <h1>내 정보</h1>
                    <input 
                        name="memberId"
                        placeholder="아이디" 
                        onChange={ onChangeHandler }
                        readOnly={true}
                        value={memberDetail.memberId || ''}
                    />
                    <input 
                        name="memberPassword" 
                        placeholder="비밀번호" 
                        onChange={ onChangeHandler }
                        readOnly={ modifyMode ? false : true}
                        value={ (!modifyMode ? memberDetail.memberPassword : form.memberPassword) || ''}
                    />
                    <input 
                        name="memberName" 
                        placeholder="이름" 
                        onChange={ onChangeHandler }
                        readOnly={ modifyMode ? false : true}
                        value={ (!modifyMode ? memberDetail.memberName : form.memberName) || ''}
                    />
                    <input 
                        name="memberEmail" 
                        placeholder="이메일" 
                        onChange={ onChangeHandler }
                        readOnly={ modifyMode ? false : true}
                        value={ (!modifyMode ? memberDetail.memberEmail : form.memberEmail) || ''}
                    />
                    <input 
                        type="text" 
                        placeholder="생년월일" 
                        onChange={ onChangeHandler }
                        readOnly={true}
                        value={memberDetail.memberBirth || ''}
                    />
                    
                    <button
                        style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                        onClick = { onClickBackHandler }
                    >
                    탈퇴하기
                    </button>
                
            </div>
            }
        </div>
    );
}
export default ProfileUpdate;