package com.isoft.wm.infosys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableFeignClients
public class WebCrawlerController {
	@Autowired
	private WebCrawlerServiceProxy webCrawlerServiceProxy;
	
	@RequestMapping(value = "/WebSpider/WebTemplate", method = RequestMethod.GET)
	public String listWebTemplate(@RequestParam(required = false) String webName, @RequestParam(required = false) String taskName, @RequestParam(required = false) Integer page,
			 @RequestParam(required = false) Integer rows) {
		return webCrawlerServiceProxy.findWebTemplate(webName, taskName, page, rows);
	}
	
	@RequestMapping(value = "/WebSpider/WebTemplate", method = RequestMethod.PUT)
	public String addWebTemplate(@RequestParam(required = true) String taskName, @RequestParam(required = true) String webName, @RequestParam(required = true) String url, @RequestParam(required = false) Integer sampleFreq, 
			@RequestParam(required = false) String charset, @RequestParam(required = false) String type, @RequestParam(required = false) String tempLocation) {
		return webCrawlerServiceProxy.addWebTemplate(taskName, webName, url, sampleFreq, charset, type, tempLocation);
	}
	
	@RequestMapping(value = "/WebSpider/ListDoctorRt", method = RequestMethod.GET)
	public String listDoctorRt(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
		return webCrawlerServiceProxy.listDoctorRt(page, rows);
	}
	
	@RequestMapping(value = "/WebSpider/ListDrugInfoRt", method = RequestMethod.GET)
	public String listDrugInfoRt(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
		return webCrawlerServiceProxy.listDrugInfoRt(page, rows);
	}
	
	@RequestMapping(value = "/WebSpider/ListInteractInfoRt", method = RequestMethod.GET)
	public String listInteractInfoRt(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
		return webCrawlerServiceProxy.listInteractInfoRt(page, rows);
	}
	
	@RequestMapping(value = "/WebSpider/GetSampleTendencyGroupByMin", method = RequestMethod.GET)
	public String getSampleTendencyGroupByMin() {
		return webCrawlerServiceProxy.getSampleTendencyGroupByMin();
	}
	
	@RequestMapping(value = "/WebSpider/GetSampleTendencyGroupByDay", method = RequestMethod.GET)
	public String getSampleTendencyGroupByDay(){
		return webCrawlerServiceProxy.getSampleTendencyGroupByDay();
	}
	
	@RequestMapping(value = "/WebSpider/GetSampleStrength", method = RequestMethod.GET)
	public String getSampleStrength() {
		return webCrawlerServiceProxy.getSampleStrength();
	}
	
	@RequestMapping(value = "/WebSpider/GetSampleTotalNum", method = RequestMethod.GET)
	public String getSampleTotalNum() {
		return webCrawlerServiceProxy.getSampleTotalNum();
	}
	
	@RequestMapping(value = "/WebSpider/GetHealthStatus", method = RequestMethod.GET)
	public String getHealthStatus(@RequestParam(required = false) String webName, @RequestParam(required = false) Integer page, 
			@RequestParam(required = false) Integer rows) {
		return webCrawlerServiceProxy.getHealthStatus(webName, page, rows);
	}
	
	@RequestMapping(value = "/WebSpider/GetSystemLogRecent", method = RequestMethod.GET)
	public String getSystemLogRecent(@RequestParam(required = false) Integer level, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer rows) {
		return webCrawlerServiceProxy.getSystemLogRecent(level, page, rows);
	}
	
	public static void main(String [] args) {
		System.out.println(System.currentTimeMillis());
	}
}
