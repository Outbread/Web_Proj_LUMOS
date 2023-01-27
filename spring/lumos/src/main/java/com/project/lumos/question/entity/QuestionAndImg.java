package com.project.lumos.question.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "QUESTION_IMG")
@SequenceGenerator(
		name = "QUESTION_IMG_SEQ_GENERATOR",
		sequenceName = "SEQ_QUESTION_IMG_CODE",
		initialValue = 1, allocationSize = 1
		)
public class QuestionAndImg {

		
		@Id
		@Column(name = "QUESTION_IMG_CODE")
		@GeneratedValue(
				strategy = GenerationType.SEQUENCE,
				generator = "QUESTION_IMG_SEQ_GENERATOR"
			)
		public int questionImgCode;
		
		@Column(name = "ORIGINAL_NAME")                // 디비 스크립트 original로 수정 바람 i빠짐
		private String originalName;
		
		@Column(name = "NEW_NAME")
		private String newName;
		
		@Column(name = "QUESTION_CODE")
		private int questionCode;
		
		@OneToOne
		@JoinColumn(name = "QUESTION_CODE", referencedColumnName = "QUESTION_CODE", insertable = false, updatable = false)
		private Question question;

		public QuestionAndImg(int questionImgCode, String originalName, String newName, int questionCode,
				Question question) {
			super();
			this.questionImgCode = questionImgCode;
			this.originalName = originalName;
			this.newName = newName;
			this.questionCode = questionCode;
			this.question = question;
		}

		public QuestionAndImg() {
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

		public int getQuestionCode() {
			return questionCode;
		}

		public void setQuestionCode(int questionCode) {
			this.questionCode = questionCode;
		}

		public Question getQuestion() {
			return question;
		}

		public void setQuestion(Question question) {
			this.question = question;
		}

		@Override
		public String toString() {
			return "QuestionAndImg [questionImgCode=" + questionImgCode + ", originalName=" + originalName
					+ ", newName=" + newName + ", questionCode=" + questionCode + ", question=" + question + "]";
		}

		
		
}
