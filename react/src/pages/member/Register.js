import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom'; /* 아이디 중복체크 */

import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'

/* 아이디 중복체크 */
import { 
    idCheckAPI
} from '../../apis/MemberAPICalls'
// import {
//     duplicationCheckAPI
// } from '../../apis/MemberAPICalls'

import { POST_LOGIN } from '../../modules/MemberModule';

function Register() {

    const navigate = useNavigate();
    const inputRef = useRef([]);
    

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    const params = useParams(); /* 아이디 중복체크 */

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        pwConfirm: '',
        memberName: '', 
        memberBirth: '', 
        memberGen: '',
        memberPhone: '',
        memberEmail: '',
        memberAdsNum: '',
        memberAds: '',
        memberAdsDetail: '',
        usableId : false
    });

    const { memberId, memberPassword, memberName, memberBirth, memberPhone, memberEmail, pwConfirm } = form;
    // 아이디 형식 정규표현식 (숫자와 알파벳만)
    const idRegexp = /[a-z]{5,15}|[a-z0-9]{5,15}/g;
    //비밀번호 형식 정규표현식 (최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자)
    const pwRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g; 
    // 이름 형식 정규표현식 (한글만 입력)
    const nameRegexp = /^[가-힣]+$/g;
    // 생년월일 형식 정규표현식
    const birthRegexp = /^[0-9]{8}$/g;
    // 핸드폰 번호 형식 정규표현식
    const phoneRegexp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    // email 형식 정규표현식 
    const emailRegexp = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; 
    
    

    const validId = memberId.match(idRegexp);
    const validPassword = memberPassword.match(pwRegexp);
    const validName = memberName.match(nameRegexp);
    const validBirth = memberBirth.match(birthRegexp);
    const validPhone = memberPhone.match(phoneRegexp);
    const validEmail = memberEmail.match(emailRegexp);
    const validpwConfirm = (memberPassword === pwConfirm);

    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member]);

    /* 데이터 입력 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };    

    /* 돌아가기 클릭시 메인 페이지로 이동 */
    const onClickBackHandler = () => {
        navigate("/", { replace: true })
    }

    /* 아이디 중복 체크 */
    // const duplicationCheck = () => {
    //     dispatch(callGetMemberAPI({	
    //         memberId: form.memberId
    //     }));            
    //     if ( validId === memberId) {
    //         alert('중복된 아이디입니다');
    //     } else {
    //         alert('사용 가능한 아이디입니다람쥣.')
    //     }
    // }
    const [usableId, setUsableId] = useState(false);
    const duplicationCheck = () => {
        idCheckAPI(memberId)
        .then((response) => {
        console.log(response)
        if(response === false){
            alert('사용 가능한 아이디입니다다다.');
            setUsableId(response);
        }
        else{
            alert('중복된 아이디입니다. 다시 시도하세요요요요.');
            setUsableId(response);
            
        }
        console.log('중복체크');
        console.log(memberId);
        })
    }

    /* 회원가입 버튼 클릭시 유효성 검사 후 맞는 양식일 때에만 폼 제출 */
    const onClickRegisterHandler = () => {
        if (!validId) {
            alert("아이디를 다시 확인 해 주세요."); // 알람창
            setForm({ // 값 비워주기
              ...form,
              memberId: "", // 바뀐 값 빼고 나머지는 그대로 스프레드 연산자
            });
            inputRef.current[0].focus(); // 자동 포커스
            } else if (!validPassword) {
                alert("비밀번호를 다시 확인 해 주세요.");
                inputRef.current[1].focus();
                setForm({
                ...form,
                MemberPassword: "",
                });
            } else if (!validName) {
                alert("이름을 다시 확인 해 주세요.");
                inputRef.current[2].focus();
                setForm({
                ...form,
                memberName: "",
                });
            } else if (!validBirth) {
                alert("생년월일을 다시 확인 해 주세요.");
                inputRef.current[3].focus();
                setForm({
                ...form,
                memberBirth: "",
                });
            } else if (!validPhone) {
                alert("전화번호를 다시 확인 해 주세요.");
                inputRef.current[4].focus();
                setForm({
                ...form,
                memberPhone: "",
                });
            } else if (!validEmail) {
                alert("email을 다시 확인 해 주세요.");
                inputRef.current[5].focus();
                setForm({
                ...form,
                memberEmail: "",
                });
            } else if (!validpwConfirm) {
                alert("비밀번호를 똑같이 입력 해 주세요.");
                inputRef.current[6].focus();
                setForm({
                ...form,
                pwConfirm: "",
                });
          } else {
            dispatch(callRegisterAPI({
            form: form
        }));
            return alert("˗ˋˏ회원가입 성공!ˎˊ˗");
          }
        
    }

    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <h1>회원가입</h1>
                <div class="field">
                    <b>아이디</b>
                    <div>
                        <input 
                            type="text"
                            name="memberId"
                            value={memberId}
                            maxLength='15'
                            placeholder="최소 5자 이상의 영소문자나 영소문자와 숫자를 적어주세요"
                            autoComplete='off'
                            ref={(el) => (inputRef.current[0] = el)} 
                            onChange={ onChangeHandler }
                        />
                        { validId ? <div style={ {color : '#73CEBE', fontSize: '13px' }  }> -ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize : '13px'} }>유효하지 않은 아이디입니다.</div>}
                    </div>
                    <div>
                        <button onClick={duplicationCheck}>중복확인</button>
                    </div>
                </div>
                <div class="field">
                    <b>비밀번호</b>
                    <div>
                        <input 
                            type="password"
                            name="memberPassword"
                            value={memberPassword}
                            placeholder="문자, 숫자, 특수 문자를 최소 1개 이상 조합해 8자 이상 적어주세요"
                            autoComplete='off'
                            ref={(el) => (inputRef.current[1] = el)}
                            onChange={ onChangeHandler }
                        />
                        
                    </div>
                </div>
                <div class="field">
                    <div>
                        <input 
                            type="password"
                            name="pwConfirm"
                            value={pwConfirm}
                            placeholder="비밀번호를 다시 입력해주세요"
                            autoComplete='off'
                            ref={(el) => (inputRef.current[6] = el)}
                            onChange={ onChangeHandler }
                        />
                        { (validPassword === true) ? null : validPassword ? <div style={ {color : '#73CEBE', fontSize: '13px' }  }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize : '13px'} }>유효하지 않은 비밀번호 입니다.</div>}
                        { (validpwConfirm === true) ? null : validpwConfirm ? <div style={ {color : '#73CEBE', fontSize: '13px' }  }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize : '13px'} }>비밀번호가 다릅니다.</div>}
                    </div>
                </div>
                <div class="field">
                    <b>이름</b>
                    <div>
                        <input 
                            type="text"
                            name="memberName"
                            autoComplete='off'
                            ref={(el) => (inputRef.current[2] = el)}
                            onChange={ onChangeHandler }
                        />{ validName ? <div style={ {color : '#73CEBE', fontSize: '13px'  } }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize : '13px' , fontSize : '13px'} }>이름을 한글로 입력 해 주세요.</div>}
                    </div>
                </div>
                <div class="field birth">
                    <b>생년월일</b>
                    <div>
                        <input type="text" 
                               placeholder="ex : 19990101" 
                               name="memberBirth"
                               maxLength="8" 
                               autoComplete='off'
                               ref={(el) => (inputRef.current[3] = el)} 
                               onChange={ onChangeHandler}
                        />{ validBirth ? <div style={ {color : '#73CEBE', fontSize: '13px' }  }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize : '13px'} }>생년월일을 숫자 8자리로 입력해주세요.</div>}
                    </div>
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
                    <div>
                        <input 
                            type="text" 
                            name="memberPhone"
                            placeholder="ex : 010-1234-1234"
                            value={memberPhone}
                            autoComplete='off'
                            onChange={ onChangeHandler }
                            ref={(el) => (inputRef.current[4] = el)} 
                        />{ validPhone ? <div style={ {color : '#73CEBE', fontSize: '13px' }  }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize : '13px'} }>유효하지 않은 전화번호 입니다.</div>}
                    </div>
                </div>
                <div class="field">
                    <b>이메일</b>
                    <div>
                        <input 
                           type="text"
                           name="memberEmail"
                           placeholder="ex : email@lumos.com"
                           autoComplete='off'
                           ref={(el) => (inputRef.current[5] = el)}
                           onChange={ onChangeHandler}
                        />
                        { validEmail ? <div style={ {color : '#73CEBE', fontSize: '13px' }  }>-ˋˏ맞게 입력하셨습니다!ˎˊ-</div> : <div style={ {color : '#EF5252', fontSize : '13px'} }>유효하지 않은 e-mail입니다.</div>}
                    </div>
                </div>
                <div class="field">
                    <b>우편번호</b>
                    <div>
                        <input 
                            type="text" 
                            name="memberAdsNum"
                            placeholder="우편번호입력" 
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
                </div>
                <div class="field">
                    <b>주소</b>
                    <div>
                        <input 
                            type="text" 
                            name="memberAds"
                            placeholder="주소입력" 
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
                </div>
                <div class="field">
                    <b>상세 주소</b>
                    <div>
                        <input 
                            type="text" 
                            name="memberAdsDetail"
                            placeholder="상세 주소 입력" 
                            autoComplete='off'
                            onChange={ onChangeHandler }
                        />
                    </div>
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