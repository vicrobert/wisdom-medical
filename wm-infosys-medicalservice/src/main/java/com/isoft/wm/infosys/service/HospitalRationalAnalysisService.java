package com.isoft.wm.infosys.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.resp.HospitalInfoResp;
import com.isoft.wm.infosys.viewmodel.DeptL2ContrastBarViewModel;
import com.isoft.wm.infosys.viewmodel.DeptL2ContrastPercentViewModel;
import com.isoft.wm.infosys.viewmodel.DeptL2ContrastTableViewModel;
import com.isoft.wm.infosys.viewmodel.DeptLinkMapChartViewModel;
import com.isoft.wm.infosys.viewmodel.HospitalContrastListViewModel;
import com.isoft.wm.infosys.viewmodel.HospitalContrastTableViewModel;
import com.isoft.wm.infosys.viewmodel.HospitalViewModel;

public interface HospitalRationalAnalysisService {

    HospitalInfoResp listHospitalByName(String hospitalName, Pageable pageable);

    HospitalViewModel hospitalStructureTree(Long hospitalId);

    HospitalViewModel hospitalStructureTree(String hospitalName);

    HospitalContrastTableViewModel getHospitalContrastTable(Long hospitalId1, Long hospitalId2);

    HospitalContrastListViewModel getHospitalContrastList(Long hospitalId1, Long hospitalId2);

    DeptLinkMapChartViewModel getDepartmentDifferenceChart(Long hospitalId1, Long hospitalId2);

    List<DeptL2ContrastTableViewModel> getHospitalDeptL2ContrastTable(Long hospitalId1, Long hospitalId2);

    DeptL2ContrastBarViewModel getHospitalDeptL2ContrastBar(Long hospitalId1, Long hospitalId2);

    DeptL2ContrastPercentViewModel getHospitalDeptL2ContrastPercent(Long hospitalId1, Long hospitalId2);

}