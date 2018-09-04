package com.isoft.wm.infosys.resp;

import java.util.List;

import com.isoft.wm.infosys.entity.DiseaseFaqVo;

public class DiseaseFaqResp {
    private Integer count;
    private List<DiseaseFaqVo> rows;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer total) {
        this.count = total;
    }

    public List<DiseaseFaqVo> getRows() {
        return rows;
    }

    public void setRows(List<DiseaseFaqVo> rows) {
        this.rows = rows;
        if (rows != null) {
            this.count = rows.size();
        }
    }

}
