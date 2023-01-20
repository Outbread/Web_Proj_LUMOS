package com.project.lumos.product.service;

import java.util.List;
import java.util.UUID;
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
import org.springframework.web.multipart.MultipartFile;

import com.project.lumos.common.Criteria;
import com.project.lumos.product.dto.ImageAndProductDTO;
import com.project.lumos.product.dto.OptionDTO;
import com.project.lumos.product.dto.ProductDTO;
import com.project.lumos.product.dto.ProductImageDTO;
import com.project.lumos.product.dto.ProductInsertDTO;
import com.project.lumos.product.entity.ImageAndProduct;
import com.project.lumos.product.entity.Option;
import com.project.lumos.product.entity.Product;
import com.project.lumos.product.entity.ProductAndImage;
import com.project.lumos.product.entity.ProductImage;
import com.project.lumos.product.repository.ImageAndProductAndOptionRepository;
import com.project.lumos.product.repository.ImageAndProductRepository;
import com.project.lumos.product.repository.OptionRepository;
import com.project.lumos.product.repository.ProductAndImageRepository;
import com.project.lumos.product.repository.ProductImageRepository;
import com.project.lumos.product.repository.ProductInsertRepository;
import com.project.lumos.product.repository.ProductRepository;
import com.project.lumos.util.FileUploadUtils;


@Service
public class ProductService {
	
	private static final Logger log = LoggerFactory.getLogger(ProductService.class);
	private final ProductRepository productRepository;
	private final ProductAndImageRepository productAndImageRepository;
	private final ImageAndProductRepository imageAndProductRepository;
	private final ImageAndProductAndOptionRepository imageAndProductAndOptionRepository;
	private final ProductImageRepository productImageRepository;
	private final ProductInsertRepository productInsertRepository;
	private final OptionRepository optionRepository;
	private final ModelMapper modelMapper;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    
    @Value("${image.image-url}")
    private String IMAGE_URL;
	
	@Autowired
    public ProductService(ProductInsertRepository productInsertRepository, ProductRepository productRepository,OptionRepository optionRepository, ImageAndProductRepository imageAndProductRepository,ProductAndImageRepository productAndImageRepository, ImageAndProductAndOptionRepository imageAndProductAndOptionRepository,ProductImageRepository productImageRepository,  ModelMapper modelMapper) {
		this.productRepository = productRepository;
		this.modelMapper = modelMapper;
		this.productAndImageRepository = productAndImageRepository;
		this.imageAndProductRepository = imageAndProductRepository;
		this.imageAndProductAndOptionRepository = imageAndProductAndOptionRepository;
		this.productImageRepository = productImageRepository;
		this.optionRepository = optionRepository;
		this.productInsertRepository = productInsertRepository;
	}

	public int selectProductTotal() {
        log.info("[ProductService] selectProductTotal Start ===================================");
        
        List<ImageAndProduct> productList = imageAndProductRepository.findByMainImg("Y");
        
        log.info("[ProductService] selectProductTotal End ===================================");
        
        return productList.size();
    }

	public Object selectProductListWithPaging(Criteria cri) {
		log.info("[ProductService] selectProductListWithPaging Start ===================================");
		
		int index = cri.getPageNum() - 1;
        int count = cri.getAmount(); 
        Pageable paging = PageRequest.of(index, count, Sort.by("pdCode").descending());

        Page<ImageAndProduct> result = imageAndProductRepository.findByMainImg("Y", paging);
        List<ImageAndProduct> productList = (List<ImageAndProduct>)result.getContent();
        
        log.info("productList" + productList);
        
        for(int i = 0 ; i < productList.size() ; i++) {
            productList.get(i).setPdImgPath(IMAGE_URL + productList.get(i).getPdImgPath());
        }
        
        log.info("[ProductService] selectProductListWithPaging End ===================================");
        
        return productList.stream().map(product -> modelMapper.map(product, ImageAndProductDTO.class)).collect(Collectors.toList());
	}

	public Object selectProduct(int pdCode) {
		log.info("[ProductService] selectProduct Start ===================================");
		
//		ImageAndProduct product = (ImageAndProduct) imageAndProductRepository.findByPdCode(pdCode);
//		ImageAndProduct product = imageAndProductRepository.findByPdCodeAndMainImg(pdCode, "Y");
		
//		List<ProductAndImage> product = (List<ProductAndImage>) productAndImageRepository.findById(pdCode).get();
		ProductAndImage productList = productAndImageRepository.findById(pdCode).get();
//		List<ImageAndProductAndOption> product = imageAndProductAndOptionRepository.findByPdCode(pdCode);
		
		List<ProductImage> imageList = productImageRepository.findByPdCode(pdCode);
		
//		for(int i = 0; i < product.size(); i++) {
//				product.get(i).setPdImgPath(IMAGE_URL + product.get(i).getPdImgPath());			
//		}
		
		for(ProductImage image : imageList) {
			image.setPdImgPath(IMAGE_URL + image.getPdImgPath());
			modelMapper.map(imageList, ProductImageDTO.class);
		}
		
		log.info("selectProduct " + productList);
		log.info("[ProductService] selectProduct End ===================================");
		
		return modelMapper.map(productList, ProductAndImage.class);
	}
	
	@Transactional
	public Object insertProduct(ProductInsertDTO productInsertDTO, MultipartFile productImage) {
        log.info("[ProductService] insertProduct Start ===================================");
        log.info("[ProductService] INSERT : " + productInsertDTO);
        
        String imageName = UUID.randomUUID().toString().replace("-", "");
        String replaceFileName = null;
        int result = 0;
        
        ProductDTO pdDTO = new ProductDTO();
        OptionDTO optDTO = new OptionDTO();
        ProductImageDTO imageDTO = new ProductImageDTO();
        
        pdDTO.setPdName(productInsertDTO.getPdName());
        pdDTO.setPdPrice(productInsertDTO.getPdPrice());
        pdDTO.setPdDesc(productInsertDTO.getPdDesc());
        pdDTO.setCatMain(productInsertDTO.getCatMain());
        pdDTO.setCatSub(productInsertDTO.getCatSub());
        
        log.info("[ProductService] pdDTO : " + pdDTO);        	
        
        Product insertProduct = modelMapper.map(pdDTO, Product.class);        	
        log.info("insertProduct : " + insertProduct);        	
        productRepository.saveAndFlush(insertProduct);        	
        
        int i = insertProduct.getPdCode();
        
        try {
        	replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, productImage);
        	
        	optDTO.setOptionNm(productInsertDTO.getOptionNm());
        	optDTO.setOptionStock(productInsertDTO.getOptionStock());
        	optDTO.setPdCode(i);
        	
        	log.info("[ProductService] optDTO : " + optDTO);
        	
        	Option op = modelMapper.map(optDTO, Option.class);
    		optionRepository.save(op);
    		
    		imageDTO.setPdImgPath(replaceFileName);
    		imageDTO.setMainImg(productInsertDTO.getMainImg());
    		imageDTO.setPdCode(i);
    		log.info("[ProductService] imageDTO : " + imageDTO);
    		
    		ProductImage im = modelMapper.map(imageDTO, ProductImage.class);
    		productImageRepository.save(im);
        	
        	log.info("pdcode   : " + i);
        	
            log.info("[ProductService] insert Image Name : ", replaceFileName);
            
            result = 1;

        } catch (Exception e) {
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
        }
        
        
        return (result > 0) ? "상품 입력 성공" : "상품 입력 실패";
	}

}
