package com.isoft.wm.infosys.resp;

import java.util.ArrayList;
import java.util.List;

import com.isoft.wm.infosys.entity.DeptProNumVo;

public class DeptProNumOfHospResp {
	private List<DeptProNumVo> dimPosnList;

	public DeptProNumOfHospResp() {

	}

	public DeptProNumOfHospResp(List<DeptProNumVo> dimPosnList) {
		setDimPosnList(dimPosnList);
	}

	public List<DeptProNumVo> getDimPosnList() {
		return dimPosnList;
	}

	public void setDimPosnList(List<DeptProNumVo> dimPosnList) {
		this.dimPosnList = dimPosnList;
	}
	
}
