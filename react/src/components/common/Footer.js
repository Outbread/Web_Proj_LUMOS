import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FooterCSS from './Footer.module.css';
import {callCompanyInfoAPI, callShopInfolAPI} from '../../apis/ShopManagementAPICalls';

export default function Footer() {

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const companyInfo  = useSelector(state => state.companyReducer);  
    // const shopInfo  = useSelector(state => state.shopReducer);  

    // console.log("companyInfo:::::::", companyInfo);
    // console.log("shopInfo:::::::", shopInfo);

    // useEffect(
    //     () => {
    //         dispatch(callCompanyInfoAPI());            
    //         dispatch(callShopInfolAPI());
    //     }
    //     ,[]
    // );

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