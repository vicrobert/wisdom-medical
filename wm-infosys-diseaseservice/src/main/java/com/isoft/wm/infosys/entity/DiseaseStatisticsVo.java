package com.isoft.wm.infosys.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "disease_statistics")
public class DiseaseStatisticsVo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
	private Long id;
	
	@Column(name = "disease_id")
	private Long diseaseId;
	
	@Column(name = "patient_id")
	private Long patientId;
	
	@Column(name = "occur_year")
	private Integer occurYear;
	
	@Column(name = "occur_season")
	private String occurSeason;
	
	@Column(name = "occur_month")
	private Integer occurMonth;
	
	@Column(name = "occur_day")
	private Integer occurDay;
	
	@Column(name = "occur_times")
	private Long occurTimes;

	@Column(name = "statistical_type")
	private String statisticalType;
	
	//non persist
	private String memo; //for remarks

	public DiseaseStatisticsVo(Long occurTimes) {
		this.occurTimes = occurTimes;
	}

	public DiseaseStatisticsVo(Integer occurYear, Integer occurMonth, Long occurTimes, String memo) {
		this.occurYear = occurYear;
		this.occurMonth = occurMonth;
		this.occurTimes = occurTimes;
		this.memo = memo;
	}

	public DiseaseStatisticsVo(Integer occurYear, String occurSeason, Integer occurMonth, Integer occurDay,
			Long occurTimes, String statisticalType) {
		this.occurYear = occurYear;
		this.occurSeason = occurSeason;
		this.occurMonth = occurMonth;
		this.occurDay = occurDay;
		this.occurTimes = occurTimes;
		this.statisticalType = statisticalType;
	}
	
	public DiseaseStatisticsVo(Integer occurYear, String occurSeason, Integer occurMonth, Integer occurDay,
			Long occurTimes, String statisticalType, String memo) {
		this.occurYear = occurYear;
		this.occurSeason = occurSeason;
		this.occurMonth = occurMonth;
		this.occurDay = occurDay;
		this.occurTimes = occurTimes;
		this.statisticalType = statisticalType;
		this.memo = memo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getDiseaseId() {
		return diseaseId;
	}

	public void setDiseaseId(Long diseaseId) {
		this.diseaseId = diseaseId;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Integer getOccurYear() {
		return occurYear;
	}

	public void setOccurYear(Integer occurYear) {
		this.occurYear = occurYear;
	}

	public String getOccurSeason() {
		return occurSeason;
	}

	public void setOccurSeason(String occurSeason) {
		this.occurSeason = occurSeason;
	}

	public Integer getOccurMonth() {
		return occurMonth;
	}

	public void setOccurMonth(Integer occurMonth) {
		this.occurMonth = occurMonth;
	}

	public Integer getOccurDay() {
		return occurDay;
	}

	public void setOccurDay(Integer occurDay) {
		this.occurDay = occurDay;
	}

	public Long getOccurTimes() {
		return occurTimes;
	}

	public void setOccurTimes(Long occurTimes) {
		this.occurTimes = occurTimes;
	}

	public String getStatisticalType() {
		return statisticalType;
	}

	public void setStatisticalType(String statisticalType) {
		this.statisticalType = statisticalType;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	

		
}
