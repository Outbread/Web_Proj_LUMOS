package com.project.lumos.member.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.lumos.member.entity.Member;
import com.project.lumos.product.entity.ProductImage;

public interface MemberRepository extends JpaRepository<Member, Integer>{
	//=====================[전진이]====================//
	Member findByMemberId(String string); 		
//	Member findByMemberEmail(String memberEmail);
	@Query("SELECT MAX(a.memberCode) FROM Member a")
	int maxMemberCode();
	
	//중복체크
//	List<Member> findByduplicatedId(String memberId);
//	Member findByduplicatedId(String memberId);
	
	/* [구도연] */
	Member findMemberByMemberId(String memberId);

}