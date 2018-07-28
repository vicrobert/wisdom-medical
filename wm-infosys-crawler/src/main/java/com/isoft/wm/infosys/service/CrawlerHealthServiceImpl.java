package com.isoft.wm.infosys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.dao.SystemLogDao;
import com.isoft.wm.infosys.dao.WebsiteSampleStatusDao;
import com.isoft.wm.infosys.dto.SystemLogDto;
import com.isoft.wm.infosys.dto.WebsiteSampleStatusDto;
import com.isoft.wm.infosys.entity.SystemLogVo;
import com.isoft.wm.infosys.entity.WebsiteSampleStatusVo;

@Service
public class CrawlerHealthServiceImpl implements CrawlerHealthService {
	@Autowired
	WebsiteSampleStatusDao websiteSampleStatusDao;
	
	@Autowired
	SystemLogDao systemLogDao;
	
	@Override
	public WebsiteSampleStatusDto getHealthStatus(String webName) {
		WebsiteSampleStatusDto websiteSampleStatusDto = new WebsiteSampleStatusDto();
		List<WebsiteSampleStatusVo> websitesStatus = websiteSampleStatusDao.getWebsiteSampleStatus(webName);
		if (websitesStatus != null && websitesStatus.size() > 0) {
			websiteSampleStatusDto.setStatus(websitesStatus);
		}
		return websiteSampleStatusDto;
	}

	@Override
	public WebsiteSampleStatusDto getHealthStatus(Pageable page) {
		WebsiteSampleStatusDto websiteSampleStatusDto = new WebsiteSampleStatusDto();
		List<WebsiteSampleStatusVo> websitesStatus = websiteSampleStatusDao.listWebsiteSampleStatus(page);
		if (websitesStatus != null && websitesStatus.size() > 0) {
			websiteSampleStatusDto.setStatus(websitesStatus);
		}
		return websiteSampleStatusDto;
	}

	@Override
	public SystemLogDto getSystemLogRecentByLevel(Integer level, Pageable page) {
		SystemLogDto systemLogDto = new SystemLogDto();
		List<SystemLogVo> sysLogs = systemLogDao.findAllByLevel(level, page);
		if (sysLogs != null && sysLogs.size() > 0) {
			systemLogDto.setLogs(sysLogs);
		}
		return systemLogDto;
	}

	@Override
	public SystemLogDto getSystemLogRecent(Pageable page) {
		SystemLogDto systemLogDto = new SystemLogDto();
		List<SystemLogVo> sysLogs = systemLogDao.ListAll(page);
		if (sysLogs != null && sysLogs.size() > 0) {
			systemLogDto.setLogs(sysLogs);
		}
		return systemLogDto;
	}
	
}
