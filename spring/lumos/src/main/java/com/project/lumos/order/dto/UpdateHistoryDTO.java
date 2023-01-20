package com.project.lumos.order.dto;

public class UpdateHistoryDTO {

	private String updateKind;

	public UpdateHistoryDTO() {
	}

	public UpdateHistoryDTO(String updateKind) {
		this.updateKind = updateKind;
	}

	public String getUpdateKind() {
		return updateKind;
	}

	public void setUpdateKind(String updateKind) {
		this.updateKind = updateKind;
	}

	@Override
	public String toString() {
		return "UpdateHistoryDTO [updateKind=" + updateKind + "]";
	}
	
}