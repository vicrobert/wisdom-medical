package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.PatientVo;

public interface PatientDao extends JpaRepository<PatientVo, Long>{
	@Query(value = "from PatientVo p where p.name = :name")
	List<PatientVo> findByName(@Param("name") String name);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.PatientVo(p.age, count(p.id)) from PatientVo p, DiseaseStatisticsVo ds"
			+ " where p.sex = :sex and p.id = ds.patientId and ds.occurYear = :year and ds.diseaseId = :diseaseId group by p.age order by count(p.id) desc")
	List<PatientVo> diseasePortraitSortByAge(@Param("diseaseId") Long diseaseId, @Param("year") Integer year, @Param("sex") String sex, Pageable page);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.PatientVo(p.occupation, count(p.id), 'occupation') from PatientVo p, DiseaseStatisticsVo ds"
			+ " where p.id = ds.patientId and ds.occurYear = :year and ds.diseaseId = :diseaseId group by p.occupation order by count(p.id) desc")
	List<PatientVo> diseasePortraitSortByOccupation(@Param("diseaseId") Long diseaseId, @Param("year") Integer year, Pageable page);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.PatientVo(p.hobby, count(p.id), 'hobby') from PatientVo p, DiseaseStatisticsVo ds"
			+ " where p.id = ds.patientId and ds.occurYear = :year and ds.diseaseId = :diseaseId group by p.hobby order by count(p.id) desc")
	List<PatientVo> diseasePortraitSortByHobby(@Param("diseaseId") Long diseaseId, @Param("year") Integer year, Pageable page);
}
