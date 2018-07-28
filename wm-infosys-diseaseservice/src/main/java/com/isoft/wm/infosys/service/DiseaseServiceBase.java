package com.isoft.wm.infosys.service;

import com.isoft.wm.infosys.viewmodel.DiseaseAgeDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseAreaDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseContrastAnalysisViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseOccupationDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseasePortraitViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseRelevanceAnalysisViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseSeasonDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseSexDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseTendencyViewModel;

public interface DiseaseServiceBase {
	//疾病分析与预测
	DiseaseTendencyViewModel getDiseaseTendency(String selectType, String community, int year, int month, String diseaseName);
	DiseaseSeasonDistributeViewModel getDiseaseSeasonDistribute(String selectType, String community, int year, int month);
	DiseaseAreaDistributeViewModel getDiseaseAreaDistribute(String selectType, String community, int year, int month, String diseaseName);
	DiseaseAgeDistributeViewModel getDiseaseAgeDistribute(String selectType, String community, int year, int month, String diseaseName);
	DiseaseSexDistributeViewModel getDiseaseSexDistribute(String selectType, String community, int year, int month, String diseaseName);
	DiseaseOccupationDistributeViewModel getDiseaseOccupationAgeDistribute(String selectType, String community, int year, int month, String diseaseName);
	
	//疾病同期对比分析
	DiseaseContrastAnalysisViewModel getDiseaseContrastAnalysis(String selectType, String community, int year, String diseaseName);
	
	//疾病关联与画像分析
	DiseaseRelevanceAnalysisViewModel getDiseaseRelevanceAnalysis(String selectType, String community, String season, int year, String sex, String age, String occupation);
	DiseasePortraitViewModel getDiseasePortrait(String selectType, String community, String season, int year, String sex, String age, String job, String diseaseName);
}
