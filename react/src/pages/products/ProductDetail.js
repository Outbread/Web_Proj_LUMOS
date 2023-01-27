import ProductDetailCSS from './ProductDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {callPostItemAPI} from '../../apis/CartAPICalls';

import {
    callProductDetailAPI
} from '../../apis/ProductAPICalls';
import LoginModal from '../../components/common/LoginModal';

function ProductDetail() {    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const product  = useSelector(state => state.productReducer);

    // const [amount, setAmount] = useState(1);
    const [loginModal, setLoginModal] = useState(false);
   
    console.log('product : ' , product);
    console.log('params :  ', params);

    useEffect(
        () => {
            dispatch(callProductDetailAPI({	// 상품 상세 정보 조회
                productCode: params.productCode
            }));
        }
        ,[]
    );
    
    const {pdCode, pdDesc, pdName, pdPrice, productImage, productOption} = product;
    
    console.log('productImage : ' , typeof(product));     
    
    //////////////////////////////[ ↓ 구도연 ↓ ]//////////////////////////////
    // dispatch에 담을 state
    // const mainImgDiv = document.getElementById("mainImg");
    // const mainImgPath = mainImgDiv?.children[0]?.src;
    // console.log("옵션 코드 초기값 설정", productOption);
    // console.log("옵션 코드 초기값 설정", Array.isArray(productOption) ? productOption[0]?.opCode : "default");
    // console.log("옵션명 초기값 설정", productOption[0]?.optionNm);

    const[orderProductDTO, setOrderProductDTO] = useState({
        orderAmount : 1,
        orderNum : 'default' ,
        mainImgPath : '',
        pdCode : '',
        opCode : '',
        pdName : '',
        opName : '',
        pdPc : ''
    })
    
    // dispatch 이후 동작시키기 위해 분리
    useEffect(
        () => {
            setOrderProductDTO({
                orderAmount : 1,
                orderNum : 0,
                pdCode : product.pdCode,
                opCode : Array.isArray(productOption) ? productOption[0]?.opCode : 0,
                pdPc : product.pdPrice,

                /* 화면단에 노출된 값으로 저장하는 방법 (옵션은 첫번째 노출된 0번째 선택 | 조원이 id를 CSS로 선점해서 children 사용) */
                // mainImgPath : document.getElementById("mainImg")?.children[0]?.src.split('/').slice(-1),
                // pdName : product.pdName,
                // opName : document.getElementById("seletTag")?.value,

                /* 디비에서 긁어온 값으로 저장하는 방법 (옵션은 첫번째 노출된 0번째 선택) */
                mainImgPath : productImage?.filter(img => img.mainImg == "Y")[0]?.pdImgPath.split('/').slice(-1),
                pdName : product.pdName,
                opName : Array.isArray(productOption) ? productOption[0]?.optionNm : 0,

                /* 테스트용 값 (jpa가 매핑을 잘 하는지 확인 가능 cartService 201~203행) */
                // mainImgPath : "willSetInJpa",
                // pdName : "willSetInJpa",
                // opName : "willSetInJpa",
            })
        }
        ,[product]
    );

    const optionSelectHandler = (e) => {
        const optionsArr = Array.from(document.querySelectorAll("#seletTag")[0]);
        const seletedOp = optionsArr.filter(option => {
            return option.selected == true;
        })
        // console.log("seletedOp 선택된 옵션은?", seletedOp);
        // console.log("seletedOp 선택된 옵션의 옵션코드는?", seletedOp[0].id);
        // console.log("seletedOp 선택된 옵션의 옵션명은?", seletedOp[0].value);
        setOrderProductDTO({
            ...orderProductDTO,
            opCode: seletedOp[0].id,
            opName: seletedOp[0].value
        });
    };

    const onChangeAmountHandler = (e) => {
        console.log("왜안바뀌니?", e.target.value);
        setOrderProductDTO({
            ...orderProductDTO,
            orderAmount: e.target.value
        });
    };

    //////////////////////////////[ ↑ 구도연 ↑ ]//////////////////////////////

    const onClickReviewHandler = () => {
        navigate(`/review/${params.pdCode}`, { replace: false });
    };

    const onClickPurchaseHandler = () => {

        /* 로그인 상태인지 확인 */
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[onClickPurchaseHandler] token : ', token);

        if(token === undefined || token === null) {
            alert('로그인을 먼저해주세요');
            setLoginModal(true);
            return;
        }

        /* 토큰이 만료되었을때 다시 로그인 */
        if (token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return;
        }

        /* 구매 가능 수량 확인 */
        // if(amount > product.productStock) {
        //     alert('구매 가능 수량을 확인해주세요');
        //     return;
        // }

        //////////////////////////////[ ↓ 구도연 ↓ ]//////////////////////////////
        // 장바구니 버튼 클릭 시 api 호출 및 이동
        const formData = new FormData();
        formData.append("orderAmount", orderProductDTO.orderAmount);
        formData.append("orderNum", orderProductDTO.orderNum);
        formData.append("mainImgPath", orderProductDTO.mainImgPath);
        formData.append("pdCode", orderProductDTO.pdCode);
        formData.append("opCode", orderProductDTO.opCode);
        formData.append("pdName", orderProductDTO.pdName);
        formData.append("opName", orderProductDTO.opName);
        formData.append("pdPc", orderProductDTO.pdPc);

        dispatch(callPostItemAPI({
            memberId: token.sub,
            form: formData
        }))
        console.log("asdasdas", orderProductDTO);
        const moveCart = window.confirm("장바구니에 상품이 담겼습니다.\n장바구니로 이동하시겠습니까?")
        if(moveCart) navigate(`/cart/${token.sub}`, { replace: false });
        // else window.location.reload();
        //////////////////////////////[ ↑ 구도연 ↑ ]//////////////////////////////
    }

    return (
        <div>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div className={ ProductDetailCSS.DetailDiv }>
                <div className={ProductDetailCSS.imageReview}>
                    <div className={ProductDetailCSS.imageView}>
                        <div className={ ProductDetailCSS.imgDiv } id="mainImg">
                            {/* <img src={(product.mainImg == 'Y') ? product.pdImgPath : null } alt="테스트" /> */}
                            { 
                                productImage?.map(pd => (pd.mainImg === 'Y') ? 
                                <img id={ProductDetailCSS.main} src={pd.pdImgPath} alt='mainImage' key={pd.imgNum}/> : 
                                null)
                            }
                        </div>
                        <div className={ ProductDetailCSS.thumbnail }>
                            { 
                                productImage?.map(pd => (pd.mainImg === 'N') ? 
                                <img src={pd.pdImgPath} alt='thumbnail' key={pd.imgNum}/> : 
                                null)
                            }
                        </div>
                    </div>
                        <button
                            className={ ProductDetailCSS.reviewBtn }
                            onClick={ onClickReviewHandler }
                        >
                            리뷰보기
                        </button>
                </div>
                <div className={ ProductDetailCSS.descriptionDiv }>
                    <table className={ ProductDetailCSS.descriptionTable}>
                        <tbody>
                            <tr>
                                <th>상품 코드</th>    
                                <td>{ pdCode || '' }</td>
                            </tr>
                            <tr>
                                <th>상품명</th>    
                                <td>{ pdName || '' }</td>
                            </tr>    
                            <tr>
                                <th>상품 가격</th>    
                                <td>{ pdPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''} 원</td>
                            </tr>    
                            <tr>
                                <th>상품 설명</th>    
                                <td>{ pdDesc || '' }</td>
                            </tr>    
                            <tr>
                                <th>옵션 별 구매 가능 수량</th>
                                <td>
                                { 
                                    <select onChange={optionSelectHandler} id="seletTag">
                                        {productOption?.map(res =>
                                            <option value={res.optionNm + res.optionStock} id={res.opCode} key={res.opCode}>
                                                {res.optionNm + res.optionStock}
                                            </option>
                                        )}
                                    </select>
                                }
                                </td>    
                            </tr>
                            <tr>
                                <th>구매 수량</th>    
                                <td>
                                    <input 
                                        type='number'
                                        defaultValue={1}
                                        onChange = { onChangeAmountHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>                            
                                <td colSpan={ 2 }>
                                    <button
                                        className={ ProductDetailCSS.productBuyBtn }
                                        onClick= { onClickPurchaseHandler }
                                    >
                                        장바구니담기
                                    </button>
                                </td>
                            </tr>    
                        </tbody>                    
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;