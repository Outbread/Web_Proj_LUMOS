package com.project.lumos.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.lumos.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer>{

	long countByMemberCode(int memberCode);

	Page<Question> findByMemberCode(int searchValue, Pageable paging);

	@Query(value = "SELECT MAX(QUESTION_CODE) FROM QUESTION", nativeQuery = true)
	public int findMaxQuestionCode();

	Question findByQuestionCode(int questionCode); 
	
	@Query(value = "SELECT MAX(QUESTION_CODE) FROM QUESTION WHERE MEMBER_CODE = :memberCode", nativeQuery = true)
	public int findNewQuestionCode(int memberCode);


	

}
