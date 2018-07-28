package com.isoft.wm.infosys.viewmodel;

public class SuperiorityAndInferiorDeptViewModel {
	private String privince_name;
	private String department_shortname;
	private Double diff;
	private Long desc_rank;
	private Long asc_rank;
	public SuperiorityAndInferiorDeptViewModel(String privince_name, String department_shortname, Double diff,
			Long desc_rank, Long asc_rank) {
		super();
		this.privince_name = privince_name;
		this.department_shortname = department_shortname;
		this.diff = diff;
		this.desc_rank = desc_rank;
		this.asc_rank = asc_rank;
	}
	public String getPrivince_name() {
		return privince_name;
	}
	public void setPrivince_name(String privince_name) {
		this.privince_name = privince_name;
	}
	public String getDepartment_shortname() {
		return department_shortname;
	}
	public void setDepartment_shortname(String department_shortname) {
		this.department_shortname = department_shortname;
	}
	public Double getDiff() {
		return diff;
	}
	public void setDiff(Double diff) {
		this.diff = diff;
	}
	public Long getDesc_rank() {
		return desc_rank;
	}
	public void setDesc_rank(Long desc_rank) {
		this.desc_rank = desc_rank;
	}
	public Long getAsc_rank() {
		return asc_rank;
	}
	public void setAsc_rank(Long asc_rank) {
		this.asc_rank = asc_rank;
	}
	
}
