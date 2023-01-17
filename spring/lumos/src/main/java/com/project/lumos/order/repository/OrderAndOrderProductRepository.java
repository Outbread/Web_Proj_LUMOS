package com.project.lumos.order.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.order.entity.OrderAndOrderProduct;

public interface OrderAndOrderProductRepository extends JpaRepository<OrderAndOrderProduct, Integer> {

	List<OrderAndOrderProduct> findByStOrder(String c);

	Page<OrderAndOrderProduct> findByStOrder(String string, Pageable paging);

	OrderAndOrderProduct findByOrderCode(String orderCode);

}