package com.project.lumos.question.service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.project.lumos.question.dto.QuestionAndMemberDTO;
import com.project.lumos.question.dto.QuestionDTO;
import com.project.lumos.question.dto.QuestionImgDTO;
import com.project.lumos.question.dto.QuestionMemberAndImgDTO;
import com.project.lumos.question.entity.Question;
import com.project.lumos.question.entity.QuestionAndMember;
import com.project.lumos.question.entity.QuestionImg;
import com.project.lumos.question.entity.QuestionMemberAndImg;
import com.project.lumos.question.repository.QuestionAndImageRepository;
import com.project.lumos.question.repository.QuestionAndMemberRepository;
import com.project.lumos.question.repository.QuestionImgRepository;
import com.project.lumos.question.repository.QuestionMemberAndImgRepository;
import com.project.lumos.question.repository.QuestionRepository;
import com.project.lumos.util.FileUploadUtils;

@Service
public class QuestionService {

	private static final Logger log = LoggerFactory.getLogger(QuestionService.class);
	private final QuestionRepository questionRepository;
	private final QuestionAndMemberRepository questionAndMemberRepository;
	private final ModelMapper modelMapper;
	private final QuestionImgRepository questionImgRepository;
	private final MemberRepository memberRepository;
	private final QuestionMemberAndImgRepository questionMemberAndImgRepository;
	private final QuestionAndImageRepository questionAndImageRepository;
	
	/* 이미지 저장 할 위치 및 응답 할 이미지 주소(WebConfig 설정파일 추가하기) */
    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;
	
	@Autowired
	public QuestionService(QuestionAndImageRepository questionAndImageRepository, QuestionMemberAndImgRepository questionMemberAndImgRepository, QuestionAndMemberRepository questionAndMemberRepository, QuestionRepository questionRepository, ModelMapper modelMapper, QuestionImgRepository questionImgRepository, MemberRepository memberRepository) {
		this.questionRepository = questionRepository;
		this.questionAndMemberRepository = questionAndMemberRepository;
		this.modelMapper = modelMapper;
		this.questionImgRepository = questionImgRepository;
		this.memberRepository = memberRepository;
		this.questionMemberAndImgRepository = questionMemberAndImgRepository;
		this.questionAndImageRepository = questionAndImageRepository;
	}
	
	
	/* 회원 문의 등록 */
	@Transactional
	public Object insertQuestion(int memberCode, QuestionDTO questionDTO, MultipartFile questionImage, QuestionImgDTO questionImgDTO) {
		log.info("[QuestionService] insertQuestion Start ==============================");
        log.info("QuestionService questionImgDTO: " + questionImgDTO);
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
        	 Question insertQuestion = modelMapper.map(questionDTO, Question.class);
	         questionRepository.save(insertQuestion);
	     
	         int questionCode = maxQuestionCode + 1;         // 새로 등록될(아직 생성되지 않은) 게시물 코드
	     
	         if(questionImage != null) {
	        	 replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, questionImage);
	        	 log.info("[QuestionService] insert Image Name : " + questionImage.getResource().getFilename());
	        	 log.info("[QuestionService] insert Image Name : " + replaceFileName);
	        	 
	        	 questionImgDTO.setOriginalName((questionImage).getResource().getFilename());
	        	 questionImgDTO.setQuestionCode(questionCode);       
	        	 questionImgDTO.setNewName(replaceFileName);
	        	 QuestionImg questionimg = modelMapper.map(questionImgDTO, QuestionImg.class);
	        	 questionImgRepository.save(questionimg);   
	        	 log.info("[QuestionService] QuestionImgDTO : " + questionImgDTO);
	         }
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
	public int questionTotal() {
		log.info("[QuestionService] questionTotal Start ===================================");
		
		int result = questionRepository.findAll().size();
		
		log.info("[QuestionService] result : " + result);
        log.info("[QuestionService] questionTotal End ===================================");
        
        return result;
	}
	
	/* 관리자 전체 문의 내역 조회 페이징 */
	public Object questionListWithPaging(Criteria cri) {
		
		log.info("[QuestionService] questionListWithPaging Start ===================================");
		
		int index = cri.getPageNum() - 1;
        int count = cri.getAmount(); 
        Pageable paging = PageRequest.of(index, count, Sort.by("questionCode"));		// 문의내역은 최신글이 위에 올라오도록 오름차순
        
        Page<QuestionAndMember> result = questionAndMemberRepository.findAll(paging);
        List<QuestionAndMember> questionList = (List<QuestionAndMember>)result.getContent();
        log.info("[QuestionService] questionList " + result);
        
        log.info("[QuestionService] questionListWithPaging End ===================================");
        
		return questionList.stream().map(question -> modelMapper.map(question, QuestionAndMemberDTO.class)).collect(Collectors.toList());
	}

