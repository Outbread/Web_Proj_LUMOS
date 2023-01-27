package com.project.lumos.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.question.entity.Question;
import com.project.lumos.question.entity.QuestionAndImg;

public interface QuestionAndImgRepository extends JpaRepository<QuestionAndImg, Integer>{

	QuestionAndImg findByQuestionCode(Question questionCode);

	QuestionAndImg findByQuestionCode(int questionCode);





}
