package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.entity.DoctorVo;

public class PatientFindDoctorInfoResp {
	private long total;
	private long page;
	private long pageSize;
	private List<DoctorVo> rows;
	public PatientFindDoctorInfoResp(long total, long page, long pageSize, List<DoctorVo> rows) {
		this.total = total;
		this.page = page + 1;
		this.pageSize = pageSize;
		if (rows != null) {
			this.rows = rows;
		}
	}
	public long getTotal() {
		return total;
	}
	public void setTotal(long total) {
		this.total = total;
	}
	public List<DoctorVo> getRows() {
		return rows;
	}
	public void setRows(List<DoctorVo> rows) {
		this.rows = rows;
	}
	public long getPage() {
		return page;
	}
	public void setPage(long page) {
		this.page = page;
	}
	public long getPageSize() {
		return pageSize;
	}
	public void setPageSize(long pageSize) {
		this.pageSize = pageSize;
	}
	
	
}
