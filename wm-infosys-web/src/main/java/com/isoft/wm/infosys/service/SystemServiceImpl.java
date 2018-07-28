package com.isoft.wm.infosys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.dao.SystemConfigDao;
import com.isoft.wm.infosys.entity.SystemConfigVo;

@Service
public class SystemServiceImpl implements SystemService {
	@Autowired
	SystemConfigDao systemConfigDao;

	@Override
	public SystemConfigVo getSystemProperty(String key) {
		return systemConfigDao.findByName(key).orElseGet(()->{return null;});
	}

}
