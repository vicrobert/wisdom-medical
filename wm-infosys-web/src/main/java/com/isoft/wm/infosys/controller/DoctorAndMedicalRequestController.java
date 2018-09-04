package com.isoft.wm.infosys.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.isoft.wm.infosys.api.InternetMedicalService;
import com.isoft.wm.infosys.type.Pagination;
import com.isoft.wm.infosys.type.SortDirect;
import com.isoft.wm.infosys.utils.CommonUtils;

@RestController
public class DoctorAndMedicalRequestController {
    @Reference
    InternetMedicalService internetMedicalService;

    @RequestMapping("/medical/SearchDocAndMedDepartmentInfo.action")
    public String findDepartmentByName(@RequestParam(required = false) String departmentName, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
        //PageRequest pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 7, Sort.Direction.DESC, "id");
        Pagination pagination = new Pagination(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 7, SortDirect.DESC);
        return internetMedicalService.pullDepartmentByName(CommonUtils.URLDecode(departmentName), pagination);
    }

    @RequestMapping("/medical/SearchDocAndMedDoctorInfo.action")
    public String findDoctorInfoByName(@RequestParam(required = false) String doctorName, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
        //PageRequest pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 7, Sort.Direction.DESC, "id");
        Pagination pagination = new Pagination(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 7, SortDirect.DESC);
        return internetMedicalService.pullDoctorInfoByName(CommonUtils.URLDecode(doctorName), pagination);
    }
}
