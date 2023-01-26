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
                    <li><NavLink to="/product/LED">가정용 LED</NavLink></li>
                    <li><NavLink to="/product/lamp">램프</NavLink></li>
                    <li><NavLink to="/product/pendant">식탁등</NavLink></li>
                    <li><NavLink to="/product/downlight">매입등</NavLink></li>
                    <li><NavLink to="/product/switch">스위치/콘센트</NavLink></li>
                    <input type="text" placeholder="검색"/>
                </ul>
        </div>
    )
}
export default Navbar;