	/* 회원 문의 상세 조회 */
	public Object selectQuestionDetail(int questionCode) {
//		log.info("[QuestionService] getQuestionDetail Start ==============================");
//		
//		Question question = questionRepository.findById(questionCode).get();
////		Question questionCode1 = questionRepository.findByQuestionCode(questionCode);
//		log.info("[QuestionService] question: " + question);
//		
//		if(questionImgRepository.findByQuestionCode(questionCode) != null) {
//		QuestionImg questionImg = questionImgRepository.findByQuestionCode(questionCode);
//		log.info("[QuestionService] questionImg: " + questionImg);
//		String questionImgName = questionImg.getNewName();
//		log.info("[QuestionService] questionImgName: " + questionImgName);
//		questionImg.setNewName(IMAGE_URL + questionImgName);
//		log.info("[QuestionService] questionImg: " + questionImg);
////백업		QuestionAndImg questionAndImg = questionAndImgRepository.findByQuestionCode(questionCode1);
//		QuestionAndImage questionAndImage = questionAndImageRepository.findByQuestionCode(questionCode);
//		log.info("[QuestionService] questionAndImg" + questionAndImage);
//		
//        log.info("[QuestionService] getQuestionDetail End ==============================");
//		}else {
//			QuestionAndImage questionAndImage = questionAndImageRepository.findByQuestionCode(questionCode);
//			log.info("[QuestionService]" + questionAndImage);
//		}
//		QuestionAndImage questionAndImage = questionAndImageRepository.findByQuestionCode(questionCode);
//		log.info("[QuestionService]" + questionAndImage);
//		
//        log.info("[QuestionService] getQuestionDetail End ==============================");
//		
//        return modelMapper.map(questionAndImage, QuestionAndImageDTO.class);
        
        /* 백업 */
//		String questionImg = questionImgRepository.findByQuestionCode(questionCode).getNewName();
//		log.info("[QuestionService] questionImg: " + questionImg);
//		
//		QuestionAndImg questionAndImg = questionAndImgRepository.findByQuestionCode(questionCode1);
//		questionAndImg.setNewName(IMAGE_URL + questionImg);
//		log.info("[QuestionService] questionAndImg" + questionAndImg);
//		
//        log.info("[QuestionService] getQuestionDetail End ==============================");
//        return modelMapper.map(questionAndImg, QuestionAndImgDTO.class);
        
		
		

//			QuestionImg questionImg = questionImgRepository.findByQuestionCode(questionCode);
////			int questionImgCode = questionImgRepository.findByQuestionCode(questionCode).getQuestionCode();
//			String questionImgName = questionImg.getNewName();
//			questionImg.setNewName(IMAGE_URL + questionImgName);
//		
//		QuestionAndImage questionAndImage = questionAndImageRepository.findByQuestionCode(questionCode);
//		
//		
//        return modelMapper.map(questionAndImage, QuestionAndImageDTO.class);
		Question question = questionRepository.findById(questionCode).get();
		QuestionImg questionImg = questionImgRepository.findByQuestionCode(questionCode);
		QuestionDTO questionDTO = modelMapper.map(question, QuestionDTO.class);
		
		Map<String, Object> questionMap = new HashMap<>();
		
		if(questionImg != null) {
			QuestionImgDTO questionImgDTO = modelMapper.map(questionImg, QuestionImgDTO.class);
			questionImgDTO.setNewName(IMAGE_URL + questionImg.getNewName());
			log.info(questionImgDTO.getNewName());
			questionMap.put("questionImgDTO", questionImgDTO);
		}
		questionMap.put("questionDTO", questionDTO);
		
		return questionMap;
	}

