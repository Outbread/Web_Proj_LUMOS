import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from '../../modules/Header.module.css';

export default function Header() {
    const [mode, setMode] = useState('');

    // const navigate = useNavigate();

    const onClickModeHandler = (e) => {
        console.log(e.target.value);
        switch(e.target.value) {
            case "익명 모드" :
                setMode("AnonymousMode");
                console.log(mode);
                break;
            case "멤버 모드" :
                setMode("MemberMode");
                break;
            case "관리자 모드" :
                setMode("AdminMode");
                break;
        }
    }

    function AnonymousMode() {

        return (
            <>
                <div>
                    <li><NavLink to="/sample">로그인</NavLink></li>
                    <li><NavLink to="/sample">회원가입</NavLink></li>
                    <li><NavLink to="/sample">장바구니</NavLink></li>
                </div>
            </>
        );
    }

    function MemberMode() {

        return (
            <>
                <div>
                    <li><NavLink to="/sample">로그아웃</NavLink></li>
                    <li><NavLink to="/sample">마이페이지</NavLink></li>
                    <li><NavLink to="/sample">장바구니</NavLink></li>
                </div>
            </>
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
            <div className={HeaderCSS.Boxing}>
                {console.log("mode", mode)}
                <div className={HeaderCSS.Logo}>LUMOS</div>
                <div className={HeaderCSS.Mode}>
                    <input type="button" onClick={onClickModeHandler} value="익명 모드"/>
                    <input type="button" onClick={onClickModeHandler} value="멤버 모드"/>
                    <input type="button" onClick={onClickModeHandler} value="관리자 모드"/>
                </div>
                <div className={HeaderCSS.Menu}>
                { mode === "AnonymousMode" ? <AnonymousMode/> : (mode === "MemberMode" ? <MemberMode/> : <AdminMode/>)}
                </div>
            </div>
        </>
    )
}