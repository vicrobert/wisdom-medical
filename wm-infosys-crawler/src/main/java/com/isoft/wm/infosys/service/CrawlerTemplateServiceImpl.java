package com.isoft.wm.infosys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.dao.WebTemplateConfigDao;
import com.isoft.wm.infosys.dto.Status;
import com.isoft.wm.infosys.dto.WebTemplateConfigDto;
import com.isoft.wm.infosys.entity.TemplateConfigVo;

@Service
public class CrawlerTemplateServiceImpl implements CrawlerTemplateService {

    @Autowired
    WebTemplateConfigDao templateConfigDao;

    @Override
    public Status addWebTemplate(String taskName, String webName, String url, Integer sampleFreq, String charset, String type, String tempLocation) {
        TemplateConfigVo tempConfigVo = new TemplateConfigVo();
        tempConfigVo.setTaskName(taskName);
        tempConfigVo.setWebName(webName);
        tempConfigVo.setUrl(url);
        tempConfigVo.setSampleFreq(sampleFreq);
        tempConfigVo.setType(type);
        tempConfigVo.setTempLocation(tempLocation);
        tempConfigVo.setCharset(charset);
        templateConfigDao.save(tempConfigVo);
        return new Status("200", "添加成功");
    }

    @Override
    public Status deleteWebTemplateByWebName(String webName) {
        templateConfigDao.deleteByWebName(webName);
        return new Status("200", "删除成功");
    }

    @Override
    public WebTemplateConfigDto findWebTemplateByTaskName(String taskName, Pageable page) {
        WebTemplateConfigDto webTemplateConfigDto = new WebTemplateConfigDto(templateConfigDao.countByTaskName(taskName), page.getPageNumber() + 1, page.getPageSize());
        List<TemplateConfigVo> tempConfigList = templateConfigDao.findByTaskName(taskName, page);
        if (tempConfigList != null) {
            webTemplateConfigDto.setRows(tempConfigList);
        }
        return webTemplateConfigDto;
    }

    @Override
    public WebTemplateConfigDto findWebTemplateByWebName(String webName) {
        WebTemplateConfigDto webTemplateConfigDto = new WebTemplateConfigDto(templateConfigDao.countByWebName(webName), 1, 15);
        TemplateConfigVo tempConfig = templateConfigDao.findByWebName(webName).orElseGet(() -> {
            return null;
        });
        webTemplateConfigDto.addRow(tempConfig);
        return webTemplateConfigDto;
    }

    @Override
    public WebTemplateConfigDto listAllWebTemplates(Pageable page) {
        WebTemplateConfigDto webTemplateConfigDto = new WebTemplateConfigDto(templateConfigDao.count(), page.getPageNumber() + 1, page.getPageSize());
        webTemplateConfigDto.setRows(templateConfigDao.findAll(page).getContent());
        return webTemplateConfigDto;
    }

}
