package com.isoft.wm.infosys.dao;

import java.util.List;

import com.isoft.wm.infosys.entity.DrugSampleStatisticVo;

public interface DrugSampleStatisticDaoExt {
    List<DrugSampleStatisticVo> listSampleNumOfOneMinTop10(Long timeStamp);

    List<DrugSampleStatisticVo> listSampleNumOfOneDayTop10(Long timeStamp);
}
