package com.isoft.wm.infosys.api;

import org.springframework.beans.factory.annotation.Autowired;

import com.isoft.wm.infosys.service.DiseaseServiceBase;
import com.isoft.wm.infosys.service.DoctorServiceBase;
import com.isoft.wm.infosys.service.DrugServiceBase;
import com.isoft.wm.infosys.utils.JsonUtil;

public class DiseaseServiceImpl implements DiseaseService{
	@Autowired
	DiseaseServiceBase diseaseServiceBase;
	
	@Autowired
	DoctorServiceBase doctorServiceBase;
	
	@Autowired
	DrugServiceBase drugServiceBase;
	
	@Override
	public String getDiseaseAgeDistribute(String selectType, String community, Integer year, Integer month, String disease) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseaseAgeDistribute(selectType, community, year, month, disease));
	}

	@Override
	public String getDiseaseAreaDistribute(String selectType, String community, Integer year, Integer month, String disease) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseaseAreaDistribute(selectType, community, year, month, disease));
	}

	@Override
	public String getDiseaseContrastAnalysis(String selectType, String community, Integer year, String disease) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseaseContrastAnalysis(selectType, community, year, disease));
	}

	@Override
	public String getDiseasePortrait(String selectType, String community, String season, Integer year, String sex, String age,
			String job, String disease) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseasePortrait(selectType, community, season, year, sex, age, job, disease));
	}

	@Override
	public String getDiseaseRelevanceAnalysis(String selectType, String community, String season, Integer year, String sex, 
			String age, String occupation) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseaseRelevanceAnalysis(selectType, community, season, year, sex, age, occupation));
	}

	@Override
	public String getDiseaseSeasonDistribute(String selectType, String community, Integer year, Integer month, String disease) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseaseSeasonDistribute(selectType, community, year, month));
	}

	@Override
	public String getDiseaseSexDistribute(String selectType, String community, Integer year, Integer month, String disease) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseaseSexDistribute(selectType, community, year, month, disease));
	}

	@Override
	public String getDiseaseTendency(String selectType, String community, Integer year, Integer month, String disease) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseaseTendency(selectType, community, year, month, disease));
	}

	@Override
	public String getDoctorRecommend(String community, Integer year, Integer month) {
		return JsonUtil.serialize(doctorServiceBase.getDoctorRecommend(community, year, month));
	}

	@Override
	public String getDrugSourceDistribute(String community, Integer year, Integer month) {
		return JsonUtil.serialize(doctorServiceBase);
	}

	@Override
	public String getDrugTypeDistribute(String community, Integer year, Integer month) {
		return JsonUtil.serialize(drugServiceBase.getDrugTypeDistribute(community, year, month));
	}

	@Override
	public String getDrugUseStrength(String community, Integer year, Integer month) {
		return JsonUtil.serialize(drugServiceBase.getDrugUseStrength(community, year, month));
	}

	
	@Override
	public String getDiseaseOccupationAgeDistribute(String selectType, String community, Integer year, Integer month, String disease) {
		return JsonUtil.serialize(diseaseServiceBase.getDiseaseOccupationAgeDistribute(selectType, community, year, month, disease));
	}

	@Override
	public String getDrugPercentDistribute(String community, Integer year, Integer month) {
		return JsonUtil.serialize(drugServiceBase.getDrugPercentDistribute(community, year, month));
	}

}
