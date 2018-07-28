package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.SystemLogVo;

public interface SystemLogDao extends PagingAndSortingRepository<SystemLogVo, Long> {
	@Query(value = "from SystemLogVo sl order by sl.updatedAt desc")
	List<SystemLogVo> ListAll(Pageable page);
	
	@Query(value = "from SystemLogVo sl where sl.level = :level order by sl.updatedAt desc")
	List<SystemLogVo> findAllByLevel(@Param("level") Integer level, Pageable page);
}
