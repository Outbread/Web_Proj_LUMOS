import {useSelector, useDispatch} from 'react-redux';
import {useState, useContext, useEffect} from 'react';

import {callHistoryUpdateAPI} from '../../apis/OrderAPICalls';
import {callOrderSearchAPI} from '../../apis/OrderAPICalls';

import SearchResult from '../../components/order/SearchResult';

import {dateCreatorToday} from '../../modules/Fommater';
import {dateCreatorWeek} from '../../modules/Fommater';
import {dateCreator1Month} from '../../modules/Fommater';
import {dateCreator3Months} from '../../modules/Fommater';
import {dateCreator6Months} from '../../modules/Fommater';
import OrderManagementCSS from './OrderManagement.module.css';

import {OrderContext} from '../../App';

export default function OrderManagement() {

    console.log("▶ OrderManagement ◀");

    const dispatch = useDispatch();

    const [modal, setModel] = useState(false);

    /* 체크박스 처리를 위한 context 활용 */
    const context = useContext(OrderContext);
    const {ckeckCode, setCheckCode} = context;

    /* 처리의 종류 (ex: 발주확인, 배송완료처리...) */
    const [updateKind, setUpdateKind] = useState({
        updateKind: '1'
    });

    /* 처리 버튼 클릭 시 */
    // 버튼 활성화 여부
    const [isAbled, setIsAbled] = useState(false);

    // 백단에 전달할 값 세팅 및 SearchResult의 useEffect 작동
    const updatekindHandler = (e) => {
        setUpdateKind({
            ['updateKind']: e.target.name
        });
    };

    /* 확인 버튼 클릭 시 */
    const dateInsertHandler = () => {
        const formData = new FormData();
        formData.append("updateKind", updateKind.updateKind);

        ckeckCode.forEach(element => {
            dispatch(callHistoryUpdateAPI({
                orderCode: element,
                form: formData
            }));
        })
        
        alert("처리가 완료되었습니다.");
        window.location.reload();
    }

    /* ========================= SearchHead Component ========================= */
    const searchOrderList  = useSelector(state => state.orderReducer);  

    const [search, setSearch] = useState({
        searchDate: '',
        searchTitle: '주문번호',
        searchValue: ''
    })

    const [isEffectWork, setIsEffectWork] = useState(false);

    const dateHandler = (e) => {
        console.log("e.target.innerText", e.target.innerText);
        let endDate = new Date();

        switch(e.target.innerText) {
            case "오늘" :
                endDate = dateCreatorToday();
                break;
            case "1주일" :
                endDate = dateCreatorWeek();
                break;
            case "1개월" :
                endDate = dateCreator1Month();
                break;
            case "3개월" :
                endDate = dateCreator3Months();
                break;
            case "6개월" :
                endDate = dateCreator6Months();
                break;
        }
        setSearch({
            ...search,
            ['searchDate']: endDate
        })
    };

    const searchHandler = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    };

    const onEnterkeyHandler = (e) => {
        if(e.key == 'Enter') {
            submitHandler();
        }
    };

    const submitHandler = () => {
        setIsEffectWork(!isEffectWork);
    };
    
    useEffect(
        () => {
            if(search.searchDate.length != 0 && search.searchTitle.length != 0 && search.searchValue.length != 0) {
                dispatch(callOrderSearchAPI({
                    searchDate: search.searchDate,
                    searchTitle: search.searchTitle,
                    searchValue: search.searchValue
                }));
                // alert(`${searchOrderList?.length}건의 검색결과가 있습니다.`);
            } else if(search.searchDate.length != 0 && search.searchValue.length == 0) {
                const isGood = window.confirm("기간으로만 조회하시겠습니까?");
                if(isGood == true) {
                    dispatch(callOrderSearchAPI({
                        searchDate: search.searchDate,
                        searchTitle: 'non',
                        searchValue: 'non'
                    }));
                    // alert(`${searchOrderList?.length}건의 검색결과가 있습니다.`);
                } else {
                    alert("검색어를 마저 입력해주세요.")
                }
            } else {
                alert("검색을 원하실 경우 날짜를 선택해주세요.")
            }
        },
        [isEffectWork]
    )

    /* 위의 useEffect에 함께 할 경우 처음에 undefined로 출력되어 따로 동작하도록 함 */
    useEffect(
        () => {
            if(searchOrderList.length != undefined) alert(`${searchOrderList?.length}건의 검색결과가 있습니다.`);
        }, [searchOrderList]
    )

    return (
        <>
            <div className={OrderManagementCSS.searchHead}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>전체 주문 조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{fontWeight: "bold", width: "220px"}}>조회 기간 (주문일)</td>
                            <td>
                                <button onClick={dateHandler}><span>오늘</span></button>
                                <button onClick={dateHandler}><span>1주일</span></button>
                                <button onClick={dateHandler}><span>1개월</span></button>
                                <button onClick={dateHandler}><span>3개월</span></button>
                                <button onClick={dateHandler}><span>6개월</span></button>
                            </td>
                            <td>
                                <input type="date" style={{width: "200px"}} defaultValue={search.searchDate}></input>
                                <span>  ~  </span>
                                <input type="date" style={{width: "200px"}} defaultValue={dateCreatorToday()}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="searchTitle" onChange={searchHandler} style={{width: "180px"}}>
                                    <option vlaue="주문번호">주문번호</option>
                                    <option vlaue="구매자명">구매자명</option>
                                    <option vlaue="구매자ID">구매자ID</option>
                                    <option vlaue="수취인명">수취인명</option>
                                    <option vlaue="결제방법">결제방법</option>
                                    <option vlaue="배송방법">배송방법</option>
                                </select>
                            </td>
                            <td>
                                {
                                    search.searchTitle == "결제방법"
                                    ?   <select name="searchValue" onChange={searchHandler} style={{width: "430px"}}>
                                            <option value="default">결제방법을 선택해 주세요</option>
                                            <option value="무통장입금">무통장입금</option>
                                            <option value="카카오페이">카카오페이</option>
                                        </select>
                                    :   (
                                        search.searchTitle == "배송방법"
                                        ?   <select name="searchValue" onChange={searchHandler} style={{width: "430px"}}>
                                                <option value="default">배송방법을 선택해 주세요</option>
                                                <option value="일반택배">일반택배</option>
                                                <option value="방문수령">방문수령</option>
                                                <option value="퀵">퀵</option>
                                            </select>
                                        :   <input 
                                                type="text" 
                                                name="searchValue"
                                                placeholder="검색" 
                                                onKeyUp={onEnterkeyHandler}
                                                onChange={searchHandler}
                                            />
                                    )
                                }
                            </td>
                            <td>
                                <button onClick={submitHandler}>검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table className={OrderManagementCSS.bottom}>
                <thead>
                    <tr>
                        {
                            (!isAbled)
                            ?
                                <>
                                <td><button onClick={updatekindHandler} name="발주확인">발주확인</button></td>
                                <td><button onClick={updatekindHandler} name="송장번호입력">송장번호입력</button></td>
                                <td><button onClick={updatekindHandler} name="배송출발처리">배송출발처리</button></td>
                                <td><button onClick={updatekindHandler} name="배송완료처리">배송완료처리</button></td>
                                <td><button onClick={updatekindHandler} name="주문취소처리">주문취소처리</button></td>
                                <td><button onClick={updatekindHandler} name="반품접수">반품접수</button></td>
                                <td><button onClick={updatekindHandler} name="반품완료처리">반품완료처리</button></td>
                                </>
                            : null
                        }
                        {
                            isAbled
                            ?   <td>
                                    <button onClick={() => window.location.reload()} name="돌아가기">돌아가기</button>
                                    <button onClick={dateInsertHandler} name="확인">확인</button>
                                </td>
                            : null
                        }
                    </tr>
                </thead>
            </table>
            <div>
                <SearchResult updateKind={updateKind} isAbled={isAbled} setIsAbled={setIsAbled} searchOrderList={searchOrderList}/>
            </div>
        </>
    )
}