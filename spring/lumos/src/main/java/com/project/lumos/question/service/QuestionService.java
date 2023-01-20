package com.project.lumos.question.service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.lumos.common.Criteria;
import com.project.lumos.member.repository.MemberRepository;
import com.project.lumos.question.dto.QuestionAndImgDTO;
import com.project.lumos.question.dto.QuestionDTO;
import com.project.lumos.question.dto.QuestionImgDTO;
import com.project.lumos.question.entity.Question;
import com.project.lumos.question.entity.QuestionAndImg;
import com.project.lumos.question.entity.QuestionImg;
import com.project.lumos.question.repository.QuestionAndImgRepository;
import com.project.lumos.question.repository.QuestionImgRepository;
import com.project.lumos.question.repository.QuestionRepository;
import com.project.lumos.util.FileUploadUtils;

@Service
public class QuestionService {

	private static final Logger log = LoggerFactory.getLogger(QuestionService.class);
	private final QuestionRepository questionRepository;
	private final ModelMapper modelMapper;
	private final QuestionImgRepository questionImgRepository;
	private final MemberRepository memberRepository;
	private final QuestionAndImgRepository questionAndImgRepository;
	
	/* 이미지 저장 할 위치 및 응답 할 이미지 주소(WebConfig 설정파일 추가하기) */
    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;
	
