package com.project.lumos.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.lumos.common.ResponseDTO;
import com.project.lumos.member.dto.MemberDTO;
import com.project.lumos.member.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class MemberController {
	
	private final MemberService memberService;
	
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	//==================================마이페이지 프로필[전진이]================================================//
//	@Operation(summary = "프로필 조회 요청", description = "회원 한명이 조회됩니다.", tags = { "MemberController" })
//	@GetMapping("/profileUpdate/{memberCode}")
//	public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable int memberCode) {
//		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.selectProfile(memberCode)));
//	}
	
	@Operation(summary = "프로필 조회 요청", description = "회원 한명이 조회됩니다.", tags = { "MemberController" })
	@GetMapping("/profileUpdate/{memberId}")
	public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable String memberId) {
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.selectMyInfo(memberId)));
	}
	
	@Operation(summary = "프로필 수정 요청", description = "프로필 수정이 진행됩니다.", tags = { "MemberController" })
    @PutMapping(value = "/profileUpdate")
    public ResponseEntity<ResponseDTO> updateProduct(@ModelAttribute MemberDTO memberDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상품 수정 성공",  memberService.updateProfile(memberDTO)));
    }
}
	
	
