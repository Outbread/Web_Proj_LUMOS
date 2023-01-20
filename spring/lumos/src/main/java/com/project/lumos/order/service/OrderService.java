package com.project.lumos.order.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.project.lumos.common.Criteria;
import com.project.lumos.member.repository.MemberRepository;
import com.project.lumos.order.dto.OrderAndOrderProductAndMemberDTO;
import com.project.lumos.order.dto.OrderDTO;
import com.project.lumos.order.dto.OrderProductDTO;
import com.project.lumos.order.dto.SearchTitleDTO;
import com.project.lumos.order.dto.UpdateHistoryDTO;
import com.project.lumos.order.entity.Order;
import com.project.lumos.order.entity.OrderAndOrderProductAndMember;
import com.project.lumos.order.entity.OrderProduct;
import com.project.lumos.order.repository.OrderAndOrderProductAndMemberRepository;
import com.project.lumos.order.repository.OrderProductRepository;
import com.project.lumos.order.repository.OrderRepository;
import com.project.lumos.product.repository.OptionRepository;
import com.project.lumos.product.repository.ProductRepository;

@Service
public class OrderService {
	
	private static final Logger log = LoggerFactory.getLogger(OrderService.class);
	private final MemberRepository memberRepository;
	private final OrderAndOrderProductAndMemberRepository orderAndOrderProductAndMemberRepository;
	private final OrderProductRepository orderProductRepository;
	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;
	private final OptionRepository optionRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public OrderService(MemberRepository memberRepository,
			OrderAndOrderProductAndMemberRepository orderAndOrderProductAndMemberRepository,
			OrderProductRepository orderProductRepository, OrderRepository orderRepository,
			ProductRepository productRepository, OptionRepository optionRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.orderAndOrderProductAndMemberRepository = orderAndOrderProductAndMemberRepository;
		this.orderProductRepository = orderProductRepository;
		this.orderRepository = orderRepository;
		this.productRepository = productRepository;
		this.optionRepository = optionRepository;
		this.modelMapper = modelMapper;
	}
	
	@Value("${image.image-url}")
	private String IMAGE_URL;

	/* [주문내역 리스트 조회] 주문 상태 여부 확인 | 주문 내역 총 갯수 반환 */
	public int selectOrderListTotal() {
		
        log.info("[OrderService] selectOrderListTotal Start ===================================");
        
        List<OrderAndOrderProductAndMember> orderList = orderAndOrderProductAndMemberRepository.findByStOrder("Y");
        
        log.info("[OrderService] orderList.size() ▶ {}", orderList.size());
        
        log.info("[OrderService] selectOrderListTotal End ===================================");
        
        return orderList.size();
        
	}

	/* [주문내역 리스트 조회] 주문 상태 여부 확인 | 페이징 처리된 주문내역 리스트 반환 */
	public Object selectOrderListWithPaging(Criteria cri) {
		
		log.info("[OrderService] selectOrderListWithPaging Start ===================================");
		
		int index = cri.getPageNum() - 1;
        int count = cri.getAmount(); 
        Pageable paging = PageRequest.of(index, count, Sort.by("orderNum").descending());
	        
        Page<OrderAndOrderProductAndMember> result = orderAndOrderProductAndMemberRepository.findByStOrder("Y", paging);
        List<OrderAndOrderProductAndMember> orderList = (List<OrderAndOrderProductAndMember>)result.getContent();
        
        log.info("[OrderService] orderList ▶ {}", orderList);
        
        log.info("[OrderService] selectOrderListWithPaging End ===================================");
        
        return orderList.stream().map(order -> modelMapper.map(order, OrderAndOrderProductAndMemberDTO.class)).collect(Collectors.toList());
        
	}

