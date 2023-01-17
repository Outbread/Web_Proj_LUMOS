import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from '../../modules/Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

// 로그인
import {
    callLogoutAPI
} from '../../apis/MemberAPICalls'
import LoginModal from './LoginModal'; 

export default function Header() {
    
    const [mode, setMode] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickModeHandler = (e) => {
        console.log(e.target.value);
        switch(e.target.value) {
           
            case "관리자 모드" :
                setMode("AdminMode");
                break;
        }
    }

    /*==============================로그인=======================================*/
    const loginMember = useSelector(state => state.memberReducer); 
    const isLogin = window.localStorage.getItem('accessToken');    
    const [loginModal, setLoginModal] = useState(false); 

    // 토큰 만료시
    const onClickMypageHandler = () => {    
        
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[Header] onClickMypageHandler token : ', token);
        
        if (token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }

        navigate("/", { replace: true });
    }

    // 로그아웃
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');  
        
        dispatch(callLogoutAPI());
        
        alert('˗ˋˏ로그아웃 되었습니다ˎˊ˗');
        navigate("/", { replace: true })
        window.location.reload();
    }

    function AnonymousMode() { //로그인 전

        return (
            <div>
                <NavLink to="/login">로그인</NavLink>
                <NavLink to="/register">회원가입</NavLink>
                <NavLink to="/sample">장바구니</NavLink>
            </div>
        );
    }

    function MemberMode() {   //로그인 후

        return (
            <div>
                <button onClick={ onClickLogoutHandler }>로그아웃</button>
                <NavLink to="/sample">마이페이지</NavLink>
                <NavLink to="/sample">장바구니</NavLink>
            </div>
        );
    }

    function AdminMode() {

        return (            
            <>
                <div>
                    <li><NavLink to="/sample">상점관리</NavLink></li>
                    <li><NavLink to="/sample">상품관리</NavLink></li>
                    <li><NavLink to="/sample">주문관리</NavLink></li>
                    <li><NavLink to="/sample">회원관리</NavLink></li>
                </div>
            </>
        );
    }

    return (
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div className={HeaderCSS.Boxing}>
                {console.log("mode", mode)}
                <div className={HeaderCSS.Logo}>LUMOS</div>
                <div className={HeaderCSS.Mode}>
                    <input type="button" onClick={onClickModeHandler} value="관리자 모드"/>
                </div>
                <div className={HeaderCSS.Menu}>
                    { (isLogin == null || isLogin === undefined) ? <AnonymousMode /> : <MemberMode />}
                </div>
            </div>
        </>
    )
}