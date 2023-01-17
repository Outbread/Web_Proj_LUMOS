package com.project.lumos.order.dto;

public class OrderProductDTO {

//	ORDER_PD_NUM	NUMBER				주문제품정보 식별번호
//	ORDER_AMOUNT	NUMBER				상품별 구매수량
//	ORDER_NUM		NUMBER				주문식별번호
//	MAIN_IMG_PATH	VARCHAR2(255 BYTE)	상품 대표 이미지 경로
//	PD_CODE			NUMBER				상품코드
//	OP_CODE			NUMBER				옵션코드

	private int orderPdNum;
	private int orderAmount;
	/* 주문정보 테이블의 존재가 선수행 되어야 함 */
	private int orderNum;
	private String mainImgPath;
	private int pdCode;
	private int opCode;
	
	public OrderProductDTO() {
	}
	
	public OrderProductDTO(int orderPdNum, int orderAmount, int orderNum, String mainImgPath, int pdCode, int opCode) {
		this.orderPdNum = orderPdNum;
		this.orderAmount = orderAmount;
		this.orderNum = orderNum;
		this.mainImgPath = mainImgPath;
		this.pdCode = pdCode;
		this.opCode = opCode;
	}
	
	public int getOrderPdNum() {
		return orderPdNum;
	}
	
	public void setOrderPdNum(int orderPdNum) {
		this.orderPdNum = orderPdNum;
	}
	
	public int getOrderAmount() {
		return orderAmount;
	}
	
	public void setOrderAmount(int orderAmount) {
		this.orderAmount = orderAmount;
	}
	
	public int getOrderNum() {
		return orderNum;
	}
	
	public void setOrderNum(int orderNum) {
		this.orderNum = orderNum;
	}
	
	public String getMainImgPath() {
		return mainImgPath;
	}
	
	public void setMainImgPath(String mainImgPath) {
		this.mainImgPath = mainImgPath;
	}
	
	public int getPdCode() {
		return pdCode;
	}
	
	public void setPdCode(int pdCode) {
		this.pdCode = pdCode;
	}
	
	public int getOpCode() {
		return opCode;
	}
	
	public void setOpCode(int opCode) {
		this.opCode = opCode;
	}
	
	@Override
	public String toString() {
		return "OrderProductDTO [orderPdNum=" + orderPdNum + ", orderAmount=" + orderAmount + ", orderNum=" + orderNum
				+ ", mainImgPath=" + mainImgPath + ", pdCode=" + pdCode + ", opCode=" + opCode + "]";
	}

}