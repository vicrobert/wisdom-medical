package com.isoft.wm.infosys.entity;

public class DeptProNumVo {
	private String department_name;
	private Long cnt_person;
	public DeptProNumVo(String department_name, Long cnt_person) {
		super();
		this.department_name = department_name;
		this.cnt_person = cnt_person;
	}
	public String getDepartment_name() {
		return department_name;
	}
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}
	public Long getCnt_person() {
		return cnt_person;
	}
	public void setCnt_person(Long cnt_person) {
		this.cnt_person = cnt_person;
	}
	
	
}
