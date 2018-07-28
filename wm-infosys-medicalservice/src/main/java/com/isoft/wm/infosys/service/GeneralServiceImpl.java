package com.isoft.wm.infosys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.dao.CityDao;
import com.isoft.wm.infosys.dao.ProvinceDao;
import com.isoft.wm.infosys.entity.CityVo;
import com.isoft.wm.infosys.entity.ProvinceVo;

@Service
public class GeneralServiceImpl implements GeneralService{
	@Autowired
	ProvinceDao provinceDao;
	
	@Autowired
	CityDao cityDao;
	
	@Override
	public List<ProvinceVo> listProvince() {
		return provinceDao.findAll();
	}

	@Override
	public List<CityVo> findCityByName(String city) {
		return cityDao.findByNameLike(city);
	}
}
