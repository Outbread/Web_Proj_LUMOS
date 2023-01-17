package com.project.lumos.product.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.lumos.common.ResponseDTO;
import com.project.lumos.order.controller.OrderController;
import com.project.lumos.product.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class ProductController {
	
	private static final Logger log = LoggerFactory.getLogger(OrderController.class);
	private final ProductService productService;
	
	@Autowired
	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@Operation(summary = "상품 조회", description = "상품 전체 리스트 조회", tags = {"ProductController"})
	@GetMapping("/product")
	public ResponseEntity<ResponseDTO> selectOrderList() {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "주문 내역 조회 성공",  productService.selectProductList()));
	}
	
	@Operation(summary = "상품 상세 조회", description = "상품 상세 조회", tags = {"ProductController"})
	@GetMapping("/product/{pdCode}")
	public ResponseEntity<ResponseDTO> selectProductInfo(@PathVariable int pdCode) {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "주문 내역 상세 조회 성공",  productService.selectProductInfo(pdCode)));
	}
}
