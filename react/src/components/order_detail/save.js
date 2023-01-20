if(e.target.name === "발주확인") {
    if(order.orderConf == null) {
        setUpdateKind({updateKind: e.target.name});
        console.log("updateKind", updateKind);
        dispatch(callHistoryUpdateAPI({
            orderCode: order.orderCode,
            form: updateKind
        }));
        alert("발주 확인 처리가 되었습니다.")
    } else {
        alert('이미 발주확인을 하였습니다.')
    }
} else if(e.target.name === "송장번호입력/수정") {
    if(order.deliveryEnd == null) {
        setUpdateKind({[updateKind]: e.target.name});
        setModel(true);
        alert('송장번호 입력/수정가능')
        // 모달을 띄워 송장번호를 입력받음 (하나의 컴포넌트로 디스플레이 플렉스임)
        // 모달에 updateKind 프롭스 전달
        // 해당 모달에서 아래 스테이트 관리 및 dispatch
        // const [form, setForm] = useState({
        //     deliveryMt: order.deliveryMt,
        //     deliveryCp: '',
        //     deliveryNum: ''
        // })
    } else {
        alert('배송 완료 처리된 주문은 송장번호를 수정할 수 없습니다.')
    }
} else if(e.target.name === "배송지수정") {
    if(order.deliveryEnd == null) {
        setUpdateKind({[updateKind]: e.target.name});
        setModel(true);
        alert('배송지 수정가능')
        // 모달을 띄워 송장번호를 입력받음 (하나의 컴포넌트로 디스플레이 플렉스임)
        // 모달에 updateKind 프롭스 전달
        // 해당 모달에서 아래 스테이트 관리 및 dispatch
        // const [form, setForm] = useState({
        //     cgAdsNum: order.cgAdsNum,
        //     cgAds: order.cgAds,
        //     cgAdsDetail: order.cgAdsDetail
        // })
    } else {
        alert('배송 완료 처리된 주문은 배송지를 수정할 수 없습니다.')
    }
} else if(e.target.name === "배송완료처리" && order.deliveryMt != "일반택배") {
    if(order.deliveryStart != null && order.deliveryEnd == null) {
        setUpdateKind({[updateKind]: e.target.name});
        dispatch(callHistoryUpdateAPI({
            orderCode: order.orderCode,
            form: updateKind
        }));
        alert("배송 완료 처리가 되었습니다.")
    } else {
        alert('배송이 시작되지 않은 상품은 배송 완료 처리를 할 수 없습니다.')
    }
} else if(e.target.name === "주문취소처리") {
    if(order.deliveryStart == null && order.deliveryEnd != null) {
        setUpdateKind({[updateKind]: e.target.name});
        dispatch(callHistoryUpdateAPI({
            orderCode: order.orderCode,
            form: updateKind
        }));
        alert("주문 취소 처리가 되었습니다.")
    } else {
        alert("배송 중인 상품은 주문취소 처리를 할 수 없습니다.")
    }
} else if(e.target.name === "반품접수") {
    if(order.deliveryEnd != null) {
        setUpdateKind({[updateKind]: e.target.name});
        dispatch(callHistoryUpdateAPI({
            orderCode: order.orderCode,
            form: updateKind
        }));
        alert("반품 접수 처리가 되었습니다.")
    } else {
        alert("배송 중인 상품은 반품 접수 처리가 불가합니다.")
    }
} else if(e.target.name === "반품완료처리") {
    if(order.deliveryEnd != null && order.stClaim == "반품접수") {
        setUpdateKind({[updateKind]: e.target.name});
        dispatch(callHistoryUpdateAPI({
            orderCode: order.orderCode,
            form: updateKind
        }));
        alert("반품 완료 처리가 되었습니다.")
    } else {
        alert("반품 접수가 되지 않은 상품은 반품 완료 처리를 할 수 없습니다.")
    }
} else {
    console.log(updateKind);
    alert("잘못된 접근입니다.")
}