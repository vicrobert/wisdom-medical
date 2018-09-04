package com.isoft.wm.infosys.dto;

import java.util.ArrayList;
import java.util.List;

import com.isoft.wm.infosys.entity.WebsiteSampleStatusVo;

public class WebsiteSampleStatusDto {
    private List<WebsiteSampleStatusVo> status = new ArrayList<WebsiteSampleStatusVo>();

    public WebsiteSampleStatusDto() {

    }

    public List<WebsiteSampleStatusVo> getStatus() {
        return status;
    }

    public void setStatus(List<WebsiteSampleStatusVo> status) {
        this.status = status;
    }


}
