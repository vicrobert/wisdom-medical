package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.entity.DeptDetailsVo;

public class PatientFindDeptInfoResp {
	private long total;
	private long page;
	private long pageSize;
	private List<DeptDetailsVo> rows;
	public PatientFindDeptInfoResp(long total, long page, long pageSize, List<DeptDetailsVo> rows) {
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
	public List<DeptDetailsVo> getRows() {
		return rows;
	}
	public void setRows(List<DeptDetailsVo> rows) {
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
