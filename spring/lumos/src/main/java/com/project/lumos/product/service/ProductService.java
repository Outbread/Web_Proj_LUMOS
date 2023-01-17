package com.project.lumos.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.lumos.order.service.OrderService;
import com.project.lumos.product.dto.ProductAndImageAndOptionDTO;
import com.project.lumos.product.dto.ProductImageDTO;
import com.project.lumos.product.entity.ProductAndImageAndOption;
import com.project.lumos.product.entity.ProductImage;
import com.project.lumos.product.repository.ProductAndImageAndOptionRepository;
import com.project.lumos.product.repository.ProductImageRepository;

@Service
public class ProductService {

	private static final Logger log = LoggerFactory.getLogger(OrderService.class);
	private final ProductAndImageAndOptionRepository productAndImageAndOptionRepository;
	private final ProductImageRepository productImageRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public ProductService(ProductAndImageAndOptionRepository productAndImageAndOptionRepository,
			ModelMapper modelMapper, ProductImageRepository productImageRepository) {
		this.productAndImageAndOptionRepository = productAndImageAndOptionRepository;
		this.productImageRepository = productImageRepository;
		this.modelMapper = modelMapper;
	}
	
	/* 제품 목록 조회 */
	public Object selectProductList() {
		log.info("[ProductService] selectProductList Start ==============================");
		
        List<ProductAndImageAndOption> productList = productAndImageAndOptionRepository.findAll();
        
        log.info("[ProductService] productList {}", productList);

        log.info("[ProductService] selectProductList End ==============================");
        
        return productList.stream().map(pro -> modelMapper.map(pro, ProductAndImageAndOptionDTO.class)).collect(Collectors.toList());
	}

	/* 제품 상세 조회 */
	public Object selectProductInfo(int pdCode) {
		
        ProductAndImageAndOption productInfo = productAndImageAndOptionRepository.findById(pdCode).get();
        
        List<ProductImage> imageList = productImageRepository.findByPdCodeLike(pdCode);
        
        for(ProductImage image : imageList) {
        	String newPath = "새롭지★" + image.getPdImgPath();
        	image.setPdImgPath(newPath);
        	modelMapper.map(image, ProductImageDTO.class);
        	log.info("[ProductService] image {}", image);
        }
        
        log.info("[ProductService] productInfo {}", productInfo);
//        log.info("[ProductService] productInfo {}", productInfo.getProductImageList());
//        log.info("[ProductService] imageList {}", imageList);

        return modelMapper.map(productInfo, ProductAndImageAndOption.class);
	}
}