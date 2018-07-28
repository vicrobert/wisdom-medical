package com.isoft.wm.infosys.service;

import java.util.Date;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.dao.DiseaseFaqDao;
import com.isoft.wm.infosys.entity.DiseaseFaqOverCityVo;
import com.isoft.wm.infosys.entity.DiseaseFaqVo;

@Service
public class DiseaseServiceImpl implements DiseaseService {
	@Autowired DiseaseFaqDao diseaseFaqDao;
	
	@Override
	public List<DiseaseFaqVo> getDiseaseFaqNumByDateAndCity(Date from, Date to, Long cityId) {
		if (to == null) {
			to = new Date();
		}
		if (from == null) {
			Calendar oneYearBefore = Calendar.getInstance();
			oneYearBefore.setTime(to);
			oneYearBefore.add(Calendar.YEAR, -1);
			from = oneYearBefore.getTime();
		}
		return diseaseFaqDao.getDiseaseFaqNumByDateAndCity(from, to, cityId);
	}
	
	@Override
	public List<DiseaseFaqVo> getDiseaseTopNRankByDateAndCity(Date from, Date to, Long cityId, Pageable pageable) {
		if (to == null) {
			to = new Date();
		}
		if (from == null) {
			Calendar oneYearBefore = Calendar.getInstance();
			oneYearBefore.setTime(to);
			oneYearBefore.add(Calendar.YEAR, -1);
			from = oneYearBefore.getTime();
		}
		return diseaseFaqDao.getDiseaseTopNRankByDateAndCity(from, to, cityId, pageable);
	}
	
	@Override
	public List<DiseaseFaqOverCityVo> getDiseaseFaqNumOverAllCities(Date from, Date to) {
		if (to == null) {
			to = new Date();
		}
		if (from == null) {
			Calendar oneYearBefore = Calendar.getInstance();
			oneYearBefore.setTime(to);
			oneYearBefore.add(Calendar.YEAR, -1);
			from = oneYearBefore.getTime();
		}
		return diseaseFaqDao.getDiseaseFaqNumOverAllCities(from, to);
	}
	
	@Override
	public List<DiseaseFaqVo> descSortDiseaseFaqByDeptPopularity(Date from, Date to, Long cityId, Pageable pageable) {
		if (to == null) {
			to = new Date();
		}
		if (from == null) {
			Calendar oneYearBefore = Calendar.getInstance();
			oneYearBefore.setTime(to);
			oneYearBefore.add(Calendar.YEAR, -1);
			from = oneYearBefore.getTime();
		}
		return diseaseFaqDao.descSortDiseaseFaqByDeptPopularity(from, to, cityId, pageable);
	}

	@Override
	public List<DiseaseFaqVo> descSortDiseaseFaqByHospPopularity(Date from, Date to, Long cityId, Pageable pageable) {
		if (to == null) {
			to = new Date();
		}
		if (from == null) {
			Calendar oneYearBefore = Calendar.getInstance();
			oneYearBefore.setTime(to);
			oneYearBefore.add(Calendar.DATE, -7);
			from = oneYearBefore.getTime();
		}
		return diseaseFaqDao.descSortDiseaseFaqByHospPopularity(from, to, cityId, pageable);
	}

	@Override
	public List<DiseaseFaqVo> descSortDiseaseFaqByDocPopularity(Date from, Date to, Long cityId, Pageable pageable) {
		if (to == null) {
			to = new Date();
		}
		if (from == null) {
			Calendar oneYearBefore = Calendar.getInstance();
			oneYearBefore.setTime(to);
			oneYearBefore.add(Calendar.DATE, -7);
			from = oneYearBefore.getTime();
		}
		return diseaseFaqDao.descSortDiseaseFaqByDocPopularity(from, to, cityId, pageable);
	}
	
	
}
