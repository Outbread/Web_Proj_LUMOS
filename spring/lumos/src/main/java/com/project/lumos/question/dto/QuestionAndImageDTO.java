package com.project.lumos.question.dto;

import java.io.Serializable;

import com.project.lumos.question.entity.QuestionImg;

public class QuestionAndImageDTO implements Serializable{
//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = -5409021827197113263L;
	public int questionCode;
	private String questionTitle;
	private String questionCategory;
	private String questionContent;
	private String answerContent;
	private String questionStatus;
	private String QuestionCreateDate;
	private int memberCode;
	private QuestionImg questionImg;
	
	public QuestionAndImageDTO(int questionCode, String questionTitle, String questionCategory, String questionContent,
			String answerContent, String questionStatus, String questionCreateDate, int memberCode,
			QuestionImg questionImg) {
		super();
		this.questionCode = questionCode;
		this.questionTitle = questionTitle;
		this.questionCategory = questionCategory;
		this.questionContent = questionContent;
		this.answerContent = answerContent;
		this.questionStatus = questionStatus;
		QuestionCreateDate = questionCreateDate;
		this.memberCode = memberCode;
		this.questionImg = questionImg;
	}

	public QuestionAndImageDTO() {
		super();
	}

	@Override
	public String toString() {
		return "QuestionAndImageDTO [questionCode=" + questionCode + ", questionTitle=" + questionTitle
				+ ", questionCategory=" + questionCategory + ", questionContent=" + questionContent + ", answerContent="
				+ answerContent + ", questionStatus=" + questionStatus + ", QuestionCreateDate=" + QuestionCreateDate
				+ ", memberCode=" + memberCode + ", questionImg=" + questionImg + "]";
	}

	public int getQuestionCode() {
		return questionCode;
	}

	public void setQuestionCode(int questionCode) {
		this.questionCode = questionCode;
	}

	public String getQuestionTitle() {
		return questionTitle;
	}

	public void setQuestionTitle(String questionTitle) {
		this.questionTitle = questionTitle;
	}

	public String getQuestionCategory() {
		return questionCategory;
	}

	public void setQuestionCategory(String questionCategory) {
		this.questionCategory = questionCategory;
	}

	public String getQuestionContent() {
		return questionContent;
	}

	public void setQuestionContent(String questionContent) {
		this.questionContent = questionContent;
	}

	public String getAnswerContent() {
		return answerContent;
	}

	public void setAnswerContent(String answerContent) {
		this.answerContent = answerContent;
	}

	public String getQuestionStatus() {
		return questionStatus;
	}

	public void setQuestionStatus(String questionStatus) {
		this.questionStatus = questionStatus;
	}

	public String getQuestionCreateDate() {
		return QuestionCreateDate;
	}

	public void setQuestionCreateDate(String questionCreateDate) {
		QuestionCreateDate = questionCreateDate;
	}

	public int getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(int memberCode) {
		this.memberCode = memberCode;
	}

	public QuestionImg getQuestionImg() {
		return questionImg;
	}

	public void setQuestionImg(QuestionImg questionImg) {
		this.questionImg = questionImg;
	}

	
	
}
