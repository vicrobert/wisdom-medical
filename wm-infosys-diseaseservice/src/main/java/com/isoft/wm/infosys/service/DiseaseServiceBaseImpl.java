package com.isoft.wm.infosys.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.isoft.wm.infosys.dao.DiseaseDao;
import com.isoft.wm.infosys.dao.DiseaseStatisticsDao;
import com.isoft.wm.infosys.dao.PatientDao;
import com.isoft.wm.infosys.entity.DiseaseStatisticsVo;
import com.isoft.wm.infosys.entity.DiseaseVo;
import com.isoft.wm.infosys.entity.PatientVo;
import com.isoft.wm.infosys.viewmodel.DiseaseAgeDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseAreaDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseContrastAnalysisViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseOccupationDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseasePortraitViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseRelevanceAnalysisViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseSeasonDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseSexDistributeViewModel;
import com.isoft.wm.infosys.viewmodel.DiseaseTendencyViewModel;


@Service
public class DiseaseServiceBaseImpl implements DiseaseServiceBase {
	@Autowired 
	private DiseaseDao diseaseDao;
	
	@Autowired
	private DiseaseStatisticsDao diseaseStatisticsDao;
	
	@Autowired
	private PatientDao patientDao;
	
	@Override
	public DiseaseTendencyViewModel getDiseaseTendency(String selectType, String community, int year, int month, String diseaseName) {
		DiseaseTendencyViewModel diseaseTendencyViewModel = new DiseaseTendencyViewModel();
		List<Long> dateGrp = new ArrayList<Long>();
		List<String> xaxis = new ArrayList<String>();
		
		//TODO: for each disease name
		//...
		
		List<DiseaseVo> diseases = diseaseDao.findByName(diseaseName);
		if (diseases != null && diseases.size() > 0) {
			DiseaseVo disease = diseases.get(0);
			
			//group by month
			List<DiseaseStatisticsVo> diseaseStatisticsList = diseaseStatisticsDao.monthOccurNumAtACommunity(disease.getId(), selectType, community, month);
			if (diseaseStatisticsList != null) {
				long cur = 0, max = 0, min = 2147483647;
				diseaseTendencyViewModel.getData().addType(diseaseName);
				
				for (DiseaseStatisticsVo diseaseStatistics : diseaseStatisticsList) {
					cur = diseaseStatistics.getOccurTimes();
					if (max < cur) {
						max = cur;
					}
					if (min > cur) {
						min = cur;
					}
					dateGrp.add(cur);
					xaxis.add(diseaseStatistics.getOccurYear().toString() + diseaseStatistics.getOccurMonth().toString());
				}
				diseaseTendencyViewModel.getData().addDate(dateGrp);
				diseaseTendencyViewModel.getData().setBig(max);
				diseaseTendencyViewModel.getData().setSmall(min);
				diseaseTendencyViewModel.getData().setXaxis(xaxis);
			}
			
		}
		return diseaseTendencyViewModel;
	}

