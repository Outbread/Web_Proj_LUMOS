import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {callCompanyInfoAPI, callShopInfolAPI} from '../../apis/FooterAPICalls';

import FooterCSS from './Footer.module.css';

export default function Footer() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const footerData  = useSelector(state => state.orderReducer);  
    const footerInfo = footerData.data;

    useEffect(
        () => {
            dispatch(callCompanyInfoAPI());            
            dispatch(callShopInfolAPI());
        }
        ,[]
    );

    console.log();
    return (
        <>
            <div>

            </div>
            <div className={FooterCSS.Boxing}>
                <h3 style= { { width: '100%', textAlign: 'center' } }>Copyright 2022. LUMOS All rights reserved.  </h3>
            </div>
        </>
    );
}