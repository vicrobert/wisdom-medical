package com.isoft.wm.infosys.viewmodel;

public class HospStatisticsPerProvinceViewModel {
	//以下成员仅供当前界面显示需要，若有需要可进一步添加完善
	private String province_name;
	private Long hosp_num;
	private Long dep_num;
	private Long doc_num;
	private Long hos_lev1_num;
	private Long hos_lev1plus_num;
	private Long hos_lev2_num;
	private Long hos_lev2plus_num;
	private Long hos_lev3_num;
	private Long hos_lev3plus_num;
	
	public HospStatisticsPerProvinceViewModel(String province_name, Long hosp_num, Long dep_num, Long doc_num,
			Long hos_lev1_num, Long hos_lev1plus_num, Long hos_lev2_num, Long hos_lev2plus_num, Long hos_lev3_num,
			Long hos_lev3plus_num) {
		this.province_name = province_name;
		this.hosp_num = hosp_num;
		this.dep_num = dep_num;
		this.doc_num = doc_num;
		this.hos_lev1_num = hos_lev1_num;
		this.hos_lev1plus_num = hos_lev1plus_num;
		this.hos_lev2_num = hos_lev2_num;
		this.hos_lev2plus_num = hos_lev2plus_num;
		this.hos_lev3_num = hos_lev3_num;
		this.hos_lev3plus_num = hos_lev3plus_num;
	}
	
	public String getProvince_name() {
		return province_name;
	}
	public void setProvince_name(String province_name) {
		this.province_name = province_name;
	}
	public Long getHosp_num() {
		return hosp_num;
	}
	public void setHosp_num(Long hosp_num) {
		this.hosp_num = hosp_num;
	}
	public Long getDep_num() {
		return dep_num;
	}
	public void setDep_num(Long dep_num) {
		this.dep_num = dep_num;
	}
	public Long getDoc_num() {
		return doc_num;
	}
	public void setDoc_num(Long doc_num) {
		this.doc_num = doc_num;
	}
	public Long getHos_lev1_num() {
		return hos_lev1_num;
	}
	public void setHos_lev1_num(Long hos_lev1_num) {
		this.hos_lev1_num = hos_lev1_num;
	}
	public Long getHos_lev1plus_num() {
		return hos_lev1plus_num;
	}
	public void setHos_lev1plus_num(Long hos_lev1plus_num) {
		this.hos_lev1plus_num = hos_lev1plus_num;
	}
	public Long getHos_lev2_num() {
		return hos_lev2_num;
	}
	public void setHos_lev2_num(Long hos_lev2_num) {
		this.hos_lev2_num = hos_lev2_num;
	}
	public Long getHos_lev2plus_num() {
		return hos_lev2plus_num;
	}
	public void setHos_lev2plus_num(Long hos_lev2plus_num) {
		this.hos_lev2plus_num = hos_lev2plus_num;
	}
	public Long getHos_lev3_num() {
		return hos_lev3_num;
	}
	public void setHos_lev3_num(Long hos_lev3_num) {
		this.hos_lev3_num = hos_lev3_num;
	}
	public Long getHos_lev3plus_num() {
		return hos_lev3plus_num;
	}
	public void setHos_lev3plus_num(Long hos_lev3plus_num) {
		this.hos_lev3plus_num = hos_lev3plus_num;
	}
}