	@Override
	public DiseaseSeasonDistributeViewModel getDiseaseSeasonDistribute(String selectType, String community, int year, int month) {
		List<DiseaseStatisticsVo> diseaseStatisticsList;
		DiseaseSeasonDistributeViewModel diseaseSeasonDistributeViewModel = new DiseaseSeasonDistributeViewModel();
		Pageable page = PageRequest.of(0, 10);
		if (month == 0) {
			diseaseStatisticsList = diseaseStatisticsDao.sortDiseaseOccurNumAtACommunityAYear(selectType, community, year, page);
		} else {
			diseaseStatisticsList = diseaseStatisticsDao.sortDiseaseOccurNumAtACommunityAMonth(selectType, community, year, month, page);
		}
		if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
			for (DiseaseStatisticsVo diseaseStatistics : diseaseStatisticsList) {
				diseaseSeasonDistributeViewModel.getData().addType(diseaseStatistics.getMemo());
				diseaseSeasonDistributeViewModel.getData().addDate(diseaseStatistics.getOccurTimes());
			}
		}
		return diseaseSeasonDistributeViewModel;
	}

	@Override
	public DiseaseAreaDistributeViewModel getDiseaseAreaDistribute(String selectType, String community, int year,
			int month, String diseaseName) {
		DiseaseAreaDistributeViewModel diseaseAreaDistributeViewModel = new DiseaseAreaDistributeViewModel();
		//TODO: for each disease name
		//...
		List<DiseaseVo> diseases = diseaseDao.findByName(diseaseName);
		if (diseases != null && diseases.size() > 0) {
			DiseaseVo disease = diseases.get(0);
			diseaseAreaDistributeViewModel.getData().addType(diseaseName);
			List<Long> dateGrp = new ArrayList<Long>();
			List<DiseaseStatisticsVo> diseaseStatisticsList;
			if (month == 0) {
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAYear(disease.getId(), selectType, community, year);
			} else {
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAMonth(disease.getId(), selectType, community, year, month);
			}
			if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
				for (DiseaseStatisticsVo diseaseStatistics : diseaseStatisticsList) {
					diseaseAreaDistributeViewModel.getData().addXaxis(diseaseStatistics.getMemo());
					dateGrp.add(diseaseStatistics.getOccurTimes());
				}
				diseaseAreaDistributeViewModel.getData().addDate(dateGrp);
			}
		}
		return diseaseAreaDistributeViewModel;
	}

	@Override
	public DiseaseAgeDistributeViewModel getDiseaseAgeDistribute(String selectType, String community, int year,
			int month, String diseaseName) {
		DiseaseAgeDistributeViewModel diseaseAgeDistributeViewModel = new DiseaseAgeDistributeViewModel();
		
		//TODO: for each disease name
		//...
		List<DiseaseVo> diseases = diseaseDao.findByName(diseaseName);
		if (diseases != null && diseases.size() > 0) {
			DiseaseVo disease = diseases.get(0);
			diseaseAgeDistributeViewModel.getData().addType(diseaseName);
			
			diseaseAgeDistributeViewModel.getData().addXaxis("0-15岁");
			diseaseAgeDistributeViewModel.getData().addXaxis("16-30岁");
			diseaseAgeDistributeViewModel.getData().addXaxis("16-30岁");
			diseaseAgeDistributeViewModel.getData().addXaxis("31-45岁");
			diseaseAgeDistributeViewModel.getData().addXaxis("46-60岁");
			diseaseAgeDistributeViewModel.getData().addXaxis("60岁以上");
			
			List<Long> date = new ArrayList<Long>();
			List<DiseaseStatisticsVo> diseaseStatisticsList;
			if (month == 0) {
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAYearWithAgeScale(disease.getId(), selectType, community, year, 0, 15);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAYearWithAgeScale(disease.getId(), selectType, community, year, 16, 30);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAYearWithAgeScale(disease.getId(), selectType, community, year, 31, 45);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAYearWithAgeScale(disease.getId(), selectType, community, year, 46, 60);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAYearWithAgeScale(disease.getId(), selectType, community, year, 60, 200);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
			} else {
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAMonthWithAgeScale(disease.getId(), selectType, community, year, month, 0, 15);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAMonthWithAgeScale(disease.getId(), selectType, community, year, month, 16, 30);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAMonthWithAgeScale(disease.getId(), selectType, community, year, month, 31, 45);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAMonthWithAgeScale(disease.getId(), selectType, community, year, month, 46, 60);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
				diseaseStatisticsList = diseaseStatisticsDao.occurNumAtACommunityAMonthWithAgeScale(disease.getId(), selectType, community, year, month, 60, 200);
				if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
					date.add(diseaseStatisticsList.get(0).getOccurTimes());
				} else {
					date.add(0L);
				}
			}
			diseaseAgeDistributeViewModel.getData().addDate(date);
		}
		
		return diseaseAgeDistributeViewModel;
	}

	@Override
	public DiseaseSexDistributeViewModel getDiseaseSexDistribute(String selectType, String community, int year,
			int month, String diseaseName) {
		List<DiseaseStatisticsVo> diseaseStatisticsList;
		DiseaseSexDistributeViewModel diseaseSexDistributeViewModel = new DiseaseSexDistributeViewModel();

		List<DiseaseVo> diseases = diseaseDao.findByName(diseaseName);
		if (diseases != null && diseases.size() > 0) {
			DiseaseVo disease = diseases.get(0);
			if (month == 0) {
				diseaseStatisticsList = diseaseStatisticsDao.sexualOccurNumAtACommunityAYear(disease.getId(), selectType, community, year);
			} else {
				diseaseStatisticsList = diseaseStatisticsDao.sexualOccurNumAtACommunityAMonth(disease.getId(), selectType, community, year, month);
			}
			if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
				for (DiseaseStatisticsVo diseaseStatistics : diseaseStatisticsList) {
					diseaseSexDistributeViewModel.getData().addXaxis(diseaseStatistics.getMemo());
					Map<String, Object> sexualMap = new HashMap<String, Object>();
					sexualMap.put("name", diseaseStatistics.getMemo());
					sexualMap.put("value", diseaseStatistics.getOccurTimes());
					diseaseSexDistributeViewModel.getData().addDate(sexualMap);
				}
			}
		}
		return diseaseSexDistributeViewModel;
	}

	@Override
	public DiseaseOccupationDistributeViewModel getDiseaseOccupationAgeDistribute(String selectType, String community,
			int year, int month, String diseaseName) {
		List<DiseaseStatisticsVo> diseaseStatisticsList;
		DiseaseOccupationDistributeViewModel diseaseOccupationDistributeViewModel = new DiseaseOccupationDistributeViewModel();

		List<DiseaseVo> diseases = diseaseDao.findByName(diseaseName);
		if (diseases != null && diseases.size() > 0) {
			DiseaseVo disease = diseases.get(0);
			if (month == 0) {
				diseaseStatisticsList = diseaseStatisticsDao.occupationOccurNumAtACommunityAYear(disease.getId(), selectType, community, year);
			} else {
				diseaseStatisticsList = diseaseStatisticsDao.occupationOccurNumAtACommunityAMonth(disease.getId(), selectType, community, year, month);
			}
			if (diseaseStatisticsList != null && diseaseStatisticsList.size() > 0) {
				Map<String, Object> occMap = new HashMap<String, Object>();
				for (DiseaseStatisticsVo diseaseStatistics : diseaseStatisticsList) {
					diseaseOccupationDistributeViewModel.getData().addXaxis(diseaseStatistics.getMemo());
					occMap.put("value", diseaseStatistics.getOccurTimes());
					occMap.put("name", diseaseStatistics.getMemo());
				}
				diseaseOccupationDistributeViewModel.getData().addDate(occMap);
			}
		}
		return diseaseOccupationDistributeViewModel;
	}

	@Override
	public DiseaseContrastAnalysisViewModel getDiseaseContrastAnalysis(String selectType, String community, int year, String diseaseName) throws NumberFormatException {
		DiseaseContrastAnalysisViewModel diseaseContrastAnalysisViewModel = new DiseaseContrastAnalysisViewModel();
		List<DiseaseVo> diseases = diseaseDao.findByName(diseaseName);
		if (diseases != null && diseases.size() > 0) {
			DiseaseVo disease = diseases.get(0);
			diseaseContrastAnalysisViewModel.getData().addType(String.valueOf(year));
			diseaseContrastAnalysisViewModel.getData().addType(String.valueOf(year - 1));
			//sort by ascending order
			List<Long> thisYearList = new ArrayList<Long>();
			List<DiseaseStatisticsVo> statisListThisYear = diseaseStatisticsDao.monthOccurNumAtACommunity(disease.getId(), selectType, community, year);
			if (statisListThisYear != null && statisListThisYear.size() > 0) {
				for (int i = 1, j = 0; i < 13; i ++) {
					diseaseContrastAnalysisViewModel.getData().addXaxis(i + "月");
					if (j < statisListThisYear.size()) {
						if (i < statisListThisYear.get(j).getOccurMonth()) {
							thisYearList.add(0L);
						} else if (i == statisListThisYear.get(j).getOccurMonth()){
							thisYearList.add(statisListThisYear.get(j).getOccurTimes());
							j ++;
						} else {
							throw new NumberFormatException();
						}
					} else {
						thisYearList.add(0L);
					}
				}
			} else {
				return diseaseContrastAnalysisViewModel;
			}
			diseaseContrastAnalysisViewModel.getData().addDateList(thisYearList);
			
			Long minus;
			double ratio;
			List<Long> lastYearList = new ArrayList<Long>();
			List<Map<String, Object>> minusList = new ArrayList<Map<String, Object>>();
			List<Map<String, Object>> ratioList = new ArrayList<Map<String, Object>>();
			List<DiseaseStatisticsVo> statisListLastYear = diseaseStatisticsDao.monthOccurNumAtACommunity(disease.getId(), selectType, community, year);
			if (statisListLastYear != null && statisListLastYear.size() > 0) {
				for (int i = 1, j = 0; i < 13; i ++) {
					if (j < statisListLastYear.size()) {
						if (i < statisListLastYear.get(j).getOccurMonth()) {
							lastYearList.add(0L);
						} else if (i == statisListLastYear.get(j).getOccurMonth()){
							lastYearList.add(statisListLastYear.get(j).getOccurTimes());
							j ++;
						} else {
							throw new NumberFormatException();
						}
					} else {
						lastYearList.add(0L);
					}
					
					minus = thisYearList.get(i) - lastYearList.get(i);
					Map<String, Object> minusMap = new HashMap<String, Object>();
					minusMap.put("num", Math.abs(minus));
					minusMap.put("ud", minus < 0 ? "-" : "+");
					minusList.add(minusMap);
					
					Map<String, Object> ratioMap = new HashMap<String, Object>();
					if (lastYearList.get(i) != 0) {
						ratio = minus.doubleValue() / lastYearList.get(i);
						ratioMap.put("num", Math.abs(ratio));
					} else {
						ratioMap.put("num", "-");
					}
					ratioMap.put("ud", minus < 0 ? "-" : "+");
					ratioList.add(ratioMap);
				}
			}
			diseaseContrastAnalysisViewModel.getData().addDateList(lastYearList);
			diseaseContrastAnalysisViewModel.getData().addDateList(minusList);
			diseaseContrastAnalysisViewModel.getData().addDateList(ratioList);
		}
		return diseaseContrastAnalysisViewModel;
	}

	@Override
	public DiseaseRelevanceAnalysisViewModel getDiseaseRelevanceAnalysis(String selectType, String community,
			String season, int year, String sex, String age, String occupation) {
		DiseaseRelevanceAnalysisViewModel diseaseRelevanceAnalysisViewModel = new DiseaseRelevanceAnalysisViewModel();
		Pageable page = PageRequest.of(0, 9);
		List<DiseaseStatisticsVo> diseaseList = diseaseStatisticsDao.diseaseOccurNumAtACommunityAYear(selectType, community, year, sex, occupation, page);
		if (diseaseList != null && diseaseList.size() > 0) {
			for (DiseaseStatisticsVo ds : diseaseList) {
				diseaseRelevanceAnalysisViewModel.getData().addType(ds.getMemo());
				diseaseRelevanceAnalysisViewModel.getData().addDate(ds.getOccurTimes());
			}
		}
		return diseaseRelevanceAnalysisViewModel;
	}

	@Override
	public DiseasePortraitViewModel getDiseasePortrait(String selectType, String community, String season, int year,
			String sex, String age, String job, String diseaseName) {
		DiseasePortraitViewModel diseasePortraitViewModel = new DiseasePortraitViewModel();
		List<DiseaseVo> diseases = diseaseDao.findByName(diseaseName);
		if (diseases != null && diseases.size() > 0) {
			DiseaseVo disease = diseases.get(0);
			Pageable page = PageRequest.of(0, 2);
			//related disease
			List<DiseaseStatisticsVo> relatedDiseases = diseaseStatisticsDao.diseasePortraitSortRelatedDisease(disease.getId(), year, page);
			if (relatedDiseases != null && relatedDiseases.size() > 0) {
				for (DiseaseStatisticsVo ds : relatedDiseases) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("Label", ds.getMemo() + "患者");
					map.put("Value", ds.getOccurTimes());
					diseasePortraitViewModel.getData().addDate(map);
				}
			}
			//male by age
			List<PatientVo> malePatients = patientDao.diseasePortraitSortByAge(disease.getId(), year, "男", page);
			if (malePatients != null && malePatients.size() > 0) {
				for (PatientVo p : malePatients) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("Label", p.getAge() + "男性");
					map.put("Value", p.getCount());
					diseasePortraitViewModel.getData().addDate(map);
				}
			}
			//female by age
			List<PatientVo> femalePatients = patientDao.diseasePortraitSortByAge(disease.getId(), year, "女", page);
			if (femalePatients != null && femalePatients.size() > 0) {
				for (PatientVo p : femalePatients) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("Label", p.getAge() + "女性");
					map.put("Value", p.getCount());
					diseasePortraitViewModel.getData().addDate(map);
				}
			}
			//occupation
			List<PatientVo> occupationPatients = patientDao.diseasePortraitSortByOccupation(disease.getId(), year, page);
			if (occupationPatients != null && occupationPatients.size() > 0) {
				for (PatientVo p : occupationPatients) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("Label", p.getOccupation());
					map.put("Value", p.getCount());
					diseasePortraitViewModel.getData().addDate(map);
				}
			}
			//hobby
			List<PatientVo> hobbyPatients = patientDao.diseasePortraitSortByHobby(disease.getId(), year, page);
			if (hobbyPatients != null && hobbyPatients.size() > 0) {
				for (PatientVo p : hobbyPatients) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("Label", p.getHobby());
					map.put("Value", p.getCount());
					diseasePortraitViewModel.getData().addDate(map);
				}
			}
		}
		return diseasePortraitViewModel;
	}
	
}
