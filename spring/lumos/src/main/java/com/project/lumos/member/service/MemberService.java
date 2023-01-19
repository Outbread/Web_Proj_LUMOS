package com.project.lumos.member.service;

import java.io.IOException;
import java.util.UUID;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.lumos.member.dto.MemberDTO;
import com.project.lumos.member.entity.Member;
import com.project.lumos.member.repository.MemberRepository;
import com.project.lumos.product.dto.ProductDTO;
import com.project.lumos.product.entity.Product;

@Service
public class MemberService {

	private static final Logger log = LoggerFactory.getLogger(MemberService.class);
	private final MemberRepository memberRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public MemberService(MemberRepository memberRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.modelMapper = modelMapper;
	}
	//============================마이페이지 프로필 조회[전진이]==========================//
//	public Object selectProfile(int memberCode) {
//		log.info("[MemberService] getMyInfo Start =======================");
//		
//		Member member = memberRepository.findById(memberCode).get();
//		
//		MemberDTO memberDTO = modelMapper.map(member, MemberDTO.class);
//		
//		return memberDTO;
//	}
	
	public MemberDTO selectMyInfo(String memberId) {
		log.info("[MemberService] getMyInfo Start =======================");
		
		Member member = memberRepository.findByMemberId(memberId);
		log.info("[MemberService] {}", member);
		log.info("[MemberService] getMyInfo End =========================");
		
		return modelMapper.map(member, MemberDTO.class);
	}
	
	//============================마이페이지 프로필 수정[전진이]==========================//
	@Transactional
	public Object updateProfile(MemberDTO memberDTO) {
		log.info("[MemberService] updateProfile Start ===================================");
        log.info("[MemberService] memberDTO : " + memberDTO);
        
        int result = 0;
        try {
	        /* update 할 엔티티 조회 */
			Member member = memberRepository.findById(memberDTO.getMemberCode()).get();
			
			/* update를 위한 엔티티 값 수정 */
			member.setMemberCode(memberDTO.getMemberCode());
			member.setMemberId(memberDTO.getMemberId());
			member.setMemberPassword(memberDTO.getMemberPassword());
			member.setMemberName(memberDTO.getMemberName());
			member.setMemberEmail(memberDTO.getMemberEmail());
			member.setMemberBirth(memberDTO.getMemberBirth());
			
			result = 1;
        } catch (Exception e) {
			log.info("[update] Exception!!");
		}
        
        log.info("[MemberService] updateProfile End ===================================");
        return (result > 0) ? "프로필 업데이트 성공" : "프로필 업데이트 실패";
	}
}