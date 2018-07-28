package com.isoft.wm.infosys.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.entity.DiseaseFaqOverCityVo;
import com.isoft.wm.infosys.entity.DiseaseFaqVo;

public interface DiseaseService {

	List<DiseaseFaqVo> getDiseaseFaqNumByDateAndCity(Date from, Date to, Long cityId);

	List<DiseaseFaqVo> getDiseaseTopNRankByDateAndCity(Date from, Date to, Long cityId, Pageable pageable);

	List<DiseaseFaqOverCityVo> getDiseaseFaqNumOverAllCities(Date from, Date to);

	List<DiseaseFaqVo> descSortDiseaseFaqByDeptPopularity(Date from, Date to, Long cityId, Pageable pageable);
	
	List<DiseaseFaqVo> descSortDiseaseFaqByHospPopularity(Date from, Date to, Long cityId, Pageable pageable);
	
	List<DiseaseFaqVo> descSortDiseaseFaqByDocPopularity(Date from, Date to, Long cityId, Pageable pageable);

}