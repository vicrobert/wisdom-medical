package com.isoft.wm.infosys.service;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.resp.PatientFindDeptInfoResp;

public interface PatientFindDepartmentService {

    PatientFindDeptInfoResp pullDepartmentByName(String name, Pageable pageable);

}