	/* [주문내역 상세 조회] */
	public Object selectOrderByOrderCode(String orderCode) {
		
		log.info("[OrderService] selectOrderByOrderCode Start ===================================");
		
		log.info("[OrderService] orderCode ▶ " + orderCode);
		
        OrderAndOrderProductAndMember orderDetail = orderAndOrderProductAndMemberRepository.findByOrderCode(orderCode);
        
        log.info("[OrderService] orderDetail ▶ {}", orderDetail);
        
        log.info("[OrderService] selectOrderByOrderCode End ===================================");
        
        return modelMapper.map(orderDetail, OrderAndOrderProductAndMemberDTO.class);
        
	}

	/* [장바구니 생성 및 상품 추가] 장바구니가 없는 경우(N) 생성, 있는 경우 추가 */
	@Transactional
	public Object createAndUpdateCart(OrderProductDTO orderProductDTO, String memberId) {
		
		log.info("[OrderService] createAndInsertCart Start ===================================");
		
		int result = 0;
		
		log.info("[OrderService] orderProductDTO ▶ {}", orderProductDTO);
		log.info("[OrderService] memberId ▶ {}", memberId);
		
		/* 로그인한 회원의 주문상태가 "N"인 장바구니 확인 및 회원정보 추출 */
//		Member memberInfo = memberRepository.findMemberByMemberId(memberId);
//		MemberDTO insertMember = modelMapper.map(memberInfo, MemberDTO.class);
		int memberCode = memberRepository.findMemberByMemberId(memberId).getMemberCode();
		
		log.info("[OrderService] memberCode ▶ {}", memberCode);
		
		// ★★★ 엔티티 자료형과 맞추어 던져주어야함 int X -> Member
		String stOrder = "N";
//		Order cart = orderRepository.findByMemberCodeAndStOrder(memberCode, stOrder);
		Order cart = orderRepository.findByMemberCodeLikeAndStOrderLike(memberCode, stOrder);
		
		log.info("[OrderService] cart ▶ {}", cart);
		
		/* 장바구니가 없는 경우 */
		if(cart == null) {
			
			log.info("[OrderService] ★ Cart is not exist ★");
			
			OrderDTO newCartDTO = new OrderDTO();
			
			log.info("[OrderService] newCartDTO ▶ {}", newCartDTO);
			
			/* 주문코드 앞쪽 생성을 위한 로직 */
			java.util.Date now = new java.util.Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			String orderCode1 = sdf.format(now);
			
			/* 주문코드 뒷쪽 생성을 위한 로직 */
			String orderCode2 = orderRepository.todayMaxOrderNum();
			String replaceOrderCode2 = "";
			
			log.info("[OrderService] replaceOrderCode2 is return ? ▶ {}", replaceOrderCode2);
			
			if(orderCode2 == null) {
				replaceOrderCode2 = "1";
			} else {
				// ex : 000001 -> 1
				replaceOrderCode2 = orderCode2.replaceAll("[0]", "");
			}
			
			log.info("[OrderService] replaceOrderCode2 ▶ {}", replaceOrderCode2);
			
			/* 6자리 숫자를 만드는 로직 */
			int diff = 6 - replaceOrderCode2.length();
			int sumOrderCode2 = Integer.valueOf(replaceOrderCode2) + 1;
			String newOrderCode2 = String.valueOf(sumOrderCode2);
			StringBuffer bufOrderCode2 = new StringBuffer(newOrderCode2);
			for(int i = 0; i < diff; i++) {
				bufOrderCode2.insert(i, "0");
			}
			
			/* 주문코드 앞쪽과 뒷쪽 합성 */
			String orderCode = orderCode1 + "-" + bufOrderCode2;
			log.info("[OrderService] orderCode ▶ {}", orderCode);
			
			/* 주문코드, 합계 금액, 주문상태, 회원코드(회원정보) 매핑 및 장바구니 생성 */
			newCartDTO.setOrderCode(orderCode);
			newCartDTO.setTotalPc(0);
			newCartDTO.setStOrder("N");
			newCartDTO.setMemberCode(memberCode);
			
			log.info("[OrderService] newCartDTO ▶ {}", newCartDTO);
			
			Order newCart = modelMapper.map(newCartDTO, Order.class);
			
			log.info("[OrderService] newCart ▶ {}", newCart);
			
			orderRepository.saveAndFlush(newCart);

			/* 
			 * ↑ [주의사항] 위의 주문 정보를 매핑하여 주문 상품 정보 저장
			 *   saveAndFlush를 사용하여 영속성 컨텍스트의 변경 내용을 디비에 반영함
			 *   => 꼭 그래야 하는 것은 아니지만 만일을 위해 대비함
			 */
			
			orderProductDTO.setOrderNum(newCart.getOrderNum());
			
			/* 메인 이미지 경로, 상품명, 옵션명 세팅 (추후에 상품 수정 시 변동되는 것을 방지하기 위함) */
			orderProductDTO.setMainImgPath(IMAGE_URL + orderProductDTO.getMainImgPath());
			orderProductDTO.setPdName(productRepository.findById(orderProductDTO.getPdCode()).get().getPdName());
			orderProductDTO.setOpName(optionRepository.findById(orderProductDTO.getOpCode()).get().getOptionNm());
			
			OrderProduct addItem = modelMapper.map(orderProductDTO, OrderProduct.class);
			
			log.info("[OrderService] addItem ▶ {}", addItem);
			
			orderProductRepository.save(addItem);
			
			/* 2개의 save가 순차적으로 이루어질 수 없다는 가정하에 단방향 save 진행 */
			/* jpql을 사용한 조회 단계를 일부러 거쳐 인서트 시킴 */
//			int insertOrderNum = orderRepository.findByOrderCode(orderCode);
//			orderProductDTO.setOrderNum(insertOrderNum);
//			OrderProduct addItem = modelMapper.map(orderProductDTO, OrderProduct.class);
//			orderProductRepository.save(addItem);
			
			result = 1;
			
		} else {
			
			log.info("[OrderService] ★ Cart is exist ★");
			
			/* 장바구니가 있는 경우 기존 장바구니 식별 번호(주문식별번호) 추출 */
			/* 기존 장바구니의 (가상) 주문번호 매핑 */
			orderProductDTO.setOrderNum(cart.getOrderNum());
			
			/* 메인 이미지 경로, 상품명, 옵션명 세팅 (추후에 상품 수정 시 변동되는 것을 방지하기 위함) */
			orderProductDTO.setMainImgPath(IMAGE_URL + orderProductDTO.getMainImgPath());
			orderProductDTO.setPdName(productRepository.findById(orderProductDTO.getPdCode()).get().getPdName());
			orderProductDTO.setOpName(optionRepository.findById(orderProductDTO.getOpCode()).get().getOptionNm());
			
			OrderProduct addItem = modelMapper.map(orderProductDTO, OrderProduct.class);
			
			log.info("[OrderService] ★addItem ▶ {}", addItem);
			
			orderProductRepository.save(addItem);
			
		}
		
        log.info("[OrderService] createAndInsertCart End ===================================");
        
        return (result > 0) ? "신규 장바구니 제품 추가 성공" : "기존 장바구니 제품 추가 성공";
        
	}

