package com.isoft.wm.infosys.viewmodel;

import java.util.ArrayList;
import java.util.List;

public class DeptL2ContrastPercentViewModel {
	private List<String> list10 = new ArrayList<String>();
	private List<String> list20 = new ArrayList<String>();
	private List<String> list50 = new ArrayList<String>();
	private List<String> deptList = new ArrayList<String>();
	public List<String> getList10() {
		return list10;
	}
	public void setList10(List<String> list10) {
		this.list10 = list10;
	}
	public List<String> getList20() {
		return list20;
	}
	public void setList20(List<String> list20) {
		this.list20 = list20;
	}
	public List<String> getList50() {
		return list50;
	}
	public void setList50(List<String> list50) {
		this.list50 = list50;
	}
	public List<String> getDeptList() {
		return deptList;
	}
	public void setDeptList(List<String> deptList) {
		this.deptList = deptList;
	}
	
	public void addList10(String ele) {
		list10.add(ele);
	}
	public void addList20(String ele) {
		list20.add(ele);
	}
	public void addList50(String ele) {
		list50.add(ele);
	}
	public void addDeptList(String ele) {
		deptList.add(ele);
	}
	
}
