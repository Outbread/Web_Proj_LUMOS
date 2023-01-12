package com.project.lumos.product.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "TBL_PRODUCT")
@SequenceGenerator(
	name = "PRODUCT_SEQ_GENERATOR",
	sequenceName = "SEQ_PRODUCT_CODE",
	initialValue = 1, allocationSize = 1
)
public class Product {
	
	@Id
	@Column(name = "PRODUCT_CODE")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "PRODUCT_SEQ_GENERATOR"
	)
	private int productCode;
	
	@Column(name = "PRODUCT_NAME")
    private String productName;
	
	@Column(name = "PRODUCT_PRICE")
    private String productPrice;
	
	@Column(name = "PRODUCT_DESCRIPTION")
    private String productDescription;
	
	@Column(name = "PRODUCT_ORDERABLE")
    private String productOrderable;
	
	@Column(name = "CATEGORY_CODE")
	private int categoryCode;

	@Column(name = "PRODUCT_IMAGE_URL")
    private String productImageUrl;
	
	@Column(name = "PRODUCT_STOCK")
    private Long productStock;

	public Product() {
	}

	public Product(int productCode, String productName, String productPrice, String productDescription,
			String productOrderable, int categoryCode, String productImageUrl, Long productStock) {
		this.productCode = productCode;
		this.productName = productName;
		this.productPrice = productPrice;
		this.productDescription = productDescription;
		this.productOrderable = productOrderable;
		this.categoryCode = categoryCode;
		this.productImageUrl = productImageUrl;
		this.productStock = productStock;
	}

	public int getProductCode() {
		return productCode;
	}

	public void setProductCode(int productCode) {
		this.productCode = productCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(String productPrice) {
		this.productPrice = productPrice;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public String getProductOrderable() {
		return productOrderable;
	}

	public void setProductOrderable(String productOrderable) {
		this.productOrderable = productOrderable;
	}

	public int getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(int categoryCode) {
		this.categoryCode = categoryCode;
	}

	public String getProductImageUrl() {
		return productImageUrl;
	}

	public void setProductImageUrl(String productImageUrl) {
		this.productImageUrl = productImageUrl;
	}

	public Long getProductStock() {
		return productStock;
	}

	public void setProductStock(Long productStock) {
		this.productStock = productStock;
	}

	@Override
	public String toString() {
		return "Product [productCode=" + productCode + ", productName=" + productName + ", productPrice=" + productPrice
				+ ", productDescription=" + productDescription + ", productOrderable=" + productOrderable
				+ ", categoryCode=" + categoryCode + ", productImageUrl=" + productImageUrl + ", productStock="
				+ productStock + "]";
	}
}
