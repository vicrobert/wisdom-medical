package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.isoft.wm.infosys.entity.SampleStrengthVo;

public interface SampleStrengthDao extends PagingAndSortingRepository<SampleStrengthVo, Long> {
	@Query(value = "from SampleStrengthVo ss order by ss.timeStamp desc")
	List<SampleStrengthVo> findOneOrderByTimeStamp(Pageable page);
}
