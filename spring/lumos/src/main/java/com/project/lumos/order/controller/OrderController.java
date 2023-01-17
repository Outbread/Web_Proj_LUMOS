package com.project.lumos.order.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.lumos.common.Criteria;
import com.project.lumos.common.PageDTO;
import com.project.lumos.common.PagingResponseDTO;
import com.project.lumos.common.ResponseDTO;
import com.project.lumos.order.dto.OrderProductDTO;
import com.project.lumos.order.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class OrderController {

	private static final Logger log = LoggerFactory.getLogger(OrderController.class);
	private final OrderService orderService;
	
	@Autowired
	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}
	
	/* [장바구니 생성 및 상품 추가] 장바구니가 없는 경우(N) 생성, 있는 경우 추가 */
	// ★★★ @RequestBody => 안 달면 값 안넘어옴
	@Operation(summary = "[회원] 장바구니 생성", description = "장바구니 조회 또는 생성 후 상품 추가", tags = {"OrderController"})
	@PostMapping("/cart/{memberId}")
	public ResponseEntity<ResponseDTO> insertCart(@PathVariable String memberId , @RequestBody OrderProductDTO orderProductDTO ) {
		
		log.info("[OrderController] memberId ▶ " + memberId);
		log.info("[OrderController] orderProductDTO ▶ " + orderProductDTO);
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "장바구니 상품 추가 성공", orderService.createAndUpdateCart(orderProductDTO, memberId)));
		
	}
	
	/* [주문내역 리스트 조회] 주문 상태 여부 확인 */
	@Operation(summary = "[관리자] 주문 내역 조회", description = "전체 주문내역 조회 및 페이징 처리", tags = {"OrderController"})
	@GetMapping("/order/list")
	public ResponseEntity<ResponseDTO> selectOrderListWithPaging(@RequestParam(name = "offset", defaultValue = "1") String offset) {
		
		int total = orderService.selectOrderListTotal();
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
		
		pagingResponseDTO.setData(orderService.selectOrderListWithPaging(cri));
		
		pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
		
	}
	
	/* [주문내역 상세 조회] 주문 상태 여부 확인 */
	@Operation(summary = "[관리자] 주문 내역 상세 조회", description = "주문번호별 주문내역 조회", tags = {"OrderController"})
//	@GetMapping(value = {"/order/{orderCode}", "/mypage/{memberCode}/{orderCode}"})
	@GetMapping(value = {"/order/{orderCode}"})
	public ResponseEntity<ResponseDTO> selectOrderByOrderCode(@PathVariable String orderCode) {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "주문 내역 상세 조회 성공",  orderService.selectOrderByOrderCode(orderCode)));
		
	}
	
}