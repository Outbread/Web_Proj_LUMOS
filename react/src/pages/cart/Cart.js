import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useContext, useEffect} from 'react';
import Delivery from '../../components/order_detail/Delivery';
import Consignee from '../../components/order_detail/Consignee';
import OrderProduct from '../../components/order_detail/OrderProduct';
import Payment from '../../components/order_detail/Payment';
import Bill from '../../components/cart_detatil/Bill';

import OrderDetailCSS from '../order/OrderDetail.module.css';
import BtnCSS from '../../components/order_detail/Btn.module.css';
import {callPostItemAPI} from '../../apis/CartAPICalls';
import {callCartDetailAPI} from '../../apis/CartAPICalls';

import {decodeJwt} from '../../utils/tokenUtils';

export default function Cart() {

    
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector(state => state.cartReducer);
    
    const [isOrdered, setIsOrdered] = useState(false);
    
    // console.log("토큰 확인", token);

    useEffect(
        () => {
            dispatch(callCartDetailAPI({	
                memberId: token.sub
            }));            
        }
        ,[]
    );

    const orderSubmitHandler = () => {
        setIsOrdered(!isOrdered);
    }

    /* 뒤로 가기 이벤트 발생 시 */
    const location = useLocation();
    window.onpopstate = function(event) {
        var previewPage = document.referrer;
        // console.log("이전 페이지로 이동");
        // console.log("previewPage", previewPage);
        // console.log("dsasad", previewPage.indexOf(`/cart/${token.sub}`));
        if(previewPage.indexOf(`/cart/${token.sub}`) < 0) {
            location.href = `/cart/${token.sub}`;
            window.location.reload();
        } else {
            location.href = `${previewPage}`;
            window.location.reload();
        }
    }

    /* props-drilling */
    const [orderInfo, setOrderInfo] = useState({
        deliveryMt: '',
        deliveryCp: '',
        cgNm: '',
        cgPh: '',
        cgAdsNum: '',
        cgAds: '',
        cgAdsDetail: '',
        paymentMt: '',
        orderPc: '',
        deliveryPc: '',
        totalPc: '',
    });

    return (
        <>
            {order.orderCode
            ?
            <div className={OrderDetailCSS.boxing}>
                {console.log("▶ OrderDetail ◀ rendering component")}
                <div className={OrderDetailCSS.content}>
                    <div className={OrderDetailCSS.left}>
                        {
                            isOrdered
                            ?
                            <>
                                <div className={OrderDetailCSS.leftTh}>
                                    <Consignee key={order.orderCode} order={order}/>
                                </div>
                                <div className={OrderDetailCSS.leftTh}>
                                    <Delivery key={order.orderCode} order={order}/>
                                </div>
                                <div>
                                    <Payment key={order.orderCode} order={order}/>
                                </div>
                            </>
                            : null

                        }
                        <div>
                            <OrderProduct key={order.orderCode} order={order} isOrdered={isOrdered}/>
                        </div>
                    </div>
                    <div className={OrderDetailCSS.right}>
                        <div>
                            <Bill key={order.orderCode} order={order}/>
                        </div>
                        {
                            isOrdered
                            ? <button className={BtnCSS.cartBtn}>결제</button>
                            : <button
                                className={BtnCSS.cartBtn}
                                onClick={orderSubmitHandler}
                              >
                                주문
                              </button>
                        }
                    </div>
                </div>
            </div>
            : <h1>장바구니에 상품이 없습니다.</h1>
            }
        </>
    )
}