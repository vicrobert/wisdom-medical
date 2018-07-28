package com.isoft.wm.infosys.entity;

public class DeptDetailsVo {
	private Long id;
	private String name;
	private String website;
	private String address;
	private String tel;
	private Long departmentNum;
	private Long doctorNum;
	private String featureDepartment;
	public DeptDetailsVo(Long id, String name, String website, String address, String tel, Long departmentNum,
			Long doctorNum, String featureDepartment) {
		this.id = id;
		this.name = name;
		this.website = website;
		this.address = address;
		this.tel = tel;
		this.departmentNum = departmentNum;
		this.doctorNum = doctorNum;
		this.featureDepartment = featureDepartment;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public Long getDepartmentNum() {
		return departmentNum;
	}
	public void setDepartmentNum(Long departmentNum) {
		this.departmentNum = departmentNum;
	}
	public Long getDoctorNum() {
		return doctorNum;
	}
	public void setDoctorNum(Long doctorNum) {
		this.doctorNum = doctorNum;
	}
	public String getFeatureDepartment() {
		return featureDepartment;
	}
	public void setFeatureDepartment(String featureDepartment) {
		this.featureDepartment = featureDepartment;
	}
	
}
