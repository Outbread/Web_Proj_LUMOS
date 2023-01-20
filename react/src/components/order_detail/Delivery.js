import {useDispatch} from 'react-redux';
import {useState} from 'react';

import {callDeliveryCpUpdateAPI} from '../../apis/OrderAPICalls';
import {deliveryNumCheck} from '../../modules/Validatior';

import BtnCSS from './Btn.module.css';

export default function Delivery({order}) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        deliveryCp : order.deliveryCp,
        deliveryNum : order.deliveryNum,
        deliveryEnd : order.deliveryEnd
    })
    
    const [modifyMode, setModifyMode] = useState(false);

    /* 배송 정보 수정 모드 */
    const onModifyModeHandler = () => {
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
    const onClickHandler = () => {
        if(!!deliveryNumCheck(form.deliveryNum)) {
            dispatch(callDeliveryCpUpdateAPI({
                orderCode: order.orderCode,
                form: form
            }));
            alert("배송 정보가 변경되었습니다.");
            window.location.reload();
        } else {
            alert("송장 번호 형식이 잘못되었습니다.");
        }
    }

    /* 배송 완료 처리 */
    // Thu Jan 19 2023 03:48:51 GMT+0900 (한국 표준시)
    // console.log(typeof(new Date().toISOString().substring(0, 19)));
    // console.log(new Date().toISOString().substring(0, 19));

    // const deliveryEndHandler = () => {
    //     console.log("aaaaaa", order.deliveryEnd == null);
    //     console.log(new Date());
    //     if(order.deliveryEnd ==  null) {
    //         setForm({
    //             ...form,
    //             ['deliveryEnd']: new Date()
    //         })

    //         const formData = new FormData();
    
    //         formData.append("deliveryCp", form.deliveryCp);
    //         formData.append("deliveryNum", form.deliveryNum);
    //         formData.append("deliveryEnd", form.deliveryEnd);

    //         dispatch(callDeliveryCpUpdateAPI({
    //             orderCode: order.orderCode,
    //             form: formData
    //         }));
    //     } else {
    //         alert("이미 배송완료 처리를 진행하였습니다.");
    //     }
    // }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>배송 정보</th>
                        <td>
                            {
                                (order.deliveryMt != "일반택배") 
                                ? <button className={BtnCSS.submitBtn}>배송완료</button>
                                : (modifyMode 
                                    ? <button className={BtnCSS.submitBtn} onClick={onClickHandler}>저장</button> 
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
                                                <option value={order.deliveryCp}>{order.deliveryCp}</option>
                                                {order.deliveryCp === "CJ대한통운" ? <option value="우체국택배">우체국택배</option> : <option value="CJ대한통운">CJ대한통운</option>}
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