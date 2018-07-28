package com.isoft.wm.infosys.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("serial")
public class CrawlerSampleNumTendencyDto implements Serializable {
	private Status status = new Status();
	private Data data = new Data();
	public class Data implements Serializable {
		private List<String> type = new ArrayList<String>();
		private List<String> xaxis = new ArrayList<String>();
		private List<Map<String, Object>> docnum = new ArrayList<Map<String, Object>>();
		private List<Map<String, Object>> medicalnum = new ArrayList<Map<String, Object>>();
		private List<Map<String, Object>> interactnum = new ArrayList<Map<String, Object>>();
		public List<String> getType() {
			return type;
		}
		public void setType(List<String> type) {
			this.type = type;
		}
		public List<String> getXaxis() {
			return xaxis;
		}
		public void setXaxis(List<String> xaxis) {
			this.xaxis = xaxis;
		}
		public void addXaxis(String ele) {
			this.xaxis.add(ele);
		}
		public List<Map<String, Object>> getDocnum() {
			return docnum;
		}
		public void setDocnum(List<Map<String, Object>> docnum) {
			this.docnum = docnum;
		}
		public void addDocnum(Map<String, Object> ele) {
			this.docnum.add(ele);
		}
		public List<Map<String, Object>> getMedicalnum() {
			return medicalnum;
		}
		public void setMedicalnum(List<Map<String, Object>> medicalnum) {
			this.medicalnum = medicalnum;
		}
		public void addMedicalnum(Map<String, Object> ele) {
			this.medicalnum.add(ele);
		}
		public List<Map<String, Object>> getInteractnum() {
			return interactnum;
		}
		public void setInteractnum(List<Map<String, Object>> interactnum) {
			this.interactnum = interactnum;
		}
		public void addInteractnum(Map<String, Object> ele) {
			this.interactnum.add(ele);
		}
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Data getData() {
		return data;
	}
	public void setData(Data data) {
		this.data = data;
	}
	
}
