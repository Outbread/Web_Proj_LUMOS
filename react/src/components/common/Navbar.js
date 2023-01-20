import NavbarCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink } from 'react-router-dom';

function Navbar() {


    return (
        <div className={NavbarCSS.Boxing}>
            <ul>
                <li>대분류1</li>
                <li>대분류2</li>
                <li>대분류3</li>
                <li>대분류4</li>
                <li>대분류5</li>
                <input type="text" placeholder="검색"/>
            </ul>
        </div>
    )
}
export default Navbar;