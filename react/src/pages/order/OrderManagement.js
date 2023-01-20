import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {callOrderListAPI} from '../../apis/OrderAPICalls';

import SearchHead from '../../components/order/SearchHead';
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

    return (
        <>
            <div>
                {<SearchHead/>}    
            </div>
            {/* 조회 및 검색 결과가 있는 경우 컴포넌트 반환 */}
            <div className={OrderManagementCSS.list}>
                <table>
                    <thead>
                        <tr>
                            <th>주문일</th>
                            <th>주문번호</th>
                            <th>구매자명</th>
                            <th>구매자ID</th>
                            <th>수취인명</th>
                            <th>결제금액</th>
                            <th>배송상태</th>
                            <th>클레임상태</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(orderList)
                        && orderList.map((order) => (
                            <tr
                                key={order.orderNum}
                                onClick={() => onClickHandler(order.orderCode)}
                            >
                                <td>{dateFomatter(order.orderDate)}</td>
                                <td>{order.orderCode}</td>
                                <td>{order.memberCode.memberName}</td>
                                <td>{order.memberCode.memberId}</td>
                                <td>{order.cgNm}</td>
                                <td>{order.totalPc}</td>
                                <td>{order.stOrder}</td>
                                <td>{order.stClaim}</td>
                            </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className={OrderManagementCSS.paging}>
                {/* 왼쪽 버튼 */}
                {Array.isArray(orderList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={OrderManagementCSS.pageBtn}
                    >
                        ◀
                    </button>
                }
                {/* 페이지 버튼 */}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={currentPage === num ? {color: '#73CEBE'} : null}
                            className={OrderManagementCSS.pageNum}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {/* 오른쪽 버튼 */}
                {Array.isArray(orderList) &&
                    <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
                    className={OrderManagementCSS.pageBtn}
                    >
                        ▶
                    </button>
                }
            </div>
        </>
    )
}