package com.isoft.wm.infosys.service;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.dto.SystemLogDto;
import com.isoft.wm.infosys.dto.WebsiteSampleStatusDto;

public interface CrawlerHealthService {
	WebsiteSampleStatusDto getHealthStatus(String webName);
	WebsiteSampleStatusDto getHealthStatus(Pageable page);
	SystemLogDto getSystemLogRecentByLevel(Integer level, Pageable page);
	SystemLogDto getSystemLogRecent(Pageable page);
}
