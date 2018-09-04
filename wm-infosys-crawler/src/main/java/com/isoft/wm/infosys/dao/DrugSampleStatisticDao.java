package com.isoft.wm.infosys.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.DrugSampleStatisticVo;

public interface DrugSampleStatisticDao extends JpaRepository<DrugSampleStatisticVo, Long>, DrugSampleStatisticDaoExt {
}
