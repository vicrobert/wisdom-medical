package com.isoft.wm.infosys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.isoft.wm.infosys.dto.CrawlerSampleNumTendencyDto;
import com.isoft.wm.infosys.dto.SampleNumDto;
import com.isoft.wm.infosys.dto.SampleStrengthDto;
import com.isoft.wm.infosys.dto.SystemLogDto;
import com.isoft.wm.infosys.dto.WebsiteSampleStatusDto;
import com.isoft.wm.infosys.service.CrawlerHealthService;
import com.isoft.wm.infosys.service.CrawlerSamplingService;
import com.isoft.wm.infosys.service.CrawlerTemplateService;
import com.isoft.wm.infosys.utils.JsonUtil;

@RestController
public class RequestController {
    @Autowired
    private CrawlerTemplateService crawlerServiceBase;
    @Autowired
    private CrawlerSamplingService crawlerSamplingService;
    @Autowired
    private CrawlerHealthService crawlerHealthService;

    //Crawler templates
    @RequestMapping(value = "/WebSpider/WebTemplate", method = RequestMethod.PUT)
    public String addWebTemplate(@RequestParam(required = true) String taskName, @RequestParam(required = true) String webName, @RequestParam(required = true) String url, @RequestParam(required = false) Integer sampleFreq,
                                 @RequestParam(required = false) String charset, @RequestParam(required = false) String type, @RequestParam(required = false) String tempLocation) {
        return JsonUtil.serialize(crawlerServiceBase.addWebTemplate(taskName, webName, url, sampleFreq, charset, type, tempLocation));
    }

    @RequestMapping(value = "/WebSpider/WebTemplate", method = RequestMethod.DELETE)
    public String deleteWebTemplateByWebName(@RequestParam(required = true) String webName) {
        return JsonUtil.serialize(crawlerServiceBase.deleteWebTemplateByWebName(webName));
    }

    @RequestMapping(value = "/WebSpider/WebTemplate", method = RequestMethod.GET)
    public String findWebTemplate(@RequestParam(required = false) String webName, @RequestParam(required = false) String taskName, @RequestParam(required = false) Integer page,
                                  @RequestParam(required = false) Integer rows) {
        if (webName != null && !"".equals(webName)) {
            return JsonUtil.serialize(crawlerServiceBase.findWebTemplateByWebName(webName));
        } else if (taskName != null && !"".equals(taskName)) {
            Pageable pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 15, Sort.Direction.ASC, "id");
            return JsonUtil.serialize(crawlerServiceBase.findWebTemplateByTaskName(taskName, pageable));
        } else {
            Pageable pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 15, Sort.Direction.ASC, "id");
            return JsonUtil.serialize(crawlerServiceBase.listAllWebTemplates(pageable));
        }
    }

    //Sampling
    @RequestMapping(value = "/WebSpider/ListDoctorRt", method = RequestMethod.GET)
    public String listDoctorRt(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
        Pageable pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 25, Sort.Direction.DESC, "updatedAt");
        return JsonUtil.serialize(crawlerSamplingService.listDoctorsRt(pageable));
    }

    @RequestMapping(value = "/WebSpider/ListDrugInfoRt", method = RequestMethod.GET)
    public String listDrugInfoRt(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
        Pageable pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 25, Sort.Direction.DESC, "updatedAt");
        return JsonUtil.serialize(crawlerSamplingService.listDrugInfoRt(pageable));
    }

    @RequestMapping(value = "/WebSpider/ListInteractInfoRt", method = RequestMethod.GET)
    public String listInteractInfoRt(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
        Pageable pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 25, Sort.Direction.DESC, "updatedAt");
        return JsonUtil.serialize(crawlerSamplingService.listInteractRt(pageable));
    }

    @RequestMapping(value = "/WebSpider/GetSampleTendencyGroupByMin", method = RequestMethod.GET)
    public String getSampleTendencyGroupByMin() {
        return JsonUtil.serialize(crawlerSamplingService.getSampleTendencyGroupByMin());
    }

    @RequestMapping(value = "/WebSpider/GetSampleTendencyGroupByDay", method = RequestMethod.GET)
    public String getSampleTendencyGroupByDay() {
        return JsonUtil.serialize(crawlerSamplingService.getSampleTendencyGroupByDay());
    }

    @RequestMapping(value = "/WebSpider/GetSampleStrength", method = RequestMethod.GET)
    public String getSampleStrength() {
        return JsonUtil.serialize(crawlerSamplingService.getSampleStrength());
    }

    @RequestMapping(value = "/WebSpider/GetSampleTotalNum", method = RequestMethod.GET)
    public String getSampleTotalNum() {
        return JsonUtil.serialize(crawlerSamplingService.getSampleTotalNum());
    }

    //Health
    @RequestMapping(value = "/WebSpider/GetHealthStatus", method = RequestMethod.GET)
    public String getHealthStatus(@RequestParam(required = false) String webName, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
        if (webName == null) {
            Pageable pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 6, Sort.Direction.DESC, "updatedAt");
            return JsonUtil.serialize(crawlerHealthService.getHealthStatus(pageable));
        } else {
            return JsonUtil.serialize(crawlerHealthService.getHealthStatus(webName));
        }
    }

    @RequestMapping(value = "/WebSpider/GetSystemLogRecent", method = RequestMethod.GET)
    public String getSystemLogRecent(@RequestParam(required = false) Integer level, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
        Pageable pageable = PageRequest.of(page != null && page > 0 ? page - 1 : 0, rows != null && rows > 0 ? rows : 5, Sort.Direction.DESC, "updatedAt");
        if (level == null) {
            return JsonUtil.serialize(crawlerHealthService.getSystemLogRecent(pageable));
        } else {
            return JsonUtil.serialize(crawlerHealthService.getSystemLogRecentByLevel(level, pageable));
        }

    }
}
