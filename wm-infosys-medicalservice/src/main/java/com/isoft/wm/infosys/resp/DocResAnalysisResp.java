package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.viewmodel.DoctorViewModel;

public class DocResAnalysisResp {
	private Long id;
	private String name;
	private Integer size;
	private List<DoctorViewModel> children;
	public DocResAnalysisResp(List<DoctorViewModel> children) {
		this.id = -1L;
		this.name = "医生";
		this.size = 300;
		this.children = children;
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
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public List<DoctorViewModel> getChildren() {
		return children;
	}
	public void setChildren(List<DoctorViewModel> children) {
		this.children = children;
	}
	
	
}
