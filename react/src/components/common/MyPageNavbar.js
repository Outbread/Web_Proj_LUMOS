import { NavLink } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// import { decodeJwt } from '../../utils/tokenUtils';

function MyPageNavbar() {

    // const token = decodeJwt(window.localStorage.getItem("accessToken"));     

    // if(token === undefined || token === null || token.exp * 1000 < Date.now()) {        
    //     return <Navigate to="/" />;
    // }

    return (
        <div>
            <ul>
                <li><NavLink to="/mypage/questionregistration">문의</NavLink></li>
  
            </ul>
        </div>
    );
}

export default MyPageNavbar;