package com.isoft.wm.infosys.viewmodel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("serial")
public class DiseaseRelevanceAnalysisViewModel implements Serializable {
	private Status status;
	
	public class Data implements Serializable {
		private List<String> type = new ArrayList<String>();
		private List<String> xaxis = new ArrayList<String>();
		private List<Long> date = new ArrayList<Long>();
		public List<String> getType() {
			return type;
		}
		public void setType(List<String> type) {
			this.type = type;
		}
		public void addType(String ele) {
			this.type.add(ele);
		}
		public List<String> getXaxis() {
			return xaxis;
		}
		public void setXaxis(List<String> xaxis) {
			this.xaxis = xaxis;
		}
		public List<Long> getDate() {
			return date;
		}
		public void setDate(List<Long> date) {
			this.date = date;
		}
		public void addDate(Long ele) {
			this.date.add(ele);
		}

	}

	private Data data;
	
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