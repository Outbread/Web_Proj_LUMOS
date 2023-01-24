package com.project.lumos.order.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.member.entity.Member;
import com.project.lumos.order.entity.OrderAndOrderProductAndMember;

public interface OrderAndOrderProductAndMemberRepository extends JpaRepository<OrderAndOrderProductAndMember, Integer> {

	List<OrderAndOrderProductAndMember> findByStOrder(String c);

	Page<OrderAndOrderProductAndMember> findByStOrder(String string, Pageable paging);

	OrderAndOrderProductAndMember findByOrderCode(String orderCode);

	List<OrderAndOrderProductAndMember> findByOrderCodeContaining(String search);

	/* 날짜 검색 */
	List<OrderAndOrderProductAndMember> findAllByOrderDateGreaterThanEqual(Timestamp sqlTimeStamp);

	/* 날짜 + 주문번호 검색 */
	List<OrderAndOrderProductAndMember> findAllByOrderDateGreaterThanEqualAndOrderCodeContaining(Timestamp sqlTimeStamp,
			String searchValue);

	/* 날짜 + 구매자명 */
	List<OrderAndOrderProductAndMember> findByOrderDateGreaterThanEqualAndMemberCodeLike(Timestamp sqlTimeStamp,
			Member member);
	
	/* 날짜 + 구매자ID */
	List<OrderAndOrderProductAndMember> findAllByOrderDateGreaterThanEqualAndCgNmContaining(Timestamp sqlTimeStamp,
			String searchValue);

	/* 날짜 + 결제방법 */
	List<OrderAndOrderProductAndMember> findAllByOrderDateGreaterThanEqualAndPaymentMtContaining(Timestamp sqlTimeStamp,
			String searchValue);

	/* 날짜 + 배송방법 */
	List<OrderAndOrderProductAndMember> findAllByOrderDateGreaterThanEqualAndDeliveryMtContaining(
			Timestamp sqlTimeStamp, String searchValue);

}