package com.isoft.wm.infosys.service;

import com.isoft.wm.infosys.dao.DepartmentDao;
import com.isoft.wm.infosys.dao.DoctorDao;
import com.isoft.wm.infosys.dao.HospitalDao;
import com.isoft.wm.infosys.entity.*;
import com.isoft.wm.infosys.viewmodel.HospStatisticsPerProvinceViewModel;
import com.isoft.wm.infosys.viewmodel.SuperiorityAndInferiorDeptViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HospitalServiceImpl implements HospitalService {
    @Autowired
    private HospitalDao hospitalDao;

    @Autowired
    private DepartmentDao departmentDao;

    @Autowired
    private DoctorDao doctorDao;

    @Override
    public Optional<HospitalVo> getHospital(Long hospitalId) {
        return hospitalDao.findById(hospitalId);
    }


    @Override
    public List<HospitalVo> findHospitalByNameLike(String hospitalName) {
        return hospitalDao.findByNameLike(hospitalName, null);
    }


    @Override
    public List<HospitalVo> findHospitalByNameLike(String hospitalName, Pageable pageable) {
        return hospitalDao.findByNameLike(hospitalName, pageable);
    }

    @Override
    public List<HospitalVo> listAllHospitals(Pageable pageable) {
        Iterable<HospitalVo> hospVoIter = hospitalDao.findAll(pageable);
        List<HospitalVo> respList = new ArrayList<HospitalVo>();
        hospVoIter.forEach(e -> {
            respList.add(e);
        });
        return respList;
    }

    @Override
    public long getHospitalNumber() {
        return hospitalDao.count();
    }

    @Override
    public long getHospitalNumberByNameLike(String hospitalName) {
        return hospitalDao.countByNameLike(hospitalName);
    }


    @Override
    public List<HospEvalVo> getHospitalEvaluation(Long hospitalId) {
        return hospitalDao.getEvaluation(hospitalId);
    }

    @Override
    public List<HospSentimentVo> getHospitalSentimentTopN(Long hospitalId, Pageable pageable) {
        return hospitalDao.getSentimentsTopN(hospitalId, pageable);
    }

    @Override
    public List<HospitalVo> getDomesticHospDistribution(String province) {
        return hospitalDao.getDomesticHospDistribution(province);
    }

    @Override
    public DepartmentVo getDepartment(Long departmentId) {
        return departmentDao.findById(departmentId).orElseGet(() -> {
            return null;
        });
    }

    @Override
    public long getDepartmentNum() {
        return departmentDao.count();
    }

    @Override
    public long getDepartmentNumByNameLike(String name) {
        return departmentDao.countByNameLike(name);
    }

    /**
     * Pull departments by hospital name
     *
     * @param treeLevel if treeLevel less&equal -1 then pull all departments with different level
     */
    @Override
    public List<DepartmentVo> pullDepartmentsByHospitalNameLike(String hospitalName, int treeLevel) {
        if (hospitalName != null) {
            return treeLevel > -1 ? departmentDao.pullByHospitalNameLike(hospitalName, treeLevel, null) :
                    departmentDao.pullByHospitalNameLike(hospitalName, null);
        }
        return null;
    }

    @Override
    public List<DocLevelNumVo> getDocNumOfDiffLevelsByHospNameLike(String hospitalName) {
        List<HospitalVo> hospList = hospitalDao.findByNameLike(hospitalName, null);
        if (hospList != null && hospList.size() > 0) {
            HospitalVo hosp = hospList.get(0);
            return doctorDao.docLevelNumOfHospital(hosp.getId());
        }
        return null;
    }

    @Override
    public List<DeptProNumVo> getDeptProNumOfHospital(String hospitalName) {
        List<HospitalVo> hospList = hospitalDao.findByNameLike(hospitalName, null);
        if (hospList != null && hospList.size() > 0) {
            HospitalVo hosp = hospList.get(0);
            return doctorDao.deptProNumOfHospital(hosp.getId());
        }
        return null;
    }

    /**
     * Pull departments by hospital id
     *
     * @param treeLevel if treeLevel less&equal -1 then pull all departments with different level
     */
    @Override
    public List<DepartmentVo> pullDepartmentsByHospitalId(Long hospitalId, int treeLevel) {
        return treeLevel > -1 ? departmentDao.pullByHospitalId(hospitalId, treeLevel, null) :
                departmentDao.pullByHospitalId(hospitalId, null);
    }

    @Override
    public List<DepartmentVo> pullSubDepartmentsByParentName(Long hospitalId, String parentDeptName, Pageable pageable) {
        return departmentDao.pullSubDepartmentsByParentName(hospitalId, parentDeptName, pageable);
    }

    @Override
    public List<DeptDetailsVo> findDeptDetailsByNameLike(String name, Pageable pageable) {
        return departmentDao.findDetailsByNameLike(name, pageable);
    }

    @Override
    public List<DeptDetailsVo> listAllDeptsDetails(Pageable pageable) {
        return departmentDao.listDetailsAll(pageable);
    }

    @Override
    public List<DepartmentVo> subDepartmentTreeWalk(Long parentDeptId, int treeLevelFrom, int treeLevelTo) {
        if (treeLevelTo != -1 && treeLevelFrom > treeLevelTo) {
            return null;
        }
        parentDeptId = parentDeptId == null ? -1 : parentDeptId;
        List<DepartmentVo> subDeptList = departmentDao.pullSubDepartments(parentDeptId, treeLevelFrom, null);
        if (subDeptList != null) {
            for (DepartmentVo dept : subDeptList) {
                dept.setChildren(subDepartmentTreeWalk(dept.getId(), treeLevelFrom + 1, treeLevelTo));
            }
        }
        return subDeptList;
    }

    @Override
    public List<DocLevelNumVo> getDocNumOfDiffLevelsByDeptId(Long departmentId) {
        return doctorDao.docLevelNumOfDepartment(departmentId);
    }

    @Override
    public List<DocLevelNumVo> getDocNumOfDiffLevels(Long hospitalId, String departmentName) {
        return doctorDao.docLevelNumOfDepartment(hospitalId, departmentName);
    }

    @Override
    public long getDocNumOfDepartment(Long hospitalId, String departmentName) {
        return doctorDao.docNumOfDepartment(hospitalId, departmentName);
    }

    @Override
    public DoctorVo getDoctorById(Long doctorId) {
        return doctorDao.findById(doctorId).orElseGet(() -> {
            return null;
        });
    }


    @Override
    public List<DoctorVo> findDoctorByNameLike(String doctorName) {
        return doctorDao.findByNameLike(doctorName, null);
    }


    @Override
    public List<DoctorVo> findDoctorByNameLike(String doctorName, Pageable pageable) {
        return doctorDao.findByNameLike(doctorName, pageable);
    }

    @Override
    public List<DoctorVo> listAllDoctors(Pageable pageable) {
        return doctorDao.listAllDoctors(pageable);
    }


    @Override
    public long getDoctorNum() {
        return doctorDao.count();
    }

    @Override
    public long getDoctorNumByNameLike(String name) {
        return doctorDao.countByNameLike(name);
    }

    @Override
    public List<DoctorVo> pullDoctorsByDepartmentId(Long departmentId) {
        return doctorDao.doctorsOfDepartment(departmentId);
    }


    @Override
    public HospStatisticsPerProvinceViewModel getHospStatisticalDataOfEachProvince(String province) {
        return new HospStatisticsPerProvinceViewModel(
                province,
                hospitalDao.getHosptialNumOfProvince(province),
                hospitalDao.getDepartmentNumOfProvince(province),
                hospitalDao.getDoctorNumOfProvince(province),
                hospitalDao.getLevel1HospNumOfProvince(province),
                hospitalDao.getLevel1AHospNumOfProvince(province),
                hospitalDao.getLevel2HospNumOfProvince(province),
                hospitalDao.getLevel2AHospNumOfProvince(province),
                hospitalDao.getLevel3HospNumOfProvince(province),
                hospitalDao.getLevel3AHospNumOfProvince(province)
        );
    }


    @Override
    public List<SuperiorityAndInferiorDeptViewModel> getTop5DeptOfProvince(String province) {
        List<SuperiorityAndInferiorDeptViewModel> top5DeptList = new ArrayList<SuperiorityAndInferiorDeptViewModel>();
        List<DepartmentVo> deptList = departmentDao.getTopNDepartmentOfProvinceByDoctorNum(province, PageRequest.of(0, 5));
        if (deptList != null) {
            long cnt = 1;
            for (DepartmentVo dept : deptList) {
                SuperiorityAndInferiorDeptViewModel vm = new SuperiorityAndInferiorDeptViewModel(province, dept.getName(), dept.getDoctorNum() / 10.0, 6 - cnt, cnt);
                top5DeptList.add(vm);
                cnt++;
            }
        }
        return top5DeptList;
    }


    @Override
    public List<SuperiorityAndInferiorDeptViewModel> getLast5DeptOfProvince(String province) {
        List<SuperiorityAndInferiorDeptViewModel> last5DeptList = new ArrayList<SuperiorityAndInferiorDeptViewModel>();
        List<DepartmentVo> deptList = departmentDao.getLastNDepartmentOfProvinceByDoctorNum(province, PageRequest.of(0, 5));
        if (deptList != null) {
            long cnt = 1;
            for (DepartmentVo dept : deptList) {
                SuperiorityAndInferiorDeptViewModel vm = new SuperiorityAndInferiorDeptViewModel(province, dept.getName(), dept.getDoctorNum() / 10.0, cnt, 6 - cnt);
                last5DeptList.add(vm);
                cnt++;
            }
        }
        return last5DeptList;
    }

    @Override
    public List<DepartmentVo> pullIntersectDeptOfTwoHospitals(Long hospitalId1, Long hospitalId2, int treeLevel) {
        return treeLevel > -1 ? departmentDao.pullIntersectDeptOfTwoHospitals(hospitalId1, hospitalId2, treeLevel) : departmentDao.pullIntersectDeptOfTwoHospitals(hospitalId1, hospitalId2);
    }
}
