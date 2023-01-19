package com.project.lumos.question.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.project.lumos.member.entity.Member;

@Entity
@Table(name = "QUESTION")
@SequenceGenerator(
	name = "QUESTION_SEQ_GENERATOR",
	sequenceName = "SEQ_QUESTION_CODE",
	initialValue = 1, allocationSize = 1
)
public class QuestionAndMember {
	
	@Id
	@Column(name = "QUESTION_CODE")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "QUESTION_SEQ_GENERATOR"
	)
	private int questionCode;
	
	@Column(name = "QUESTION_TITLE")
	private String questionTitle;
	
	@Column(name = "QUESTION_CATEGORY")
	private String questionCategory;
	
	@Column(name = "QUESTION_CONTENT")
	private String questionContent;
	
	@Column(name = "ANSWER_CONTENT")
	private String answerContent;
	
	@Column(name = "QUESTION_STATUS")
	private String questionStatus;
	
	@ManyToOne
	@JoinColumn(name = "MEMBER_CODE")
	private Member member;
	
	@Column(name = "QUESTION_CREATE_DATE")
	private String questionCreateDate;

}
