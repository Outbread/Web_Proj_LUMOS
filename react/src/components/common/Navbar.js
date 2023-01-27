import NavbarCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink, useNavigate } from 'react-router-dom';
import {useState} from 'react'

function Navbar() {

    const navigate = useNavigate();
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
    }
    console.log('decoded ', decoded);

    const [search, setSearch] = useState('');

    const [loginModal, setLoginModal] = useState(false);

    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onEnterkeyHandler = (e) => {
        if (e.key == 'Enter') {
            console.log('Enter key', search);
            
            navigate(`/search?value=${search}`, { replace: false });
            
            window.location.reload();
        }
    }
    

    return (
        <div className={NavbarCSS.Boxing}>
             <ul>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/productall">전체 상품</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/LED">가정용 LED</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/lamp">램프</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/pendant">식탁등</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/downlight">매입등</NavLink></li>
                    <li onClick={() => {window.location.reload()}}><NavLink to="/product/switch">스위치/콘센트</NavLink></li>
                    <input 
                        className={ NavbarCSS.InputStyle }
                        type="text" 
                        placeholder="검색" 
                        value={ search }
                        onKeyUp={ onEnterkeyHandler }
                        onChange={ onSearchChangeHandler }
                    />
                </ul>
        </div>
    )
}
export default Navbar;