import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {callAmountUpdateAPI} from '../../apis/CartAPICalls';
import {callItemDeleteAPI} from '../../apis/CartAPICalls';
import OrderDetailCSS from '../../pages/order/OrderDetail.module.css';

import {decodeJwt} from '../../utils/tokenUtils';

export default function OrderProduct({order : {orderProductList : product, ...etc}, isOrdered}) {

    /* 상품정보 여닫기 */
    const [toggle, setToggle] = useState(false);

    const onClickHandler = () => {
        setToggle(!toggle);
    };

    /* 장바구니일 경우 상품 수량 수정 및 삭제 */
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname.substring(1, 5);
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  

    const [modifyMode, setModifyMode] = useState({
        modifyMode: false,
        tagId: ''
    });

    const [changeValue, setChangeValue] = useState({
        opCode: 0,
        amount: 0
    });

    const amountChangeHandler = (p) => {
        // console.log("수정 누른 태그", p.opCode);
        setModifyMode({
            modifyMode: !modifyMode.modifyMode,
            tagId: p.opCode
        });
    };

    const valueChangeHandler = (e) => {
        // console.log("해당 옵션 코드", e.target.parentNode.parentNode.parentNode.id);
        // console.log("변경 옵션 수량", e.target.parentNode.children[0].value);
        setChangeValue({
            opCode: e.target.parentNode.parentNode.parentNode.id,
            amount: e.target.parentNode.children[0].value
        })
    }
    // console.log("changeValue", changeValue);

    const amountSubmitHandler = (e) => {
        const formData = new FormData();
        formData.append("opCode", changeValue.opCode);
        formData.append("amount", changeValue.amount);

        dispatch(callAmountUpdateAPI({
            memberId: token.sub,
            form: formData
        }))

        window.location.reload();
        alert("수량 수정이 완료되었습니다.");

    };

    const deleteHandler = (p) => {
        console.log("삭제할 상품의 정보 (PK)", p.orderPdNum);
        const isDelete = window.confirm(`${p.pdName}을(를) 장바구니에서 삭제하시겠습니까?`);
        if(isDelete) {
            dispatch(callItemDeleteAPI({
                memberId: token.sub,
                orderPdNum: p.orderPdNum
            }))
            
            window.location.reload();
            alert("상품 삭제가 완료되었습니다.");

        } else {
            alert("상품 삭제가 취소되었습니다.");
        }
    };
    
    return (
        <>
            <table className={OrderDetailCSS.orderProduct}>
                <thead>
                    <tr>
                        <th colSpan={5} onClick={onClickHandler}>
                            주문 제품 정보
                            <span style={{float: "right", paddingRight: "15px"}}>{!toggle? "-" : "+"}</span>
                        </th>
                    </tr>
                </thead>
                <thead style={!toggle ? null : {display: "none"}}>
                    <tr style={{fontWeight: "bold"}}>
                        <td colSpan="2">
                            상품 / 옵션 정보
                        </td>
                        <td>
                            수량
                        </td>
                        <td>
                            금액
                        </td>
                        <td>
                            합계
                        </td>
                    </tr>
                </thead>
                    {
                        Array.isArray(product)
                        && product.map((p) => (
                            <tbody key={p.orderPdNum} id={p.opCode} style={!toggle ? null : {display: "none"}}>
                                <tr rowSpan={2}>
                                    <td rowSpan={2} style={{width: "100px"}}>
                                        <img src={p.mainImgPath} width="100px" style={{display: "block"}}/>
                                    </td>
                                    <td style={{border: "none", width: "300px"}}>{p.pdName}</td>
                                    <td rowSpan={2}>
                                        {
                                            (modifyMode.modifyMode && modifyMode.tagId == p.opCode)
                                            ? 
                                            <input 
                                                type={'number'} 
                                                defaultValue={p.orderAmount} 
                                                style={{width: "80px"}}
                                                onChange={valueChangeHandler}
                                                id={p.opCode}
                                            />
                                            : 
                                            <>{p.orderAmount}</>
                                        }
                                        {
                                            // 주문내역이거나 주문 버튼을 누른 상태(true)
                                            (pathname != "cart" || isOrdered)
                                            ? 
                                            null 
                                            : 
                                            <><br/>
                                                {
                                                    (modifyMode.modifyMode && modifyMode.tagId == p.opCode)
                                                    ? <button onClick={amountSubmitHandler}>저장</button>
                                                    : <>
                                                        <button onClick={() => amountChangeHandler(p)}>수정</button>
                                                        <button onClick={() => deleteHandler(p)}>삭제</button>
                                                      </>
                                                }
                                            </>
                                        }
                                    </td>
                                    <td rowSpan={2}>{p.pdPc.toLocaleString('ko-KR')} 원</td>
                                    <td rowSpan={2}>{(p.orderAmount * p.pdPc).toLocaleString('ko-KR')} 원</td>
                                </tr>
                                <tr rowSpan={2}>
                                    <td>{p.opName}</td>
                                </tr>
                            </tbody>
                        ))
                    }
            </table>
        </>
    )
};