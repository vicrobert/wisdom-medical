package com.isoft.wm.infosys.controller;

import com.isoft.wm.infosys.entity.SystemConfigVo;
import com.isoft.wm.infosys.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.alibaba.dubbo.config.annotation.Reference;
import com.isoft.wm.infosys.api.InternetMedicalService;
import com.isoft.wm.infosys.type.Pagination;
import com.isoft.wm.infosys.type.SortDirect;
import com.isoft.wm.infosys.utils.CommonUtils;

@RestController
public class DecisionSupportRequestController {
    @Reference
    InternetMedicalService internetMedicalService;
    @Autowired
    SystemService systemService;

    @RequestMapping("/medical/DecisionSupportHospitalInfo.action")
    public String findHospitalByName(@RequestParam(required = false) String hospitalName, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
        Pagination pagination = new Pagination(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 7, SortDirect.DESC);
        return internetMedicalService.listHospitalByName(CommonUtils.URLDecode(hospitalName), pagination);
    }

    @RequestMapping("/medical/DecisionSupportSection.action")
    public String getDoctorNumOfDepartment(@RequestParam(required = false) String hospitalName) {
        return internetMedicalService.getDoctorNumOfDepartment(retrieveDefaultHospitalNameIfNeeded(hospitalName));
    }

    @RequestMapping("/medical/HospIntroduction")
    public String getHospitalIntroduction(@RequestParam(required = false) String hospitalName) {
        return internetMedicalService.getHospIntroduction(retrieveDefaultHospitalNameIfNeeded(CommonUtils.URLDecode(hospitalName)));
    }

    @RequestMapping("/medical/SelfDimScore")
    public String getHospitalEvaluation(@RequestParam(required = false) String hospitalName) {
        return internetMedicalService.getHospitalEvaluation(retrieveDefaultHospitalNameIfNeeded(CommonUtils.URLDecode(hospitalName)));
    }

    @RequestMapping("medical/hospitalSentiments")
    public String getHospitalSentiments(@RequestParam(required = false) String hospitalName, @RequestParam(required = false) Integer rows) {
        //PageRequest pageable = PageRequest.of(0, rows != null && rows > 0 ? rows : 8, Sort.Direction.DESC, "createdAt");
        Pagination pagination = new Pagination(0, rows != null && rows > 0 ? rows : 8, SortDirect.DESC);
        return internetMedicalService.getHospitalSentimentTopN(retrieveDefaultHospitalNameIfNeeded(CommonUtils.URLDecode(hospitalName)), pagination);
    }

    @RequestMapping("/medical/DecisionSupportDoctorLevel.action")
    public String getHospDocLevelNumber(@RequestParam(required = false) String hospitalName) {
        return internetMedicalService.getHospDocLevelNumber(retrieveDefaultHospitalNameIfNeeded(CommonUtils.URLDecode(hospitalName)));
    }

    @RequestMapping("/medical/DecisionSupportProfessionalDistribution.action")
    public String getHospDeptProNumber(@RequestParam(required = false) String hospitalName) {
        return internetMedicalService.getHospDeptProNumber(retrieveDefaultHospitalNameIfNeeded(CommonUtils.URLDecode(hospitalName)));
    }

    @RequestMapping("/medical/DecisionSupportDeptStructureChart.action")
    public String getHospDeptDocLevelNum(@RequestParam(required = false) String hospitalName) {
        return internetMedicalService.foo(retrieveDefaultHospitalNameIfNeeded(CommonUtils.URLDecode(hospitalName)));
    }

    @RequestMapping("/medical/DecisionSupportDeptStructureTreeLevel.action")
    public String hospitalStructureTree(@RequestParam(required = false) Long hospitalId) {
        return internetMedicalService.hospitalStructureTree(hospitalId);
    }

    @RequestMapping("/medical/DomesticHospDistribution")
    public String getDomesticHospDistribution(@RequestParam(required = false) String province) {
        return internetMedicalService.getDomesticHospDistribution(retrieveDefaultProvinceIfNeeded(CommonUtils.URLDecode(province)));
    }

    @RequestMapping("/medical/ProvinceDetailList")
    public String getHospitalStatisticsOfEachProvince() {
        return internetMedicalService.getHospitalStatisticsOfEachProvince();
    }

    @RequestMapping("/medical/DeptByProvince")
    public String getTop5AndLast5DeptOfEachProvince(@RequestParam(required = false) String province) {
        return internetMedicalService.getTop5AndLast5DeptOfEachProvince(retrieveDefaultProvinceIfNeeded(province));
    }

    @RequestMapping("/medical/HospitalContrastTable")
    public String getHospitalContrastTable(Long hospitalId1, Long hospitalId2) {
        return internetMedicalService.getHospitalContrastTable(hospitalId1, hospitalId2);
    }

    @RequestMapping("/medical/HospitalContrastList")
    public String getHospitalContrastList(Long hospitalId1, Long hospitalId2) {
        return internetMedicalService.getHospitalContrastList(hospitalId1, hospitalId2);
    }

    @RequestMapping("/medical/DepartmentDifferenceChart")
    public String getDepartmentDifferenceChart(Long hospitalId1, Long hospitalId2) {
        return internetMedicalService.getDepartmentDifferenceChart(hospitalId1, hospitalId2);
    }

    @RequestMapping("/medical/DepartmentL2ContrastTable")
    public String getHospitalDeptL2ContrastTable(Long hospitalId1, Long hospitalId2) {
        return internetMedicalService.getHospitalDeptL2ContrastTable(hospitalId1, hospitalId2);
    }

    @RequestMapping("/medical/DepartmentL2ContrastBar")
    public String getHospitalDeptL2ContrastBar(Long hospitalId1, Long hospitalId2) {
        return internetMedicalService.getHospitalDeptL2ContrastBar(hospitalId1, hospitalId2);
    }

    @RequestMapping("/medical/DepartmentL2ContrastPercent")
    public String getHospitalDeptL2ContrastPercent(Long hospitalId1, Long hospitalId2) {
        return internetMedicalService.getHospitalDeptL2ContrastPercent(hospitalId1, hospitalId2);
    }

    private String retrieveDefaultHospitalNameIfNeeded(String hospitalName) {
        if (StringUtils.isEmpty(hospitalName)) {
            SystemConfigVo sc = systemService.getSystemProperty("DEFAULT_HOSPITAL");
            if (sc != null) {
                hospitalName = sc.getValue();
            }
        }
        return hospitalName;
    }

    private String retrieveDefaultProvinceIfNeeded(String province) {
        if (StringUtils.isEmpty(province)) {
            SystemConfigVo sc = systemService.getSystemProperty("DEFAULT_PROVINCE");
            if (sc != null) {
                province = sc.getValue();
            }
        }
        return province;
    }
}
