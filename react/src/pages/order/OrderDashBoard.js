import {useNavigate} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import OrderDashBoardCSS from './OrderDashBoard.module.css';
import SearchResult from '../../components/order/SearchResult';
import {callOrderListAPI} from '../../apis/OrderAPICalls';

import {OrderContext} from '../../App';

export default function OrderDashBoard() {

    const navigate = useNavigate();
    const context = useContext(OrderContext);
    const {ckeckCode, setCheckCode} = context;
    
    
    // const dispatch = useDispatch();
    // const orderData  = useSelector(state => state.orderReducer);  
    // const orderList = orderData.data;
    // console.log("orderList", orderList);
    // console.log(Array.isArray(orderList));
    // console.log("dasdsadas", status1.length);
    // console.log("status1", status1.length);
    /* 배송상태와 관련한 기능은 3차 목표로 추후에 구현 */
    // const dispatch = useDispatch();
    // const orderData  = useSelector(state => state.orderReducer);  
    // console.log(orderData);
    // useEffect(
    //     () => {
    //         dispatch(callOrderListAPI({	
    //         }));            
    //     }
    //     ,[]
    // );

    const onClickHandler = () => {
        navigate(`/order-management/`, { replace: false });
    }

    // 오류 방지를 위한 props-drilling
    const [updateKind, setUpdateKind] = useState({
        updateKind: '1'
    });

    // 전체 선택이 가능함을 보여주는 임의 기능
    const onPrintHandler = () => {
        const confirmResult = window.confirm(`총 ${ckeckCode.size}건의 주문을 출력하시겠습니까?`)
        if(confirmResult) alert("준비 중인 기능입니다.");
        window.location.reload();
    }

    return (
        <>
            <div className={OrderDashBoardCSS.boxing}>
                <table className={OrderDashBoardCSS.left}>
                    <thead>
                        <tr>
                            <th colSpan={9}>주문/배송</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* 무통장 입금 */}
                            <td className={OrderDashBoardCSS.info}>결제 대기</td>
                            <td rowSpan={2} className={OrderDashBoardCSS.guide}>▶</td>
                            {/* 무통장 입금 입금 확인 및 카카오페이 주문건 */}
                            <td className={OrderDashBoardCSS.info}>결제 완료</td>
                            <td rowSpan={2} className={OrderDashBoardCSS.guide}>▶</td>
                            {/* 발주 확인처리된 주문건 */}
                            <td className={OrderDashBoardCSS.info}>배송 준비 중</td>
                            <td rowSpan={2} className={OrderDashBoardCSS.guide}>▶</td>
                            {/* 배송출발일이 존재하고, 배송 완료일이 존재하지 않는 주문건 */}
                            <td className={OrderDashBoardCSS.info}>배송 중</td>
                            <td rowSpan={2} className={OrderDashBoardCSS.guide}>▶</td>
                            {/* 배송완료일이 존재하는 주문건 */}
                            <td className={OrderDashBoardCSS.info}>배송 완료</td>
                        </tr>
                        <tr>
                            <td>X 건</td>
                            <td>X 건</td>
                            <td>X 건</td>
                            <td>X 건</td>
                            <td>X 건</td>
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
                            <td style={{textAlign: "right"}}>X 건</td>
                        </tr>
                        <tr>
                            <td className={OrderDashBoardCSS.info}>반품 요청</td>
                            <td style={{textAlign: "right"}}>X 건</td>
                        </tr>
                        <tr>
                            <td className={OrderDashBoardCSS.info}>문의 게시글</td>
                            <td style={{textAlign: "right"}}>X 건</td>
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
                                    {/* ▶ 전체 주문 출력 시 활성화할 태그 */}
                                    {/* <button onClick={onPrintHandler}>주문 내역 출력</button> */}
                                    <button onClick={onClickHandler}>전체 주문 조회</button>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <SearchResult updateKind={updateKind}/>
            </div>
        </>
    )
}