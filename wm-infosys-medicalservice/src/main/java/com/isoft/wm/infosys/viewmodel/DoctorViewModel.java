package com.isoft.wm.infosys.viewmodel;

import javax.persistence.Transient;

import com.isoft.wm.infosys.entity.DoctorVo;

public class DoctorViewModel extends DoctorVo {
	@Transient
	private Integer tier;

	public DoctorViewModel() {}
	public DoctorViewModel(DoctorVo vo) {
		super();
		if (vo != null) {
			this.setAge(vo.getAge());
			this.setCreatedAt(vo.getCreatedAt());
			this.setDepartmentId(vo.getDepartmentId());
			this.setDepartmentName(vo.getDepartmentName());
			this.setDesc(vo.getDesc());
			this.setDocSearch(vo.getDocSearch());
			this.setEvaluateNum(vo.getEvaluateNum());
			this.setGender(vo.getGender());
			this.setGoodAt(vo.getGoodAt());
			this.setHospitalId(vo.getHospitalId());
			this.setHospitalName(vo.getHospitalName());
			this.setId(vo.getId());
			this.setUpdatedAt(vo.getUpdatedAt());
			this.setLevel(vo.getLevel());
			this.setName(vo.getName());
			this.setPic(vo.getPic());
			this.setPraise(vo.getPraise());
			this.setPraiseNum(vo.getPraiseNum());
			this.setStars(vo.getStars());
			this.setStatus(vo.getStatus());
		}
		this.setTier(4);
	}
	public Integer getTier() {
		return tier;
	}
	public void setTier(Integer tier) {
		this.tier = tier;
	}
	
	
}
