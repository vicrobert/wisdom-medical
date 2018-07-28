package com.isoft.wm.infosys.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "disease_prediction")
public class DiseasePredictionVo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable=false)
	private Long id;
	
	@Column(name = "disease_id")
	private Long diseaseId;
	
	@Column(name = "cnt_male")
	private Long cntMale;
	
	@Column(name = "cnt_female")
	private Long cntFemale;
	
	@Column(name = "occur_at")
	private Date occurAt;

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

	public Long getCntMale() {
		return cntMale;
	}

	public void setCntMale(Long cntMale) {
		this.cntMale = cntMale;
	}

	public Long getCntFemale() {
		return cntFemale;
	}

	public void setCntFemale(Long cntFemale) {
		this.cntFemale = cntFemale;
	}

	public Date getOccurAt() {
		return occurAt;
	}

	public void setOccurAt(Date occurAt) {
		this.occurAt = occurAt;
	}
	
	
}
