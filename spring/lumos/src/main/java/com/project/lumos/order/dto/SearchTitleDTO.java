package com.project.lumos.order.dto;

public class SearchTitleDTO {

	private String searchTitle;

	public SearchTitleDTO() {
	}

	public SearchTitleDTO(String searchTitle) {
		this.searchTitle = searchTitle;
	}

	public String getSearchTitle() {
		return searchTitle;
	}

	public void setSearchTitle(String searchTitle) {
		this.searchTitle = searchTitle;
	}

	@Override
	public String toString() {
		return "SearchTitleDTO [searchTitle=" + searchTitle + "]";
	}
	
}