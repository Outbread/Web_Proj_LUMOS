package com.project.lumos.order.service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.project.lumos.common.Criteria;
import com.project.lumos.member.repository.MemberRepository;
import com.project.lumos.order.dto.OrderAndOrderProductDTO;
import com.project.lumos.order.dto.OrderDTO;
import com.project.lumos.order.dto.OrderProductDTO;
import com.project.lumos.order.entity.Order;
import com.project.lumos.order.entity.OrderAndOrderProduct;
import com.project.lumos.order.entity.OrderProduct;
import com.project.lumos.order.repository.OrderAndOrderProductRepository;
import com.project.lumos.order.repository.OrderProductRepository;
import com.project.lumos.order.repository.OrderRepository;

@Service
public class OrderService {
	
	private static final Logger log = LoggerFactory.getLogger(OrderService.class);
	private final MemberRepository memberRepository;
	private final OrderAndOrderProductRepository orderAndOrderProductRepository;
	private final OrderProductRepository orderProductRepository;
	private final OrderRepository orderRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public OrderService(MemberRepository memberRepository,
			OrderAndOrderProductRepository orderAndOrderProductRepository,
			OrderProductRepository orderProductRepository, OrderRepository orderRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.orderAndOrderProductRepository = orderAndOrderProductRepository;
		this.orderProductRepository = orderProductRepository;
		this.orderRepository = orderRepository;
		this.modelMapper = modelMapper;
	}

	/* [주문내역 리스트 조회] 주문 상태 여부 확인 | 주문 내역 총 갯수 반환 */
	public int selectOrderListTotal() {
		
        log.info("[OrderService] selectOrderListTotal Start ===================================");
        
        List<OrderAndOrderProduct> orderList = orderAndOrderProductRepository.findByStOrder("Y");
        
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
	        
        Page<OrderAndOrderProduct> result = orderAndOrderProductRepository.findByStOrder("Y", paging);
        List<OrderAndOrderProduct> orderList = (List<OrderAndOrderProduct>)result.getContent();
        
        log.info("[OrderService] orderList ▶ {}", orderList);
        
        log.info("[OrderService] selectOrderListWithPaging End ===================================");
        
        return orderList.stream().map(order -> modelMapper.map(order, OrderAndOrderProductDTO.class)).collect(Collectors.toList());
        
	}

	/* [주문내역 상세 조회] */
	public Object selectOrderByOrderCode(String orderCode) {
		
		log.info("[OrderService] selectOrderByOrderCode Start ===================================");
		
        OrderAndOrderProduct orderDetail = orderAndOrderProductRepository.findByOrderCode(orderCode);
        
        log.info("[OrderService] orderDetail ▶ {}", orderDetail);
        
        log.info("[OrderService] selectOrderByOrderCode End ===================================");
        
        return modelMapper.map(orderDetail, OrderAndOrderProductDTO.class);
        
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
			int cartNum = cart.getOrderNum();
			log.info("[OrderService] ★cartNum ▶ {}", cartNum);
			
			/* 기존 장바구니의 (가상) 주문번호 매핑 */
			orderProductDTO.setOrderNum(cartNum);
			
			OrderProduct addItem = modelMapper.map(orderProductDTO, OrderProduct.class);
			
			log.info("[OrderService] ★addItem ▶ {}", addItem);
			
			orderProductRepository.save(addItem);
			
		}
		
        log.info("[OrderService] createAndInsertCart End ===================================");
        
//        return modelMapper.map(orderDetail, OrderAndOrderProductDTO.class);
        return (result > 0) ? "신규 장바구니 제품 추가 성공" : "기존 장바구니 제품 추가 성공";
        
	}

}