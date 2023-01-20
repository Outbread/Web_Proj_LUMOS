package com.project.lumos.shop.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.lumos.common.ResponseDTO;
import com.project.lumos.company.service.CompanyService;
import com.project.lumos.order.controller.OrderController;
import com.project.lumos.shop.service.ShopService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class ShopController {

	private static final Logger log = LoggerFactory.getLogger(OrderController.class);
	private final ShopService shopService;
	
	@Autowired
	public ShopController(ShopService shopService) {
		this.shopService = shopService;
	}

	@Operation(summary = "[푸터]", description = "쇼핑몰 정보 조회", tags = {"OrderController"})
	@GetMapping(value = {"/shop"})
	public ResponseEntity<ResponseDTO> selectShopInfo() {
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "사업자 정보 조회 성공",  shopService.selectShopInfo()));
	}
	
}