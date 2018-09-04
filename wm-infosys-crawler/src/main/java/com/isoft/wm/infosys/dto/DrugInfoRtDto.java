package com.isoft.wm.infosys.dto;

import java.util.ArrayList;
import java.util.List;

import com.isoft.wm.infosys.entity.DrugInfoRtVo;

public class DrugInfoRtDto {
    /**
     * TODO:
     * Comment: This chart is not required the total variable,
     * so we keep it zero as default values just for simple
     */
    private long total = 0;
    private long page = 1;
    private long pageSize = 15;
    private List<DrugInfoRtVo> rows = new ArrayList<DrugInfoRtVo>();

    public DrugInfoRtDto(long page, long pageSize) {
        this.page = page;
        this.pageSize = pageSize;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
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

    public List<DrugInfoRtVo> getRows() {
        return rows;
    }

    public void setRows(List<DrugInfoRtVo> rows) {
        this.rows = rows;

    }

    public void addRow(DrugInfoRtVo row) {
        this.rows.add(row);
    }
}
