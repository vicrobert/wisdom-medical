package com.isoft.wm.infosys.dao;

import com.isoft.wm.infosys.entity.DeptProNumVo;
import com.isoft.wm.infosys.entity.DocLevelNumVo;
import com.isoft.wm.infosys.entity.DoctorVo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorDao extends PagingAndSortingRepository<DoctorVo, Long> {
    @Query(value = "select count(d.id) from DoctorVo d, HospitalVo h where d.hospitalId = h.id")
    long count();

    @Query(value = "select count(d.id) from DoctorVo d, HospitalVo h where d.hospitalId = h.id and d.name like %:doctorName%")
    long countByNameLike(@Param("doctorName") String doctorName);

    @Query(value = "select d from DoctorVo d, HospitalVo h where d.hospitalId = h.id and d.name like %:doctorName%")
    List<DoctorVo> findByNameLike(@Param("doctorName") String doctorName, Pageable pageable);

    @Query(value = "select d from DoctorVo d, HospitalVo h where d.hospitalId = h.id")
    List<DoctorVo> listAllDoctors(Pageable pageable);

    @Query(value = "from DoctorVo d where d.departmentId = :departmentId")
    List<DoctorVo> doctorsOfDepartment(@Param("departmentId") Long departmentId);

    @Query(value = "select new com.isoft.wm.infosys.entity.DocLevelNumVo(d.level, count(d.id)) from DoctorVo d where d.hospitalId=:hospitalId group by d.level")
    List<DocLevelNumVo> docLevelNumOfHospital(@Param("hospitalId") Long hospitalId);

    @Query(value = "select new com.isoft.wm.infosys.entity.DocLevelNumVo(d.level, count(d.id)) from DoctorVo d where d.departmentId=:departmentId group by d.level")
    List<DocLevelNumVo> docLevelNumOfDepartment(@Param("departmentId") Long departmentId);

    @Query(value = "select new com.isoft.wm.infosys.entity.DocLevelNumVo(d.level, count(d.id)) from DoctorVo d where d.hospitalId=:hospitalId and d.departmentName=:departmentName group by d.level")
    List<DocLevelNumVo> docLevelNumOfDepartment(@Param("hospitalId") Long hospitalId, @Param("departmentName") String departmentName);

    @Query(value = "select new com.isoft.wm.infosys.entity.DeptProNumVo(d.departmentName, count(d.id)) from DoctorVo d where d.hospitalId=:hospitalId and d.level='主任医师' group by d.departmentName")
    List<DeptProNumVo> deptProNumOfHospital(@Param("hospitalId") Long hospitalId);

    @Query(value = "select count(id) from DoctorVo d where d.hospitalId = :hospitalId and d.departmentName = :departmentName")
    long docNumOfDepartment(@Param("hospitalId") Long hospitalId, @Param("departmentName") String departmentName);
}
