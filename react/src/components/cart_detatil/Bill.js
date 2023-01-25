export default function Bill({order : {orderProductList : product, ...etc}}) {

    // console.log("빌지인데 가격있냐..", product);
    let orderPc = 0;
    product.forEach(pd => orderPc += pd.pdPc * pd.orderAmount);
    // console.log(orderPc);
    const defaultDeliveryPc = 3000;

    // ★ props-drilling

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
                        <td>{orderPc.toLocaleString('ko-KR')} 원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td>
                            {
                                orderPc > 500000
                                ?
                                "무료배송"
                                :
                                defaultDeliveryPc.toLocaleString('ko-KR') + " 원"
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>합계</th>
                        <td>
                            {
                                orderPc > 500000
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