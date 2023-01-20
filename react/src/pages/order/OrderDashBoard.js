import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {callOrderListAPI} from '../../apis/OrderAPICalls';

import {dateFomatter} from '../../modules/Fommater';

import OrderDashBoardCSS from './OrderDashBoard.module.css';
import SearchResult from '../../components/order/SearchResult';

export default function OrderDashBoard() {

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/order-management/`, { replace: false });
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
                                <td><button onClick={onClickHandler}>전체 주문 조회</button></td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <SearchResult/>
            </div>
        </>
    )
}