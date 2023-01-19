import NavbarCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink } from 'react-router-dom';

function Navbar() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
    }
    console.log('decoded ', decoded);

    return (
        <div className={NavbarCSS.Boxing}>
            <ul>
                <li>대분류1</li>
                <li>대분류2</li>
                <li>대분류3</li>
                <li>대분류4</li>
                <li>대분류5</li>
                <input type="text" placeholder="검색"/>
                { decoded ==="ROLE_ADMIN" && <li><NavLink to="/">상품관리</NavLink></li>}
            </ul>
        </div>
    )
}
export default Navbar;