package com.isoft.wm.infosys.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.isoft.wm.infosys.entity.DoctorRtVo;

public interface DoctorRtDao extends PagingAndSortingRepository<DoctorRtVo, Long> {
    @Query(value = "from DoctorRtVo d order by d.updatedAt desc")
    List<DoctorRtVo> ListAll(Pageable page);
}
