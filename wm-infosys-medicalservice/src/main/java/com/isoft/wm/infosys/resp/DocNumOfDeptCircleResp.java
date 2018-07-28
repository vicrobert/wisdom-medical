package com.isoft.wm.infosys.resp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.isoft.wm.infosys.entity.DepartmentVo;

public class DocNumOfDeptCircleResp {
	private List<Object> children;

	public DocNumOfDeptCircleResp() {

	}

	public DocNumOfDeptCircleResp(List<DepartmentVo> departmentList) {
		setDepartmentVoList(departmentList);
	}

	public List<Object> getChildren() {
		return children;
	}

	public void setChildren(List<Object> children) {
		this.setChildren(children);
	}
	
	public void setDepartmentVoList(List<DepartmentVo> departmentList) {
		HashMap<String, Object> m = new HashMap<String, Object>();
		m.put("children", departmentList);
		if (this.children == null) {
			this.children = new ArrayList<Object>();
		}
		this.children.add(m);
	}
}
