package com.isoft.wm.infosys.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.isoft.wm.infosys.api.InternetMedicalService;
import com.isoft.wm.infosys.entity.SystemConfigVo;
import com.isoft.wm.infosys.service.SystemService;
import com.isoft.wm.infosys.type.Pagination;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.Date;

@RestController
public class HotDiseaseAnalysisController {
    @Reference
    private InternetMedicalService internetMedicalService;

    @Autowired
    private SystemService systemService;

    @RequestMapping("/medical/HotIllnessLine")
    public String getDiseaseFaqNumByDateAndCity(@RequestParam(required = false) Integer year, @RequestParam(required = false) Integer month,
                                                @RequestParam(required = false) Boolean monthShowOrHide, @RequestParam(required = false) String yearMonth,
                                                @RequestParam(required = false) String city) {
        Calendar from = Calendar.getInstance();
        Date now = new Date();

        if (monthShowOrHide == null) {
            monthShowOrHide = true;
        }
        city = retrieveDefaultCityNameIfNeeded(city);
        if (monthShowOrHide) {
            from.add(Calendar.YEAR, -1);
            return internetMedicalService.getDiseaseFaqNumByDateAndCity(from.getTime(), now, city);
        } else {
            Calendar to = Calendar.getInstance();
            if (year == null || year < 1900 || year > 3000) {
                year = to.get(Calendar.YEAR);
            } else {
                to.set(Calendar.YEAR, year);
            }
            from.set(Calendar.YEAR, year);
            from.set(Calendar.DATE, 1);
            if (month == null || month < 1 || month > 13) {
                month = 13;
            }
            if (month == 13) {
                from.set(Calendar.MONTH, 1);
                to.set(Calendar.MONTH, 12);
                to.set(Calendar.DATE, 31);
            } else {
                from.set(Calendar.MONTH, month);
                to.set(Calendar.MONTH, month);
                to.set(Calendar.DATE, 1);
                to.add(Calendar.DATE, 30);
            }
            return internetMedicalService.getDiseaseFaqNumByDateAndCity(from.getTime(), to.getTime(), city);
        }
    }


    @RequestMapping("/medical/HotDiseaseRankByDate")
    public String getDiseaseRankByDateAndCity(@RequestParam(required = false) Integer year, @RequestParam(required = false) Integer month,
                                              @RequestParam(required = false) Boolean monthShowOrHide, @RequestParam(required = false) String yearMonth,
                                              @RequestParam(required = false) String city) {
        Pagination page = new Pagination(0, 15);
        Calendar from = Calendar.getInstance();
        Date now = new Date();
        if (monthShowOrHide == null) {
            monthShowOrHide = true;
        }
        city = retrieveDefaultCityNameIfNeeded(city);
        if (monthShowOrHide) {
            from.add(Calendar.YEAR, -1);
            return internetMedicalService.getDiseaseTopNRankByDateAndCity(from.getTime(), now, city, page);
        } else {
            Calendar to = Calendar.getInstance();
            if (year == null || year < 1900 || year > 3000) {
                year = to.get(Calendar.YEAR);
            } else {
                to.set(Calendar.YEAR, year);
            }
            from.set(Calendar.YEAR, year);
            from.set(Calendar.DATE, 1);
            if (month == null || month < 1 || month > 13) {
                month = 13;
            }
            if (month == 13) {
                from.set(Calendar.MONTH, 1);
                to.set(Calendar.MONTH, 12);
                to.set(Calendar.DATE, 31);
            } else {
                from.set(Calendar.MONTH, month);
                to.set(Calendar.MONTH, month);
                to.set(Calendar.DATE, 1);
                to.add(Calendar.DATE, 30);
            }
            return internetMedicalService.getDiseaseTopNRankByDateAndCity(from.getTime(), to.getTime(), city, page);
        }
    }

