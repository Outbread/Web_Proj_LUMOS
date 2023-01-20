import {useEffect, useState} from 'react';

import OrderDetailCSS from '../../pages/order/OrderDetail.module.css';

export default function OrderProduct({order : {orderProductList : product, ...etc}}) {

    const [toggle, setToggle] = useState(false);

    const onClickHandler = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <table className={OrderDetailCSS.orderProduct}>
                <thead>
                    <tr>
                        <th colSpan={5} onClick={onClickHandler}>
                            주문 제품 정보
                            <span style={{float: "right", paddingRight: "15px"}}>{!toggle? "-" : "+"}</span>
                        </th>
                    </tr>
                </thead>
                <thead style={!toggle ? null : {display: "none"}}>
                    <tr style={{fontWeight: "bold"}}>
                        <td colSpan="2">
                            상품 / 옵션 정보
                        </td>
                        <td>
                            수량
                        </td>
                        <td>
                            금액
                        </td>
                        <td>
                            합계
                        </td>
                    </tr>
                </thead>
                    {
                        Array.isArray(product)
                        && product.map((p) => (
                            <tbody key={p.orderPdNum} style={!toggle ? null : {display: "none"}}>
                                <tr rowSpan={2}>
                                    <td rowSpan={2} style={{width: "100px"}}>
                                        <img src={p.mainImgPath} width="100px" style={{display: "block"}}/>
                                    </td>
                                    <td style={{border: "none", width: "300px"}}>{p.pdName}</td>
                                    <td rowSpan={2}>{p.orderAmount}</td>
                                    <td rowSpan={2}>{p.pdPc.toLocaleString('ko-KR')} 원</td>
                                    <td rowSpan={2}>{(p.orderAmount * p.pdPc).toLocaleString('ko-KR')} 원</td>
                                </tr>
                                <tr rowSpan={2}>
                                    <td>{p.opName}</td>
                                </tr>
                            </tbody>
                        ))
                    }
            </table>
        </>
    )
};