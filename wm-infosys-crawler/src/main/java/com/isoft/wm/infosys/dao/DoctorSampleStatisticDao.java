package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.DoctorSampleStatisticVo;

public interface DoctorSampleStatisticDao extends JpaRepository<DoctorSampleStatisticVo, Long>, DoctorSampleStatisticDaoExt {
}
