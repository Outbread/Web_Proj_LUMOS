package com.project.lumos.question.dto;

public class QuestionAndImgDTO {
	private int questionImgCode;
	private String originalName;
	private String newName;
	private QuestionDTO question;
	
	public QuestionAndImgDTO(int questionImgCode, String originalName, String newName, QuestionDTO question) {
		super();
		this.questionImgCode = questionImgCode;
		this.originalName = originalName;
		this.newName = newName;
		this.question = question;
	}
	
	public QuestionAndImgDTO() {
		super();
	}
	

	public int getQuestionImgCode() {
		return questionImgCode;
	}
	public void setQuestionImgCode(int questionImgCode) {
		this.questionImgCode = questionImgCode;
	}
	public String getOriginalName() {
		return originalName;
	}
	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}
	public String getNewName() {
		return newName;
	}
	public void setNewName(String newName) {
		this.newName = newName;
	}
	public QuestionDTO getQuestion() {
		return question;
	}
	public void setQuestionCode(QuestionDTO question) {
		this.question = question;
	}

	@Override
	public String toString() {
		return "QuestionAndImgDTO [questionImgCode=" + questionImgCode + ", originalName=" + originalName + ", newName="
				+ newName + ", question=" + question + "]";
	}
	
	

}
