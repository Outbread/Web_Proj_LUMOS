import {phoneFomatter} from '../../modules/Fommater';

export default function Consignee({order}) {
    
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            배송지 정보
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>수하인명</th>
                        <td>{order.cgNm}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{phoneFomatter(order.cgPh)}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>({order.cgAdsNum}) {order.cgAds} {order.cgAdsDetail}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};