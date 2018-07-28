package com.isoft.wm.infosys.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.entity.ProvinceVo;
import com.isoft.wm.infosys.resp.DomesticHospDistributionResp;
import com.isoft.wm.infosys.resp.HospStatisticsPerProvinceResp;
import com.isoft.wm.infosys.resp.Top5AndLast5DeptOfProvinceResp;

@Service
public class HospitalAnalysisOverallServiceImpl implements HospitalAnalysisOverallService {
	@Autowired
	HospitalService hospitalService;
	
	@Autowired
	GeneralService generalService;
	
	@Override
	public DomesticHospDistributionResp getDomesticHospDistribution(String province) {
		List<String> legends = Arrays.asList("三甲", "二级", "三级", "一甲", "二甲");
		return new DomesticHospDistributionResp(hospitalService.getDomesticHospDistribution(province), legends);
	}

	@Override
	public HospStatisticsPerProvinceResp getHospitalStatisticsOfEachProvince() {
		HospStatisticsPerProvinceResp provHospStatisticsResp = new HospStatisticsPerProvinceResp();
		List<ProvinceVo> provList = generalService.listProvince();
		if (provList != null) {
			for (ProvinceVo prov: provList) {
				provHospStatisticsResp.addStatisticalDataPerProvince(hospitalService.getHospStatisticalDataOfEachProvince(prov.getName()));
			}
		}
		return provHospStatisticsResp;
	}

	@Override
	public Top5AndLast5DeptOfProvinceResp getTop5AndLast5DeptOfEachProvince(String province) {
		return new Top5AndLast5DeptOfProvinceResp(hospitalService.getLast5DeptOfProvince(province), hospitalService.getTop5DeptOfProvince(province));
	}
	
	
}
