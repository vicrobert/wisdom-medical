package com.isoft.wm.infosys.viewmodel;

import javax.persistence.Transient;

import com.isoft.wm.infosys.entity.HospitalVo;

public class HospitalViewModel extends HospitalVo{
	@Transient
	private Integer tier;

	public HospitalViewModel() {}
	public HospitalViewModel(HospitalVo vo) {
		setHospitalViewModel(vo);		
	}
	
	public void setHospitalViewModel(HospitalVo vo) {
		if (vo != null) {
			this.setCity(vo.getCity());
			this.setCommunityName(vo.getCommunityName());
			this.setCreatedAt(vo.getCreatedAt());
			this.setDepartmentNum(vo.getDepartmentNum());
			this.setDoctorNum(vo.getDoctorNum());
			this.setFeatureDepartment(vo.getFeatureDepartment());
			this.setHospitalClass(vo.getHospitalClass());
			this.setId(vo.getId());
			this.setUpdatedAt(vo.getUpdatedAt());
			this.setLevel(vo.getLevel());
			this.setName(vo.getName());
			this.setPic(vo.getPic());
			this.setPraise(vo.getPraise());
			this.setProfiles(vo.getProfiles());
			this.setProvince(vo.getProvince());
			this.setScore(vo.getScore());
			this.setStars(vo.getStars());
			this.setStatus(vo.getStatus());
			this.setTel(vo.getTel());
			this.setWebsite(vo.getWebsite());
		}
		this.setTier(10);
	}

	public Integer getTier() {
		return tier;
	}

	public void setTier(Integer tier) {
		this.tier = tier;
	}
	
	
}
