package com.project.lumos.shop.dto;

public class ShopDTO {

//	SHOP_NM			VARCHAR2(100 BYTE)	쇼핑몰명
//	SHOP_WEB_ADS	VARCHAR2(255 BYTE)	쇼핑몰 주소
//	SHOP_EMAIL		VARCHAR2(40 BYTE)	쇼핑몰 이메일
//	SHOP_DESC		VARCHAR2(1000 BYTE)	쇼핑몰 소개
//	OM_ST			VARCHAR2(10 BYTE)	통신판매업 신고여부
//	OM_NUM			VARCHAR2(100 BYTE)	통신판매신고 번호
//	CS_TEL			VARCHAR2(100 BYTE)	고객센터 번호
//	CS_EMAIL		VARCHAR2(100 BYTE)	고객센터 이메일
//	CS_HOUR			VARCHAR2(100 BYTE)	고객센터 운영시간
//	PIC_NM			VARCHAR2(100 BYTE)	개인정보보호 책임자
//	PIC_TEL			VARCHAR2(100 BYTE)	개인정보보호 책임자 연락처
//	PIC_EMAIL		VARCHAR2(100 BYTE)	개인정보보호 책임자 이메일

	private String shopNm;
	private String shopWebAds;
	private String shopEmail;
	private String shopDesc;
	private String OmSt;
	private String OmNum;
	private String CsTel;
	private String CsEmail;
	private String CsHour;
	private String PicNm;
	private String PicTel;
	private String PicEmail;
	
	public ShopDTO() {
	}

	public ShopDTO(String shopNm, String shopWebAds, String shopEmail, String shopDesc, String omSt, String omNum,
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
		return "ShopDTO [shopNm=" + shopNm + ", shopWebAds=" + shopWebAds + ", shopEmail=" + shopEmail + ", shopDesc="
				+ shopDesc + ", OmSt=" + OmSt + ", OmNum=" + OmNum + ", CsTel=" + CsTel + ", CsEmail=" + CsEmail
				+ ", CsHour=" + CsHour + ", PicNm=" + PicNm + ", PicTel=" + PicTel + ", PicEmail=" + PicEmail + "]";
	}
	
}