package com.isoft.wm.infosys.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "disease_faq")
public class DiseaseFaqVo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable=false)
	private Long id;
	
	@Column(name = "city_id")
	private Long cityId;
	
	@Column(name = "city_name")
	private String city;
	
	@Column(name = "dept_id")
	private Long departmentId;
	
	@Column(name = "dept_name")
	private String departmentName;
	
	@Column(name = "disease_name")
	private String diseaseName;
	
	@Column(name = "hosp_id")
	private Long hospitalId;
	
	@Column(name = "hosp_name")
	private String hospitalName;
	
	@Column(name = "ask_num")
	private Long askNum;
	
	@Column(name = "answer_num")
	private Long answerNum;
	
	@Column(name = "ask_at")
	private Date askAt;
	
	@Column(name = "created_at")
	private Date createdAt;
	
	@Column(name = "updated_at")
	private Date updatedAt;
	
	@Column(name = "status")
	private Integer status;
	
	@Column(name = "ask_content")
	private String askContent;
	
	@Column(name = "answer_content")
	private String answerContent;
	
	@Column(name = "doc_id")
	private Long doctorId;
	
	@Column(name = "doc_name")
	private String doctorName;
	
	//非持久化字段
	private String year;
	
	private String hospitalAddress;
	
	private String hospitalLevel;
	
	private String memo;
	
	private Long faqNum;
	
	public DiseaseFaqVo() {}

	public DiseaseFaqVo(String hospitalName, String hospitalLevel, String hospitalAddress, Long askNum) {
		this.hospitalName = hospitalName;
		this.hospitalLevel = hospitalLevel;
		this.hospitalAddress = hospitalAddress;
		this.askNum = askNum;
	}
	
	public DiseaseFaqVo(String doctorName, String departmentName, String hospitalName, Long askNum, String memo) {
		this.doctorName = doctorName;
		this.departmentName = departmentName;
		this.hospitalName = hospitalName;
		this.memo = memo;
		this.askNum = askNum;
	}
	
	public DiseaseFaqVo(String diseaseName, Long askNum, Long answerNum) {
		this.diseaseName = diseaseName;
		this.askNum = askNum;
		this.answerNum = answerNum;
		this.faqNum = askNum + answerNum;
	}
	
	public DiseaseFaqVo(Long askNum, Long answerNum, Date askAt) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		this.setYear(sdf.format(askAt));
		this.askNum = askNum;
		this.answerNum = answerNum;
		this.faqNum = askNum + answerNum;
		this.askAt = askAt;
	}
	
	public DiseaseFaqVo(String diseaseName, Long askNum, Long answerNum, Date askAt, String askContent, String answerContent,
			Long doctorId) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		this.setYear(sdf.format(askAt));
		this.diseaseName = diseaseName;
		this.askNum = askNum;
		this.answerNum = answerNum;
		this.faqNum = askNum + answerNum;
		this.askAt = askAt;
		this.askContent = askContent;
		this.answerContent = answerContent;
		this.doctorId = doctorId;
	}
	
//	public DiseaseFaqVo(String deptName, Long askNum, Long answerNum, Date askAt, String askContent, String answerContent, 
//			Long doctorId, String hospitalName, String hospitalAddress) {
	public DiseaseFaqVo(String deptName, Long askNum, Long answerNum, String hospitalName, String hospitalAddress) {
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//		this.setYear(sdf.format(askAt));
		this.departmentName = deptName;
		this.askNum = askNum;
		this.answerNum = answerNum;
		this.faqNum = askNum + answerNum;
		this.hospitalName = hospitalName;
		this.hospitalAddress = hospitalAddress;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCityId() {
		return cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Long getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getDiseaseName() {
		return diseaseName;
	}

	public void setDiseaseName(String diseaseName) {
		this.diseaseName = diseaseName;
	}

	public Long getAskNum() {
		return askNum;
	}

	public void setAskNum(Long askNum) {
		this.askNum = askNum;
	}

	public Long getAnswerNum() {
		return answerNum;
	}

	public void setAnswerNum(Long answerNum) {
		this.answerNum = answerNum;
	}

	public Date getAskAt() {
		return askAt;
	}

	@SuppressWarnings("deprecation")
	public void setAskAt(Date askAt) {
		this.askAt = askAt;
		this.year = String.valueOf(askAt.getYear());
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getAskContent() {
		return askContent;
	}

	public void setAskContent(String askContent) {
		this.askContent = askContent;
	}

	public String getAnswerContent() {
		return answerContent;
	}

	public void setAnswerContent(String answerContent) {
		this.answerContent = answerContent;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public Long getFaqNum() {
		return faqNum;
	}

	public void setFaqNum(Long faqNum) {
		this.faqNum = faqNum;
	}

	public Long getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
	}

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getHospitalAddress() {
		return hospitalAddress;
	}

	public void setHospitalAddress(String hospitalAddress) {
		this.hospitalAddress = hospitalAddress;
	}

	public String getHospitalLevel() {
		return hospitalLevel;
	}

	public void setHospitalLevel(String hospitalLevel) {
		this.hospitalLevel = hospitalLevel;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	
}
