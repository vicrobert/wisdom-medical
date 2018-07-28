package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.isoft.wm.infosys.entity.InteractInfoRtVo;

public interface InteractInfoRtDao extends PagingAndSortingRepository<InteractInfoRtVo, Long> {
	@Query(value = "from InteractInfoRtVo ii order by ii.updatedAt desc")
	List<InteractInfoRtVo> ListAll(Pageable page);
}
