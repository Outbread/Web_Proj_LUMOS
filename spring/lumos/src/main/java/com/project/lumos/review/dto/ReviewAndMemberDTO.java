package com.project.lumos.review.dto;

import com.project.lumos.member.dto.MemberDTO;

public class ReviewAndMemberDTO {
	private int reviewCode;
	private int pdCode;
	private int pdGrade;
	private String reviewContent;
	private String uploadDate;
	private String reviewComment;
	private String reviewTitle;
	private int memberCode;
	private MemberDTO member;
	
	public ReviewAndMemberDTO() {
	}

	public ReviewAndMemberDTO(int reviewCode, int pdCode, int pdGrade, String reviewContent, String uploadDate,
			String reviewComment, String reviewTitle, int memberCode, MemberDTO member) {
		this.reviewCode = reviewCode;
		this.pdCode = pdCode;
		this.pdGrade = pdGrade;
		this.reviewContent = reviewContent;
		this.uploadDate = uploadDate;
		this.reviewComment = reviewComment;
		this.reviewTitle = reviewTitle;
		this.memberCode = memberCode;
		this.member = member;
	}

	public int getReviewCode() {
		return reviewCode;
	}

	public void setReviewCode(int reviewCode) {
		this.reviewCode = reviewCode;
	}

	public int getPdCode() {
		return pdCode;
	}

	public void setPdCode(int pdCode) {
		this.pdCode = pdCode;
	}

	public int getPdGrade() {
		return pdGrade;
	}

	public void setPdGrade(int pdGrade) {
		this.pdGrade = pdGrade;
	}

	public String getReviewContent() {
		return reviewContent;
	}

	public void setReviewContent(String reviewContent) {
		this.reviewContent = reviewContent;
	}

	public String getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}

	public String getReviewComment() {
		return reviewComment;
	}

	public void setReviewComment(String reviewComment) {
		this.reviewComment = reviewComment;
	}

	public String getReviewTitle() {
		return reviewTitle;
	}

	public void setReviewTitle(String reviewTitle) {
		this.reviewTitle = reviewTitle;
	}

	public int getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(int memberCode) {
		this.memberCode = memberCode;
	}

	public MemberDTO getMember() {
		return member;
	}

	public void setMember(MemberDTO member) {
		this.member = member;
	}

	@Override
	public String toString() {
		return "ReviewAndMemberDTO [reviewCode=" + reviewCode + ", pdCode=" + pdCode + ", pdGrade=" + pdGrade
				+ ", reviewContent=" + reviewContent + ", uploadDate=" + uploadDate + ", reviewComment=" + reviewComment
				+ ", reviewTitle=" + reviewTitle + ", memberCode=" + memberCode + ", member=" + member + "]";
	}
	
	
	
}
