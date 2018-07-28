package com.isoft.wm.infosys.dto;

import java.util.ArrayList;
import java.util.List;

import com.isoft.wm.infosys.entity.SystemLogVo;

public class SystemLogDto {
	private List<SystemLogVo> logs = new ArrayList<SystemLogVo>();

	public SystemLogDto() {
	}

	public List<SystemLogVo> getLogs() {
		return logs;
	}

	public void setLogs(List<SystemLogVo> logs) {
		this.logs = logs;
	}
	
}
