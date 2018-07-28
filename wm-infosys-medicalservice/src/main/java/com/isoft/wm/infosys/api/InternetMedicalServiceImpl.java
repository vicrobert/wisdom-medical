package com.isoft.wm.infosys.api;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.api.InternetMedicalService;
import com.isoft.wm.infosys.service.DiseaseService;
import com.isoft.wm.infosys.service.HospitalAnalysisOverallService;
import com.isoft.wm.infosys.service.HospitalDetailsService;
import com.isoft.wm.infosys.service.HospitalRationalAnalysisService;
import com.isoft.wm.infosys.service.HospitalService;
import com.isoft.wm.infosys.service.HotDiseaseAnalysisService;
import com.isoft.wm.infosys.service.MedicalResourcesAnalysisService;
import com.isoft.wm.infosys.service.PatientFindDepartmentService;
import com.isoft.wm.infosys.service.PatientFindDoctorService;
import com.isoft.wm.infosys.type.Pagination;
import com.isoft.wm.infosys.utils.JsonUtil;

@Service
public class InternetMedicalServiceImpl implements InternetMedicalService {
	@Autowired
	HospitalService hospitalService;
	@Autowired
	DiseaseService diseaseService;
	@Autowired
	HospitalAnalysisOverallService hospAnalysisOverallService;
	@Autowired
	HospitalDetailsService  hospDetailsService;
	@Autowired
	HospitalRationalAnalysisService hospRationalAnalysisService;
	@Autowired
	HotDiseaseAnalysisService hotDiseaseAnalysisService;
	@Autowired
	MedicalResourcesAnalysisService medResAnalysisService;
	@Autowired
	PatientFindDepartmentService patientFindDepartmentService;
	@Autowired
	PatientFindDoctorService patientFindDoctorService;
	
	@Override
	public String drawDoctorResourcesAnalysisGrid(String doctorName) {
		return JsonUtil.serialize(medResAnalysisService.drawDoctorResourcesAnalysisGrid(doctorName));
	}

	@Override
	public String drawResourcesAnalysisGrid(String hospitalName) {
		return JsonUtil.serialize(medResAnalysisService.drawResourcesAnalysisGrid(hospitalName));
	}

