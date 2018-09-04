package com.isoft.wm.infosys.service;

import com.isoft.wm.infosys.entity.SystemConfigVo;

public interface SystemService {
    SystemConfigVo getSystemProperty(String key);
}
