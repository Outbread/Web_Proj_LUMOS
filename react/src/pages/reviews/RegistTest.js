import PaymentCSS from '../products/Payment.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callPurchaseListAPI
} from '../../apis/PurchaseAPICalls'
import ProductReviewModal from '../../components/products/ProductReviewModal';

function RegistTest() {

    const dispatch = useDispatch();
    const purchase = useSelector(state => state.purchaseReducer);  
    const purchaseList = purchase.data;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    const [productReviewModal, setProductReviewModal] = useState(false);
    const [pdCode, setPdCode] = useState(0);
    const [memberCode, setMemberCode] = useState(0);

    useEffect(
        () => {    
            if(token !== null) {
                dispatch(callPurchaseListAPI({	// 구매 정보 조회
                    memberId: token.sub
                }));            
            }
        }
        ,[]
    );
    
    const onClickReviewHandler = (productFromTable) => {
        setPdCode(productFromTable.product.pdCode);
        setMemberCode(productFromTable.orderMember);
        setProductReviewModal(true);
    };

    return (
        <>
            { productReviewModal ? <ProductReviewModal memberCode={memberCode} pdCode={pdCode} setProductReviewModal={ setProductReviewModal }/> : null}
            <div className={ PaymentCSS.paymentDiv }>
                <table className={ PaymentCSS.paymentTable }>
                    <colgroup>
                        <col width="20%" />
                        <col width="40%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>주문일자</th>
                            <th>주문 상품 정보</th>
                            <th>총 주문 금액(수량)</th>
                            <th>리뷰</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>
                                <button onClick={ () => onClickReviewHandler() }>리뷰 등록</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        { purchaseList && purchaseList.map(
                            () => (
                                <tr
                                    key={ purchase.orderCode }
                                >
                                    <td>{ purchase.orderDate }</td>
                                    <td>{ purchase.product.pdName }</td>                                
                                    <td>{ purchase.product.pdPrice * purchase.orderAmount }({purchase.orderAmount})</td>
                                    <td>
                                        <button
                                            className={ PaymentCSS.reviewWriteBtn }
                                            onClick={ () => onClickReviewHandler(purchase) }
                                        >
                                            리뷰 등록
                                        </button>
                                    </td>
                                </tr>
                             )
                         )} 
                        
                    </tbody>                    
                </table>            
            </div>
        </>
    );
}

export default RegistTest;