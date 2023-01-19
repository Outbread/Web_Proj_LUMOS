package com.project.lumos.order.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_ORDER_PRODUCT")
@SequenceGenerator(
		name = "ORDER_PRODUCT_SEQ_GENERATOR",
		sequenceName = "SEQ_ORDER_PD_NUM",
		initialValue = 1, allocationSize = 1
)
public class OrderProduct {
	@Id
	@Column(name = "ORDER_PD_NUM")
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "ORDER_PRODUCT_SEQ_GENERATOR"
	)
	private int orderPdNum;
	
	@Column(name = "ORDER_AMOUNT")
	private int orderAmount;
	
	/* 주문정보 테이블의 존재가 선수행 되어야 함 */
	@Column(name = "ORDER_NUM")
	private int orderNum;
	
	@Column(name = "MAIN_IMG_PATH")
	private String mainImgPath;
	
	@Column(name = "PD_CODE")
	private int pdCode;
	
	@Column(name = "OP_CODE")
	private int opCode;

	public OrderProduct() {
	}

	public OrderProduct(int orderPdNum, int orderAmount, int orderNum, String mainImgPath, int pdCode, int opCode) {
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
		return "OrderProduct [orderPdNum=" + orderPdNum + ", orderAmount=" + orderAmount + ", orderNum=" + orderNum
				+ ", mainImgPath=" + mainImgPath + ", pdCode=" + pdCode + ", opCode=" + opCode + "]";
	}
	
}