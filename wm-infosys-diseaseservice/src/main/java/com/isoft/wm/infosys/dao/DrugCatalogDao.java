package com.isoft.wm.infosys.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import com.isoft.wm.infosys.entity.DiseaseVo;

public interface DrugCatalogDao extends PagingAndSortingRepository<DiseaseVo, Long>{

}
