package com.project.lumos.product.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_PRODUCT")
public class ProductAndCategory {
	@Id
	@Column(name = "PRODUCT_CODE")
	private int productCode;
	
	@Column(name = "PRODUCT_NAME")
    private String productName;
	
	@Column(name = "PRODUCT_PRICE")
    private String productPrice;
	
	@Column(name = "PRODUCT_DESCRIPTION")
    private String productDescription;
	
	@Column(name = "PRODUCT_ORDERABLE")
    private String productOrderable;
	
	@ManyToOne
	@JoinColumn(name = "CATEGORY_CODE")
	private Category category;

	@Column(name = "PRODUCT_IMAGE_URL")
    private String productImageUrl;
	
	@Column(name = "PRODUCT_STOCK")
    private Long productStock;

	public ProductAndCategory() {
	}

	public ProductAndCategory(int productCode, String productName, String productPrice, String productDescription,
			String productOrderable, Category category, String productImageUrl, Long productStock) {
		this.productCode = productCode;
		this.productName = productName;
		this.productPrice = productPrice;
		this.productDescription = productDescription;
		this.productOrderable = productOrderable;
		this.category = category;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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
		return "ProductAndCategory [productCode=" + productCode + ", productName=" + productName + ", productPrice="
				+ productPrice + ", productDescription=" + productDescription + ", productOrderable=" + productOrderable
				+ ", category=" + category + ", productImageUrl=" + productImageUrl + ", productStock=" + productStock
				+ "]";
	}
}
