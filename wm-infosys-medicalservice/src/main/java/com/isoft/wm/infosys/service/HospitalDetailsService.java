package com.isoft.wm.infosys.service;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.resp.DeptProNumOfHospResp;
import com.isoft.wm.infosys.resp.DocLevelNumOfDeptOfHospResp;
import com.isoft.wm.infosys.resp.DocLevelNumOfHospResp;
import com.isoft.wm.infosys.resp.DocNumOfDeptCircleResp;
import com.isoft.wm.infosys.resp.HospitalEvalResp;
import com.isoft.wm.infosys.resp.HospitalSentimentResp;
import com.isoft.wm.infosys.viewmodel.HospitalViewModel;

public interface HospitalDetailsService {

    DocNumOfDeptCircleResp getDoctorNumOfDepartment(String hospitalName);

    DocLevelNumOfHospResp getHospDocLevelNumber(String hospitalName);

    DeptProNumOfHospResp getHospDeptProNumber(String hospitalName);

    DocLevelNumOfDeptOfHospResp foo(String hospitalName);

    HospitalViewModel getHospIntroduction(String hospitalName);

    HospitalEvalResp getHospitalEvaluation(String hospitalName);

    HospitalSentimentResp getHospitalSentimentTopN(String hospitalName, Pageable pageable);

}