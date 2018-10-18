package com.isoft.wm.infosys.api;

import java.util.Date;

import com.isoft.wm.infosys.type.Pagination;


public interface InternetMedicalService {
    //医院基本信息
    String getHospital(Long hospitalId);

    String findHospitalByNameLike(String hospitalName);

    String findHospitalByNameLike(String hospitalName, Pagination page);

    String listAllHospitals(Pagination page);

    long getHospitalNumber();

    long getHospitalNumberByNameLike(String hospitalName);

    String getHospitalEvaluation(Long hospitalId);

    String getHospitalSentimentTopN(Long hospitalId, Pagination page);

    //String getDomesticHospDistribution(String province);

    String getDepartment(Long departmentId);

    long getDepartmentNum();

    long getDepartmentNumByNameLike(String name);

    String pullDepartmentsByHospitalNameLike(String hospitalName, int treeLevel);

    String pullDepartmentsByHospitalId(Long hospitalId, int treeLevel);

    String pullSubDepartmentsByParentName(Long hospitalId, String parentDeptName, Pagination page);

    String findDeptDetailsByNameLike(String name, Pagination page);

    String listAllDeptsDetails(Pagination page);

    String subDepartmentTreeWalk(Long parentDeptId, int treeLevelFrom, int treeLevelTo);

    String getDeptProNumOfHospital(String hospitalName);

    String getDocNumOfDiffLevelsByHospNameLike(String hospitalName);

    String getDocNumOfDiffLevelsByDeptId(Long departmentId);

    String getDocNumOfDiffLevels(Long hospitalId, String departmentName);

    long getDocNumOfDepartment(Long hospitalId, String departmentName);

    String getDoctorById(Long doctorId);

    String findDoctorByNameLike(String doctorName);

    String findDoctorByNameLike(String doctorName, Pagination page);

    String listAllDoctors(Pagination page);

    long getDoctorNum();

    long getDoctorNumByNameLike(String name);

    String pullDoctorsByDepartmentId(Long departmentId);

    String getHospStatisticalDataOfEachProvince(String province);

    String getTop5DeptOfProvince(String province);

    String getLast5DeptOfProvince(String province);

    String pullIntersectDeptOfTwoHospitals(Long hospitalId1, Long hospitalId2, int treeLevel);

    //医院建设决策-行业整体分析
    String getDomesticHospDistribution(String province);

    String getHospitalStatisticsOfEachProvince();

    String getTop5AndLast5DeptOfEachProvince(String province);

    //医院建设决策-医院详情
    String getDoctorNumOfDepartment(String hospitalName);

    String getHospDocLevelNumber(String hospitalName);

    String getHospDeptProNumber(String hospitalName);

    String foo(String hospitalName);

    String getHospIntroduction(String hospitalName);

    String getHospitalEvaluation(String hospitalName);

    String getHospitalSentimentTopN(String hospitalName, Pagination page);

    //医院建设决策-合理化分析
    String listHospitalByName(String hospitalName, Pagination page);

    String hospitalStructureTree(Long hospitalId);

    String hospitalStructureTree(String hospitalName);

    String getHospitalContrastTable(Long hospitalId1, Long hospitalId2);

    String getHospitalContrastList(Long hospitalId1, Long hospitalId2);

    String getDepartmentDifferenceChart(Long hospitalId1, Long hospitalId2);

    String getHospitalDeptL2ContrastTable(Long hospitalId1, Long hospitalId2);

    String getHospitalDeptL2ContrastBar(Long hospitalId1, Long hospitalId2);

    String getHospitalDeptL2ContrastPercent(Long hospitalId1, Long hospitalId2);

    //寻医问诊推荐-找科室/医生
    String pullDepartmentByName(String name, Pagination page);

    String pullDoctorInfoByName(String name, Pagination page);

    //互动信息统计分析-热门疾病/医院/科室
    String getDiseaseFaqNumByDateAndCity(Date from, Date to, Long cityId);

    String getDiseaseTopNRankByDateAndCity(Date from, Date to, Long cityId, Pagination page);

    String getDiseaseFaqNumByDateAndCity(Date from, Date to, String city);

    String getDiseaseTopNRankByDateAndCity(Date from, Date to, String city, Pagination page);

    String getDiseaseFaqNumOverAllCities(Date from, Date to);

    String descSortDiseaseFaqByDeptPopularity(Date from, Date to, Long cityId, Pagination page);

    String descSortDiseaseFaqByDeptPopularity(Date from, Date to, String city, Pagination page);

    String descSortDiseaseFaqByHospPopularity(Date from, Date to, String city, Pagination page); //new

    String descSortDiseaseFaqByDocPopularity(Date from, Date to, String city, Pagination page); //new

    String descSortDiseaseFaqByHospPopularity(Date from, Date to, Long cityId, Pagination page); //new

    String descSortDiseaseFaqByDocPopularity(Date from, Date to, Long cityId, Pagination page); //new

    //医生互联网行为-医疗资源分析
    String drawResourcesAnalysisGrid(String hospitalName);

    String drawDoctorResourcesAnalysisGrid(String doctorName);

    String getDoctorDetails(Long doctorId);

}
