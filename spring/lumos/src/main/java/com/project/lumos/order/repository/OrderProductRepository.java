package com.project.lumos.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.order.entity.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {

}