/* 날짜 형식 변환 (yyyy-MM-dd) */
export function dateFomatterlight(value) {
    return value.substring(0, 10);
}

/* 날짜 형식 변환 (yyyy-MM-dd hh:mm:ss) */
export function dateFomatter(value) {
    // ex : 2023-01-16T15:00:00.000+00:00 -> 2023-01-16 15:00:00
    return value.replace('T', ' ').replace(/\..*/, '');
}

/* [작성 중] 날짜 생성기 */
export function dateCreator(value) {
    // Thu Jan 19 2023 03:48:51 GMT+0900 (한국 표준시)
    // 2023-01-18T18:55:48.758Z
    const now = new Date().toISOString();
    const nowOracle = now.substring(0, 19);
    // 'YYYY-MM-DD HH24:MI:SS'
}

/* 주문자 휴대폰 번호 & 구매자 휴대폰 번호 */
export function phoneFomatter(value) {
    return value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

    // const {
    //     orderNum, orderCode, orderDate, orderConf,
    //     cgNm, cgPh, cgAdsNum, cgAds, cgAdsDetail,
    //     deliveryMt, deliveryCp, deliveryNum, deliveryStart, deliveryEnd, deliveryMsg, 
    //     paymentMt, orderPc, deliveryPc, totalPc,  
    //     stOrder,  stClaim, stPayment, purchaseConf,
    //     memberCode : memberInfo, orderProductList : orderProductListInfo
    // } = order;

    // const {
    //     memberCode, memberId, memberName, memberBirth, memberGen, memberPhone, memberEmail,
    //     memberAdsNum, memberAds, memberAdsDetail
    // } = memberInfo;

    // const {
    //     orderPdNum, orderNumCopy, pdCode, opCode, orderAmount, mainImgPath
    // } = orderProductListInfo;