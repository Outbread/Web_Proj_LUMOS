package com.project.lumos.order.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.order.entity.OrderAndOrderProductAndMember;

public interface OrderAndOrderProductAndMemberRepository extends JpaRepository<OrderAndOrderProductAndMember, Integer> {

	List<OrderAndOrderProductAndMember> findByStOrder(String c);

	Page<OrderAndOrderProductAndMember> findByStOrder(String string, Pageable paging);

	OrderAndOrderProductAndMember findByOrderCode(String orderCode);

	List<OrderAndOrderProductAndMember> findByOrderCodeContaining(String search);

}