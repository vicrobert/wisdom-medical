package com.isoft.wm.infosys.viewmodel;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HospitalContrastTableViewModel {
	private int total;
	private List<Map<String, String>> rows;
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public List<Map<String, String>> getRows() {
		return rows;
	}
	public void setRows(List<Map<String, String>> rows) {
		this.rows = rows;
	}
	public void addRow(Map<String, String> row) {
		if (this.rows == null) {
			rows = new ArrayList<Map<String, String>>();
		}
		rows.add(row);
	}
}
