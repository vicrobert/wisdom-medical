package com.isoft.wm.infosys.dao;

import java.util.List;

import com.isoft.wm.infosys.entity.DoctorSampleStatisticVo;

public interface DoctorSampleStatisticDaoExt {
    List<DoctorSampleStatisticVo> listSampleNumOfOneMinTop10(Long timeStamp);

    List<DoctorSampleStatisticVo> listSampleNumOfOneDayTop10(Long timeStamp);
}
