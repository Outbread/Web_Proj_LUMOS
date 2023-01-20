package com.project.lumos.company.dto;

public class CompanyDTO {

//	BSR_NUM			NUMBER				사업자 등록 번호
//	CP_NM			VARCHAR2(100 BYTE)	상호
//	RP_NM			VARCHAR2(100 BYTE)	대표자 성명
//	CP_TEL			VARCHAR2(100 BYTE)	대표 전화
//	BS_TYPE			VARCHAR2(100 BYTE)	업태
//	BS_ITEM			VARCHAR2(100 BYTE)	종목
//	CP_ADS_NUM		VARCHAR2(100 BYTE)	사업장 우편번호
//	CP_ADS			VARCHAR2(100 BYTE)	사업장 주소
//	CP_ADS_DETAIL	VARCHAR2(100 BYTE)	사업장 상세 주소
//	CP_EMAIL		VARCHAR2(100 BYTE)	이메일

	private int BsrNum;
	private String CpNm;
	private String RpNm;
	private String CpTel;
	private String BsType;
	private String BsItem;
	private String CpAdsNum;
	private String CpAds;
	private String CpAdsDetail;
	private String CpEmail;
	
	public CompanyDTO() {
	}

	public CompanyDTO(int bsrNum, String cpNm, String rpNm, String cpTel, String bsType, String bsItem, String cpAdsNum,
			String cpAds, String cpAdsDetail, String cpEmail) {
		BsrNum = bsrNum;
		CpNm = cpNm;
		RpNm = rpNm;
		CpTel = cpTel;
		BsType = bsType;
		BsItem = bsItem;
		CpAdsNum = cpAdsNum;
		CpAds = cpAds;
		CpAdsDetail = cpAdsDetail;
		CpEmail = cpEmail;
	}

	public int getBsrNum() {
		return BsrNum;
	}

	public void setBsrNum(int bsrNum) {
		BsrNum = bsrNum;
	}

	public String getCpNm() {
		return CpNm;
	}

	public void setCpNm(String cpNm) {
		CpNm = cpNm;
	}

	public String getRpNm() {
		return RpNm;
	}

	public void setRpNm(String rpNm) {
		RpNm = rpNm;
	}

	public String getCpTel() {
		return CpTel;
	}

	public void setCpTel(String cpTel) {
		CpTel = cpTel;
	}

	public String getBsType() {
		return BsType;
	}

	public void setBsType(String bsType) {
		BsType = bsType;
	}

	public String getBsItem() {
		return BsItem;
	}

	public void setBsItem(String bsItem) {
		BsItem = bsItem;
	}

	public String getCpAdsNum() {
		return CpAdsNum;
	}

	public void setCpAdsNum(String cpAdsNum) {
		CpAdsNum = cpAdsNum;
	}

	public String getCpAds() {
		return CpAds;
	}

	public void setCpAds(String cpAds) {
		CpAds = cpAds;
	}

	public String getCpAdsDetail() {
		return CpAdsDetail;
	}

	public void setCpAdsDetail(String cpAdsDetail) {
		CpAdsDetail = cpAdsDetail;
	}

	public String getCpEmail() {
		return CpEmail;
	}

	public void setCpEmail(String cpEmail) {
		CpEmail = cpEmail;
	}

	@Override
	public String toString() {
		return "CompanyDTO [BsrNum=" + BsrNum + ", CpNm=" + CpNm + ", RpNm=" + RpNm + ", CpTel=" + CpTel + ", BsType="
				+ BsType + ", BsItem=" + BsItem + ", CpAdsNum=" + CpAdsNum + ", CpAds=" + CpAds + ", CpAdsDetail="
				+ CpAdsDetail + ", CpEmail=" + CpEmail + "]";
	}

}