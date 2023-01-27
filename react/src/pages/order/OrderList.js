import {useNavigate} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import OrderDashBoardCSS from './OrderDashBoard.module.css';
import SearchResult from '../../components/order/SearchResult';
import {callOrderDashBoardAPI, callClaimDashBoardClaimAPI} from '../../apis/OrderAPICalls';

export default function OrderList() {

    const navigate = useNavigate();
    
    /*
        결제 대기 : 무통장입금+주문완료
        신규 주문 : 카카오페이+주문완료
        배송 준비 : 무통장입금+발주확인 & 카카오페이+발주확인
        배송 중 : 무통장입금+발주확인+배송출발날짜 & 카카오페이+발주확인+배송출발날짜
        배송 완료 : 무통장입금+발주확인+배송완료날짜 & 카카오페이+발주확인+배송완료날짜

        취소 요청 : 문의 유형 취소요청 & 해결상태 미해결
        반품 요청 : 문의 유형 반품요청 & 해결상태 미해결
    */

    const dispatch = useDispatch();
    // pageinfo가 없어서 .data 할 필요 X
    const orderList  = useSelector(state => state.dashBoardReducer);  
    const questionList  = useSelector(state => state.questionReducer);  
    console.log("orderList 대시보드", orderList);
    console.log("questionList 대시보드", questionList);

    useEffect(
        () => {
            dispatch(callOrderDashBoardAPI({	
            }));   
            dispatch(callClaimDashBoardClaimAPI({	
            }));             
        }
        ,[]
    );

    const waitPayment = orderList.filter(order => (order.paymentMt == "무통장입금" && order.orderDate?.length > 0)).length;
    const newOrder = orderList.filter(order => (order.paymentMt == "카카오페이" && order.orderDate?.length > 0)).length;
    const preDelivery = orderList.filter(order => ((order.paymentMt == "무통장입금" || "카카오페이") && order.orderConf?.length > 0)).length;
    const proDelivery = orderList.filter(order => (order.paymentMt == "무통장입금" && order.deliveryStart?.length > 0)).length;
    const comDelivery = orderList.filter(order => (order.paymentMt == "무통장입금" && order.deliveryEnd?.length > 0)).length;
    const cancleReq = questionList.filter(question => (question.questionCategory == "주문취소" && question.questionStatus == "미해결")).length;
    const returnReq = questionList.filter(question => (question.questionCategory == "반품요청" && question.questionStatus == "미해결")).length;

    const onClickHandler = () => {
        navigate(`/order-management/`, { replace: false });
    }

    // 오류 방지를 위한 props-drilling
    const [updateKind, setUpdateKind] = useState({
        updateKind: '1'
    });

    return (
        <>
            <div className={OrderDashBoardCSS.boxing}>
                <table className={OrderDashBoardCSS.left}>
                    <thead>
                        <tr>
                            <th colSpan={9}>주문 / 배송</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={OrderDashBoardCSS.info}>결제 대기</td>
                            <td rowSpan={2} className={OrderDashBoardCSS.guide}>▶</td>
                            <td className={OrderDashBoardCSS.info}>신규 주문</td>
                            <td rowSpan={2} className={OrderDashBoardCSS.guide}>▶</td>
                            <td className={OrderDashBoardCSS.info}>배송 준비</td>
                            <td rowSpan={2} className={OrderDashBoardCSS.guide}>▶</td>
                            <td className={OrderDashBoardCSS.info}>배송 중</td>
                            <td rowSpan={2} className={OrderDashBoardCSS.guide}>▶</td>
                            <td className={OrderDashBoardCSS.info}>배송 완료</td>
                        </tr>
                        <tr>
                            <td>{waitPayment} 건</td>
                            <td>{newOrder} 건</td>
                            <td>{preDelivery} 건</td>
                            <td>{proDelivery} 건</td>
                            <td>{comDelivery} 건</td>
                        </tr>
                    </tbody>
                </table>
               
                <table className={OrderDashBoardCSS.right}>
                    <thead>
                        <tr>
                            <th colSpan={2}>클레임</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={OrderDashBoardCSS.info}>취소 요청</td>
                            <td style={{textAlign: "right"}}>{cancleReq} 건</td>
                        </tr>
                        <tr>
                            <td className={OrderDashBoardCSS.info}>반품 요청</td>
                            <td style={{textAlign: "right"}}>{returnReq} 건</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div className={OrderDashBoardCSS.bottom}>
                    <table>
                        <thead>
                            <tr>
                                <th>최근 주문 내역</th>
                                <td>
                                    <button onClick={onClickHandler}>전체 주문 조회</button>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <SearchResult />
            </div>
        </>
    )
}