package com.isoft.wm.infosys.dao;

import com.isoft.wm.infosys.entity.HospEvalVo;
import com.isoft.wm.infosys.entity.HospSentimentVo;
import com.isoft.wm.infosys.entity.HospitalVo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HospitalDao extends PagingAndSortingRepository<HospitalVo, Long>{
	@Query(value = "from HospitalVo h where h.name = :hospitalName")
	List<HospitalVo> findByName(@Param("hospitalName") String hospitalName, Pageable pageable);
	
	@Query(value = "from HospitalVo h where h.name like %:hospitalName%")
	//@NonNull
	List<HospitalVo> findByNameLike(@Param("hospitalName") String hospitalName, Pageable pageable);
	
	@Query(value = "select count(h.id) from HospitalVo h where h.name like %:hospitalName%")
	long countByNameLike(@Param("hospitalName") String hospitalName);
	
	@Query(value = "from HospEvalVo he where he.hospitalId = :hospitalId")
	List<HospEvalVo> getEvaluation(@Param("hospitalId") Long hospitalId);
	
	@Query(value = "from HospSentimentVo hs where hs.hospitalId = :hospitalId")
	
	List<HospSentimentVo> getSentimentsTopN(@Param("hospitalId") Long hospitalId, Pageable pageable);
	
	@Query(value = "from HospitalVo h where h.province = :province")
	List<HospitalVo> getDomesticHospDistribution(@Param("province") String province);
	
	@Query(value = "select count(*) from HospitalVo h where h.province=:province")
	Long getHosptialNumOfProvince(@Param("province") String province);
	
	@Query(value = "select sum(h.departmentNum) from HospitalVo h where h.province=:province")
	Long getDepartmentNumOfProvince(@Param("province") String province);
	
	@Query(value = "select sum(h.doctorNum) from HospitalVo h where h.province=:province")
	Long getDoctorNumOfProvince(@Param("province") String province);
	
	//一级医院数
	@Query(value = "select count(*) from HospitalVo h where h.province=:province and h.level='一级'")
	Long getLevel1HospNumOfProvince(@Param("province") String province);
	
	//一甲医院数
	@Query(value = "select count(*) from HospitalVo h where h.province=:province and h.level like '%一%甲%'")
	Long getLevel1AHospNumOfProvince(@Param("province") String province);
	
	//二级医院数
	@Query(value = "select count(*) from HospitalVo h where h.province=:province and h.level='二级'")
	Long getLevel2HospNumOfProvince(@Param("province") String province);
	
	//二甲医院数
	@Query(value = "select count(*) from HospitalVo h where h.province=:province and h.level like '%二%甲%'")
	Long getLevel2AHospNumOfProvince(@Param("province") String province);
	
	//三级医院数
	@Query(value = "select count(*) from HospitalVo h where h.province=:province and h.level='三级'")
	Long getLevel3HospNumOfProvince(@Param("province") String province);
	
	//三甲医院数
	@Query(value = "select count(*) from HospitalVo h where h.province=:province and h.level like '%三%甲%'")
	Long getLevel3AHospNumOfProvince(@Param("province") String province);
	
	
}
