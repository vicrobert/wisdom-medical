package com.isoft.wm.infosys.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.DiseaseFaqOverCityVo;
import com.isoft.wm.infosys.entity.DiseaseFaqVo;

public interface DiseaseFaqDao extends PagingAndSortingRepository<DiseaseFaqVo, Long>{
//	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseFaqVo(df.diseaseName, sum(df.askNum), sum(df.answerNum), df.askAt, df.askContent, df.answerContent, df.doctorId)"
//			+ " from DiseaseFaqVo df where df.cityId = :cityId  and df.askAt between :from and :to group by df.askAt order by df.askAt asc")
	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseFaqVo(sum(df.askNum), sum(df.answerNum), df.askAt) from DiseaseFaqVo df"
			+ " where df.cityId = :cityId and df.askAt between :from and :to group by df.askAt order by df.askAt asc")
	List<DiseaseFaqVo> getDiseaseFaqNumByDateAndCity(@Param("from") Date from, @Param("to") Date to, @Param("cityId") Long cityId);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseFaqVo(df.diseaseName, sum(df.askNum), sum(df.answerNum)) from DiseaseFaqVo df"
			+ " where df.cityId = :cityId  and df.askAt between :from and :to group by df.diseaseName order by sum(df.askNum) desc")
	List<DiseaseFaqVo> getDiseaseTopNRankByDateAndCity(@Param("from") Date from, @Param("to") Date to, @Param("cityId") Long cityId, Pageable pageable);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseFaqOverCityVo(c.city, c.lng, c.lat, sum(df.askNum), sum(df.answerNum))"
			+ " from CityVo c, DiseaseFaqVo df where df.cityId = c.id and df.askAt between :from and :to group by df.cityId")
	List<DiseaseFaqOverCityVo> getDiseaseFaqNumOverAllCities(@Param("from") Date from, @Param("to") Date to);
	
	//@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseFaqVo(df.departmentName, sum(df.askNum), sum(df.answerNum), df.askAt, df.askContent, df.answerContent, df.doctorId, h.name, h.address)"
	//		+ " from DiseaseFaqVo df, HospitalVo h where df.cityId = :cityId and df.askAt between :from and :to and h.id = df.hospitalId group by df.departmentName order by sum(df.askNum) desc")
	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseFaqVo(df.departmentName, sum(df.askNum), sum(df.answerNum), h.name, h.address) from DiseaseFaqVo df, HospitalVo h"
			+ " where df.cityId = :cityId and df.askAt between :from and :to and h.id = df.hospitalId group by h.id, df.departmentName order by sum(df.askNum) desc")
	List<DiseaseFaqVo> descSortDiseaseFaqByDeptPopularity(@Param("from") Date from, @Param("to") Date to, @Param("cityId") Long cityId, Pageable pageable);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseFaqVo(h.name, h.level, h.address, sum(df.askNum))"
			+ " from DiseaseFaqVo df, HospitalVo h where df.cityId = :cityId and df.askAt between :from and :to and h.id = df.hospitalId group by df.hospitalId order by sum(df.askNum) desc")
	List<DiseaseFaqVo> descSortDiseaseFaqByHospPopularity(@Param("from") Date from, @Param("to") Date to, @Param("cityId") Long cityId, Pageable pageable);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DiseaseFaqVo(d.name, d.departmentName, d.hospitalName, sum(df.askNum), d.goodAt)"
			+ " from DiseaseFaqVo df, DoctorVo d where df.cityId = :cityId and df.askAt between :from and :to and d.id = df.doctorId group by df.doctorId order by sum(df.askNum) desc")
	List<DiseaseFaqVo> descSortDiseaseFaqByDocPopularity(@Param("from") Date from, @Param("to") Date to, @Param("cityId") Long cityId, Pageable pageable);
}
