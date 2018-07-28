package com.isoft.wm.infosys.viewmodel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("serial")
public class DrugPercentDistributeViewModel implements Serializable{
	private Status status;
	
	public class Data implements Serializable {

		private List<Map<String, Object>> date = new ArrayList<Map<String, Object>>();
		private List<String> xaxis = new ArrayList<String>();
		private List<String> type = new ArrayList<String>();
		
		public List<Map<String, Object>> getDate() {
			return date;
		}

		public void setDate(List<Map<String, Object>> date) {
			this.date = date;
		}

		public void addDate(Map<String, Object> dateGrp) {
			date.add(dateGrp);
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
		
		public List<String> getType() {
			return type;
		}

		public void setType(List<String> type) {
			this.type = type;
		}
	
	}
	private Data data = new Data();
	
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




