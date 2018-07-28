package com.isoft.wm.infosys.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.TemplateConfigVo;

public interface WebTemplateConfigDao extends PagingAndSortingRepository<TemplateConfigVo, Long> {
	@Query(value = "delete from TemplateConfigVo tc where tc.webName = :webName")
	void deleteByWebName(@Param("webName") String webName);
	
	@Query(value = "select count(tc.id) from TemplateConfigVo tc where tc.taskName = :taskName")
	Long countByTaskName(@Param("taskName") String taskName);
	
	@Query(value = "select count(tc.id) from TemplateConfigVo tc where tc.webName = :webName")
	Long countByWebName(@Param("webName") String webName);
	
	@Query(value = "from TemplateConfigVo tc where tc.taskName = :taskName")
	List<TemplateConfigVo> findByTaskName(@Param("taskName") String taskName, Pageable page);
	
	@Query(value = "from TemplateConfigVo tc where tc.webName = :webName")
	Optional<TemplateConfigVo> findByWebName(@Param("webName") String webName);

}
