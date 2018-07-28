package com.isoft.wm.infosys.api;

public interface DiseaseService {
	//疾病分析与预测
	String getDiseaseTendency(String selectType, String community, Integer year, Integer month, String disease);
	String getDiseaseSeasonDistribute(String selectType, String community, Integer year, Integer month, String disease);
	String getDiseaseAreaDistribute(String selectType, String community, Integer year, Integer month, String disease);
	String getDiseaseAgeDistribute(String selectType, String community, Integer year, Integer month, String disease);
	String getDiseaseSexDistribute(String selectType, String community, Integer year, Integer month, String disease);
	String getDiseaseOccupationAgeDistribute(String selectType, String community, Integer year, Integer month, String disease);
	
	//疾病同期对比分析
	String getDiseaseContrastAnalysis(String selectType, String community, Integer year, String disease);
	
	//疾病关联与画像分析
	String getDiseaseRelevanceAnalysis(String selectType, String community, String season, Integer year, String sex, String age, String occupation);
	String getDiseasePortrait(String selectType, String community, String season, Integer year, String sex, String age, String job, String disease);
	
	//疾病疗效分析
	String getDoctorRecommend(String community, Integer year, Integer month);
	String getDrugUseStrength(String community, Integer year, Integer month);
	String getDrugSourceDistribute(String community, Integer year, Integer month);
	String getDrugTypeDistribute(String community, Integer year, Integer month);
	String getDrugPercentDistribute(String community, Integer year, Integer month);

}
