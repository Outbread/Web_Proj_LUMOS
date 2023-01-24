import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useState} from 'react';

import {callDeliveryCpUpdateAPI} from '../../apis/OrderAPICalls';
import {callHistoryUpdateAPI} from '../../apis/OrderAPICalls';
import {deliveryNumCheck} from '../../modules/Validatior';

import BtnCSS from './Btn.module.css';

export default function Delivery({order}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        deliveryCp : order.deliveryCp,
        deliveryNum : order.deliveryNum
    })
    
    const [modifyMode, setModifyMode] = useState(false);

    /* 배송 정보 수정 모드 */
    const onModifyModeHandler = () => {
        alert("수정내역을 반영하시려면 저장버튼을 눌러주세요.")
        setModifyMode(true);
    }

    /* 수정 정보 */
    const onChangeHandler = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(form);
    }

    /* 배송 정보 수정 내역 업데이트 */
    const onSubmitHandler = () => {
        const formData = new FormData();
        formData.append("deliveryCp", form.deliveryCp);
        formData.append("deliveryNum", form.deliveryNum);

        if(!!deliveryNumCheck(form.deliveryNum) && form.deliveryCp != null && order.orderConf != null) {
            dispatch(callDeliveryCpUpdateAPI({
                orderCode: order.orderCode,
                form: formData
            }));
            if(order.deliveryStart != null) {
                alert("배송 정보가 변경되었습니다.");
            } else {
                const formData = new FormData();
                formData.append("updateKind", "배송출발처리");
                dispatch(callHistoryUpdateAPI({
                    orderCode: order.orderCode,
                    form: formData
                }));
                alert("배송출발 처리되었습니다.");
            }
            window.location.reload();
        } else if(!!deliveryNumCheck(form.deliveryNum) && form.deliveryCp == null && order.orderConf != null) {
            alert("택배사를 선택해 주세요.")
        } else if(order.orderConf == null) {
            alert("발주 확인처리를 먼저 진행해주세요.");
            navigate(`/order-management/`, { replace: false });
        } else {
            alert("송장 번호 형식이 잘못되었습니다.");
        }
    }
    
    const deliveryEndHandler = () => {
        const formData = new FormData();
        formData.append("updateKind", "배송완료처리");
        dispatch(callHistoryUpdateAPI({
            orderCode: order.orderCode,
            form: formData
        }));
        alert("처리가 완료되었습니다.");
        window.location.reload();
    }

    const deliveryStartHandler = () => {
        const formData = new FormData();
        formData.append("updateKind", "배송출발처리");
        dispatch(callHistoryUpdateAPI({
            orderCode: order.orderCode,
            form: formData
        }));
        alert("처리가 완료되었습니다.");
        window.location.reload();
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>배송 정보</th>
                        <td>
                            {
                                (order.deliveryMt != "일반택배") 
                                ? (order.deliveryStart
                                    ? (
                                        order.deliveryEnd
                                        ? null
                                        : <button className={BtnCSS.submitBtn} onClick={deliveryEndHandler}>배송완료</button>
                                    )
                                    : <button className={BtnCSS.submitBtn} onClick={deliveryStartHandler}>배송출발</button>
                                )
                                : (modifyMode 
                                    ? <button className={BtnCSS.submitBtn} onClick={onSubmitHandler}>저장</button> 
                                    : <button className={BtnCSS.submitBtn} onClick={onModifyModeHandler}>수정</button>
                                )
                            }
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>배송 방법</th>
                        <td>{order.deliveryMt}</td>
                    </tr>
                    <tr>
                        <th>택배사</th>
                        <td>
                            {(() => {
                                if(order.deliveryMt === "일반택배") {
                                    return <select name="deliveryCp" onChange={onChangeHandler} disabled={modifyMode? false : true}>
                                                {
                                                    order.deliveryCp
                                                    ? (
                                                        order.deliveryCp == "CJ대한통운" ?
                                                        <>
                                                        <option value={order.deliveryCp}>{order.deliveryCp}</option>
                                                        <option value="우체국택배">우체국택배</option>
                                                        </>
                                                        : 
                                                        <>
                                                        <option value={order.deliveryCp}>{order.deliveryCp}</option>
                                                        <option value="CJ대한통운">CJ대한통운</option>
                                                        </>
                                                    )
                                                    : 
                                                    <>
                                                    <option value="default">택배사를 선택해주세요</option>
                                                    <option value="CJ대한통운">CJ대한통운</option>
                                                    <option value="우체국택배">우체국택배</option>
                                                    </>
                                                }
                                           </select>
                                } else {
                                    return "-"
                                }
                            })()}
                        </td>
                    </tr>
                    <tr>
                        <th>송장번호</th>
                        <td>
                            {(() => {
                                if(order.deliveryMt === "일반택배" && !order.deliveryNum) {
                                    return <input 
                                                type="text"
                                                name="deliveryNum" 
                                                placeholder="송장번호를 입력해 주세요"
                                                onChange={onChangeHandler}/>
                                } else if(order.deliveryMt === "일반택배" && !!order.deliveryNum) {
                                    return <input 
                                                name="deliveryNum" 
                                                placeholder={order.deliveryNum}
                                                onChange={onChangeHandler}
                                                disabled={modifyMode? false : true}/>
                                } else {
                                    return "-"
                                }
                            })()}
                        </td>
                    </tr>
                    <tr>
                        <th>배송 메시지</th>
                        <td>{order.deliveryMsg}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};