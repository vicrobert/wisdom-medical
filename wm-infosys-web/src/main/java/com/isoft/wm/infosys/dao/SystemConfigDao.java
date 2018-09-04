package com.isoft.wm.infosys.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.isoft.wm.infosys.entity.SystemConfigVo;
import org.springframework.data.repository.query.Param;

public interface SystemConfigDao extends JpaRepository<SystemConfigVo, Long> {
    @Query(value = "from SystemConfigVo s where s.name = :name")
    Optional<SystemConfigVo> findByName(@Param("name") String name);
}
