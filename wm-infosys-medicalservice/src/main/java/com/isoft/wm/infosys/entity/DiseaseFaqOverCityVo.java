package com.isoft.wm.infosys.entity;

public class DiseaseFaqOverCityVo {
	private String city;
	private Long faqNum;
	private Long askNum;
	private Long answerNum;
	private Double lng;
	private Double lat;
	public DiseaseFaqOverCityVo(String city, Double lng, Double lat, Long askNum, Long answerNum) {
		this.city = city;
		this.askNum = askNum;
		this.answerNum = answerNum;
		this.faqNum = askNum + answerNum;
		this.lng = lng;
		this.lat = lat;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Long getFaqNum() {
		return faqNum;
	}
	public void setFaqNum(Long faqNum) {
		this.faqNum = faqNum;
	}
	public Long getAskNum() {
		return askNum;
	}
	public void setAskNum(Long askNum) {
		this.askNum = askNum;
	}
	public Long getAnswerNum() {
		return answerNum;
	}
	public void setAnswerNum(Long answerNum) {
		this.answerNum = answerNum;
	}
	public Double getLng() {
		return lng;
	}
	public void setLng(Double lng) {
		this.lng = lng;
	}
	public Double getLat() {
		return lat;
	}
	public void setLat(Double lat) {
		this.lat = lat;
	}
	
	
}
