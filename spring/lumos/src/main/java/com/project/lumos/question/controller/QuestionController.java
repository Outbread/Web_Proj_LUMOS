package com.project.lumos.question.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.lumos.common.Criteria;
import com.project.lumos.common.PageDTO;
import com.project.lumos.common.PagingResponseDTO;
import com.project.lumos.common.ResponseDTO;
import com.project.lumos.question.dto.QuestionAndImgDTO;
import com.project.lumos.question.dto.QuestionDTO;
import com.project.lumos.question.dto.QuestionImgDTO;
import com.project.lumos.question.repository.QuestionRepository;
import com.project.lumos.question.service.QuestionService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class QuestionController {

	
	private static final Logger log = LoggerFactory.getLogger(QuestionController.class);
	
	private final QuestionService questionService;

	@Autowired
	public QuestionController(QuestionService questionService) {
		this.questionService = questionService;
		
	}
	
	/* 성공 */
	@Operation(summary = "문의 등록 요청", description = "1대1 문의 등록이 진행됩니다.", tags = {"QuestionController"})
	@PostMapping(value="/question")
	public ResponseEntity<ResponseDTO> insertQuestion(@ModelAttribute MultipartFile questionImage, QuestionDTO questionDTO, QuestionImgDTO questionImgDTO){
//		log.info("[QuestionController] questionAndImgDTO :" + questionAndImgDTO);
		log.info("[QuestionController] questionDTO :" + questionDTO);
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "등록 성공", questionService.insertQuestion(questionDTO, questionImage, questionImgDTO)));
	}
	
	/* 성공 */
	@Operation(summary = "회원별 문의 리스트 조회 요청", description = "해당 고객이 작성한 문의 리스트 조회가 진행됩니다.", tags = { "QuestionController" })
    @GetMapping("/question/{memberId}")
    public ResponseEntity<ResponseDTO> selectQuestionListWithPaging(@PathVariable String memberId,  @RequestParam(name="offset", defaultValue="1") String offset) {
        log.info("[QuestionController] selectQuestionListWithPaging : " + offset);
        log.info("[QuestionController] memberId : " + memberId);
        int memberCode = questionService.findMemberCode(memberId);

        log.info("[QuestionController] memberCode : " + memberCode);
  
        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        cri.setSearchValue(String.valueOf(memberCode));	             // 해당 회원의 문의만을 검색하기 위한 검색 조건
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        int total = (int)questionService.selectQuestionTotal(Integer.valueOf(cri.getSearchValue()));
        
        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
        pagingResponseDTO.setData(questionService.selectQuestionListWithPaging(cri));
        log.info("[QuestionController] pagingResponseDTO : " + pagingResponseDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
    }
	
	/* 성공 */
	@Operation(summary = "관리자 전체 문의 리스트 조회 요청", description = "모든 고객이 작성한 문의 리스트 조회가 진행됩니다.", tags = { "QuestionController" })
    @GetMapping("/question/list")
    public ResponseEntity<ResponseDTO> questionListWithPaging(@RequestParam(name="offset", defaultValue="1") String offset) {
        log.info("[QuestionController] selectQuestionListWithPaging : " + offset);
        
        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        cri.getSearchValue();	
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        int total = (int)questionService.questionTotal();
        
        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
        pagingResponseDTO.setData(questionService.questionListWithPaging(cri));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
    }
	
	/* 성공 */
	@Operation(summary = "문의 수정 요청", description = "문의 작성자의 문의 수정이 진행됩니다.", tags = { "QuestionController" })
    @PutMapping("/question/update")
    public ResponseEntity<ResponseDTO> updateQuestion(@RequestBody QuestionDTO questionDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "문의 수정 성공",  questionService.updateQuestion(questionDTO)));
    }
	
	/* 성공 */
	@Operation(summary = "문의 삭제 요청", description = "문의 작성자의 문의 삭제가 진행됩니다.", tags = { "QuestionController" })
    @DeleteMapping("/question/delete")
	public ResponseEntity<ResponseDTO> deleteQuestion(@RequestBody QuestionDTO questionDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "문의 수정 성공",  questionService.deleteQuestion(questionDTO)));
    }
	
	/* 문의 상세 조회 */


}