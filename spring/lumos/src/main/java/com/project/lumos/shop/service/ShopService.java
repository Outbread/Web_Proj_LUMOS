package com.project.lumos.shop.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.lumos.order.service.OrderService;
import com.project.lumos.shop.dto.ShopDTO;
import com.project.lumos.shop.entity.Shop;
import com.project.lumos.shop.repository.ShopRepository;

@Service
public class ShopService {

	private static final Logger log = LoggerFactory.getLogger(OrderService.class);
	private final ShopRepository shopRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public ShopService(ShopRepository shopRepository, ModelMapper modelMapper) {
		this.shopRepository = shopRepository;
		this.modelMapper = modelMapper;
	}

	public Object selectShopInfo() {
		List<Shop> shopInfo = shopRepository.findAll();
		return modelMapper.map(shopInfo, ShopDTO.class);
	}
	
}