	// 수정해야할지도?
	/* [주문내역 리스트 검색] 주문 상태 여부 확인 */
	public Object searchOrderList(String search, SearchTitleDTO searchTitleDTO) {
		
		log.info("[OrderService] searchOrderList Start ===================================");
		
		log.info("[OrderService] searchTitleDTO ▶ {}", searchTitleDTO);
		log.info("[OrderService] search ▶ {}", search);
		
		String title = searchTitleDTO.getSearchTitle();
		
		List<OrderAndOrderProductAndMember> searchList = new ArrayList<>();
		switch (title) {
		case "주문번호" :
			searchList = orderAndOrderProductAndMemberRepository.findByOrderCodeContaining(search);
			break;
		case "구매자명" :
			searchList = orderAndOrderProductAndMemberRepository.findByOrderCodeContaining(search);
			break;
			
		case "구매자 아이디" :
			searchList = orderAndOrderProductAndMemberRepository.findByOrderCodeContaining(search);
			break;
		case "구매자 연락처" :
			searchList = orderAndOrderProductAndMemberRepository.findByOrderCodeContaining(search);
			break;
		case "수취인명" :
			searchList = orderAndOrderProductAndMemberRepository.findByOrderCodeContaining(search);
			break;
		case "수취인 연락처" :
			searchList = orderAndOrderProductAndMemberRepository.findByOrderCodeContaining(search);
			break;
		default:
			break;
		}
        
        log.info("[OrderService] searchOrderList End ===================================");
        
        return searchList.stream().map(order -> modelMapper.map(order, OrderAndOrderProductAndMemberDTO.class)).collect(Collectors.toList());
        
	}

