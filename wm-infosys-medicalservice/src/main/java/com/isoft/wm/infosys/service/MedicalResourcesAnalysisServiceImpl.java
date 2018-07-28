package com.isoft.wm.infosys.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.entity.DepartmentVo;
import com.isoft.wm.infosys.entity.DoctorVo;
import com.isoft.wm.infosys.entity.HospitalVo;
import com.isoft.wm.infosys.resp.DocResAnalysisResp;
import com.isoft.wm.infosys.viewmodel.DepartmentViewModel;
import com.isoft.wm.infosys.viewmodel.DoctorViewModel;
import com.isoft.wm.infosys.viewmodel.HospitalViewModel;

@Service
public class MedicalResourcesAnalysisServiceImpl implements MedicalResourcesAnalysisService {
	@Autowired
	HospitalService hospitalService;
		
	/* (non-Javadoc)
	 * @see com.isoft.wm.infosys.service.MedicalResourcesAnalysisService#drawResourcesAnalysisGrid(java.lang.String)
	 */
	@Override
	public HospitalViewModel drawResourcesAnalysisGrid(String hospitalName) {
		List<HospitalVo> hospList = hospitalService.findHospitalByNameLike(hospitalName);
		if (hospList != null && hospList.size() > 0) {
			HospitalViewModel hosp = new HospitalViewModel(hospList.get(0));	
			List<DepartmentVo> deptList = hospitalService.pullDepartmentsByHospitalId(hospList.get(0).getId(), -1);
			if (deptList != null) {
				List<DepartmentViewModel> deptVmList = new ArrayList<DepartmentViewModel>();
				for (DepartmentVo dept: deptList) {
					DepartmentViewModel deptVm = new DepartmentViewModel(dept);
					List<DoctorVo> docList = hospitalService.pullDoctorsByDepartmentId(deptVm.getId());
					List<DoctorViewModel> docVmList = new ArrayList<DoctorViewModel>();
					if (docList != null) {					
						for (DoctorVo doc: docList) {
							docVmList.add(new DoctorViewModel(doc));						
						}
					}
					deptVm.setChildren(docVmList);
					deptVmList.add(deptVm);
				}
				hosp.setChildren(deptVmList);
			}
			return hosp;
		}
		return null;
	}
	
	/* (non-Javadoc)
	 * @see com.isoft.wm.infosys.service.MedicalResourcesAnalysisService#drawDoctorResourcesAnalysisGrid(java.lang.String)
	 */
	@Override
	public DocResAnalysisResp drawDoctorResourcesAnalysisGrid(String doctorName) {
		List<DoctorVo> docList = hospitalService.findDoctorByNameLike(doctorName);
		if (docList != null) {
			List<DoctorViewModel> docVmList = new ArrayList<DoctorViewModel>();
			for (DoctorVo doc: docList) {
				DoctorViewModel docVm = new DoctorViewModel(doc);
				List<DepartmentViewModel> deptVmList = new ArrayList<DepartmentViewModel>();
				DepartmentViewModel deptVm = new DepartmentViewModel(hospitalService.getDepartment(doc.getDepartmentId()));
				List<HospitalViewModel> hospVmList = new  ArrayList<HospitalViewModel>();
				HospitalViewModel hospVm = new HospitalViewModel(hospitalService.getHospital(deptVm.getHospitalId()).orElseGet(()->{return null;}));
				hospVmList.add(hospVm);
				deptVm.setChildren(hospVmList);
				deptVmList.add(deptVm);
				docVm.setChildren(deptVmList);
				docVmList.add(docVm);
			}
			return new DocResAnalysisResp(docVmList);
		}
		return null;
	}
	
	/* (non-Javadoc)
	 * @see com.isoft.wm.infosys.service.MedicalResourcesAnalysisService#getDoctorDetails(java.lang.Long)
	 */
	@Override
	public DoctorViewModel getDoctorDetails(Long doctorId) {
		DoctorVo doctor = hospitalService.getDoctorById(doctorId);
		return doctor != null ? new DoctorViewModel(doctor) : null;
	}
}