	/* 회원 문의 수정 */
	@Transactional
	public Object updateQuestion(MultipartFile questionImage, QuestionDTO questionDTO, QuestionImgDTO questionImgDTO) {
		log.info("[QuestionService] updateQuestion Start ==============================");
		
		String replaceFileName = null;
	    int result = 0;
		
		try {
			Question question = questionRepository.findById(questionDTO.getQuestionCode()).get();
			int questionCode = question.getQuestionCode();
			
			QuestionImg questionImg = questionImgRepository.findByQuestionCode(questionCode);
			String oriImage = questionImg.getNewName();
			log.info("[updateQuestionImage] oriImage : " + oriImage);
			
			question.setQuestionTitle(questionDTO.getQuestionTitle());
			question.setQuestionContent(questionDTO.getQuestionContent());
			question.setAnswerContent(questionDTO.getAnswerContent());
			question.setQuestionCategory(questionDTO.getQuestionCategory());
			log.info("[QuestionService] updateQuestion" + questionDTO);
			
			questionImg.setNewName(questionImgDTO.getNewName());
			log.info("[QuestionService] updateQuestion" + questionImgDTO);
			log.info("[QuestionService] updateQuestion" + questionImage);
			
			if(questionImage != null){
                String imageName = UUID.randomUUID().toString().replace("-", "");
                replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, questionImage);
                log.info("[updateProduct] InsertFileName : " + replaceFileName);
                
                questionImg.setNewName(replaceFileName);	// 새로운 파일 이름으로 update
                log.info("[updateProduct] deleteImage : " + oriImage);
                
                boolean isDelete = FileUploadUtils.deleteFile(IMAGE_DIR, oriImage);
                log.info("[update] isDelete : " + isDelete);
            } else {
                /* 이미지 변경 없을 시 */
            	questionImg.setNewName(oriImage);
            }
			
			
			result = 1;
		} catch (Exception e) {
			log.info("[question update] Exception!!");
			FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
		}
		
		log.info("[QuestionService] updateQuestion End ==============================");
		
		return (result > 0) ? "문의 수정 성공" : "문의 수정 실패" ;
	}

	/* 문의 삭제 */
	@Transactional
	public Object deleteQuestion(int questionCode) {
		log.info("[QuestionService] updateQuestion Start ==============================");
		
		int result = 0;
		try {
			questionRepository.deleteById(questionCode);
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
	
	/* 관리자 답변 수정 */
	@Transactional
	public Object updateAnswer(QuestionDTO questionDTO) {
		log.info("[QuestionService] updateAnswer Start ==============================");
		
	    int result = 0;
		
		try {
			Question question = questionRepository.findById(questionDTO.getQuestionCode()).get();
			
			question.setQuestionStatus(questionDTO.getQuestionStatus());
			question.setAnswerContent(questionDTO.getAnswerContent());
			log.info("[QuestionService] updateAnswer" + questionDTO);
			Thread.sleep(2000);
			result = 1;
		} catch (Exception e) {
			log.info("[question update] Exception!!");
		}
		
		log.info("[QuestionService] updateAnswer End ==============================");
		
		return (result > 0) ? "답변 등록 성공" : "답변 등록 실패" ;
	}
	
	/* 관리자 문의 상세 조회 */
	public Object selectQuestionDetailAdmin(int questionCode) {
		log.info("[QuestionService] selectQuestionDetailAdmin Start ==============================");
		
		Question question = questionRepository.findById(questionCode).get();
//		Question questionCode1 = questionRepository.findByQuestionCode(questionCode);
		log.info("[QuestionService] getQuestionDetail: " + question);
		
		if(questionImgRepository.findByQuestionCode(questionCode) != null) {
		String questionImg = questionImgRepository.findByQuestionCode(questionCode).getNewName();
		log.info("[QuestionService] questionImg: " + questionImg);
		
//		log.info("[QuestionService] questionAndImg" + questionAndImg);
		QuestionMemberAndImg questionMemberAndImg = questionMemberAndImgRepository.findById(questionCode).get();
		log.info("[QuestionService] questionAndImg" + questionMemberAndImg);
		QuestionImg originQuestionImg = questionImgRepository.findByQuestionCode(questionCode);
		originQuestionImg.setNewName(IMAGE_URL + questionImg);
		}
		QuestionMemberAndImg questionMemberAndImg = questionMemberAndImgRepository.findById(questionCode).get();
		log.info("[QuestionService] questionAndImg" + questionMemberAndImg);
        log.info("[QuestionService] selectQuestionDetailAdmin End ==============================");
        return modelMapper.map(questionMemberAndImg, QuestionMemberAndImgDTO.class);
	}

	/* 최신 문의사항 코드 조회 */
	public Object selectNewQuestionCode(int memberCode) {
		
		int newQuestionCode = questionRepository.findNewQuestionCode(memberCode);
		log.info("[QuestionService] selectNewQuestionCode : " +  newQuestionCode);
		return newQuestionCode;
	}
	
}
