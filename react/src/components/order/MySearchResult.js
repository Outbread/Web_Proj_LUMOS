import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {dateFomatter} from '../../modules/Fommater';

import {callOrderListAPI} from '../../apis/OrderAPICalls';

import SearchResultCSS from './SearchResult.module.css';


export default function MySearchResult({searchOrderList}) {

    console.log("▶ SearchResult ◀");
    
    const orderData  = useSelector(state => state.orderReducer);  
    let orderList = orderData.data;
    Array.isArray(searchOrderList) ? orderList = searchOrderList : orderList = orderList;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
        
    /* 상세 페이지로 이동 */
    const onClickHandler = (orderCode) => {
        // replace : true => 해당 주소로 이동 후 뒤로 가기를 하더라고 방금 페이지로 복귀 불가 / 메인 페이지("/")로 복귀
        console.log("orderCode", orderCode);
        navigate(`/order-management/${orderCode}`, { replace: false });
    }

    return (
        <>
            {/* 조회 및 검색 결과가 있는 경우 컴포넌트 반환 */}
            <div className={SearchResultCSS.list}>
                <table>
                    <thead>
                        <tr>
                            <th>주문일</th>
                            <th>주문번호</th>
                            <th>구매자명</th>
                            <th>구매자ID</th>
                            <th>수취인명</th>
                            <th>결제방법</th>
                            <th>결제금액</th>
                            <th>배송방법</th>
                            <th>주문상태</th>
                            <th>클레임상태</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (Array.isArray(orderList) && orderList.length > 0)
                        ? orderList.map((order) => (
                            <tr key={order.orderNum}>
                                <td onClick={() => onClickHandler(order.orderCode)}>{dateFomatter(order.orderDate)}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.orderCode}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.memberCode.memberName}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.memberCode.memberId}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.cgNm}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.paymentMt}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.totalPc.toLocaleString('ko-KR')} 원</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.deliveryMt}</td>
                                <td onClick={() => onClickHandler(order.orderCode)}>
                                    {
                                        order.purchaseConf ? "구매확정" : (
                                            order.deliveryEnd ? "배송완료" : (
                                                order.deliveryStart ? "배송중" : (
                                                    order.orderConf ? "발주확인" : "주문완료"
                                                )
                                            )
                                        )
                                    }
                                </td>
                                <td onClick={() => onClickHandler(order.orderCode)}>{order.stClaim ? order.stClaim : "-"}</td>
                            </tr>
                            )
                        )
                        : <tr><td colSpan={11}>조회 결과가 없습니다.</td></tr>
                    }
                    </tbody>
                </table>
            </div>
            <div className={SearchResultCSS.paging}>
                {/* 왼쪽 버튼 */}
                {(Array.isArray(orderList) && pageInfo) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={SearchResultCSS.pageBtn}
                    >
                        ◀
                    </button>
                }
                {/* 페이지 버튼 */}
                {(Array.isArray(orderList) && pageInfo) &&
                    pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={currentPage === num ? {color: '#73CEBE'} : null}
                                className={SearchResultCSS.pageNum}
                            >
                                {num}
                            </button>
                        </li>
                ))}
                {/* 오른쪽 버튼 */}
                {(Array.isArray(orderList) && pageInfo) &&
                    <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
                    className={SearchResultCSS.pageBtn}
                    >
                        ▶
                    </button>
                }
            </div>
        </>
    )
}