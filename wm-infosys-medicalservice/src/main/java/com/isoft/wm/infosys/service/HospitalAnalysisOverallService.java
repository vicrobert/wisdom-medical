package com.isoft.wm.infosys.service;

import com.isoft.wm.infosys.resp.DomesticHospDistributionResp;
import com.isoft.wm.infosys.resp.HospStatisticsPerProvinceResp;
import com.isoft.wm.infosys.resp.Top5AndLast5DeptOfProvinceResp;

public interface HospitalAnalysisOverallService {

	DomesticHospDistributionResp getDomesticHospDistribution(String province);
	HospStatisticsPerProvinceResp getHospitalStatisticsOfEachProvince();
	Top5AndLast5DeptOfProvinceResp getTop5AndLast5DeptOfEachProvince(String province);

}