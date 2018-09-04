package com.isoft.wm.infosys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.resp.PatientFindDeptInfoResp;

@Service
public class PatientFindDepartmentServiceImpl implements PatientFindDepartmentService {
    @Autowired
    HospitalService hospitalService;

    /* (non-Javadoc)
     * @see com.isoft.wm.infosys.service.PatientFindDepartmentService#pullDepartmentByName(java.lang.String, org.springframework.data.domain.Pageable)
     */
    @Override
    public PatientFindDeptInfoResp pullDepartmentByName(String name, Pageable pageable) {
        if (name != null) {
            return new PatientFindDeptInfoResp(hospitalService.getDepartmentNumByNameLike(name), pageable.getPageNumber(), pageable.getPageSize(), hospitalService.findDeptDetailsByNameLike(name, pageable));
        } else {
            return new PatientFindDeptInfoResp(hospitalService.getDepartmentNum(), pageable.getPageNumber(), pageable.getPageSize(), hospitalService.listAllDeptsDetails(pageable));
        }

    }
}
