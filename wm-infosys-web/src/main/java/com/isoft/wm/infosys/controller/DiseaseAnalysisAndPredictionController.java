package com.isoft.wm.infosys.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.config.annotation.Service;
import com.isoft.wm.infosys.api.DiseaseService;

@RestController
//@Service(version="1.0.0",provider="DiseaseServiceProtocolConfig")
public class DiseaseAnalysisAndPredictionController {
    @Reference
    DiseaseService diseaseService;

    @RequestMapping("/medical/DiseaseTendency")
    public String getDiseaseTendency(@RequestParam(required = false) String selectType, @RequestParam(required = false) String community,
                                     @RequestParam(required = false) String year, @RequestParam(required = false) String month,
                                     @RequestParam(required = false) String disease) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDiseaseTendency(selectType, community, _year, _month, disease);
    }


    @RequestMapping("/medical/DiseaseSeasonDistribute")
    String getDiseaseSeasonDistribute(@RequestParam(required = false) String selectType, @RequestParam(required = false) String community, @RequestParam(required = false) String year,
                                      @RequestParam(required = false) String month, @RequestParam(required = false) String disease) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDiseaseSeasonDistribute(selectType, community, _year, _month, disease);
    }

    @RequestMapping("/medical/DiseaseAreaDistribute")
    String getDiseaseAreaDistribute(@RequestParam(required = false) String selectType, @RequestParam(required = false) String community, @RequestParam(required = false) String year,
                                    @RequestParam(required = false) String month, @RequestParam(required = false) String disease) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDiseaseAreaDistribute(selectType, community, _year, _month, disease);
    }

    @RequestMapping("/medical/DiseaseAgeDistribute")
    String getDiseaseAgeDistribute(String selectType, String community, Integer year, Integer month, String disease) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDiseaseAgeDistribute(selectType, community, _year, _month, disease);
    }

    @RequestMapping("/medical/DiseaseSexDistribute")
    String getDiseaseSexDistribute(@RequestParam(required = false) String selectType, @RequestParam(required = false) String community, @RequestParam(required = false) String year,
                                   @RequestParam(required = false) String month, @RequestParam(required = false) String disease) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDiseaseSexDistribute(selectType, community, _year, _month, disease);
    }

    @RequestMapping("/medical/DiseaseOccupationAgeDistribute")
    String getDiseaseOccupationAgeDistribute(@RequestParam(required = false) String selectType, @RequestParam(required = false) String community, @RequestParam(required = false) String year,
                                             @RequestParam(required = false) String month, @RequestParam(required = false) String disease) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDiseaseOccupationAgeDistribute(selectType, community, _year, _month, disease);
    }

    //疾病同期对比分析
    @RequestMapping("/medical/DiseaseContrastAnalysis")
    String getDiseaseContrastAnalysis(@RequestParam(required = false) String selectType, @RequestParam(required = false) String community, @RequestParam(required = false) String year,
                                      @RequestParam(required = false) String disease) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        return diseaseService.getDiseaseContrastAnalysis(selectType, community, _year, disease);
    }

    //疾病关联与画像分析
    @RequestMapping("/medical/DiseaseRelevanceAnalysis")
    String getDiseaseRelevanceAnalysis(@RequestParam(required = false) String selectType, @RequestParam(required = false) String community, @RequestParam(required = false) String season,
                                       @RequestParam(required = false) String year, @RequestParam(required = false) String sex, @RequestParam(required = false) String age,
                                       @RequestParam(required = false) String job) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        return diseaseService.getDiseaseRelevanceAnalysis(selectType, community, season, _year, sex, age, job);
    }

    @RequestMapping("/medical/DiseasePortrait")
    String getDiseasePortrait(@RequestParam(required = false) String selectType, @RequestParam(required = false) String community, @RequestParam(required = false) String season,
                              @RequestParam(required = false) String year, @RequestParam(required = false) String sex, @RequestParam(required = false) String age,
                              @RequestParam(required = false) String job, @RequestParam(required = false) String disease) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        return diseaseService.getDiseasePortrait(selectType, community, season, _year, sex, age, job, disease);
    }

    //疾病疗效分析
    @RequestMapping("/medical/DoctorRecommend")
    String getDoctorRecommend(@RequestParam(required = false) String community, @RequestParam(required = false) String year, @RequestParam(required = false) String month) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDoctorRecommend(community, _year, _month);
    }

    @RequestMapping("/medical/DrugUseStrength")
    String getDrugUseStrength(@RequestParam(required = false) String community, @RequestParam(required = false) String year, @RequestParam(required = false) String month) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDrugUseStrength(community, _year, _month);
    }

    @RequestMapping("/medical/DrugSourceDistribute")
    String getDrugSourceDistribute(@RequestParam(required = false) String community, @RequestParam(required = false) String year, @RequestParam(required = false) String month) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDrugSourceDistribute(community, _year, _month);
    }

    @RequestMapping("/medical/DrugTypeDistribute")
    String getDrugTypeDistribute(@RequestParam(required = false) String community, @RequestParam(required = false) String year, @RequestParam(required = false) String month) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDrugTypeDistribute(community, _year, _month);
    }

    @RequestMapping("/medical/DrugPercentDistribute")
    String getDrugPercentDistribute(@RequestParam(required = false) String community, @RequestParam(required = false) String year, @RequestParam(required = false) String month) {
        int _year = (year == null ? 0 : Integer.valueOf(year));
        int _month = (month == null ? 0 : Integer.valueOf(month));
        return diseaseService.getDrugPercentDistribute(community, _year, _month);
    }


}
