package com.isoft.wm.infosys.service;

import com.isoft.wm.infosys.resp.DocResAnalysisResp;
import com.isoft.wm.infosys.viewmodel.DoctorViewModel;
import com.isoft.wm.infosys.viewmodel.HospitalViewModel;

public interface MedicalResourcesAnalysisService {

    HospitalViewModel drawResourcesAnalysisGrid(String hospitalName);

    DocResAnalysisResp drawDoctorResourcesAnalysisGrid(String doctorName);

    DoctorViewModel getDoctorDetails(Long doctorId);

}