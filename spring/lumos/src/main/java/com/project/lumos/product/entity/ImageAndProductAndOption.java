package com.project.lumos.product.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCT_IMAGE")
public class ImageAndProductAndOption {

	@Id
	@Column(name = "IMG_NUM")
	private int imgNum;
	
	@Column(name = "PD_IMG_PATH")
	private String pdImgPath;
	
	@Column(name = "PD_CODE")
	private int pdCode;
	
	@Column(name = "MAIN_IMG")
	private String mainImg;
	
	@OneToMany
	@JoinColumn(name = "PD_CODE")
	private List<Product> product;
	
	@OneToMany
	@JoinColumn(name = "PD_CODE")
	private List<Option> option;

	public ImageAndProductAndOption() {
		super();
	}

	public ImageAndProductAndOption(int imgNum, String pdImgPath, int pdCode, String mainImg, List<Product> product,
			List<Option> option) {
		super();
		this.imgNum = imgNum;
		this.pdImgPath = pdImgPath;
		this.pdCode = pdCode;
		this.mainImg = mainImg;
		this.product = product;
		this.option = option;
	}

	public int getImgNum() {
		return imgNum;
	}

	public void setImgNum(int imgNum) {
		this.imgNum = imgNum;
	}

	public String getPdImgPath() {
		return pdImgPath;
	}

	public void setPdImgPath(String pdImgPath) {
		this.pdImgPath = pdImgPath;
	}

	public int getPdCode() {
		return pdCode;
	}

	public void setPdCode(int pdCode) {
		this.pdCode = pdCode;
	}

	public String getMainImg() {
		return mainImg;
	}

	public void setMainImg(String mainImg) {
		this.mainImg = mainImg;
	}

	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product = product;
	}

	public List<Option> getOption() {
		return option;
	}

	public void setOption(List<Option> option) {
		this.option = option;
	}

	@Override
	public String toString() {
		return "ImageAndProductAndOption [imgNum=" + imgNum + ", pdImgPath=" + pdImgPath + ", pdCode=" + pdCode
				+ ", mainImg=" + mainImg + ", product=" + product + ", option=" + option + "]";
	}
	
	
}
