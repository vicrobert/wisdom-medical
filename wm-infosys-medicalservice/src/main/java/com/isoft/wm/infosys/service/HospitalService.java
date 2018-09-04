package com.isoft.wm.infosys.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.entity.DepartmentVo;
import com.isoft.wm.infosys.entity.DeptDetailsVo;
import com.isoft.wm.infosys.entity.DeptProNumVo;
import com.isoft.wm.infosys.entity.DocLevelNumVo;
import com.isoft.wm.infosys.entity.DoctorVo;
import com.isoft.wm.infosys.entity.HospEvalVo;
import com.isoft.wm.infosys.entity.HospSentimentVo;
import com.isoft.wm.infosys.entity.HospitalVo;
import com.isoft.wm.infosys.viewmodel.HospStatisticsPerProvinceViewModel;
import com.isoft.wm.infosys.viewmodel.SuperiorityAndInferiorDeptViewModel;

public interface HospitalService {
    Optional<HospitalVo> getHospital(Long hospitalId);

    List<HospitalVo> findHospitalByNameLike(String hospitalName);

    List<HospitalVo> findHospitalByNameLike(String hospitalName, Pageable pageable);

    List<HospitalVo> listAllHospitals(Pageable pageable);

    long getHospitalNumber();

    long getHospitalNumberByNameLike(String hospitalName);

    List<HospEvalVo> getHospitalEvaluation(Long hospitalId);

    List<HospSentimentVo> getHospitalSentimentTopN(Long hospitalId, Pageable pageable);

    List<HospitalVo> getDomesticHospDistribution(String province);

    DepartmentVo getDepartment(Long departmentId);

    long getDepartmentNum();

    long getDepartmentNumByNameLike(String name);

    List<DepartmentVo> pullDepartmentsByHospitalNameLike(String hospitalName, int treeLevel);

    List<DepartmentVo> pullDepartmentsByHospitalId(Long hospitalId, int treeLevel);

    List<DepartmentVo> pullSubDepartmentsByParentName(Long hospitalId, String parentDeptName, Pageable pageable);

    List<DeptDetailsVo> findDeptDetailsByNameLike(String name, Pageable pageable);

    List<DeptDetailsVo> listAllDeptsDetails(Pageable pageable);

    List<DepartmentVo> subDepartmentTreeWalk(Long parentDeptId, int treeLevelFrom, int treeLevelTo);

    List<DeptProNumVo> getDeptProNumOfHospital(String hospitalName);

    List<DocLevelNumVo> getDocNumOfDiffLevelsByHospNameLike(String hospitalName);

    List<DocLevelNumVo> getDocNumOfDiffLevelsByDeptId(Long departmentId);

    List<DocLevelNumVo> getDocNumOfDiffLevels(Long hospitalId, String departmentName);

    long getDocNumOfDepartment(Long hospitalId, String departmentName);

    DoctorVo getDoctorById(Long doctorId);

    List<DoctorVo> findDoctorByNameLike(String doctorName);

    List<DoctorVo> findDoctorByNameLike(String doctorName, Pageable pageable);

    List<DoctorVo> listAllDoctors(Pageable pageable);

    long getDoctorNum();

    long getDoctorNumByNameLike(String name);

    List<DoctorVo> pullDoctorsByDepartmentId(Long departmentId);

    HospStatisticsPerProvinceViewModel getHospStatisticalDataOfEachProvince(String province);

    List<SuperiorityAndInferiorDeptViewModel> getTop5DeptOfProvince(String province);

    List<SuperiorityAndInferiorDeptViewModel> getLast5DeptOfProvince(String province);

    List<DepartmentVo> pullIntersectDeptOfTwoHospitals(Long hospitalId1, Long hospitalId2, int treeLevel);


}
