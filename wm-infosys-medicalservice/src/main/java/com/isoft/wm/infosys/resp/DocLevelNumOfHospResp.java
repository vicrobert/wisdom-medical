package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.entity.DocLevelNumVo;

public class DocLevelNumOfHospResp {
	private List<DocLevelNumVo> dimPosnList;

	public DocLevelNumOfHospResp() {
	}

	public DocLevelNumOfHospResp(List<DocLevelNumVo> dimPosnList) {
		setDimPosnList(dimPosnList);
	}

	public List<DocLevelNumVo> getDimPosnList() {
		return dimPosnList;
	}

	public void setDimPosnList(List<DocLevelNumVo> dimPosnList) {
		this.dimPosnList = dimPosnList;
	}
	
	
}
