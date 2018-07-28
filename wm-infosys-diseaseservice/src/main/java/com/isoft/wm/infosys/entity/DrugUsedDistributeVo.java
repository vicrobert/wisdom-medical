package com.isoft.wm.infosys.entity;

public class DrugUsedDistributeVo {
	private String markedName;
	private String community;
	private Integer saleYear;
	private Integer saleMonth;
	private Long saleNum;

	public DrugUsedDistributeVo(Integer saleYear, Long saleNum, String markedName,
			String community) {
		this.saleYear = saleYear;
		this.saleNum = saleNum;
		this.markedName = markedName;
		this.community = community;
	}
	public DrugUsedDistributeVo(Integer saleYear, Integer saleMonth, Long saleNum,
			String markedName, String community) {
		this.saleYear = saleYear;
		this.saleMonth = saleMonth;
		this.saleNum = saleNum;
		this.markedName = markedName;
		this.community = community;
	}

	public String getMarkedName() {
		return markedName;
	}
	public void setMarkedName(String markedName) {
		this.markedName = markedName;
	}
	public String getCommunity() {
		return community;
	}
	public void setCommunity(String community) {
		this.community = community;
	}
	public Integer getSaleYear() {
		return saleYear;
	}
	public void setSaleYear(Integer saleYear) {
		this.saleYear = saleYear;
	}
	public Integer getSaleMonth() {
		return saleMonth;
	}
	public void setSaleMonth(Integer saleMonth) {
		this.saleMonth = saleMonth;
	}
	public Long getSaleNum() {
		return saleNum;
	}
	public void setSaleNum(Long saleNum) {
		this.saleNum = saleNum;
	}

}
