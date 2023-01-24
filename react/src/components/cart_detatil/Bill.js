export default function Bill({order}) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>
                            주문서
                        </th>
                        <td>
                            {order.orderCode}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>주문가격</th>
                        <td>{order.orderPc.toLocaleString('ko-KR')} 원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td>{order.deliveryPc.toLocaleString('ko-KR')} 원</td>
                    </tr>
                    <tr>
                        <th>합계</th>
                        <td>{order.totalPc.toLocaleString('ko-KR')} 원</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}