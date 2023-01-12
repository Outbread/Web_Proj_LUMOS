package com.project.lumos.product.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.product.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Integer>{

	List<Product> findByProductOrderable(String status);
	
	Page<Product> findByProductOrderable(String status, Pageable paging);
	
	List<Product> findByProductNameContaining(String search);

	List<Product> findByCategoryCode(int categoryCode);

}
