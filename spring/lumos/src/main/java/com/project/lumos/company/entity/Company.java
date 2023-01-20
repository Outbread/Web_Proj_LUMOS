package com.project.lumos.company.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TBL_COMPANY")
public class Company {

	@Id
	@Column(name = "BSR_NUM")
	private int BsrNum;
	
	@Column(name = "CP_NM")
	private String CpNm;
	
	@Column(name = "RP_NM")
	private String RpNm;
	
	@Column(name = "CP_TEL")
	private String CpTel;
	
	@Column(name = "BS_TYPE")
	private String BsType;
	
	@Column(name = "BS_ITEM")
	private String BsItem;
	
	@Column(name = "CP_ADS_NUM")
	private String CpAdsNum;

	@Column(name = "CP_ADS")
	private String CpAds;
	
	@Column(name = "CP_ADS_DETAIL")
	private String CpAdsDetail;
	
	@Column(name = "CP_EMAIL")
	private String CpEmail;

	public Company() {
	}

	public Company(int bsrNum, String cpNm, String rpNm, String cpTel, String bsType, String bsItem, String cpAdsNum,
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
		return "Company [BsrNum=" + BsrNum + ", CpNm=" + CpNm + ", RpNm=" + RpNm + ", CpTel=" + CpTel + ", BsType="
				+ BsType + ", BsItem=" + BsItem + ", CpAdsNum=" + CpAdsNum + ", CpAds=" + CpAds + ", CpAdsDetail="
				+ CpAdsDetail + ", CpEmail=" + CpEmail + "]";
	}
	
}