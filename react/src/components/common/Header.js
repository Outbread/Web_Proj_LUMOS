import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import logo from '../../image/lumosLogo.png'

// 로그인
import {
    callLogoutAPI
} from '../../apis/MemberAPICalls'
import LoginModal from './LoginModal'; 

export default function Header() {
    
    const [mode, setMode] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    /*==============================로그인=======================================*/
    const loginMember = useSelector(state => state.memberReducer); 
    const isLogin = window.localStorage.getItem('accessToken');    
    const [loginModal, setLoginModal] = useState(false); 

    //마이페이지로 이동
    const onClickMypageHandler = (memberId) => {    
        // 토큰 만료시 재로그인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[Header] onClickMypageHandler token : ', token);
        
        if (token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }
        //마이페이지로 이동
        navigate(`/mypage`, { replace: true });
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
            <div className={HeaderCSS.linkbox}>
                <NavLink to="/login" className={HeaderCSS.headerNavLink}>로그인</NavLink>
                <NavLink to="/register" className={HeaderCSS.headerNavLink}>회원가입</NavLink>
                <NavLink to="/sample" className={HeaderCSS.headerNavLink}>장바구니</NavLink>
            </div>
        );
    }

    function MemberMode() {   //로그인 후
        return (
            <div className={HeaderCSS.linkbox}>
                <button onClick={ onClickLogoutHandler } className={HeaderCSS.headerbutton}>로그아웃</button>
                <button onClick={ onClickMypageHandler } className={HeaderCSS.headerbutton}>마이페이지</button>
                <NavLink to="/sample" className={HeaderCSS.headerNavLink}>장바구니</NavLink>
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
                <div><img src= {logo} className={HeaderCSS.Logo}/></div>
                <div className={HeaderCSS.Menu}>
                    { (isLogin == null || isLogin === undefined) ? <AnonymousMode /> : <MemberMode />}
                </div>
            </div>
        </>
    )
}