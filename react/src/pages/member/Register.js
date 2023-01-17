import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function Register() {

    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
   
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '', 
        memberBirth: '', 
        memberGen: '',
        memberPhone: '',
        memberEmail: '',
        memberAdsNum: '',
        memberAds: '',
        memberAdsDetail: ''
    });

    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };    

    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/", { replace: true })
    }
    
    const onClickRegisterHandler = () => {
        dispatch(callRegisterAPI({
            form: form
        }));
    }

    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <h1>회원가입</h1>
                <div class="field">
                    <b>아이디</b>
                        <input 
                            type="text"
                            name="memberId"
                            autoComplete='off'
                            onChange={ onChangeHandler }/>
                </div>
                <div class="field">
                    <b>비밀번호</b>
                        <input 
                            type="password"
                            name="memberPassword"
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                </div>
               
                <div class="field">
                    <b>이름</b>
                        <input 
                            type="text"
                            name="memberName"
                            autoComplete='off'
                            onChange={ onChangeHandler }/>
                </div>
                <div class="field birth">
                    <b>생년월일</b>
                        <input type="text" 
                               placeholder="ex : 19990101" 
                               name="memberBirth"
                               maxLength="8" 
                               autoComplete='off'
                               onChange={ onChangeHandler}/>
                </div>
                <div class="field gender">
                    <b>성별</b>
                    <div>
                        <label><input type="radio" name="memberGen" onChange={ onChangeHandler } 
                                      checked={  form.memberGen == "남자" ? true : false }  value={"남자"}/>남자</label>
                        <label><input type="radio" name="memberGen" onChange={ onChangeHandler }
                                      checked={ form.memberGen == "여자" ? true : false }  value={"여자"}/>여자</label>
                        <label><input type="radio" name="memberGen" onChange={ onChangeHandler }
                                      checked={ form.memberGen == "선택안함" ? true : false }  value={"선택안함"}/>선택안함</label>
                    </div>
                </div>
                <div class="field tel-number">
                    <b>휴대전화</b>
                        <input 
                            type="text" 
                            name="memberPhone"
                            placeholder="ex : 010-1234-1234"
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                </div>
                <div class="field">
                    <b>이메일</b>
                        <input 
                           type="text"
                           name="memberEmail"
                           autoComplete='off'
                           onChange={ onChangeHandler}
                        />
                </div>
                <div class="field">
                    <b>우편번호</b>
                        <input 
                            type="text" 
                            name="memberAdsNum"
                            placeholder="우편번호입력" 
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                </div>
                <div class="field">
                    <b>주소</b>
                        <input 
                            type="text" 
                            name="memberAds"
                            placeholder="주소입력" 
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                </div>
                <div class="field">
                    <b>상세 주소</b>
                        <input 
                            type="text" 
                            name="memberAdsDetail"
                            placeholder="상세 주소 입력" 
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                </div>
                <button
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default Register;