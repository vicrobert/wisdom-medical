package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.entity.HospEvalVo;

public class HospitalEvalResp {
	private List<HospEvalVo> resultList;

	
	public HospitalEvalResp() {
	}

	public HospitalEvalResp(List<HospEvalVo> resultList) {
		this.resultList = resultList;
	}

	public List<HospEvalVo> getResultList() {
		return resultList;
	}

	public void setResultList(List<HospEvalVo> resultList) {
		this.resultList = resultList;
	}
	
}
