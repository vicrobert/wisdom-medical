package com.isoft.wm.infosys.service;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.resp.PatientFindDoctorInfoResp;

public interface PatientFindDoctorService {

	PatientFindDoctorInfoResp pullDoctorInfoByName(String name, Pageable pageable);

}