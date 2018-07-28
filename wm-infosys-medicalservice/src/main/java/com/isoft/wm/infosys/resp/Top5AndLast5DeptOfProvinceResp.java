package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.viewmodel.SuperiorityAndInferiorDeptViewModel;

public class Top5AndLast5DeptOfProvinceResp {
	private List<SuperiorityAndInferiorDeptViewModel> deptLast5List;
	private List<SuperiorityAndInferiorDeptViewModel> deptTop5List;
	
	
	public Top5AndLast5DeptOfProvinceResp(List<SuperiorityAndInferiorDeptViewModel> deptLast5List,
			List<SuperiorityAndInferiorDeptViewModel> deptTop5List) {
		this.deptLast5List = deptLast5List;
		this.deptTop5List = deptTop5List;
	}
	public List<SuperiorityAndInferiorDeptViewModel> getDeptLast5List() {
		return deptLast5List;
	}
	public void setDeptLast5List(List<SuperiorityAndInferiorDeptViewModel> deptLast5List) {
		this.deptLast5List = deptLast5List;
	}
	public List<SuperiorityAndInferiorDeptViewModel> getDeptTop5List() {
		return deptTop5List;
	}
	public void setDeptTop5List(List<SuperiorityAndInferiorDeptViewModel> deptTop5List) {
		this.deptTop5List = deptTop5List;
	}
	
}
