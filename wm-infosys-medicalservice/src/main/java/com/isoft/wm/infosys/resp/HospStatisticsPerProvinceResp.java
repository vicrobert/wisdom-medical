package com.isoft.wm.infosys.resp;

import java.util.ArrayList;
import java.util.List;

import com.isoft.wm.infosys.viewmodel.HospStatisticsPerProvinceViewModel;

public class HospStatisticsPerProvinceResp {
    private List<HospStatisticsPerProvinceViewModel> rows = new ArrayList<HospStatisticsPerProvinceViewModel>();

    public void clearAllStatistics() {
        rows.clear();
    }

    public void addStatisticalDataPerProvince(HospStatisticsPerProvinceViewModel statData) {
        rows.add(statData);
    }

    public List<HospStatisticsPerProvinceViewModel> getRows() {
        return rows;
    }

    public void setRows(List<HospStatisticsPerProvinceViewModel> rows) {
        this.rows = rows;
    }
}

