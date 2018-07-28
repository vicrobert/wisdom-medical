package com.isoft.wm.infosys.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.entity.DepartmentVo;
import com.isoft.wm.infosys.entity.DeptProNumVo;
import com.isoft.wm.infosys.entity.DocLevelNumVo;
import com.isoft.wm.infosys.entity.HospitalVo;
import com.isoft.wm.infosys.resp.DeptProNumOfHospResp;
import com.isoft.wm.infosys.resp.DocLevelNumOfDeptOfHospResp;
import com.isoft.wm.infosys.resp.DocLevelNumOfHospResp;
import com.isoft.wm.infosys.resp.DocNumOfDeptCircleResp;
import com.isoft.wm.infosys.resp.HospitalEvalResp;
import com.isoft.wm.infosys.resp.HospitalSentimentResp;
import com.isoft.wm.infosys.viewmodel.HospitalViewModel;

@Service
public class HospitalDetailsServiceImpl implements HospitalDetailsService {
	@Autowired
	HospitalService hospitalService;
	
	@Override
	public HospitalViewModel getHospIntroduction(String hospitalName) {
		HospitalViewModel hospitalViewModel = new HospitalViewModel();
		List<HospitalVo> hospitals = hospitalService.findHospitalByNameLike(hospitalName);
		if (hospitals != null && hospitals.size() > 0) {
			hospitalViewModel.setHospitalViewModel(hospitals.get(0));
			return hospitalViewModel;
		} else {
			return null;
		}		
	}
	
	@Override
	public HospitalEvalResp getHospitalEvaluation(String hospitalName) {
		HospitalEvalResp hospitalEvalResp = new HospitalEvalResp();
		List<HospitalVo> hospitals = hospitalService.findHospitalByNameLike(hospitalName);
		if (hospitals != null && hospitals.size() > 0) {
			hospitalEvalResp.setResultList(hospitalService.getHospitalEvaluation(hospitals.get(0).getId()));
		}
		return hospitalEvalResp;
	}
	
	@Override
	public HospitalSentimentResp getHospitalSentimentTopN(String hospitalName, Pageable pageable) {
		HospitalSentimentResp hospitalSentimentResp = new HospitalSentimentResp();
		List<HospitalVo> hospitals = hospitalService.findHospitalByNameLike(hospitalName);
		if (hospitals != null && hospitals.size() > 0) {
			hospitalSentimentResp.setNewsList(hospitalService.getHospitalSentimentTopN(hospitals.get(0).getId(), pageable));
		}
		return hospitalSentimentResp;
	}
	
	/* (non-Javadoc)
	 * @see com.isoft.wm.infosys.service.HospitalDetailsService#getDoctorNumOfDepartment(java.lang.String)
	 */
	@Override
	public DocNumOfDeptCircleResp getDoctorNumOfDepartment(String hospitalName) {
		DocNumOfDeptCircleResp docNumOfDeptCircleResp = new DocNumOfDeptCircleResp();
		List<DepartmentVo> listDept = hospitalService.pullDepartmentsByHospitalNameLike(hospitalName, -1);
		if (listDept != null) {
			docNumOfDeptCircleResp.setDepartmentVoList(listDept);
		}
		return docNumOfDeptCircleResp;
	}
	
	/* (non-Javadoc)
	 * @see com.isoft.wm.infosys.service.HospitalDetailsService#getHospDocLevelNumber(java.lang.String)
	 */
	@Override
	public DocLevelNumOfHospResp getHospDocLevelNumber(String hospitalName) {
		DocLevelNumOfHospResp docLevelNumOfHospResp = new DocLevelNumOfHospResp();
		List<DocLevelNumVo> listDocLevelNum = hospitalService.getDocNumOfDiffLevelsByHospNameLike(hospitalName);
		if (listDocLevelNum != null) {
			docLevelNumOfHospResp.setDimPosnList(listDocLevelNum);
		}
		return docLevelNumOfHospResp;
	}
	
	/* (non-Javadoc)
	 * @see com.isoft.wm.infosys.service.HospitalDetailsService#getHospDeptProNumber(java.lang.String)
	 */
	@Override
	public DeptProNumOfHospResp getHospDeptProNumber(String hospitalName) {
		DeptProNumOfHospResp deptProNumOfHospResp = new DeptProNumOfHospResp();
		List<DeptProNumVo> listDocLevelNum = hospitalService.getDeptProNumOfHospital(hospitalName);
		if (listDocLevelNum != null) {
			deptProNumOfHospResp.setDimPosnList(listDocLevelNum);
		}
		return deptProNumOfHospResp;
	}
	
	/* (non-Javadoc)
	 * @see com.isoft.wm.infosys.service.HospitalDetailsService#foo(java.lang.String)
	 */
	@Override
	public DocLevelNumOfDeptOfHospResp foo(String hospitalName) {
		DocLevelNumOfDeptOfHospResp resp = new DocLevelNumOfDeptOfHospResp();
		List<HospitalVo> hospList = hospitalService.findHospitalByNameLike(hospitalName);
		if (hospList != null && hospList.size() > 0) {
			HospitalVo hosp = hospList.get(0);
			List<DepartmentVo> deptList = hospitalService.pullDepartmentsByHospitalId(hosp.getId(), -1);
			if (deptList != null && deptList.size() > 0) {
				List<String> deptNameList = new ArrayList<String>();
				
				Map<String, List<Long>> profCntList = new HashMap<String, List<Long>>();
				int iterIndex = 0;
			    for (DepartmentVo _dept: deptList) {
					List<DocLevelNumVo> docLevelNumList = hospitalService.getDocNumOfDiffLevelsByDeptId(_dept.getId());
					for(DocLevelNumVo cntPerLevel: docLevelNumList) {
						
						String levelName = cntPerLevel.getDoctor_position();
						if (!profCntList.containsKey(levelName)) {
							List<Long> numList = new ArrayList<Long>();
							for (Long i = 0L; i < iterIndex; i ++) {
								numList.add(0L);
							}
							numList.add(cntPerLevel.getCnt_person());
							profCntList.put(levelName, numList);
						} else {
							List<Long> numList = (List<Long>)profCntList.get(levelName);
							for(int i = numList.size(); i < iterIndex; i ++ ) {
								numList.add(0L);
							}
							numList.add(cntPerLevel.getCnt_person());
						}
					}
					deptNameList.add(_dept.getName());
					iterIndex ++; 
			    }
			    resp.setDimBarList(profCntList);
			    resp.setDeptSet(deptNameList);
			}
		}
		return resp;
	}
}
