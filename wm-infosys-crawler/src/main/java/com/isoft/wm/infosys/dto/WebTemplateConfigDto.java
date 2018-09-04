package com.isoft.wm.infosys.dto;

import java.util.ArrayList;
import java.util.List;

import com.isoft.wm.infosys.entity.TemplateConfigVo;

public class WebTemplateConfigDto {
    private long total;
    private long page;
    private long pageSize = 15;
    private List<TemplateConfigVo> rows = new ArrayList<TemplateConfigVo>();

    public WebTemplateConfigDto(long total, long page, long pageSize) {
        this.total = total;
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

    public List<TemplateConfigVo> getRows() {
        return rows;
    }

    public void setRows(List<TemplateConfigVo> rows) {
        this.rows = rows;

    }

    public void addRow(TemplateConfigVo row) {
        this.rows.add(row);
    }


}
