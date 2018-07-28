package com.isoft.wm.infosys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.resp.PatientFindDoctorInfoResp;

@Service
public class PatientFindDoctorServiceImpl implements PatientFindDoctorService {
	@Autowired
	HospitalService hospitalService;
	
	/* (non-Javadoc)
	 * @see com.isoft.wm.infosys.service.PatientFindDoctorService#pullDoctorInfoByName(java.lang.String, org.springframework.data.domain.Pageable)
	 */
	@Override
	public PatientFindDoctorInfoResp pullDoctorInfoByName(String name, Pageable pageable) {
		if (name != null) {
			return new PatientFindDoctorInfoResp(hospitalService.getDoctorNumByNameLike(name), pageable.getPageNumber(), pageable.getPageSize(), hospitalService.findDoctorByNameLike(name, pageable));
		} else {
			return new PatientFindDoctorInfoResp(hospitalService.getDoctorNum(), pageable.getPageNumber(), pageable.getPageSize(), hospitalService.listAllDoctors(pageable));
		}
	}
}
