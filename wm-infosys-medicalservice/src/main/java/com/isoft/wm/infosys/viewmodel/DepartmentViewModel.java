package com.isoft.wm.infosys.viewmodel;

import javax.persistence.Transient;

import com.isoft.wm.infosys.entity.DepartmentVo;

public class DepartmentViewModel extends DepartmentVo {
    @Transient
    private Integer tier;

    public DepartmentViewModel() {
    }

    public DepartmentViewModel(DepartmentVo vo) {
        if (vo != null) {
            this.setCreatedAt(vo.getCreatedAt());
            this.setDoctorNum(vo.getDoctorNum());
            this.setHospitalId(vo.getHospitalId());
            this.setId(vo.getId());
            this.setUpdatedAt(vo.getUpdatedAt());
            this.setName(vo.getName());
            this.setParentDepartmentId(vo.getParentDepartmentId());
            this.setStatus(vo.getStatus());
            this.setTreeLevel(vo.getTreeLevel());
        }
    }

    public Integer getTier() {
        return tier;
    }

    public void setTier(Integer tier) {
        this.tier = tier;
    }
}
