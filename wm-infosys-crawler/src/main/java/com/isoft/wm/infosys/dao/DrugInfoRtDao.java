package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.isoft.wm.infosys.entity.DrugInfoRtVo;

public interface DrugInfoRtDao extends PagingAndSortingRepository<DrugInfoRtVo, Long> {
    @Query(value = "from DrugInfoRtVo di order by di.updatedAt desc")
    List<DrugInfoRtVo> ListAll(Pageable page);
}
