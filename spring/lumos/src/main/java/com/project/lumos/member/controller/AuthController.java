package com.project.lumos.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.lumos.common.ResponseDTO;
import com.project.lumos.member.dto.MemberDTO;
import com.project.lumos.member.service.AuthService;


@RestController
@RequestMapping("/auth")

public class AuthController {
	private final AuthService authService;
	
	@Autowired
	public AuthController(AuthService authService) {
		this.authService = authService;
	}
	
	//=================================로그인=========================================//
	@PostMapping("/login")
	public ResponseEntity<ResponseDTO> login(@RequestBody MemberDTO memberDTO){
		return ResponseEntity
				.ok()
				.body(new ResponseDTO(HttpStatus.OK, "˗ˋˏ 로그인 성공 ˎˊ˗", authService.login(memberDTO)));
	}
	
	//=================================회원가입=========================================//
	@PostMapping("/signup")
	public ResponseEntity<ResponseDTO> signup(@RequestBody MemberDTO memberDTO){
		return ResponseEntity
				.ok()
				.body(new ResponseDTO(HttpStatus.CREATED, "˗ˋˏ 회원가입 성공 ˎˊ˗", authService.signup(memberDTO)));
	}
}
