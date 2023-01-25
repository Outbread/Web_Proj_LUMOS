import NavbarCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import {
    callProductListAPI
} from '../../apis/ProductAPICalls';

function Navbar() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer); 
    const productList = products.data;


    const [select , setSelect] = useState(0);

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
    }
    console.log('decoded ', decoded);
    console.log(select);

    useEffect(
        () => {
            dispatch(callProductListAPI({
                
            }));            
        }
        ,[]
    );
    
    const onClickLED = () => {
        if(select == 0) {
            setSelect(1);
        } else {
            setSelect(0);
        }
    }

    const onClickLamp = () => {
        if(select == 0) {
            setSelect(2);
        } else {
            setSelect(0);
        }
    }

    const onClickPendant = () => {
        if(select == 0) {
            setSelect(3);
        } else {
            setSelect(0);
        }
    }

    const onClickDownlight = () => {
        if(select == 0) {
            setSelect(4);
        } else {
            setSelect(0);
        }
    }

    const onClickSwitch = () => {
        if(select == 0) {
            setSelect(5);
        } else {
            setSelect(0);
        }
    }

    return (
        <div className={NavbarCSS.Boxing}>
            {(() => {
                switch(select){
                    case 1: 
                        return <ol>
                                    <li onClick = { onClickLED }>가정용 LED</li>
                                    <ul>                                        
                                        <li><NavLink to="/">현관</NavLink></li>
                                        <li><NavLink to="/">거실</NavLink></li>
                                        <li><NavLink to="/">주방</NavLink></li>
                                        <li><NavLink to="/">방</NavLink></li>
                                        <input type="text" placeholder="검색"/>
                                        { decoded ==="ROLE_ADMIN" && <li><NavLink to="/">상품관리</NavLink></li>}
                                    </ul>
                                </ol>

                    case 2: 
                        return <ol>
                                    <li onClick = { onClickLED }>가정용 LED</li>
                                    <ul>                                        
                                        <li><NavLink to="/">현관</NavLink></li>
                                        <li><NavLink to="/">거실</NavLink></li>
                                        <li><NavLink to="/">주방</NavLink></li>
                                        <li><NavLink to="/">방</NavLink></li>
                                        <input type="text" placeholder="검색"/>
                                        { decoded ==="ROLE_ADMIN" && <li><NavLink to="/">상품관리</NavLink></li>}
                                    </ul>
                                </ol>
                    case 3: 
                    return <ol>
                                <li onClick = { onClickLED }>가정용 LED</li>
                                <ul>                                        
                                    <li><NavLink to="/">현관</NavLink></li>
                                    <li><NavLink to="/">거실</NavLink></li>
                                    <li><NavLink to="/">주방</NavLink></li>
                                    <li><NavLink to="/">방</NavLink></li>
                                    <input type="text" placeholder="검색"/>
                                    { decoded ==="ROLE_ADMIN" && <li><NavLink to="/">상품관리</NavLink></li>}
                                </ul>
                            </ol>
                    case 4: 
                    return <ol>
                                <li onClick = { onClickLED }>가정용 LED</li>
                                <ul>                                        
                                    <li><NavLink to="/">현관</NavLink></li>
                                    <li><NavLink to="/">거실</NavLink></li>
                                    <li><NavLink to="/">주방</NavLink></li>
                                    <li><NavLink to="/">방</NavLink></li>
                                    <input type="text" placeholder="검색"/>
                                    { decoded ==="ROLE_ADMIN" && <li><NavLink to="/">상품관리</NavLink></li>}
                                </ul>
                            </ol>

                    case 5: 
                        return <ol>
                                    <li onClick = { onClickLED }>가정용 LED</li>
                                    <ul>                                        
                                        <li><NavLink to="/">현관</NavLink></li>
                                        <li><NavLink to="/">거실</NavLink></li>
                                        <li><NavLink to="/">주방</NavLink></li>
                                        <li><NavLink to="/">방</NavLink></li>
                                        <input type="text" placeholder="검색"/>
                                        { decoded ==="ROLE_ADMIN" && <li><NavLink to="/">상품관리</NavLink></li>}
                                    </ul>
                                </ol>
                    default :
                    return <ul>
                    <li onClick={ onClickLED }><NavLink to="/">가정용 LED</NavLink></li>
                    <li onClick = { onClickLamp }><NavLink to="/">램프</NavLink></li>
                    <li onClick = { onClickPendant }><NavLink to="/">식탁등</NavLink></li>
                    <li onClick = { onClickDownlight }><NavLink to="/">매입등</NavLink></li>
                    <li onClick = { onClickSwitch }><NavLink to="/">스위치/콘센트</NavLink></li>
                    <input type="text" placeholder="검색"/>
                    { decoded ==="ROLE_ADMIN" && <li><NavLink to="/">상품관리</NavLink></li>}
                </ul>
                }
            })()}

        </div>
    )
}
export default Navbar;