import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {callOrderListAPI} from '../../apis/OrderAPICalls';

import SearchHead from '../../components/order/SearchHead';
import SearchResult from '../../components/order/SearchResult';
import {dateFomatter} from '../../modules/Fommater';

import OrderManagementCSS from './OrderManagement.module.css';

export default function OrderManagement() {

    console.log("▶ OrderManagement ◀");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderData  = useSelector(state => state.orderReducer);  
    const orderList = orderData.data;

    /* 페이징 처리 */
    const pageInfo = orderData.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];

    if(pageInfo) {
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callOrderListAPI({	
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickHandler = (orderCode) => {
        // replace : true => 해당 주소로 이동 후 뒤로 가기를 하더라고 방금 페이지로 복귀 불가 / 메인 페이지("/")로 복귀
        console.log("orderCode", orderCode);
        navigate(`/order-management/${orderCode}`, { replace: false });
    }

    const onSelectHandler = (e) => {
        console.log(e.target.checked);
        const childCheck = document.getElementById("childCheck");
        const checkBoxes = document.querySelectorAll("#childCheck");
        console.log(checkBoxes);
        checkBoxes.forEach(child => child.checked = e.target.checked)
    }

    return (
        <>
            <div>
                <SearchResult/>
            </div>
        </>
    )
}