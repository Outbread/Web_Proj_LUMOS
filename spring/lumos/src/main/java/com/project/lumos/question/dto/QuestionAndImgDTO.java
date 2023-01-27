package com.project.lumos.question.dto;

public class QuestionAndImgDTO {
	private int questionImgCode;
	private String originalName;
	private String newName;
	private int questionCode;
	private QuestionDTO question;
	
	public QuestionAndImgDTO(int questionImgCode, String originalName, String newName, int questionCode,
			QuestionDTO question) {
		super();
		this.questionImgCode = questionImgCode;
		this.originalName = originalName;
		this.newName = newName;
		this.questionCode = questionCode;
		this.question = question;
	}

	public QuestionAndImgDTO() {
		super();
	}

	@Override
	public String toString() {
		return "QuestionAndImgDTO [questionImgCode=" + questionImgCode + ", originalName=" + originalName + ", newName="
				+ newName + ", questionCode=" + questionCode + ", question=" + question + "]";
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

	public int getQuestionCode() {
		return questionCode;
	}

	public void setQuestionCode(int questionCode) {
		this.questionCode = questionCode;
	}

	public QuestionDTO getQuestion() {
		return question;
	}

	public void setQuestion(QuestionDTO question) {
		this.question = question;
	}

}
