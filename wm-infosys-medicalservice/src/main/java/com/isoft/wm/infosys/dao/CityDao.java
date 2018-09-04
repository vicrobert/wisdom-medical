package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.isoft.wm.infosys.entity.CityVo;

public interface CityDao extends PagingAndSortingRepository<CityVo, Long> {
    @Query(value = "from CityVo cv where name like %:city%")
    List<CityVo> findByNameLike(@Param("city") String city);
}
