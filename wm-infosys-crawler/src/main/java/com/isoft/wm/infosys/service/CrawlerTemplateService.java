package com.isoft.wm.infosys.service;

import org.springframework.data.domain.Pageable;

import com.isoft.wm.infosys.dto.Status;
import com.isoft.wm.infosys.dto.WebTemplateConfigDto;

public interface CrawlerTemplateService {
	Status addWebTemplate(String taskName, String webName, String url, Integer sampleFreq, String charset, String type, String tempLocation);
	Status deleteWebTemplateByWebName(String webName);
	WebTemplateConfigDto findWebTemplateByWebName(String webName);
	WebTemplateConfigDto findWebTemplateByTaskName(String taskName, Pageable page);
	WebTemplateConfigDto listAllWebTemplates(Pageable page);
}
