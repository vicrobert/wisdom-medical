package com.isoft.wm.infosys.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.isoft.wm.infosys.api.InternetMedicalService;
import com.isoft.wm.infosys.utils.CommonUtils;


@RestController
public class InternetResourcesAnalysisController {
	@Reference
	InternetMedicalService internetMedicalService;
	
	@RequestMapping("/medical/DoctorInternetAnalysisRefreshD3.action")
	public String refreshResourcesAnalysisGrid(@RequestParam(required=false) String hospitalName) {
		return internetMedicalService.drawResourcesAnalysisGrid(CommonUtils.URLDecode(hospitalName));
	}
	
	@RequestMapping("/medical/DoctorInternetAnalysisRefreshD3ByDoctor.action")
	public String refreshResourcesAnalysisGridByDoctorName(@RequestParam(required=false) String doctorName) {
		return internetMedicalService.drawDoctorResourcesAnalysisGrid(CommonUtils.URLDecode(doctorName));
	}
	
	@RequestMapping("/medical/DoctorInternetAnalysisGetDoctorDetails.action") 
	public String refreshDoctorProfile(@RequestParam(required=false) Long doctorId) {
		return internetMedicalService.getDoctorDetails(doctorId);
	}
}
