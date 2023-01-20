export default function Payment({order}) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            결제 정보
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>결제 방법</th>
                        <td>{order.paymentMt}</td>
                    </tr>
                    <tr>
                        <th>상품 주문 가격</th>
                        <td>{order.orderPc.toLocaleString('ko-KR')}</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td>{order.deliveryPc.toLocaleString('ko-KR')}</td>
                    </tr>
                    <tr>
                        <th>합계</th>
                        <td>{order.totalPc.toLocaleString('ko-KR')}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};