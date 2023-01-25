import { useEffect } from "react";

export default function Bill({order : {orderProductList : product, ...etc}, orderInfo, setOrderInfo}) {

    // console.log("빌지인데 가격있냐..", product);
    let orderPc = 0;
    product.forEach(pd => orderPc += pd.pdPc * pd.orderAmount);
    // console.log(orderPc);
    const defaultDeliveryPc = 3000;
    const deliveryGuidePc = 50000;

    // ★ props-drilling
    useEffect(
        () => {
            // console.log("빌컴포넌트 11orderPc", document.getElementById("orderPc"));
            // console.log("빌컴포넌트 11deliveryPc", document.getElementById("deliveryPc"));
            // console.log("빌컴포넌트 11totalPc", document.getElementById("totalPc"));
            setOrderInfo({
                ...orderInfo,
                orderPc: orderPc,
                deliveryPc: orderPc > deliveryGuidePc ? 0 : defaultDeliveryPc,
                totalPc: orderPc > deliveryGuidePc ? orderPc + 0 : orderPc + defaultDeliveryPc
            })
        },
        []
    )

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>
                            주문서
                        </th>
                        <td>
                            {etc.orderCode}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>주문가격</th>
                        <td id="orderPc">{orderPc.toLocaleString('ko-KR')} 원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td id="deliveryPc">
                            {
                                orderPc > deliveryGuidePc
                                ?
                                "무료배송"
                                :
                                defaultDeliveryPc.toLocaleString('ko-KR') + " 원"
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>합계</th>
                        <td id="totalPc">
                            {
                                orderPc > deliveryGuidePc
                                ?
                                (orderPc + 0).toLocaleString('ko-KR') + " 원"
                                :
                                (orderPc + defaultDeliveryPc).toLocaleString('ko-KR') + " 원"
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}