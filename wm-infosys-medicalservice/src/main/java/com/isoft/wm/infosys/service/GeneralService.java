package com.isoft.wm.infosys.service;

import java.util.List;

import com.isoft.wm.infosys.entity.CityVo;
import com.isoft.wm.infosys.entity.ProvinceVo;

public interface GeneralService {
	List<ProvinceVo> listProvince();

	List<CityVo> findCityByName(String city);
}
