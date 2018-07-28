package com.isoft.wm.infosys.dto;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SampleStrengthDto implements Serializable{
	private Status status = new Status();
	private Double data;
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Double getData() {
		return data;
	}
	public void setData(Double data) {
		this.data = data;
	}
	
}
