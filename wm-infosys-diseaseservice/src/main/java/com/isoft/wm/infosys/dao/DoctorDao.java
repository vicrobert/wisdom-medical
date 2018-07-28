package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.DiseaseVo;
import com.isoft.wm.infosys.entity.DoctorRecommendVo;

public interface DoctorDao extends JpaRepository<DiseaseVo, Long>{
	@Query(value = "select new com.isoft.wm.infosys.entity.DoctorRecommendVo(dr.treatNum, dr.commentNum, dr.treatYear, dr.treatMonth, d.name) from DoctorRecommendVo dr, DoctorVo d, HospitalVo h"
			+ " where dr.treatYear = :year and dr.treatMonth = :month and dr.doctorId = d.id and d.hospitalId = h.id and h.communityName = :community order by dr.treatNum")
	List<DoctorRecommendVo> recommendDoctorsAccordingToMonthTreat(@Param("community") String community, @Param("year") int year, @Param("month") int month, Pageable page);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DoctorRecommendVo(dr.treatNum, dr.commentNum, dr.treatYear, dr.treatMonth, d.name) from DoctorRecommendVo dr, DoctorVo d, HospitalVo h"
			+ " where dr.treatYear = :year and dr.doctorId = d.id and d.hospitalId = h.id and h.communityName = :community order by dr.treatNum")
	List<DoctorRecommendVo> recommendDoctorsAccordingToYearTreat(@Param("community") String community, @Param("year") int year, Pageable page);
}
