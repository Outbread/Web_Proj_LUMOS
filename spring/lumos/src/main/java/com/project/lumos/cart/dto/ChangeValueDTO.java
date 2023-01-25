package com.project.lumos.cart.dto;

public class ChangeValueDTO {

	private int opCode;
	private int amount;
	
	public ChangeValueDTO() {
	}
	
	public ChangeValueDTO(int opCode, int amount) {
		this.opCode = opCode;
		this.amount = amount;
	}

	public int getOpCode() {
		return opCode;
	}

	public void setOpCode(int opCode) {
		this.opCode = opCode;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "ChangeValueDTO [opCode=" + opCode + ", amount=" + amount + "]";
	}
	
}