	@Autowired
	public QuestionService(QuestionAndImgRepository questionAndImgRepository, QuestionRepository questionRepository, ModelMapper modelMapper, QuestionImgRepository questionImgRepository, MemberRepository memberRepository) {
		this.questionRepository = questionRepository;
		this.modelMapper = modelMapper;
		this.questionImgRepository = questionImgRepository;
		this.memberRepository = memberRepository;
		this.questionAndImgRepository = questionAndImgRepository;
	}
	
	
	/* 회원 문의 등록 */
	@Transactional
	public Object insertQuestion(int memberCode, QuestionDTO questionDTO, MultipartFile questionImage, QuestionImgDTO questionImgDTO) {
		log.info("[QuestionService] insertQuestion Start ==============================");
        log.info("QuestionService questionDTO" + questionImgDTO);
        String imageName = UUID.randomUUID().toString().replace("-", "");
        String replaceFileName = null;
        int result = 0;
        int maxQuestionCode = findMaxQuestionCode();
        
        java.util.Date now = new java.util.Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd HH:mm:ss");
		String questionDate = sdf.format(now);
		questionDTO.setQuestionCreateDate(questionDate);
		questionDTO.setMemberCode(memberCode);
		
        try {
			 replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, questionImage);
			 questionImgDTO.setNewName(replaceFileName);
			 log.info("[QuestionService] insert Image Name : " + questionImage.getResource().getFilename());

			 Question insertQuestion = modelMapper.map(questionDTO, Question.class);
	         questionRepository.save(insertQuestion);
	        
	         
	         int questionCode = maxQuestionCode + 1;         // 새로 등록될(아직 생성되지 않은) 게시물 코드
	         questionImgDTO.setOriginalName((questionImage).getResource().getFilename());
	         questionImgDTO.setQuestionCode(questionCode);                 
	         QuestionImg questionimg = modelMapper.map(questionImgDTO, QuestionImg.class);
	         questionImgRepository.save(questionimg);   
	         result = 1;
			
		} catch (Exception e) {
			 FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
	         throw new RuntimeException(e);
		}
		
			       
        log.info("[QuestionService] insertQuestion End ==============================");
        return (result > 0) ? "문의 등록 성공" : "문의 등록 실패";
	}
	
	/* 최신 문의사항코드 추출 */
	@Transactional
	public int findMaxQuestionCode() {
		int  maxQuestionCode = questionRepository.findMaxQuestionCode();
		return maxQuestionCode;
	}
	
	/* 회원별 문의 내역 조회 */
	public long selectQuestionTotal(int memberCode) {
		log.info("[QuestionService] selectQuestionTotal Start ===================================");
		
		long result = questionRepository.countByMemberCode(memberCode);

        log.info("[QuestionService] selectQuestionTotal End ===================================");
        
        return result;
	}

	/* 회원별 문의 내역 조회 페이징 */
	public Object selectQuestionListWithPaging(Criteria cri) {
		log.info("[QuestionService] selectQuestionListWithPaging Start ===================================");
		
		int index = cri.getPageNum() - 1;
        int count = cri.getAmount(); 
        Pageable paging = PageRequest.of(index, count, Sort.by("questionCode"));		// 문의내역은 주로 최신글이 위에 올라옴으로 오름차순
        
        Page<Question> result = questionRepository.findByMemberCode(Integer.valueOf(cri.getSearchValue()), paging);
        List<Question> questionList = (List<Question>)result.getContent();
        
        log.info("[QuestionService] selectQuestionListWithPaging End ===================================");
        
		return questionList.stream().map(question -> modelMapper.map(question, QuestionDTO.class)).collect(Collectors.toList());
	}

	/* 관리자 전체 문의 내역 조회 */
	public long questionTotal() {
		log.info("[QuestionService] questionTotal Start ===================================");
		
		long result = questionRepository.count();

        log.info("[QuestionService] questionTotal End ===================================");
        
        return result;
	}
	
	/* 관리자 전체 문의 내역 조회 페이징 */
	public Object questionListWithPaging(Criteria cri) {
		
		log.info("[QuestionService] questionListWithPaging Start ===================================");
		
		int index = cri.getPageNum() - 1;
        int count = cri.getAmount(); 
        Pageable paging = PageRequest.of(index, count, Sort.by("questionCode"));		// 문의내역은 최신글이 위에 올라오도록 오름차순
        
        Page<Question> result = questionRepository.findAll(paging);
        List<Question> questionList = (List<Question>)result.getContent();
        
        log.info("[QuestionService] questionListWithPaging End ===================================");
        
		return questionList.stream().map(question -> modelMapper.map(question, QuestionDTO.class)).collect(Collectors.toList());
	}

	/* 회원, 관리자 문의 상세 조회 */
	public Object selectQuestionDetail(int questionCode) {
		log.info("[QuestionService] getQuestionDetail Start ==============================");
		
		Question question = questionRepository.findById(questionCode).get();
		Question questionCode1 = questionRepository.findByQuestionCode(questionCode);
		log.info("[QuestionService] getQuestionDetail: " + question);

		String questionImg = questionImgRepository.findByQuestionCode(questionCode).getNewName();
		log.info("[QuestionService] questionImg: " + questionImg);
//		QuestionImgDTO questionImgDTO = questionImgDTO.setNewName(questionImg);
		
		QuestionAndImg questionAndImg = questionAndImgRepository.findByQuestionCode(questionCode1);
		questionAndImg.setNewName(IMAGE_URL + questionImg);
		log.info("[QuestionService] questionAndImg" + questionAndImg);
		
        log.info("[QuestionService] getQuestionDetail End ==============================");
//        return modelMapper.map(question, QuestionDTO.class, questionImg);
        return modelMapper.map(questionAndImg, QuestionAndImgDTO.class);
	}

	/* 회원 문의 수정 */
	@Transactional
	public Object updateQuestion(QuestionDTO questionDTO) {
		log.info("[QuestionService] updateQuestion Start ==============================");
		
		int result = 0;
		
		try {
			Question question = questionRepository.findById(questionDTO.getQuestionCode()).get();
			question.setQuestionTitle(questionDTO.getQuestionTitle());
			question.setQuestionContent(questionDTO.getQuestionContent());
			log.info("[QuestionService] updateQuestion" + questionDTO);
			result = 1;
		} catch (Exception e) {
			log.info("[question update] Exception!!");
		}
		
		log.info("[QuestionService] updateQuestion End ==============================");
		
		return (result > 0) ? "문의 수정 성공" : "문의 수정 실패" ;
	}

	/* 문의 삭제 */
	@Transactional
	public Object deleteQuestion(QuestionDTO questionDTO) {
		log.info("[QuestionService] updateQuestion Start ==============================");
		
		int result = 0;
		try {
			questionRepository.deleteById(questionDTO.getQuestionCode());
			result = 1;
		} catch (Exception e) {
			log.info("[question delete] Exception!!");
		}
		
		log.info("[QuestionService] deleteQuestion End ==============================");
		return (result > 0) ? "문의 수정 성공" : "문의 수정 실패" ;
	}

	/* memberId로 memberCode 조회 */
	public int findMemberCode(String memberId) {
		int memberCode = memberRepository.findMemberCodeByMemberId(memberId);
		return memberCode;
	}
}
