package com.project.lumos.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.lumos.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer>{
//========================================회원가입=============================================//
	Member findByMemberId(String string);

	Member findByMemberEmail(String memberEmail);

	@Query("SELECT MAX(a.memberCode) FROM Member a")
	int maxMemberCode();
	 
	@Query(value = "SELECT MEMBER_CODE FROM TBL_MEMBER WHERE MEMBER_ID = :memberId", nativeQuery = true)
	public int findMemberCodeByMemberId(String memberId);
}
