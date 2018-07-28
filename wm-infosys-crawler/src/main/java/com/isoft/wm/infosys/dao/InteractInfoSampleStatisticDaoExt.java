package com.isoft.wm.infosys.dao;

import java.util.List;

import com.isoft.wm.infosys.entity.InteractInfoSampleStatisticVo;

public interface InteractInfoSampleStatisticDaoExt {
	List<InteractInfoSampleStatisticVo> listSampleNumOfOneMinTop10(Long timeStamp);
	List<InteractInfoSampleStatisticVo> listSampleNumOfOneDayTop10(Long timeStamp);
}
