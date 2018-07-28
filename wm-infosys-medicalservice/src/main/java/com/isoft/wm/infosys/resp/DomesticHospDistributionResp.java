package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.entity.HospitalVo;

public class DomesticHospDistributionResp {
	List<HospitalVo> hospitalList;
	List<String> legendList;
	public DomesticHospDistributionResp(List<HospitalVo> hospitalList, List<String> legendList) {
		this.hospitalList = hospitalList;
		this.legendList = legendList;
	}
	public List<HospitalVo> getHospitalList() {
		return hospitalList;
	}
	public void setHospitalList(List<HospitalVo> hospitalList) {
		this.hospitalList = hospitalList;
	}
	public List<String> getLegendList() {
		return legendList;
	}
	public void setLegendList(List<String> legendList) {
		this.legendList = legendList;
	}
	
}
