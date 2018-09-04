package com.isoft.wm.infosys.controller;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient(name = "WebCrawlerService")
public interface WebCrawlerServiceProxy {
    @RequestMapping(value = "/WebSpider/WebTemplate", method = RequestMethod.PUT)
    @ResponseBody
    String addWebTemplate(@RequestParam("taskName") String taskName, @RequestParam("webName") String webName, @RequestParam("url") String url, @RequestParam("sampleFreq") Integer sampleFreq,
                          @RequestParam("charset") String charset, @RequestParam("type") String type, @RequestParam("tempLocation") String tempLocation);

    @RequestMapping(value = "/WebSpider/WebTemplate", method = RequestMethod.DELETE)
    @ResponseBody
    String deleteWebTemplateByWebName(@RequestParam("webName") String webName);

    @RequestMapping(value = "/WebSpider/WebTemplate", method = RequestMethod.GET)
    @ResponseBody
    String findWebTemplate(@RequestParam("webName") String webName, @RequestParam("taskName") String taskName, @RequestParam("page") Integer page,
                           @RequestParam("rows") Integer rows);

    @RequestMapping(value = "/WebSpider/ListDoctorRt", method = RequestMethod.GET)
    @ResponseBody
    String listDoctorRt(@RequestParam("page") Integer page, @RequestParam("rows") Integer rows);

    @RequestMapping(value = "/WebSpider/ListDrugInfoRt", method = RequestMethod.GET)
    @ResponseBody
    String listDrugInfoRt(@RequestParam("page") Integer page, @RequestParam("rows") Integer rows);

    @RequestMapping(value = "/WebSpider/ListInteractInfoRt", method = RequestMethod.GET)
    @ResponseBody
    String listInteractInfoRt(@RequestParam("page") Integer page, @RequestParam("rows") Integer rows);

    @RequestMapping(value = "/WebSpider/GetSampleTendencyGroupByMin", method = RequestMethod.GET)
    @ResponseBody
    String getSampleTendencyGroupByMin();

    @RequestMapping(value = "/WebSpider/GetSampleTendencyGroupByDay", method = RequestMethod.GET)
    @ResponseBody
    String getSampleTendencyGroupByDay();

    @RequestMapping(value = "/WebSpider/GetSampleStrength", method = RequestMethod.GET)
    @ResponseBody
    String getSampleStrength();

    @RequestMapping(value = "/WebSpider/GetSampleTotalNum", method = RequestMethod.GET)
    @ResponseBody
    String getSampleTotalNum();

    @RequestMapping(value = "/WebSpider/GetHealthStatus", method = RequestMethod.GET)
    @ResponseBody
    String getHealthStatus(@RequestParam("webName") String webName, @RequestParam("page") Integer page, @RequestParam("rows") Integer rows);

    @RequestMapping(value = "/WebSpider/GetSystemLogRecent", method = RequestMethod.GET)
    @ResponseBody
    String getSystemLogRecent(@RequestParam("level") Integer level, @RequestParam("page") Integer page, @RequestParam("rows") Integer rows);
}