	@Override
	public String findDeptDetailsByNameLike(String name, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospitalService.findDeptDetailsByNameLike(name, pageable));
	}

	@Override
	public String findDoctorByNameLike(String doctorName) {
		return JsonUtil.serialize(hospitalService.findDoctorByNameLike(doctorName));
	}

	@Override
	public String findDoctorByNameLike(String doctorName, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospitalService.findDoctorByNameLike(doctorName, pageable));
	}

	@Override
	public String findHospitalByNameLike(String hospitalName) {
		return JsonUtil.serialize(hospitalService.findHospitalByNameLike(hospitalName));
	}

	@Override
	public String findHospitalByNameLike(String hospitalName, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospitalService.findHospitalByNameLike(hospitalName, pageable));
	}

	@Override
	public String foo(String hospitalName) {
		return JsonUtil.serialize(hospDetailsService.foo(hospitalName));
	}

	@Override
	public String getDepartment(Long departmentId) {
		return JsonUtil.serialize(hospitalService.getDepartment(departmentId));
	}

	@Override
	public String getDepartmentDifferenceChart(Long hospitalId1, Long hospitalId2) {
		return JsonUtil.serialize(hospRationalAnalysisService.getDepartmentDifferenceChart(hospitalId1, hospitalId2));
	}

	@Override
	public long getDepartmentNum() {
		return hospitalService.getDepartmentNum();
	}

	@Override
	public long getDepartmentNumByNameLike(String name) {
		return hospitalService.getDepartmentNumByNameLike(name);
	}

	@Override
	public String getDeptProNumOfHospital(String hospitalName) {
		return JsonUtil.serialize(hospitalService.getDeptProNumOfHospital(hospitalName));
	}

	@Override
	public String getDiseaseFaqNumByDateAndCity(Date from, Date to, Long cityId) {
		return JsonUtil.serialize(diseaseService.getDiseaseFaqNumByDateAndCity(from, to, cityId));
	}

	@Override
	public String getDiseaseFaqNumByDateAndCity(Date from, Date to, String city) {
		return JsonUtil.serialize(hotDiseaseAnalysisService.getDiseaseFaqNumByDateAndCity(from, to, city));
	}

	@Override
	public String getDiseaseFaqNumOverAllCities(Date from, Date to) {
		return JsonUtil.serialize(hotDiseaseAnalysisService.getDiseaseFaqNumOverAllCities(from, to));
	}

	@Override
	public String getDiseaseTopNRankByDateAndCity(Date from, Date to, Long cityId, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(diseaseService.getDiseaseTopNRankByDateAndCity(from, to, cityId, pageable));
	}

	@Override
	public String getDiseaseTopNRankByDateAndCity(Date from, Date to, String city, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hotDiseaseAnalysisService.getDiseaseTopNRankByDateAndCity(from, to, city, pageable));
	}

	@Override
	public long getDocNumOfDepartment(Long hospitalId, String departmentName) {
		return hospitalService.getDocNumOfDepartment(hospitalId, departmentName);
	}

	@Override
	public String getDocNumOfDiffLevels(Long hospitalId, String departmentName) {
		return JsonUtil.serialize(hospitalService.getDocNumOfDepartment(hospitalId, departmentName));
	}

	@Override
	public String getDocNumOfDiffLevelsByDeptId(Long departmentId) {
		return JsonUtil.serialize(hospitalService.getDocNumOfDiffLevelsByDeptId(departmentId));
	}

	@Override
	public String getDocNumOfDiffLevelsByHospNameLike(String hospitalName) {
		return JsonUtil.serialize(hospitalService.getDocNumOfDiffLevelsByHospNameLike(hospitalName));
	}

	@Override
	public String getDoctorById(Long doctorId) {
		return JsonUtil.serialize(hospitalService.getDoctorById(doctorId));
	}

	@Override
	public String getDoctorDetails(Long doctorId) {
		return JsonUtil.serialize(medResAnalysisService.getDoctorDetails(doctorId));
	}

	@Override
	public long getDoctorNum() {
		return hospitalService.getDoctorNum();
	}

	@Override
	public long getDoctorNumByNameLike(String name) {
		return hospitalService.getDoctorNumByNameLike(name);
	}

	@Override
	public String getDoctorNumOfDepartment(String hospitalName) {
		return JsonUtil.serialize(hospDetailsService.getDoctorNumOfDepartment(hospitalName));
	}

	@Override
	public String getDomesticHospDistribution(String province) {
		return JsonUtil.serialize(hospAnalysisOverallService.getDomesticHospDistribution(province));
	}

	@Override
	public String getHospDeptProNumber(String hospitalName) {
		return JsonUtil.serialize(hospDetailsService.getHospDeptProNumber(hospitalName));
	}

	@Override
	public String getHospDocLevelNumber(String hospitalName) {
		return JsonUtil.serialize(hospDetailsService.getHospDocLevelNumber(hospitalName));
	}

	@Override
	public String getHospIntroduction(String hospitalName) {
		// TODO Auto-generated method stub
		return JsonUtil.serialize(hospDetailsService.getHospIntroduction(hospitalName));
	}

	@Override
	public String getHospStatisticalDataOfEachProvince(String province) {
		return JsonUtil.serialize(hospitalService.getHospStatisticalDataOfEachProvince(province));
	}

	@Override
	public String getHospital(Long hospitalId) {
		// TODO Auto-generated method stub
		return JsonUtil.serialize(hospitalService.getHospital(hospitalId));
	}

	@Override
	public String getHospitalContrastList(Long hospitalId1, Long hospitalId2) {
		return JsonUtil.serialize(hospRationalAnalysisService.getHospitalContrastList(hospitalId1, hospitalId2));
	}

	@Override
	public String getHospitalContrastTable(Long hospitalId1, Long hospitalId2) {
		return JsonUtil.serialize(hospRationalAnalysisService.getHospitalContrastTable(hospitalId1, hospitalId2));
	}

	@Override
	public String getHospitalDeptL2ContrastBar(Long hospitalId1, Long hospitalId2) {
		return JsonUtil.serialize(hospRationalAnalysisService.getHospitalDeptL2ContrastBar(hospitalId1, hospitalId2));
	}

	@Override
	public String getHospitalDeptL2ContrastPercent(Long hospitalId1, Long hospitalId2) {
		// TODO Auto-generated method stub
		return JsonUtil.serialize(hospRationalAnalysisService.getHospitalDeptL2ContrastPercent(hospitalId1, hospitalId2));
	}

	@Override
	public String getHospitalDeptL2ContrastTable(Long hospitalId1, Long hospitalId2) {
		// TODO Auto-generated method stub
		return JsonUtil.serialize(hospRationalAnalysisService.getHospitalDeptL2ContrastTable(hospitalId1, hospitalId2));
	}

	@Override
	public String getHospitalEvaluation(Long hospitalId) {
		return JsonUtil.serialize(hospitalService.getHospitalEvaluation(hospitalId));
	}

	@Override
	public String getHospitalEvaluation(String hospitalName) {
		return JsonUtil.serialize(hospDetailsService.getHospitalEvaluation(hospitalName));
	}

	@Override
	public long getHospitalNumber() {
		return hospitalService.getHospitalNumber();
	}

	@Override
	public long getHospitalNumberByNameLike(String hospitalName) {
		return hospitalService.getHospitalNumberByNameLike(hospitalName);
	}

	@Override
	public String getHospitalSentimentTopN(Long hospitalId, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospitalService.getHospitalSentimentTopN(hospitalId, pageable));
	}

	@Override
	public String getHospitalSentimentTopN(String hospitalName, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospDetailsService.getHospitalSentimentTopN(hospitalName, pageable));
	}

	@Override
	public String getHospitalStatisticsOfEachProvince() {
		return JsonUtil.serialize(hospAnalysisOverallService.getHospitalStatisticsOfEachProvince());
	}

	@Override
	public String getLast5DeptOfProvince(String province) {
		return JsonUtil.serialize(hospitalService.getLast5DeptOfProvince(province));
	}

	@Override
	public String getTop5AndLast5DeptOfEachProvince(String province) {
		return JsonUtil.serialize(hospAnalysisOverallService.getTop5AndLast5DeptOfEachProvince(province));
	}

	@Override
	public String getTop5DeptOfProvince(String province) {
		return JsonUtil.serialize(hospitalService.getTop5DeptOfProvince(province));
	}

	@Override
	public String hospitalStructureTree(Long hospitalId) {
		return JsonUtil.serialize(hospRationalAnalysisService.hospitalStructureTree(hospitalId));
	}

	@Override
	public String hospitalStructureTree(String hospitalName) {
		return JsonUtil.serialize(hospRationalAnalysisService.hospitalStructureTree(hospitalName));
	}

	@Override
	public String listAllDeptsDetails(Pagination page) {
//		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
//		return JsonUtil.serialize(hospitalService.listAllDeptsDetails(pageable));
		return null;
	}

	@Override
	public String listAllDoctors(Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospitalService.listAllDoctors(pageable));
	}

	@Override
	public String listAllHospitals(Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospitalService.listAllHospitals(pageable));
	}

	@Override
	public String listHospitalByName(String hospitalName, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospRationalAnalysisService.listHospitalByName(hospitalName, pageable));
	}

	@Override
	public String pullDepartmentByName(String name, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(patientFindDepartmentService.pullDepartmentByName(name, pageable));
	}

	@Override
	public String pullDepartmentsByHospitalId(Long hospitalId, int treeLevel) {
		return JsonUtil.serialize(hospitalService.pullDepartmentsByHospitalId(hospitalId, treeLevel));
	}

	@Override
	public String pullDepartmentsByHospitalNameLike(String hospitalName, int treeLevel) {
		return JsonUtil.serialize(hospitalService.pullDepartmentsByHospitalNameLike(hospitalName, treeLevel));
	}

	@Override
	public String pullDoctorInfoByName(String name, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(patientFindDoctorService.pullDoctorInfoByName(name, pageable));
	}

	@Override
	public String pullDoctorsByDepartmentId(Long departmentId) {
		return JsonUtil.serialize(hospitalService.pullDoctorsByDepartmentId(departmentId));
	}

	@Override
	public String pullIntersectDeptOfTwoHospitals(Long hospitalId1, Long hospitalId2, int treeLevel) {
		return JsonUtil.serialize(hospitalService.pullIntersectDeptOfTwoHospitals(hospitalId1, hospitalId2, treeLevel));
	}

	@Override
	public String pullSubDepartmentsByParentName(Long hospitalId, String parentDeptName, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hospitalService.pullSubDepartmentsByParentName(hospitalId, parentDeptName, pageable));
	}

	@Override
	public String subDepartmentTreeWalk(Long parentDeptId, int treeLevelFrom, int treeLevelTo) {
		return JsonUtil.serialize(hospitalService.subDepartmentTreeWalk(parentDeptId, treeLevelFrom, treeLevelTo));
	}
	
	@Override
	public String descSortDiseaseFaqByDeptPopularity(Date from, Date to, Long cityId, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(diseaseService.descSortDiseaseFaqByDeptPopularity(from, to, cityId, pageable));
	}

	@Override
	public String descSortDiseaseFaqByDeptPopularity(Date from, Date to, String city, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hotDiseaseAnalysisService.descSortDiseaseFaqByDeptPopularity(from, to, city, pageable));
	}
	
	@Override
	public String descSortDiseaseFaqByHospPopularity(Date from, Date to, String city, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hotDiseaseAnalysisService.descSortDiseaseFaqByHospPopularity(from, to, city, pageable));
	}

	@Override
	public String descSortDiseaseFaqByDocPopularity(Date from, Date to, String city, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(hotDiseaseAnalysisService.descSortDiseaseFaqByDocPopularity(from, to, city, pageable));
	}

	@Override
	public String descSortDiseaseFaqByHospPopularity(Date from, Date to, Long cityId, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(diseaseService.descSortDiseaseFaqByHospPopularity(from, to, cityId, pageable));
	}

	@Override
	public String descSortDiseaseFaqByDocPopularity(Date from, Date to, Long cityId, Pagination page) {
		Pageable pageable = PageRequest.of(page.getPage(), page.getRows());
		return JsonUtil.serialize(diseaseService.descSortDiseaseFaqByDocPopularity(from, to, cityId, pageable));
	}
	
}
