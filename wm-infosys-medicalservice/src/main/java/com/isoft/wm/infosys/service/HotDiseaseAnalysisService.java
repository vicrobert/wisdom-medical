package com.isoft.wm.infosys.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.entity.DiseaseFaqVo;
import com.isoft.wm.infosys.resp.DiseaseFaqOverCityResp;
import com.isoft.wm.infosys.resp.DiseaseFaqResp;

public interface HotDiseaseAnalysisService {

	List<DiseaseFaqVo> getDiseaseFaqNumByDateAndCity(Date from, Date to, String city);

	List<DiseaseFaqVo> getDiseaseTopNRankByDateAndCity(Date from, Date to, String city, Pageable pageable);

	DiseaseFaqOverCityResp getDiseaseFaqNumOverAllCities(Date from, Date to);

	DiseaseFaqResp descSortDiseaseFaqByDeptPopularity(Date from, Date to, String city, Pageable pageable);
	
	DiseaseFaqResp descSortDiseaseFaqByHospPopularity(Date from, Date to, String city, Pageable pageable);
	
	DiseaseFaqResp descSortDiseaseFaqByDocPopularity(Date from, Date to, String city, Pageable pageable);

}