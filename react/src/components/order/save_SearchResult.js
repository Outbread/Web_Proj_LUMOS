import {useNavigate} from 'react-router-dom';
import {dateFomatter} from '../../modules/Fommater';

export default function SearchResult({order}) {
    
    // const {
    //     memberCode : memberInfo, orderProductList : orderProductListInfo, 
    //     orderDate, orderCode, cgNm, totalPc, stOrder, stClaim, ...orderInfo
    // } = order;

    // const navigate = useNavigate();

    // const onClickHandler = (orderCode) => {
    //     // replace : true => 해당 주소로 이동 후 뒤로 가기를 하더라고 방금 페이지로 복귀 불가 / 메인 페이지("/")로 복귀
    //     console.log("orderCode", orderCode);
    //     navigate(`/order-management/${orderCode}`, { replace: false });
    // }

    return (
        <>
            {/* <tr onClick={() => onClickHandler(orderCode)}>
                <td>{dateFomatter(orderDate)}</td>
                <td>{orderCode}</td>
                <td>{memberInfo.memberName}</td>
                <td>{memberInfo.memberId}</td>
                <td>{cgNm}</td>
                <td>{totalPc}</td>
                <td>{stOrder}</td>
                <td>{stClaim}</td>
            </tr> */}
        </>
    )
}