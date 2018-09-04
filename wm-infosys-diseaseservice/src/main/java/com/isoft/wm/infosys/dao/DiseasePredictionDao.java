package com.isoft.wm.infosys.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import com.isoft.wm.infosys.entity.DiseaseVo;

public interface DiseasePredictionDao extends PagingAndSortingRepository<DiseaseVo, Long> {

}
