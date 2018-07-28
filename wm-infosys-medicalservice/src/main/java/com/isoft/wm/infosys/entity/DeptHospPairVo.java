package com.isoft.wm.infosys.entity;

public class DeptHospPairVo {
	private String name; //部门名
	private Long doc_num;
	private String hospital_name;
	public DeptHospPairVo(String name, Long doc_num, String hospital_name) {
		super();
		this.name = name;
		this.doc_num = doc_num;
		this.hospital_name = hospital_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getDoc_num() {
		return doc_num;
	}
	public void setDoc_num(Long doc_num) {
		this.doc_num = doc_num;
	}
	public String getHospital_name() {
		return hospital_name;
	}
	public void setHospital_name(String hospital_name) {
		this.hospital_name = hospital_name;
	}	
}
