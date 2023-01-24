// // import {useNavigate} from 'react-router-dom';
// import {useDispatch} from 'react-redux';
// import {useEffect, useState} from 'react';

// import {callOrderSearchAPI} from '../../apis/OrderAPICalls';

// import {dateCreatorToday} from '../../modules/Fommater';
// import {dateCreatorWeek} from '../../modules/Fommater';
// import {dateCreator1Month} from '../../modules/Fommater';
// import {dateCreator3Months} from '../../modules/Fommater';
// import {dateCreator6Months} from '../../modules/Fommater';

// export default function SearchHead() {

//     // const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [search, setSearch] = useState({
//         searchDate: '',
//         searchTitle: '주문번호',
//         searchValue: ''
//     })

//     const dateHandler = (e) => {
//         console.log("e.target.innerText", e.target.innerText);
//         let endDate = new Date();
//         // e.target.style['color'] = "rgba(115, 206, 190, 0.7)";

//         switch(e.target.innerText) {
//             case "오늘" :
//                 endDate = dateCreatorToday();
//                 break;
//             case "1주일" :
//                 endDate = dateCreatorWeek();
//                 break;
//             case "1개월" :
//                 endDate = dateCreator1Month();
//                 break;
//             case "3개월" :
//                 endDate = dateCreator3Months();
//                 break;
//             case "6개월" :
//                 endDate = dateCreator6Months();
//                 break;
//         }
//         setSearch({
//             ...search,
//             ['searchDate']: endDate
//         })
//     };

//     const searchHandler = (e) => {
//         setSearch({
//             ...search,
//             [e.target.name]: e.target.value
//         })
//     };

//     const onEnterkeyHandler = (e) => {
//         if(e.key == 'Enter') {
//             submitHandler();
//         }
//     };

//     const submitHandler = () => {
//         if(search.searchDate.length != 0 && search.searchTitle.length != 0 && search.searchValue.length != 0) {
//             // navigate(`/order-management/search?s1=${search.searchDate}&s1=${search.searchTitle}&s1=${search.searchValue}`, { replace: false });
//             dispatch(callOrderSearchAPI({
//                 searchDate: search.searchDate,
//                 searchTitle: search.searchTitle,
//                 searchValue: search.searchValue
//             }));
//         } else if(search.searchDate.length != 0 && search.searchValue.length == 0) {
//             const isGood = window.confirm("기간으로만 조회하시겠습니까?");
//             if(isGood == true) {
//                 // navigate(`/order-management/search?s1=${search.searchDate}&s1=${search.searchTitle}&s1=${search.searchValue}`, { replace: false });
//                 dispatch(callOrderSearchAPI({
//                     searchDate: search.searchDate,
//                     searchTitle: 'non',
//                     searchValue: 'non'
//                 }));
//             } else {
//                 alert("검색어를 입력해주세요.")
//             }
//         } else {
//             alert("날짜를 선택해주세요.")
//         }
//     };

//     return (
//         <>
//             <table>
//                 <thead>
//                     <tr>
//                         <th colSpan={3}>전체 주문 조회</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td style={{fontWeight: "bold", width: "220px"}}>조회 기간 (주문일)</td>
//                         <td>
//                             <button onClick={dateHandler}><span>오늘</span></button>
//                             <button onClick={dateHandler}><span>1주일</span></button>
//                             <button onClick={dateHandler}><span>1개월</span></button>
//                             <button onClick={dateHandler}><span>3개월</span></button>
//                             <button onClick={dateHandler}><span>6개월</span></button>
//                         </td>
//                         <td>
//                             <input type="date" style={{width: "200px"}} defaultValue={search.searchDate}></input>
//                             <span>  ~  </span>
//                             <input type="date" style={{width: "200px"}} defaultValue={dateCreatorToday()}></input>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>
//                             <select name="searchTitle" onChange={searchHandler} style={{width: "180px"}}>
//                                 <option vlaue="주문번호">주문번호</option>
//                                 <option vlaue="구매자명">구매자명</option>
//                                 <option vlaue="구매자ID">구매자ID</option>
//                                 <option vlaue="수취인명">수취인명</option>
//                                 <option vlaue="결제방법">결제방법</option>
//                                 <option vlaue="배송방법">배송방법</option>
//                             </select>
//                         </td>
//                         <td>
//                             {
//                                 search.searchTitle == "결제방법"
//                                 ?   <select name="searchValue" onChange={searchHandler} style={{width: "430px"}}>
//                                         <option value="default">결제방법을 선택해 주세요</option>
//                                         <option value="무통장입금">무통장입금</option>
//                                         <option value="카카오페이">카카오페이</option>
//                                     </select>
//                                 :   (
//                                     search.searchTitle == "배송방법"
//                                     ?   <select name="searchValue" onChange={searchHandler} style={{width: "430px"}}>
//                                             <option value="default">배송방법을 선택해 주세요</option>
//                                             <option value="일반택배">일반택배</option>
//                                             <option value="방문수령">방문수령</option>
//                                             <option value="퀵">퀵</option>
//                                         </select>
//                                     :   <input 
//                                             type="text" 
//                                             name="searchValue"
//                                             placeholder="검색" 
//                                             onKeyUp={onEnterkeyHandler}
//                                             onChange={searchHandler}
//                                         />
//                                 )
//                             }
//                         </td>
//                         <td>
//                             <button onClick={submitHandler}>검색</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </>
//     )
// }