	/* [주문내역 상세 수정] 배송 정보 또는 상태 정보 수정 */
	/*
	 * 방법 1 : 화면단에서 스토어에서 관리되는 시퀀스를 DTO에 담아 가져오기
	 * 방법 2 : 해당 테이블에서 주문번호는 시퀀스와 같은개념이므로 그냥 사용
	 */
	@Transactional
	public Object updateOrderDelivery(OrderDTO orderDTO, String orderCode) {
		
		log.info("[OrderService] updateOrderDelivery Start ===================================");
		
		log.info("[OrderService] update ▶ " + orderDTO);
		log.info("[OrderService] update ▶ " + orderDTO.getDeliveryEnd());
		
		int result = 0;
		
		try {
			Order originOrder = orderRepository.findByOrderCode(orderCode);
			originOrder.setDeliveryCp(orderDTO.getDeliveryCp());
			originOrder.setDeliveryNum(orderDTO.getDeliveryNum());
			
			orderRepository.save(originOrder);
			result = 1;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
        log.info("[OrderService] updateOrderDelivery End ===================================");
        
        return (result > 0) ? "배송 정보 수정 성공" : "배송 정보 수정 실패";
        
	}
	
	/* [주문내역 상세 수정] 배송 정보 수정에 따른 날짜 정보 입력 */
	@Transactional
	public Object updateHistory(String orderCode, UpdateHistoryDTO updateHistoryDTO) {
		
		log.info("[OrderService] updateHistory Start ===================================");
		
		int result = 0;
		
		try {
			Order originOrder = orderRepository.findByOrderCode(orderCode);
			
			log.info("[OrderService] order.getDeliveryEnd()  ▶ " + originOrder.getDeliveryEnd());
			
			/* util date 생성 및 포맷 */
			java.util.Date utilDate = new java.util.Date();
			java.sql.Timestamp sqlTimeStamp = new java.sql.Timestamp(utilDate.getTime());
			
			log.info("[OrderService] utilDate ▶ " + utilDate);
			log.info("[OrderService] sqlTimeStamp ▶ " + sqlTimeStamp);
			
			switch(updateHistoryDTO.getUpdateKind()) {
				case "발주확인" :
					originOrder.setOrderConf(sqlTimeStamp);
					orderRepository.save(originOrder);
					break;
				// 모달로 입력받아 수정 로직 추가
				case "송장번호입력/수정" : 
					if(originOrder.getStClaim().equals("배송중")) break;
					else {
						originOrder.setStClaim("배송중");
						originOrder.setDeliveryStart(sqlTimeStamp);
						orderRepository.save(originOrder);
						break;
					}
				// 모달로 입력받아 수정 로직 추가
				case "배송지수정" : break;
				case "배송완료처리" : 
					originOrder.setStClaim("배송완료");
					originOrder.setDeliveryEnd(sqlTimeStamp);
					orderRepository.save(originOrder);
					break;
				case "주문취소처리" : 
					originOrder.setStClaim("주문취소");
					orderRepository.save(originOrder);
					break;
				case "반품접수" :
					originOrder.setStClaim("반품접수");
					orderRepository.save(originOrder);
					break;
				case "반품완료처리" :
					originOrder.setStClaim("반품완료");
					orderRepository.save(originOrder);
					break;
			}
			
			result = 1;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

        log.info("[OrderService] updateHistory End ===================================");
        
        return (result > 0) ? "날짜 수정(입력) 성공" : "날짜 수정(입력) 실패";
        
	}

}