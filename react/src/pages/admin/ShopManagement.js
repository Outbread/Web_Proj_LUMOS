import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {
    callCompanyInfoAPI, callShopInfolAPI,
    callCompanyInfoUpdateAPI, callShopInfoUpdateAPI
} from '../../apis/ShopManagementAPICalls';

import ShopManagementCSS from './ShopManagement.module.css';

import {bsrNumFomatter, cpTelFomatter, picTelFomatter, phoneFomatter} from '../../modules/Fommater';
import {useDaumPostcodePopup} from "react-daum-postcode";

export default function ShopManagement() {

    const dispatch = useDispatch();
    const companyInfo  = useSelector(state => state.companyReducer);  
    const shopInfo  = useSelector(state => state.shopReducer);  
    const [company, setCompany] = useState({});
    const [shop, setShop] = useState({});

    useEffect(
        () => {
            dispatch(callCompanyInfoAPI({}));            
            dispatch(callShopInfolAPI({}));
        }
        ,[]
    );

    useEffect(
        () => {
            setCompany({
                bsrNum: companyInfo.bsrNum,
                cpNm: companyInfo.cpNm,
                rpNm: companyInfo.rpNm,
                cpTel: companyInfo.cpTel,
                bsType: companyInfo.bsType,
                bsItem: companyInfo.bsItem,
                cpAdsNum: companyInfo.cpAdsNum,
                cpAds: companyInfo.cpAds,
                cpAdsDetail: companyInfo.cpAdsDetail,
                cpEmail: companyInfo.cpEmail
            })
        }
        ,[companyInfo]
    );

    const companyInfoHandler = (e) => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        })
    };

    const shopInfoHandler = () => {

    }

    const addressAPI = () => {
        open({onComplete: completeHandler, left: 500, top: 150, popupTitle: "LUMOS 주소 검색" , theme: {bgColor: "#B9E7DF"}});
    };

    const CURRENT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(CURRENT_URL);

    const completeHandler = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setCompany({
            ...company,
            cpAdsNum: data.zonecode,
            cpAds: fullAddress,
            cpAdsDetail: ''
        })

        document.getElementById("cpAdsDetail").focus();
    };

    const submitHandler = (e) => {
        if(e.target.id == "company") {
            console.log("변경된 사업자 정보", company);
            const companyFormData = new FormData();
            companyFormData.append("bsrNum", company.bsrNum);
            companyFormData.append("cpNm", company.cpNm);
            companyFormData.append("rpNm", company.rpNm);
            companyFormData.append("cpTel", company.cpTel);
            companyFormData.append("bsType", company.bsType);
            companyFormData.append("bsItem", company.bsItem);
            companyFormData.append("cpAdsNum", company.cpAdsNum);
            companyFormData.append("cpAds", company.cpAds);
            companyFormData.append("cpAdsDetail", company.cpAdsDetail);
            companyFormData.append("cpEmail", company.cpEmail);
            dispatch(callCompanyInfoUpdateAPI({form: companyFormData}));
            alert("사업자 정보가 변경되었습니다.");
            window.location.reload();
        }
        // if(e.target.id == "shop")
    }

    return (
        <>
            <div className={ShopManagementCSS.boxing}>
            <div className={ShopManagementCSS.info}>
            <table>
                <thead>
                    <tr>
                        <th style={{backgroundColor: "white"}}>사업자 정보</th>
                        <td style={{textAlign: "right"}}>
                            <button onClick={submitHandler} id="company">저장</button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>사업자 등록 번호</th>
                        <td>{companyInfo && bsrNumFomatter(companyInfo.bsrNum)}</td>
                    </tr>
                    <tr>
                        <th>상호</th>
                        <td>
                            <input 
                                type={'text'}
                                defaultValue={company.cpNm} 
                                onChange={companyInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>대표자 성명</th>
                        <td>
                            <input 
                                type={'text'}
                                defaultValue={company.rpNm} 
                                onChange={companyInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>업태</th>
                        <td>
                            <input 
                                type={'text'}
                                defaultValue={company.bsType} 
                                onChange={companyInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>종목</th>
                        <td>
                            <input 
                                type={'text'}
                                name="bsItem"
                                defaultValue={company.bsItem} 
                                onChange={companyInfoHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>사업장 주소</th>
                        <td>
                            <input 
                                type={'text'}
                                name="cpAdsNum" 
                                id="cpAdsNum"
                                onChange={companyInfoHandler}
                                style={{width: "130px"}}
                                defaultValue={company.cpAdsNum}
                                placeholder="우편번호"
                                disabled
                            ></input>&nbsp;&nbsp;&nbsp;
                            <button onClick={addressAPI}>검색</button>
                            <br/>
                            <input 
                                type={'text'}
                                name="cpAds" 
                                id="cpAds"
                                onChange={companyInfoHandler} 
                                defaultValue={company.cpAds}
                                placeholder="주소"
                                disabled
                            ></input>&nbsp;&nbsp;&nbsp;
                            <input 
                                type={'text'}
                                name="cpAdsDetail" 
                                id="cpAdsDetail"
                                onChange={companyInfoHandler}
                                defaultValue={company.cpAdsDetail}
                                placeholder="상세주소"
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>대표 전화</th>
                        <td>
                            <input 
                                name="cpTel"
                                type={'tel'} 
                                // value로 작성 시 '-' 실시간 반영
                                value={cpTelFomatter(company.cpTel) ?? ''}
                                onChange={companyInfoHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <input 
                                name="cpEmail"
                                type={'email'}
                                value={company.cpEmail ?? ''} 
                                onChange={companyInfoHandler}
                            ></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className={ShopManagementCSS.info}>
            <table>
                <thead>
                    <tr>
                        <th style={{backgroundColor: "white"}}>쇼핑몰 정보</th>
                        <td style={{textAlign: "right"}}>
                            <button onClick={submitHandler} id="shop">저장</button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>쇼핑몰명</th>
                        <td>{shopInfo.shopNm}</td>
                    </tr>
                    <tr>
                        <th>쇼핑몰 주소</th>
                        <td>
                            <input 
                                name="shopWebAds"
                                type={'text'}
                                defaultValue={shopInfo.shopWebAds} 
                                onChange={shopInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>쇼핑몰 이메일</th>
                        <td>
                            <input 
                                name="shopEmail"
                                type={'email'}
                                defaultValue={shopInfo.shopEmail} 
                                onChange={shopInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>쇼핑몰 소개</th>
                        <td>
                            <input
                                name="shopDesc"
                                type={'text'}
                                defaultValue={shopInfo.shopDesc} 
                                onChange={shopInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>고객센터 번호</th>
                        <td>
                            <input
                                name="csTel"
                                type={'tel'} 
                                value={picTelFomatter(shopInfo.csTel) ?? ''} 
                                onChange={shopInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>고객센터 이메일</th>
                        <td>
                            <input 
                                name="shopNm"
                                type={'email'}
                                defaultValue={shopInfo.shopNm} 
                                onChange={shopInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>고객센터 운영시간</th>
                        <td>
                            <textarea
                                name="csHour"
                                defaultValue={shopInfo.csHour} 
                                onChange={shopInfoHandler}
                                style={{display: "flex"}}
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>개인정보보호 책임자</th>
                        <td>
                            <input 
                                name="picNm"
                                type={'text'}
                                defaultValue={shopInfo.picNm} 
                                onChange={shopInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>개인정보보호 책임자 연락처</th>
                        <td>
                            <input 
                                name="picTel"
                                type={'text'}
                                defaultValue={phoneFomatter(shopInfo.picTel)}
                                onChange={shopInfoHandler}/>                        
                        </td>
                    </tr>
                    <tr>
                        <th>개인정보보호 책임자 이메일</th>
                        <td>
                            <input 
                                name="picEmail"
                                type={'email'}
                                defaultValue={shopInfo.picEmail} 
                                onChange={shopInfoHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <th>통신판매업 신고여부</th>
                        <td>
                            <select
                                name="omSt"
                                onChange={shopInfoHandler}
                            >
                                <option
                                    type={'radio'}
                                    defaultValue={shopInfo.omSt} 
                                >{shopInfo.omSt}</option>
                                <option
                                    type={'radio'}
                                    defaultValue={shopInfo.omSt == "신고함" ? "신고안함" : "신고함"}
                                >{shopInfo.omSt == "신고함" ? "신고안함" : "신고함"}</option>
                            </select>                               
                        </td>
                    </tr>
                    <tr>
                        <th>통신판매신고 번호</th>
                        <td>
                            <input 
                                name="omNum"
                                type={'text'}
                                defaultValue={shopInfo.omNum} 
                                onChange={shopInfoHandler}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>
        </>
    )
}