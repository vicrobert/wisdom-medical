package com.isoft.wm.infosys.dao;

import com.isoft.wm.infosys.entity.DepartmentVo;
import com.isoft.wm.infosys.entity.DeptDetailsVo;
import com.isoft.wm.infosys.entity.DeptHospPairVo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepartmentDao extends PagingAndSortingRepository<DepartmentVo, Long>{
	@Query(value = "select count(d.id) from DepartmentVo d, HospitalVo h where d.hospitalId = h.id")
	long count();
	
	@Query(value = "select count(d.id) from DepartmentVo d, HospitalVo h where d.hospitalId = h.id and d.name like %:departmentName%")
	long countByNameLike(@Param("departmentName") String departmentName);
	
	@Query(value = "from DepartmentVo d where d.name = :departmentName")
	List<DepartmentVo> findByName(@Param("departmentName") String departmentName, Pageable pageable);
	
	@Query(value = "from DepartmentVo d where d.name like %:departmentName%")
	List<DepartmentVo> findByNameLike(@Param("departmentName") String departmentName, Pageable pageable);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DeptDetailsVo(d.id, d.name, h.website, h.address, h.tel, h.departmentNum, h.doctorNum, h.featureDepartment) from HospitalVo h, DepartmentVo d where h.id = d.hospitalId and d.name like %:departmentName%")
	List<DeptDetailsVo> findDetailsByNameLike(@Param("departmentName") String departmentName, Pageable pageable);
	
	@Query(value = "select new DepartmentVo(d.name, sum(d.doctorNum)) from DepartmentVo d, HospitalVo h where d.hospitalId = h.id and h.province = :province group by d.name order by sum(d.doctorNum) desc")
	List<DepartmentVo> getTopNDepartmentOfProvinceByDoctorNum(@Param("province") String province, Pageable pageable);
	
	@Query(value = "select new DepartmentVo(d.name, sum(d.doctorNum)) from DepartmentVo d, HospitalVo h where d.hospitalId = h.id and h.province = :province group by d.name order by sum(d.doctorNum) asc")
	List<DepartmentVo> getLastNDepartmentOfProvinceByDoctorNum(@Param("province") String province, Pageable pageable);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DeptDetailsVo(d.id, d.name, h.website, h.address, h.tel, h.departmentNum, h.doctorNum, h.featureDepartment) from HospitalVo h, DepartmentVo d where h.id = d.hospitalId")
	List<DeptDetailsVo> listDetailsAll(Pageable pageable);
	
	@Query(value = "from DepartmentVo d where d.hospitalId = :hospitalId")
	List<DepartmentVo> pullByHospitalId(@Param("hospitalId") Long hospitalId, Pageable pageable);
	
	//@Query(value = "select new com.isoft.wm.infosys.entity.DepartmentVo() from (select d1 from DepartmentVo d1 where d1.hospitalId = :hospitalId1 union select d2 from DepartmentVo d2 where d2.hospitalId = :hospitalId2) d group by d.name having count(d.name)=2")
	@Query(value = "from DepartmentVo d1 where d1.hospitalId = :hospitalId1 and d1.name in (select d2.name from DepartmentVo d2 where d2.hospitalId = :hospitalId2)")
	List<DepartmentVo> pullIntersectDeptOfTwoHospitals(@Param("hospitalId1") Long hospitalId1, @Param("hospitalId2") Long hospitalId2);
	
	//@Query(value = "select new com.isoft.wm.infosys.entity.DepartmentVo() from (select d1 from DepartmentVo d1 where d1.hospitalId = :hospitalId1 and d1.treeLevel = :treeLevel union select d2 from DepartmentVo d2 where d2.hospitalId = :hospitalId2 and d2.treeLevel = :treeLevel) d group by d.name having count(d.name)=2")
	@Query(value = "from DepartmentVo d1 where d1.hospitalId = :hospitalId1 and d1.treeLevel = :treeLevel and d1.name in (select d2.name from DepartmentVo d2 where d2.hospitalId = :hospitalId2 and d2.treeLevel = :treeLevel)")
	List<DepartmentVo> pullIntersectDeptOfTwoHospitals(@Param("hospitalId1") Long hospitalId1, @Param("hospitalId2") Long hospitalId2, @Param("treeLevel") Integer treeLevel);
	
	@Query(value = "from DepartmentVo d where d.hospitalId = :hospitalId and d.treeLevel = :treeLevel")
	List<DepartmentVo> pullByHospitalId(@Param("hospitalId") Long hospitalId, @Param("treeLevel") Integer treeLevel, Pageable pageable);
		
	@Query(value = "select new com.isoft.wm.infosys.entity.DepartmentVo(d.name, sum(d.doctorNum)) from DepartmentVo d, HospitalVo h where d.hospitalId = h.id and h.name like %:hospitalName% group by d.name")
	List<DepartmentVo> pullByHospitalNameLike(@Param("hospitalName") String hospitalName, Pageable pageable);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DepartmentVo(d.name, sum(d.doctorNum)) from DepartmentVo d, HospitalVo h where d.hospitalId = h.id and h.name like %:hospitalName% and d.treeLevel = :treeLevel group by d.name")
	List<DepartmentVo> pullByHospitalNameLike(@Param("hospitalName") String hospitalName, @Param("treeLevel") Integer treeLevel, Pageable pageable);
	
	@Query(value = "from DepartmentVo d where d.parentDepartmentId = :parentDeptId")
	List<DepartmentVo> pullSubDepartments(@Param("parentDeptId") Long parentDeptId, Pageable pageable);
	
	@Query(value = "from DepartmentVo d where d.parentDepartmentId = :parentDeptId and d.treeLevel = :treeLevel")
	List<DepartmentVo> pullSubDepartments(@Param("parentDeptId") Long parentDeptId, @Param("treeLevel") Integer treeLevel, Pageable pageable);
	
	@Query(value = "from DepartmentVo d where d.hospitalId = :hospitalId and d.parentDepartmentId in (select d1.id from DepartmentVo d1 where d1.name = :parentDeptName)")
	List<DepartmentVo> pullSubDepartmentsByParentName(@Param("hospitalId") Long hospitalId, @Param("parentDeptName") String parentDeptName, Pageable pageable);
	
	
//	@Query(value = "from DepartmentVo d where d.hospitalId = :hospitalId and d.treeLevel = :treeLevel and d.parentDepartmentId in (select d1.id from DepartmentVo d1 where d1.name = :parentDeptName)")
//	List<DepartmentVo> pullSubDepartmentsByParentName(@Param("hospitalId") Long hospitalId, @Param("parentDeptName") String parentDeptName, @Param("treeLevel") Integer treeLevel, Pageable pageable);
	
		
	@Query(value = "select new com.isoft.wm.infosys.entity.DeptHospPairVo(d.name, d.doctorNum, h.name) from DepartmentVo d, HospitalVo h where d.hospitalId = h.id and h.id = :hospitalId group by d.id")
	List<DeptHospPairVo> genDeptHospPairByHospId(@Param("hospitalId") Long hospitalId);
	
	@Query(value = "select new com.isoft.wm.infosys.entity.DeptHospPairVo(d.name, d.doctorNum, h.name) from DepartmentVo d, HospitalVo h where d.hospitalId = h.id and d.parentDepartmentId = :parentDepartmentId and h.id = :hospitalId group by d.id")
	List<DeptHospPairVo> genDeptHospPairByParentIdAndHospId(@Param("parentDepartmentId") String parentDepartmentId, @Param("hospitalId") String hospitalId);
}