    @RequestMapping("/medical/HotDiseaseOnMap")
    public String getDiseaseFaqNumOverAllCities(@RequestParam(required = false) Integer year, @RequestParam(required = false) Integer month,
                                                @RequestParam(required = false) Boolean monthShowOrHide, @RequestParam(required = false) String yearMonth) {
        Calendar from = Calendar.getInstance();
        Date now = new Date();
        if (monthShowOrHide == null) {
            monthShowOrHide = true;
        }
        if (monthShowOrHide) {
            from.add(Calendar.YEAR, -1);
            return internetMedicalService.getDiseaseFaqNumOverAllCities(from.getTime(), now);
        } else {
            Calendar to = Calendar.getInstance();
            if (year == null || year < 1900 || year > 3000) {
                year = to.get(Calendar.YEAR);
            } else {
                to.set(Calendar.YEAR, year);
            }
            from.set(Calendar.YEAR, year);
            from.set(Calendar.DATE, 1);
            if (month == null || month < 1 || month > 13) {
                month = 13;
            }
            if (month == 13) {
                from.set(Calendar.MONTH, 1);
                to.set(Calendar.MONTH, 12);
                to.set(Calendar.DATE, 31);
            } else {
                from.set(Calendar.MONTH, month);
                to.set(Calendar.MONTH, month);
                to.set(Calendar.DATE, 1);
                to.add(Calendar.DATE, 30);
            }
            return internetMedicalService.getDiseaseFaqNumOverAllCities(from.getTime(), to.getTime());
        }
    }

    @RequestMapping("/medical/MapCityTop25Disease")
    public String getDiseaseTop25RankByCity(@RequestParam(required = false) String city) {
        Calendar from = Calendar.getInstance();
        Calendar to = Calendar.getInstance();
        from.add(Calendar.YEAR, -1);
        Pagination pagination = new Pagination(0, 25);
        return internetMedicalService.getDiseaseTopNRankByDateAndCity(from.getTime(), to.getTime(), retrieveDefaultCityNameIfNeeded(city), pagination);
    }

    @RequestMapping("/medical/MapCityTop10Disease")
    public String getDiseaseTop10RankByCity(@RequestParam(required = false) String city) {
        Calendar from = Calendar.getInstance();
        Calendar to = Calendar.getInstance();
        from.add(Calendar.YEAR, -1);
        Pagination pagination = new Pagination(0, 10);
        return internetMedicalService.getDiseaseTopNRankByDateAndCity(from.getTime(), to.getTime(), retrieveDefaultCityNameIfNeeded(city), pagination);

    }

    @RequestMapping("/medical/HotDepartments")
    public String getTop10DeptFromDiseaseFaqByDateAndCity(@RequestParam(required = false) String city) {
        Calendar from = Calendar.getInstance();
        Calendar to = Calendar.getInstance();
        from.add(Calendar.YEAR, -1);
        Pagination pagination = new Pagination(0, 10);
        return internetMedicalService.descSortDiseaseFaqByDeptPopularity(from.getTime(), to.getTime(), retrieveDefaultCityNameIfNeeded(city), pagination);
    }

    @RequestMapping("/medical/Top4HospitalsLastWeek")
    public String getTop4HospFromDiseaseFaqByDateAndCity(@RequestParam(required = false) String city) {
        Calendar from = Calendar.getInstance();
        Calendar to = Calendar.getInstance();
        from.add(Calendar.DATE, -7);
        Pagination pagination = new Pagination(0, 4);
        return internetMedicalService.descSortDiseaseFaqByHospPopularity(from.getTime(), to.getTime(), retrieveDefaultCityNameIfNeeded(city), pagination);
    }

    @RequestMapping("/medical/Top4DepartmentsLastWeek")
    public String getTop4DeptFromDiseaseFaqByDateAndCity(@RequestParam(required = false) String city) {
        Calendar from = Calendar.getInstance();
        Calendar to = Calendar.getInstance();
        from.add(Calendar.DATE, -7);
        Pagination pagination = new Pagination(0, 4);
        return internetMedicalService.descSortDiseaseFaqByDeptPopularity(from.getTime(), to.getTime(), retrieveDefaultCityNameIfNeeded(city), pagination);
    }

    @RequestMapping("/medical/Top4DoctorsLastWeek")
    public String getTop4DoctorFromDiseaseFaqByDateAndCity(@RequestParam(required = false) String city) {
        Calendar from = Calendar.getInstance();
        Calendar to = Calendar.getInstance();
        from.add(Calendar.DATE, -7);
        Pagination pagination = new Pagination(0, 4);
        return internetMedicalService.descSortDiseaseFaqByDocPopularity(from.getTime(), to.getTime(), retrieveDefaultCityNameIfNeeded(city), pagination);
    }

    private String retrieveDefaultCityNameIfNeeded(String city) {
        if (StringUtils.isEmpty(city)) {
            SystemConfigVo sc = systemService.getSystemProperty("DEFAULT_CITY");
            if (sc != null) {
                city = sc.getValue();
            }
        }
        return city;
    }

}
