package com.project.lumos.shop.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_SHOP")
public class Shop {

	@Id
	@Column(name = "SHOP_NM")
	private String shopNm;
	
	@Column(name = "SHOP_WEB_ADS")
	private String shopWebAds;
	
	@Column(name = "SHOP_EMAIL")
	private String shopEmail;
	
	@Column(name = "SHOP_DESC")
	private String shopDesc;
	
	@Column(name = "OM_ST")
	private String OmSt;
	
	@Column(name = "OM_NUM")
	private String OmNum;
	
	@Column(name = "CS_TEL")
	private String CsTel;
	
	@Column(name = "CS_EMAIL")
	private String CsEmail;
	
	@Column(name = "CS_HOUR")
	private String CsHour;
	
	@Column(name = "PIC_NM")
	private String PicNm;
	
	@Column(name = "PIC_TEL")
	private String PicTel;
	
	@Column(name = "PIC_EMAIL")
	private String PicEmail;

	public Shop() {
	}

	public Shop(String shopNm, String shopWebAds, String shopEmail, String shopDesc, String omSt, String omNum,
			String csTel, String csEmail, String csHour, String picNm, String picTel, String picEmail) {
		this.shopNm = shopNm;
		this.shopWebAds = shopWebAds;
		this.shopEmail = shopEmail;
		this.shopDesc = shopDesc;
		OmSt = omSt;
		OmNum = omNum;
		CsTel = csTel;
		CsEmail = csEmail;
		CsHour = csHour;
		PicNm = picNm;
		PicTel = picTel;
		PicEmail = picEmail;
	}

	public String getShopNm() {
		return shopNm;
	}

	public void setShopNm(String shopNm) {
		this.shopNm = shopNm;
	}

	public String getShopWebAds() {
		return shopWebAds;
	}

	public void setShopWebAds(String shopWebAds) {
		this.shopWebAds = shopWebAds;
	}

	public String getShopEmail() {
		return shopEmail;
	}

	public void setShopEmail(String shopEmail) {
		this.shopEmail = shopEmail;
	}

	public String getShopDesc() {
		return shopDesc;
	}

	public void setShopDesc(String shopDesc) {
		this.shopDesc = shopDesc;
	}

	public String getOmSt() {
		return OmSt;
	}

	public void setOmSt(String omSt) {
		OmSt = omSt;
	}

	public String getOmNum() {
		return OmNum;
	}

	public void setOmNum(String omNum) {
		OmNum = omNum;
	}

	public String getCsTel() {
		return CsTel;
	}

	public void setCsTel(String csTel) {
		CsTel = csTel;
	}

	public String getCsEmail() {
		return CsEmail;
	}

	public void setCsEmail(String csEmail) {
		CsEmail = csEmail;
	}

	public String getCsHour() {
		return CsHour;
	}

	public void setCsHour(String csHour) {
		CsHour = csHour;
	}

	public String getPicNm() {
		return PicNm;
	}

	public void setPicNm(String picNm) {
		PicNm = picNm;
	}

	public String getPicTel() {
		return PicTel;
	}

	public void setPicTel(String picTel) {
		PicTel = picTel;
	}

	public String getPicEmail() {
		return PicEmail;
	}

	public void setPicEmail(String picEmail) {
		PicEmail = picEmail;
	}

	@Override
	public String toString() {
		return "Shop [shopNm=" + shopNm + ", shopWebAds=" + shopWebAds + ", shopEmail=" + shopEmail + ", shopDesc="
				+ shopDesc + ", OmSt=" + OmSt + ", OmNum=" + OmNum + ", CsTel=" + CsTel + ", CsEmail=" + CsEmail
				+ ", CsHour=" + CsHour + ", PicNm=" + PicNm + ", PicTel=" + PicTel + ", PicEmail=" + PicEmail + "]";
	}
	
}