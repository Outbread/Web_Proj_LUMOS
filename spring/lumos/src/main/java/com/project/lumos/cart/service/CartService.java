package com.project.lumos.cart.service;

import java.text.SimpleDateFormat;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.lumos.cart.dto.ChangeValueDTO;
import com.project.lumos.member.repository.MemberRepository;
import com.project.lumos.order.dto.OrderAndOrderProductAndMemberDTO;
import com.project.lumos.order.dto.OrderDTO;
import com.project.lumos.order.dto.OrderProductDTO;
import com.project.lumos.order.entity.Order;
import com.project.lumos.order.entity.OrderAndOrderProductAndMember;
import com.project.lumos.order.entity.OrderProduct;
import com.project.lumos.order.repository.OrderAndOrderProductAndMemberRepository;
import com.project.lumos.order.repository.OrderProductRepository;
import com.project.lumos.order.repository.OrderRepository;
import com.project.lumos.order.service.OrderService;
import com.project.lumos.product.repository.OptionRepository;
import com.project.lumos.product.repository.ProductRepository;

@Service
public class CartService {

	private static final Logger log = LoggerFactory.getLogger(OrderService.class);
	private final MemberRepository memberRepository;
	private final OrderAndOrderProductAndMemberRepository orderAndOrderProductAndMemberRepository;
	private final OrderProductRepository orderProductRepository;
	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;
	private final OptionRepository optionRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public CartService(MemberRepository memberRepository,
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
	
	/* [장바구니 생성 및 상품 추가] 장바구니가 없는 경우(N) 생성, 있는 경우 추가 */
	@Transactional
	public Object createAndUpdateCart(String memberId, OrderProductDTO orderProductDTO) {
		
		log.info("[CartService] createAndInsertCart Start ===================================");
		
		int result = 0;
		
		log.info("[CartService] orderProductDTO ▶ {}", orderProductDTO);
		log.info("[CartService] memberId ▶ {}", memberId);
		
		/* 로그인한 회원의 주문상태가 "N"인 장바구니 확인 및 회원정보 추출 */
		int memberCode = memberRepository.findMemberByMemberId(memberId).getMemberCode();
		
		log.info("[CartService] memberCode ▶ {}", memberCode);
		
		// ★★★ 엔티티 자료형과 맞추어 던져주어야함 int X -> Member
		String stOrder = "N";
		Order cart = orderRepository.findByMemberCodeLikeAndStOrderLike(memberCode, stOrder);
		
		log.info("[CartService] cart ▶ {}", cart);
		
		/* 장바구니가 없는 경우 */
		if(cart == null) {
			
			log.info("[CartService] ★ Cart is not exist ★");
			
			OrderDTO newCartDTO = new OrderDTO();
			
			log.info("[CartService] newCartDTO ▶ {}", newCartDTO);
			
			/* 주문코드 앞쪽 생성을 위한 로직 */
			java.util.Date now = new java.util.Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			String orderCode1 = sdf.format(now);
			
			/* 주문코드 뒷쪽 생성을 위한 로직 */
			String orderCode2 = orderRepository.todayMaxOrderNum();
			String replaceOrderCode2 = "";
			
			log.info("[CartService] replaceOrderCode2 is return ? ▶ {}", replaceOrderCode2);
			
			if(orderCode2 == null) {
				replaceOrderCode2 = "1";
			} else {
				// ex : 000001 -> 1
				replaceOrderCode2 = orderCode2.replaceAll("[0]", "");
			}
			
			log.info("[CartService] replaceOrderCode2 ▶ {}", replaceOrderCode2);
			
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
			log.info("[CartService] orderCode ▶ {}", orderCode);
			
			/* 주문코드, 합계 금액, 주문상태, 회원코드(회원정보) 매핑 및 장바구니 생성 */
			newCartDTO.setOrderCode(orderCode);
			newCartDTO.setTotalPc(0);
			newCartDTO.setStOrder("N");
			newCartDTO.setMemberCode(memberCode);
			
			log.info("[CartService] newCartDTO ▶ {}", newCartDTO);
			
			Order newCart = modelMapper.map(newCartDTO, Order.class);
			
			log.info("[CartService] newCart ▶ {}", newCart);
			
			orderRepository.saveAndFlush(newCart);

			/* 
			 * ↑ [주의사항] 위의 주문 정보를 매핑하여 주문 상품 정보 저장
			 *   saveAndFlush를 사용하여 영속성 컨텍스트의 변경 내용을 디비에 반영함
			 *   => 꼭 그래야 하는 것은 아니지만 만일을 위해 대비함
			 */
			
			orderProductDTO.setOrderNum(newCart.getOrderNum());
			OrderProduct addItem = modelMapper.map(orderProductDTO, OrderProduct.class);
			
			log.info("[CartService] addItem ▶ {}", addItem);
			
			orderProductRepository.save(addItem);
			
			/* 2개의 save가 순차적으로 이루어질 수 없다는 가정하에 단방향 save 진행 */
			/* jpql을 사용한 조회 단계를 일부러 거쳐 인서트 시킴 */
//			int insertOrderNum = orderRepository.findByOrderCode(orderCode);
//			orderProductDTO.setOrderNum(insertOrderNum);
//			OrderProduct addItem = modelMapper.map(orderProductDTO, OrderProduct.class);
//			orderProductRepository.save(addItem);
			
			result = 1;
			
		} else {
			
			log.info("[CartService] ★ Cart is exist ★");

			/* 추가한 상품이 기존 등록된 상품과 상품코드 및 옵션코드가 일치하는 경우 수량만 증가 시킴 */
			OrderProduct selectResult = orderProductRepository.findByOrderNumAndOpCodeAndPdCodeLike(cart.getOrderNum(), orderProductDTO.getOpCode(), orderProductDTO.getPdCode());
			log.info("[CartService] ★ selectResult ★", selectResult);
			
			// 장바구니에 동일한 상품이 없는 경우
			if(selectResult == null) {
				/* 장바구니가 있는 경우 기존 장바구니 식별 번호(주문식별번호) 추출 후 매핑 */
				orderProductDTO.setOrderNum(cart.getOrderNum());
				OrderProduct addItem = modelMapper.map(orderProductDTO, OrderProduct.class);
				orderProductRepository.save(addItem);
				
				log.info("[CartService] ★ 신규 상품 addItem ▶ {}", addItem);
			// 장바구니에 동일한 상품이 있는 경우
			// 주문 수량 증가 => 기존 수량 + 추가할 수량
			} else {
				selectResult.setOrderAmount(selectResult.getOrderAmount() + orderProductDTO.getOrderAmount());
				OrderProduct addItem = modelMapper.map(selectResult, OrderProduct.class);
				orderProductRepository.save(addItem);
				
				log.info("[CartService] ★ 동일 상품 addItem ▶ {}", addItem);
			}
			
		}
		
        log.info("[CartService] createAndInsertCart End ===================================");
        
        return (result > 0) ? "신규 장바구니 제품 추가 성공" : "기존 장바구니 제품 추가 성공";
        
	}

	/* [장바구니 조회] */
	public Object selectCart(String memberId) {
		
		log.info("[CartService] selectCart Start ===================================");
		
		log.info("[CartService] memberId ▶ " + memberId);
		
		int result = 0;
		
		int memberCode = memberRepository.findMemberByMemberId(memberId).getMemberCode();
		String stOrder = "N";
		Order cart = orderRepository.findByMemberCodeLikeAndStOrderLike(memberCode, stOrder);
		
		OrderAndOrderProductAndMember orderDetail = new OrderAndOrderProductAndMember();
		
		if(cart != null) {
			orderDetail = orderAndOrderProductAndMemberRepository.findByOrderCode(cart.getOrderCode());
			result = 1;
			log.info("[CartService] orderDetail ▶ {}", orderDetail);
		} else {
			log.info("[CartService] 기존 장바구니가 없습니다.");
		}
		
        log.info("[CartService] selectOrderByOrderCode End ===================================");
        
        return (result > 0) ? modelMapper.map(orderDetail, OrderAndOrderProductAndMemberDTO.class) : "기존 장바구니 없음";
        
	}

	/* [장바구니 상품 수량 수정] */
	@Transactional
	public Object updateOrderProductAmount(String memberId, ChangeValueDTO changeValueDTO) {
		
		log.info("[CartService] updateOrderProductAmount Start ===================================");
		
		int result = 0;
		
		/* 장바구니 정보 조회 (장바구니가 없을 경우를 위해 new로 생성한 뒤 매핑) */
		int memberCode = memberRepository.findMemberByMemberId(memberId).getMemberCode();
		String stOrder = "N";
		Order cart = orderRepository.findByMemberCodeLikeAndStOrderLike(memberCode, stOrder);
		OrderAndOrderProductAndMember orderDetail = new OrderAndOrderProductAndMember();
		
		if(cart != null) {
			/* 장바구니 정보 가져옴 */
			orderDetail = orderAndOrderProductAndMemberRepository.findByOrderCode(cart.getOrderCode());

			/* 주문 제품 정보 가져옴 (옵션에 해당하는 정보이므로, 주문번호와 옵션코드를 같이 조회) */
			OrderProduct orderProductInfo = orderProductRepository.findByOrderNumAndOpCodeLike(orderDetail.getOrderNum(), changeValueDTO.getOpCode());
			
//			/* 옵션 수량 가져옴 (옵션 수량보다 높은 수량은 화면단에서 막음) */
//			Option optionInfo = optionRepository.findById(changeValueDTO.getOpCode()).get();
//
//			/* 옵션 재고 수량 수정 및 저장 (기존 주문 수량과 비교하여야함) */
//			// 기존 주문 수량 < 변경 수량 => 재고 - (변경 수량 - 기존 수량) || 10 < 12 => 100 - (12 - 10) = 98
//			if(orderProductInfo.getOrderAmount() < changeValueDTO.getAmount()) {
//				optionInfo.setOptionStock(optionInfo.getOptionStock() - (changeValueDTO.getAmount() - orderProductInfo.getOrderAmount()));
//			// 기존 주문 수량 >= 변경 수량 => 재고 + (기존 수량 - 변경 수량) || 10 > 8 => 100 + (10 - 8) = 102 || 10 >= 10 => 100 + (10 - 10) = 100
//			} else {
//				optionInfo.setOptionStock(optionInfo.getOptionStock() + (orderProductInfo.getOrderAmount() - changeValueDTO.getAmount()));
//			}
//			optionRepository.save(optionInfo);

			/* 장바구니 옵션 수량 수정 및 저장 (구매 전 장바구니는 옵션을 조절할 필요 없음 & 옵션 수량보다 높은 수량은 화면단에서 막음) */
			orderProductInfo.setOrderAmount(changeValueDTO.getAmount());
			orderProductRepository.save(orderProductInfo);

			result = 1;
			log.info("[CartService] orderDetail ▶ {}", orderDetail.getOrderProductList());
		} else {
			log.info("[CartService] 수량 수정에 실패하였습니다.");
		}
		
        log.info("[CartService] updateOrderProductAmount End ===================================");
        
        return (result > 0) ? modelMapper.map(orderDetail, OrderAndOrderProductAndMemberDTO.class) : "주문 수량 수정 실패";
        
	}

	/* [장바구니 상품 삭제] */
	@Transactional
	public Object deleteOrderProduct(String memberId, String orderPdNum) {

		log.info("[CartService] deleteOrderProduct Start ===================================");
		
		int result = 0;
		
		/* 장바구니 정보 조회 (장바구니가 없을 경우를 위해 new로 생성한 뒤 매핑) */
		int memberCode = memberRepository.findMemberByMemberId(memberId).getMemberCode();
		String stOrder = "N";
		Order cart = orderRepository.findByMemberCodeLikeAndStOrderLike(memberCode, stOrder);
		OrderAndOrderProductAndMember orderDetail = new OrderAndOrderProductAndMember();
		
		if(cart != null) {
			/* 장바구니 정보 가져옴 */
			orderDetail = orderAndOrderProductAndMemberRepository.findByOrderCode(cart.getOrderCode());

			/* 주문 제품 정보 가져옴 (옵션에 해당하는 정보이므로, 주문번호와 옵션코드를 같이 조회) */
			OrderProduct orderProductInfo = orderProductRepository.findById(Integer.valueOf(orderPdNum)).get();

//			/* 옵션 수량 가져옴 (옵션 수량보다 높은 수량은 화면단에서 막음) */
//			Option optionInfo = optionRepository.findById(orderProductInfo.getOpCode()).get();
//
//			/* 옵션 재고 수량 수정 및 저장 (기존 주문 수량과 비교하여야함) */
//			// 재고 수량 + 기존 주문 수량
//			optionInfo.setOptionStock(optionInfo.getOptionStock() + orderProductInfo.getOrderAmount());
//			optionRepository.save(optionInfo);

			/* 주문 제품 삭제 */
			orderProductRepository.deleteById(orderProductInfo.getOrderPdNum());

			result = 1;
			log.info("[CartService] orderDetail ▶ {}", orderDetail.getOrderProductList());
		} else {
			log.info("[CartService] 상품 삭제를 실패하였습니다.");
		}
		
        log.info("[CartService] deleteOrderProduct End ===================================");
        
        return (result > 0) ? modelMapper.map(orderDetail, OrderAndOrderProductAndMemberDTO.class) : "상품 삭제 실패";
        
	}

}