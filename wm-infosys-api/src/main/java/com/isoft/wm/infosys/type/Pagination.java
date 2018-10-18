package com.isoft.wm.infosys.type;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Pagination implements Serializable {
    private int page;
    private int rows;
    private SortDirect sortDirect;

    public Pagination(int page, int rows) {
        super();
        this.page = page;
        this.rows = rows;
    }

    public Pagination(int page, int rows, SortDirect sortDirect) {
        super();
        this.page = page;
        this.rows = rows;
        this.sortDirect = sortDirect;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public SortDirect getSortDirect() {
        return sortDirect;
    }

    public void setSortDirect(SortDirect sortDirect) {
        this.sortDirect = sortDirect;
    }

}


