package com.project.lumos.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.lumos.product.entity.ProductAndCategory;


public interface ProductAndCategoryRepository extends JpaRepository<ProductAndCategory, Integer>{

}
