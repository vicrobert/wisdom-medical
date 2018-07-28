package com.isoft.wm.infosys.viewmodel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("serial")
public class DoctorRecommendViewModel implements Serializable{
	private Status status;
	
	public class Data implements Serializable {

		private List<Map<String, Object>> treatnum = new ArrayList<Map<String, Object>>();
		private List<Map<String, Object>> commentnum = new ArrayList<Map<String, Object>>();
		private List<String> xaxis = new ArrayList<String>();
		private List<String> type = new ArrayList<String>();
		
		
		public List<Map<String, Object>> getTreatnum() {
			return treatnum;
		}

		public void setTreatnum(List<Map<String, Object>> treatnum) {
			this.treatnum = treatnum;
		}

		public List<Map<String, Object>> getCommentnum() {
			return commentnum;
		}

		public void setCommentnum(List<Map<String, Object>> commentnum) {
			this.commentnum = commentnum;
		}

		public void addTreatNum(Map<String, Object> dateGrp) {
			treatnum.add(dateGrp);
		}
		
		public void addCommentNum(Map<String, Object> dateGrp) {
			commentnum.add(dateGrp);
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




